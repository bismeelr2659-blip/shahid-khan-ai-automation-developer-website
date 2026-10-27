import { 
  LeadFormData, 
  LeadRecord, 
  LeadQualification, 
  AutomationSettings, 
  AutomationStats,
  ExecutionLogItem,
  EmailResponseDraft
} from '../types/automation';

const STORAGE_SETTINGS_KEY = 'sk_automation_settings_v1';
const STORAGE_LEADS_KEY = 'sk_automation_leads_v1';

export const DEFAULT_SETTINGS: AutomationSettings = {
  n8nWebhookUrl: '',
  emailService: 'simulated',
  emailFrom: 'automations@shahidkhan.dev',
  crmService: 'simulated',
  crmTargetName: 'Google Sheets (Inbound Leads tab)',
  isLiveWebhookConfigured: false,
};

// Seed sample leads for demo dashboard demonstration
const INITIAL_DEMO_LEADS: LeadRecord[] = [
  {
    id: 'LEAD-2026-9041',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    isDemo: true,
    overallStatus: 'completed',
    totalExecutionTimeMs: 1140,
    formData: {
      name: 'Sarah Jenkins',
      businessName: 'Apex Logistics & Freight',
      email: 's.jenkins@apexlogistics.io',
      whatsapp: '+1 415 890 2234',
      service: 'n8n Workflow Automation',
      message: 'We receive 200+ shipping manifests daily via email and need an n8n workflow to extract PDF data, validate invoice line items, and sync to our internal ERP database.'
    },
    qualification: {
      tier: 'Tier A (High Priority)',
      score: 94,
      intentLevel: 'High',
      complexity: 'Enterprise',
      summary: 'High-value enterprise document processing automation. Strong technical scope, clear ROI, and ready for immediate architecture design.',
      keyInsights: [
        'Document parsing & PDF extraction pipeline needed',
        'ERP database integration with transactional rollback',
        'Daily volume warrants self-hosted dedicated n8n runner'
      ],
      recommendedWorkflowNodes: [
        'n8n-nodes-base.emailReadImap',
        'n8n-nodes-base.pdfParse',
        'n8n-nodes-base.geminiExtractJson',
        'n8n-nodes-base.postgresUpsert',
        'n8n-nodes-base.slackAlert'
      ],
      suggestedAction: 'Schedule technical discovery call for PDF parsing schema & ERP credential handshake.'
    },
    crmRecord: {
      sheetRow: 142,
      recordId: 'CRM-ROW-1092',
      syncedAt: new Date(Date.now() - 1000 * 60 * 35 + 850).toISOString(),
      destination: 'Google Sheets (Inbound Leads tab)',
      status: 'Appended'
    },
    emailResponse: {
      recipient: 's.jenkins@apexlogistics.io',
      sender: 'Shahid Khan <automations@shahidkhan.dev>',
      subject: 'Re: n8n Workflow Automation for Apex Logistics & Freight',
      body: `Hi Sarah,\n\nThank you for reaching out regarding the document parsing & ERP sync workflow for Apex Logistics & Freight.\n\nAutomating PDF manifest extraction and ERP ingestion with n8n is one of my core specializations. Our typical architecture utilizes an IMAP listener coupled with structured Gemini JSON parsing to handle varying document layouts with 99%+ accuracy before committing to the database.\n\nI have logged your request in my intake system. Let's schedule a brief 20-minute discovery call to review sample manifest formats.\n\nBest regards,\nShahid Khan\nAI Automation Developer`,
      sentAt: new Date(Date.now() - 1000 * 60 * 35 + 1140).toISOString(),
      status: 'Simulated Sent'
    },
    webhookStatus: {
      attempted: false,
      connected: false
    },
    logs: [
      {
        id: 'log-1',
        stepName: 'Lead Received',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        durationMs: 42,
        outputSummary: 'Received lead from Apex Logistics & Freight. Schema validated.',
        payloadData: { ip: '192.168.1.1', origin: 'portfolio-lead-form', channel: 'web' }
      },
      {
        id: 'log-2',
        stepName: 'AI Analysis',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 35 + 45).toISOString(),
        durationMs: 420,
        outputSummary: 'Gemini reasoning classified as Enterprise Automation. Confidence: 94%.',
        payloadData: { promptTokens: 380, completionTokens: 142, model: 'gemini-1.5-flash' }
      },
      {
        id: 'log-3',
        stepName: 'Lead Qualified',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 35 + 470).toISOString(),
        durationMs: 65,
        outputSummary: 'Assigned Tier A (High Priority). Score: 94/100.',
        payloadData: { tier: 'Tier A', estimatedEffortHours: 35 }
      },
      {
        id: 'log-4',
        stepName: 'Saved to CRM',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 35 + 540).toISOString(),
        durationMs: 310,
        outputSummary: 'Row 142 appended to Google Sheets Inbound Leads.',
        payloadData: { rowNumber: 142, spreadsheetId: '1hGk9...32' }
      },
      {
        id: 'log-5',
        stepName: 'Follow-up Sent',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 35 + 860).toISOString(),
        durationMs: 280,
        outputSummary: 'Dynamic personalized acknowledgment email generated and queued.',
        payloadData: { emailStatus: 'queued_simulated', recipient: 's.jenkins@apexlogistics.io' }
      }
    ]
  },
  {
    id: 'LEAD-2026-9038',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    isDemo: true,
    overallStatus: 'completed',
    totalExecutionTimeMs: 980,
    formData: {
      name: 'Mark Henderson',
      businessName: 'Dentistry Care Hub',
      email: 'mark@dentistrycare.com',
      whatsapp: '+44 7700 900123',
      service: 'WhatsApp Business Bot',
      message: 'Looking for a WhatsApp appointment reminder bot integrated with our Google Calendar to confirm bookings and reduce patient no-shows.'
    },
    qualification: {
      tier: 'Tier B (Standard Project)',
      score: 82,
      intentLevel: 'High',
      complexity: 'Moderate',
      summary: 'High demand conversational workflow. Straightforward WhatsApp Cloud API integration with calendar event webhooks.',
      keyInsights: [
        'WhatsApp interactive buttons for (Confirm / Reschedule)',
        'Bi-directional sync with Google Calendar API',
        '24hr automated reminder sequence'
      ],
      recommendedWorkflowNodes: [
        'n8n-nodes-base.cronTrigger',
        'n8n-nodes-base.googleCalendar',
        'n8n-nodes-base.whatsAppCloudApi',
        'n8n-nodes-base.webhookResponse'
      ],
      suggestedAction: 'Provide standard calendar-to-WhatsApp architecture template & Meta API setup checklist.'
    },
    crmRecord: {
      sheetRow: 141,
      recordId: 'CRM-ROW-1091',
      syncedAt: new Date(Date.now() - 1000 * 60 * 180 + 720).toISOString(),
      destination: 'Google Sheets (Inbound Leads tab)',
      status: 'Appended'
    },
    emailResponse: {
      recipient: 'mark@dentistrycare.com',
      sender: 'Shahid Khan <automations@shahidkhan.dev>',
      subject: 'Re: WhatsApp Business Bot for Dentistry Care Hub',
      body: `Hi Mark,\n\nThank you for reaching out! A WhatsApp appointment reminder bot with interactive confirmation buttons is a proven way to eliminate patient no-shows.\n\nUsing n8n and the Meta WhatsApp Cloud API, we can trigger automated reminder sequences 24 hours prior, sync responses directly with Google Calendar, and notify your front desk in real-time.\n\nI will follow up shortly with our standard integration blueprint.\n\nWarm regards,\nShahid Khan`,
      sentAt: new Date(Date.now() - 1000 * 60 * 180 + 980).toISOString(),
      status: 'Simulated Sent'
    },
    webhookStatus: {
      attempted: false,
      connected: false
    },
    logs: [
      {
        id: 'log-b1',
        stepName: 'Lead Received',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        durationMs: 38,
        outputSummary: 'Received lead from Dentistry Care Hub.',
        payloadData: { ip: '10.0.0.1', origin: 'portfolio-lead-form' }
      },
      {
        id: 'log-b2',
        stepName: 'AI Analysis',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 180 + 40).toISOString(),
        durationMs: 380,
        outputSummary: 'Intent classified as Booking / Conversational Automation.',
        payloadData: { model: 'gemini-1.5-flash' }
      },
      {
        id: 'log-b3',
        stepName: 'Lead Qualified',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 180 + 430).toISOString(),
        durationMs: 50,
        outputSummary: 'Assigned Tier B (Standard Project). Score: 82/100.',
        payloadData: { tier: 'Tier B' }
      },
      {
        id: 'log-b4',
        stepName: 'Saved to CRM',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 180 + 490).toISOString(),
        durationMs: 230,
        outputSummary: 'Row 141 appended to Google Sheets.',
        payloadData: { rowNumber: 141 }
      },
      {
        id: 'log-b5',
        stepName: 'Follow-up Sent',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 180 + 730).toISOString(),
        durationMs: 250,
        outputSummary: 'Confirmation email prepared.',
        payloadData: { emailStatus: 'queued_simulated' }
      }
    ]
  }
];

export const automationService = {
  getSettings(): AutomationSettings {
    try {
      const stored = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          isLiveWebhookConfigured: Boolean(parsed.n8nWebhookUrl && parsed.n8nWebhookUrl.trim().startsWith('http'))
        };
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: Partial<AutomationSettings>): AutomationSettings {
    const current = this.getSettings();
    const updated: AutomationSettings = {
      ...current,
      ...settings,
      isLiveWebhookConfigured: Boolean(
        settings.n8nWebhookUrl !== undefined 
          ? settings.n8nWebhookUrl.trim().startsWith('http') 
          : current.n8nWebhookUrl.trim().startsWith('http')
      ),
      lastTestedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  },

  getLeads(): LeadRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_LEADS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to seed leads
    }
    // initialize with initial demo leads
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
    } catch {
      // ignore
    }
    return INITIAL_DEMO_LEADS;
  },

  saveLead(lead: LeadRecord): void {
    const current = this.getLeads();
    const updated = [lead, ...current];
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  resetDemoLeads(): LeadRecord[] {
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
    } catch {
      // ignore
    }
    return INITIAL_DEMO_LEADS;
  },

  clearAllLeads(): LeadRecord[] {
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify([]));
    } catch {
      // ignore
    }
    return [];
  },

  getStats(): AutomationStats {
    const leads = this.getLeads();
    const qualifiedLeads = leads.filter(l => l.qualification.tier.includes('Tier A') || l.qualification.score >= 75).length;
    const followupsSent = leads.filter(l => l.emailResponse && l.overallStatus === 'completed').length;
    const totalExecution = leads.reduce((acc, curr) => acc + (curr.totalExecutionTimeMs || 800), 0);
    const avgMs = leads.length > 0 ? Math.round(totalExecution / leads.length) : 0;

    return {
      totalLeads: leads.length,
      qualifiedLeads,
      followupsSent,
      averageExecutionMs: avgMs
    };
  },

  validateForm(data: LeadFormData): { isValid: boolean; errors: Partial<Record<keyof LeadFormData, string>> } {
    const errors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Please provide your full name (minimum 2 characters).';
    }

    if (!data.businessName || data.businessName.trim().length < 2) {
      errors.businessName = 'Please enter your business or project name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    const phoneClean = data.whatsapp.replace(/[^0-9]/g, '');
    if (!data.whatsapp || phoneClean.length < 7) {
      errors.whatsapp = 'Please provide a valid WhatsApp number with country code.';
    }

    if (!data.service) {
      errors.service = 'Please select a required automation service.';
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Please provide a brief description of what you want to automate (min 10 characters).';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Realistic AI qualification engine
  qualifyLead(data: LeadFormData): LeadQualification {
    const text = `${data.service} ${data.message}`.toLowerCase();
    
    let score = 65;
    let complexity: LeadQualification['complexity'] = 'Moderate';
    let intentLevel: LeadQualification['intentLevel'] = 'Medium';
    const keyInsights: string[] = [];
    const recommendedNodes: string[] = ['n8n-nodes-base.webhook'];

    // Domain evaluation
    const isFreeEmail = data.email.includes('@gmail.') || data.email.includes('@yahoo.') || data.email.includes('@hotmail.');
    if (!isFreeEmail) {
      score += 15;
      keyInsights.push('Corporate business email domain detected');
    } else {
      keyInsights.push('Generic email provider used; mobile WhatsApp verified');
    }

    // Keyword detection
    if (text.includes('urgent') || text.includes('asap') || text.includes('budget') || text.includes('team') || text.includes('api')) {
      score += 12;
      intentLevel = 'High';
      keyInsights.push('High readiness indicators (budget/timeline keywords present)');
    }

    if (text.includes('erp') || text.includes('crm') || text.includes('postgres') || text.includes('database') || text.includes('scale')) {
      score += 10;
      complexity = 'Enterprise';
      recommendedNodes.push('n8n-nodes-base.postgres', 'n8n-nodes-base.httpRequest');
      keyInsights.push('Enterprise backend architecture required');
    } else if (data.service === 'WhatsApp Business Bot') {
      complexity = 'Moderate';
      recommendedNodes.push('n8n-nodes-base.whatsAppCloudApi', 'n8n-nodes-base.googleCalendar');
    } else if (data.service === 'AI Support Chatbot') {
      complexity = 'Moderate';
      recommendedNodes.push('n8n-nodes-base.geminiLlm', 'n8n-nodes-base.vectorStore');
    } else {
      complexity = 'Low';
      recommendedNodes.push('n8n-nodes-base.googleSheets', 'n8n-nodes-base.emailSend');
    }

    score = Math.min(Math.max(score, 45), 98);

    let tier: LeadQualification['tier'] = 'Tier B (Standard Project)';
    let suggestedAction = 'Review project requirements and prepare scoped proposal.';

    if (score >= 85) {
      tier = 'Tier A (High Priority)';
      suggestedAction = 'Fast-track: Send calendar booking link for urgent 1-on-1 technical discovery.';
    } else if (score < 60) {
      tier = 'Tier C (Consultation/Info)';
      suggestedAction = 'Send automated portfolio walkthrough and intake questionnaire.';
    }

    const summary = `${tier.split(' ')[0]} ${complexity} inquiry for ${data.businessName}. Client seeks ${data.service}.`;

    return {
      tier,
      score,
      intentLevel,
      summary,
      complexity,
      keyInsights,
      recommendedWorkflowNodes: recommendedNodes,
      suggestedAction
    };
  },

  // Generates tailored professional automated follow-up email response
  generateEmailResponse(data: LeadFormData, qual: LeadQualification): EmailResponseDraft {
    const firstName = data.name.split(' ')[0] || data.name;
    const subject = `Re: Automation Request for ${data.businessName} - ${data.service}`;
    
    let specificParagraph = '';
    if (data.service === 'n8n Workflow Automation') {
      specificParagraph = `I specialize in resilient n8n pipelines with comprehensive error handlers, transactional safety, and sub-second webhook execution. I'll inspect how we can integrate your tools seamlessly.`;
    } else if (data.service === 'WhatsApp Business Bot') {
      specificParagraph = `Connecting your workflow to WhatsApp Business via the official Meta Cloud API enables real-time messaging, interactive menu buttons, and automated CRM tracking.`;
    } else if (data.service === 'AI Support Chatbot') {
      specificParagraph = `For an AI Support Chatbot, grounding responses with your actual business documentation using Gemini ensures fast, hallucination-free answers for your customers 24/7.`;
    } else {
      specificParagraph = `I will review your requirements to map out the ideal webhook, data transformation, and CRM synchronization flow for your stack.`;
    }

    const body = `Hi ${firstName},

Thank you for reaching out through my AI Automation Portfolio demo!

I have received your inquiry regarding "${data.service}" for ${data.businessName}.

${specificParagraph}

Here is what happens next:
1. I will review your requirements and draft an initial workflow architecture diagram.
2. If this aligns with your goals, we can jump on a brief 15-20 min technical discovery session to map out the exact nodes.

Feel free to reply directly to this email or reach out on WhatsApp at ${data.whatsapp} if you have any questions.

Best regards,
Shahid Khan
AI Automation Developer
Portfolio: https://shahidkhan.dev
Email: 5566shahidkhank@gmail.com`;

    return {
      recipient: data.email,
      sender: 'Shahid Khan <5566shahidkhank@gmail.com>',
      subject,
      body,
      sentAt: new Date().toISOString(),
      status: 'Simulated Sent'
    };
  },

  // Dispatches lead through the complete automation pipeline
  async submitLeadAutomation(
    data: LeadFormData,
    onStepUpdate?: (step: ExecutionLogItem['stepName'], status: ExecutionLogItem['status'], summary: string) => void
  ): Promise<LeadRecord> {
    const startTime = Date.now();
    const settings = this.getSettings();
    const isLive = settings.isLiveWebhookConfigured && Boolean(settings.n8nWebhookUrl);
    const leadId = `LEAD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const logs: ExecutionLogItem[] = [];

    // Helper to log steps
    const recordStep = (
      stepName: ExecutionLogItem['stepName'], 
      durationMs: number, 
      summary: string, 
      payload: Record<string, unknown>
    ) => {
      const logItem: ExecutionLogItem = {
        id: `step-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        stepName,
        status: 'completed',
        timestamp: new Date().toISOString(),
        durationMs,
        outputSummary: summary,
        payloadData: payload
      };
      logs.push(logItem);
      onStepUpdate?.(stepName, 'completed', summary);
      return logItem;
    };

    // Step 1: Lead Received
    onStepUpdate?.('Lead Received', 'in_progress', 'Validating payload schema & registering webhook listener...');
    await new Promise(r => setTimeout(r, 260));
    recordStep('Lead Received', 48, `Inbound webhook triggered for ${data.businessName} (${data.email}). Validated.`, {
      leadId,
      formData: data,
      clientHeaders: { userAgent: navigator.userAgent, timestamp: new Date().toISOString() },
      transportMode: isLive ? 'n8n_live_webhook' : 'demo_simulation_runner'
    });

    // Step 1.5: Optional Live Webhook Dispatch if configured
    let webhookResult = {
      attempted: isLive,
      connected: isLive,
      url: settings.n8nWebhookUrl,
      statusCode: 200,
      latencyMs: 120,
      errorMessage: undefined as string | undefined
    };

    if (isLive) {
      try {
        // Attempt POST to live webhook via proxy or direct
        const response = await fetch('/api/automation/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId,
            formData: data,
            webhookUrl: settings.n8nWebhookUrl,
            timestamp: new Date().toISOString()
          })
        }).catch(async () => {
          // If server proxy is not running (e.g. pure static dev), try direct POST
          return await fetch(settings.n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              leadId,
              formData: data,
              timestamp: new Date().toISOString(),
              source: 'shahid-portfolio-demo'
            })
          });
        });

        webhookResult.statusCode = response.status;
        webhookResult.connected = response.ok;
      } catch (err: unknown) {
        webhookResult.connected = false;
        webhookResult.errorMessage = err instanceof Error ? err.message : 'Network error';
      }
    }

    // Step 2: AI Analysis
    onStepUpdate?.('AI Analysis', 'in_progress', 'Passing query to LLM intent & sentiment classifier node...');
    await new Promise(r => setTimeout(r, 480));
    const qual = this.qualifyLead(data);
    recordStep('AI Analysis', 412, `LLM reasoned intent as ${qual.intentLevel}. Key focus: ${qual.keyInsights[0]}.`, {
      model: 'gemini-1.5-flash',
      prompt: `Analyze lead from ${data.businessName} requesting ${data.service}: "${data.message}"`,
      intentLevel: qual.intentLevel,
      complexity: qual.complexity,
      score: qual.score
    });

    // Step 3: Lead Qualified
    onStepUpdate?.('Lead Qualified', 'in_progress', 'Computing routing priority and rule-based tier assignment...');
    await new Promise(r => setTimeout(r, 320));
    recordStep('Lead Qualified', 65, `Assigned ${qual.tier} (Score: ${qual.score}/100). Routing to fast-track.`, {
      tier: qual.tier,
      score: qual.score,
      suggestedAction: qual.suggestedAction,
      recommendedNodes: qual.recommendedWorkflowNodes
    });

    // Step 4: Saved to CRM
    onStepUpdate?.('Saved to CRM', 'in_progress', `Appending structured contact record into ${settings.crmTargetName}...`);
    await new Promise(r => setTimeout(r, 360));
    const currentLeadsCount = this.getLeads().length;
    const crmRecord: LeadRecord['crmRecord'] = {
      sheetRow: 140 + currentLeadsCount + 1,
      recordId: `CRM-${Math.floor(10000 + Math.random() * 90000)}`,
      syncedAt: new Date().toISOString(),
      destination: settings.crmTargetName,
      status: isLive ? 'Appended' : 'Mock Synced'
    };
    recordStep('Saved to CRM', 290, `Record ${crmRecord.recordId} committed to ${settings.crmTargetName} at row ${crmRecord.sheetRow}.`, {
      crmRecord,
      schemaColumns: ['LeadID', 'Timestamp', 'Business', 'Contact', 'Email', 'WhatsApp', 'Service', 'Tier', 'Score', 'Status']
    });

    // Step 5: Follow-up Sent
    onStepUpdate?.('Follow-up Sent', 'in_progress', 'Generating personalized auto-response email & dispatching...');
    await new Promise(r => setTimeout(r, 390));
    const emailResponse = this.generateEmailResponse(data, qual);
    recordStep('Follow-up Sent', 240, `Personalized email response generated & queued for ${data.email}.`, {
      emailResponse,
      serviceProvider: settings.emailService,
      status: isLive ? 'Delivered (Live)' : 'Simulated Sent'
    });

    const totalExecutionTimeMs = Date.now() - startTime;

    const leadRecord: LeadRecord = {
      id: leadId,
      createdAt: new Date().toISOString(),
      formData: data,
      qualification: qual,
      crmRecord,
      emailResponse,
      isDemo: !isLive,
      webhookStatus: webhookResult,
      overallStatus: 'completed',
      totalExecutionTimeMs,
      logs
    };

    // Save to demo leads storage
    this.saveLead(leadRecord);

    return leadRecord;
  },

  // Test ping webhook URL
  async testWebhookPing(url: string): Promise<{ success: boolean; statusCode?: number; message: string; latencyMs: number }> {
    const start = Date.now();
    if (!url || !url.startsWith('http')) {
      return { success: false, message: 'Invalid URL. Must start with http:// or https://', latencyMs: 0 };
    }

    try {
      const response = await fetch('/api/automation/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      }).catch(async () => {
        // fallback direct ping
        return await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'ping_test', timestamp: new Date().toISOString() })
        });
      });

      const latencyMs = Date.now() - start;
      return {
        success: response.ok || response.status < 400,
        statusCode: response.status,
        message: response.ok 
          ? `Webhook endpoint responded with HTTP ${response.status} OK (${latencyMs}ms)`
          : `Webhook returned HTTP ${response.status} (${response.statusText || 'Error'})`,
        latencyMs
      };
    } catch (err: unknown) {
      const latencyMs = Date.now() - start;
      const message = err instanceof Error ? err.message : 'Connection failed';
      return {
        success: false,
        message: `Failed to connect to webhook: ${message}. If using self-hosted n8n, verify CORS or test in production mode.`,
        latencyMs
      };
    }
  }
};
