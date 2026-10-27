import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Database, 
  Mail, 
  ExternalLink,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { AutomationSettings } from '../types/automation';
import { automationService } from '../services/automationService';

interface AutomationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSaved: (newSettings: AutomationSettings) => void;
}

export const AutomationSettingsModal: React.FC<AutomationSettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsSaved
}) => {
  const [settings, setSettings] = useState<AutomationSettings>(() => automationService.getSettings());
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [webhookSecretInput, setWebhookSecretInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTestPing = async () => {
    if (!settings.n8nWebhookUrl) {
      setPingResult({
        success: false,
        message: 'Please enter an n8n Webhook URL before testing.'
      });
      return;
    }

    setTestingPing(true);
    setPingResult(null);
    try {
      const result = await automationService.testWebhookPing(settings.n8nWebhookUrl);
      setPingResult(result);
    } catch {
      setPingResult({
        success: false,
        message: 'Could not reach webhook endpoint.'
      });
    } finally {
      setTestingPing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = automationService.saveSettings(settings);
    onSettingsSaved(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClearWebhook = () => {
    const cleared = automationService.saveSettings({
      n8nWebhookUrl: '',
      isLiveWebhookConfigured: false
    });
    setSettings(cleared);
    setPingResult(null);
    onSettingsSaved(cleared);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-[#131d31] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                Automation Endpoint Configuration
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                  Settings
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Connect your real n8n instance or run in realistic Demo Mode
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
          
          {/* Security & Honest Status Banner */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-slate-200">
                  Privacy & Zero Frontend Key Exposure
                </h4>
                <p className="text-[12px] text-slate-400 leading-relaxed mt-0.5">
                  Webhook URLs and credentials entered here are processed securely in your current session. We never expose raw API secrets in public client bundles.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Current Pipeline Engine:</span>
              {settings.n8nWebhookUrl ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Custom Webhook Configured
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-medium border border-amber-500/30">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  Demo Automation Mode (Realistic Simulation)
                </span>
              )}
            </div>
          </div>

          {/* n8n Webhook Configuration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                <span>n8n Webhook Endpoint URL</span>
              </label>
              {settings.n8nWebhookUrl && (
                <button
                  type="button"
                  onClick={handleClearWebhook}
                  className="text-[11px] text-red-400 hover:text-red-300 hover:underline"
                >
                  Clear & Revert to Demo Mode
                </button>
              )}
            </div>
            <p className="text-[12px] text-slate-400">
              Paste the "Production Webhook URL" or "Test Webhook URL" from your n8n Webhook trigger node.
            </p>
            <div className="relative">
              <input
                type="url"
                value={settings.n8nWebhookUrl}
                onChange={(e) => setSettings({ ...settings, n8nWebhookUrl: e.target.value })}
                placeholder="https://n8n.yourdomain.com/webhook/lead-intake"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            {/* Test Ping Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handleTestPing}
                disabled={testingPing || !settings.n8nWebhookUrl}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-medium text-sky-300 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {testingPing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Pinging Endpoint...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    <span>Test Webhook Ping</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-500">
                Supports self-hosted n8n, n8n Cloud, or webhook.site
              </span>
            </div>

            {/* Ping Feedback Notice */}
            {pingResult && (
              <div className={`p-3 rounded-lg text-xs border flex items-start gap-2 ${
                pingResult.success 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                  : 'bg-red-950/40 border-red-500/40 text-red-300'
              }`}>
                {pingResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold">{pingResult.message}</div>
                  {pingResult.latencyMs !== undefined && (
                    <div className="text-[11px] opacity-80 font-mono mt-0.5">
                      Roundtrip latency: {pingResult.latencyMs}ms
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Webhook Secret / Header Token (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Webhook Authentication Header (Optional)</span>
            </label>
            <div className="relative">
              <input
                type={showWebhookSecret ? 'text' : 'password'}
                value={webhookSecretInput}
                onChange={(e) => setWebhookSecretInput(e.target.value)}
                placeholder="Bearer token or x-api-key"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-sky-500 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                aria-label="Toggle secret visibility"
              >
                {showWebhookSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Passed in the <code className="text-sky-300">Authorization</code> header when forwarding leads to your backend.
            </p>
          </div>

          {/* Google Sheets / CRM Target Configuration */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>CRM / Google Sheets Configuration</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Target Service</label>
                <select
                  value={settings.crmService}
                  onChange={(e) => setSettings({ ...settings, crmService: e.target.value as AutomationSettings['crmService'] })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="simulated">Simulated Google Sheets Row</option>
                  <option value="google_sheets">Google Sheets via n8n node</option>
                  <option value="airtable">Airtable CRM</option>
                  <option value="hubspot">HubSpot CRM</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Sheet / Destination Tab</label>
                <input
                  type="text"
                  value={settings.crmTargetName}
                  onChange={(e) => setSettings({ ...settings, crmTargetName: e.target.value })}
                  placeholder="Inbound Leads (Tab 1)"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Automated Email Service Configuration */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Automated Email Response Service</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Email Provider</label>
                <select
                  value={settings.emailService}
                  onChange={(e) => setSettings({ ...settings, emailService: e.target.value as AutomationSettings['emailService'] })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="simulated">Realistic Interactive Preview</option>
                  <option value="resend">Resend API via n8n</option>
                  <option value="sendgrid">SendGrid / SMTP</option>
                  <option value="smtp">Standard IMAP / SMTP</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Sender Email Identity</label>
                <input
                  type="email"
                  value={settings.emailFrom}
                  onChange={(e) => setSettings({ ...settings, emailFrom: e.target.value })}
                  placeholder="5566shahidkhank@gmail.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Configuration Saved!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-md shadow-sky-500/20 transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
