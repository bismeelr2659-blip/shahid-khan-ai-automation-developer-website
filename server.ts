import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadPayload {
  leadId: string;
  formData: {
    name: string;
    businessName: string;
    email: string;
    whatsapp: string;
    service: string;
    message: string;
  };
  webhookUrl?: string;
  timestamp: string;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory session config for server-side proxy
  let serverConfig = {
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || '',
    isConfigured: Boolean(process.env.N8N_WEBHOOK_URL)
  };

  // Status check endpoint
  app.get('/api/automation/status', (req: Request, res: Response) => {
    res.json({
      success: true,
      mode: serverConfig.n8nWebhookUrl ? 'live' : 'demo_simulation',
      isLiveConfigured: Boolean(serverConfig.n8nWebhookUrl),
      targetUrl: serverConfig.n8nWebhookUrl ? serverConfig.n8nWebhookUrl.replace(/\/\/[^@]*@/, '//') : null,
      message: serverConfig.n8nWebhookUrl 
        ? 'Live n8n webhook configured' 
        : 'Running in Demo Automation mode'
    });
  });

  // Safe webhook configuration endpoint (stored server-side in session memory, never leaked to client bundles)
  app.post('/api/automation/config', (req: Request, res: Response) => {
    const { webhookUrl } = req.body;
    if (typeof webhookUrl === 'string') {
      serverConfig.n8nWebhookUrl = webhookUrl.trim();
      serverConfig.isConfigured = Boolean(webhookUrl.trim().startsWith('http'));
    }
    res.json({
      success: true,
      isConfigured: serverConfig.isConfigured
    });
  });

  // Test webhook ping endpoint (server-to-server ping, bypassing browser CORS)
  app.post('/api/automation/test-webhook', async (req: Request, res: Response) => {
    const { url } = req.body;
    const targetUrl = url || serverConfig.n8nWebhookUrl;

    if (!targetUrl || !targetUrl.startsWith('http')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook URL provided'
      });
    }

    const start = Date.now();
    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Shahid-Portfolio-Automation-Tester/1.0'
        },
        body: JSON.stringify({
          event: 'webhook_connectivity_test',
          timestamp: new Date().toISOString(),
          source: 'shahid-portfolio-demo'
        }),
        signal: AbortSignal.timeout(6000)
      });

      const latencyMs = Date.now() - start;
      res.json({
        success: response.ok || response.status < 400,
        statusCode: response.status,
        message: response.ok 
          ? `Webhook returned HTTP ${response.status} OK (${latencyMs}ms)`
          : `Webhook returned HTTP ${response.status} ${response.statusText}`,
        latencyMs
      });
    } catch (err: unknown) {
      const latencyMs = Date.now() - start;
      const message = err instanceof Error ? err.message : 'Connection failed';
      res.status(502).json({
        success: false,
        message: `Failed to reach webhook endpoint: ${message}`,
        latencyMs
      });
    }
  });

  // Lead dispatch endpoint
  app.post('/api/automation/lead', async (req: Request, res: Response) => {
    const payload: LeadPayload = req.body;
    const targetWebhookUrl = payload.webhookUrl || serverConfig.n8nWebhookUrl;

    if (!payload.formData || !payload.formData.email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required lead form fields'
      });
    }

    // If live webhook URL is configured, relay to n8n server-to-server
    if (targetWebhookUrl && targetWebhookUrl.startsWith('http')) {
      const start = Date.now();
      try {
        const webhookResponse = await fetch(targetWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'Shahid-AI-Portfolio-Intake'
          },
          body: JSON.stringify({
            leadId: payload.leadId,
            lead: payload.formData,
            timestamp: payload.timestamp || new Date().toISOString(),
            channel: 'website_lead_form'
          }),
          signal: AbortSignal.timeout(8000)
        });

        const latencyMs = Date.now() - start;
        return res.json({
          success: true,
          mode: 'live_webhook',
          webhookConnected: true,
          statusCode: webhookResponse.status,
          latencyMs,
          message: 'Lead forwarded successfully to n8n webhook'
        });
      } catch (err: unknown) {
        const latencyMs = Date.now() - start;
        const message = err instanceof Error ? err.message : 'Webhook error';
        return res.json({
          success: true,
          mode: 'live_webhook_fallback',
          webhookConnected: false,
          error: message,
          latencyMs,
          message: 'Webhook endpoint could not be reached. Processed locally in demo mode.'
        });
      }
    }

    // Honest Demo Mode Response
    return res.json({
      success: true,
      mode: 'demo_simulation',
      webhookConnected: false,
      isDemo: true,
      message: 'Processed through Realistic Demo Automation Engine (no external webhook configured).'
    });
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
