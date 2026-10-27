import React, { useState } from 'react';
import { 
  Workflow, 
  Send, 
  Zap, 
  Bot, 
  Database, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Copy, 
  Check, 
  HelpCircle,
  FileText,
  Smartphone,
  Eye,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  LeadFormData, 
  LeadRecord, 
  ServiceType, 
  ExecutionLogItem, 
  AutomationSettings 
} from '../types/automation';
import { automationService } from '../services/automationService';
import { AutomationSettingsModal } from './AutomationSettingsModal';
import { AutomationDashboard } from './AutomationDashboard';
import { LeadDetailsModal } from './LeadDetailsModal';

const SAMPLE_LEADS: { label: string; data: LeadFormData }[] = [
  {
    label: 'B2B Logistics (Enterprise)',
    data: {
      name: 'Michael Vance',
      businessName: 'Vance Freight Logistics',
      email: 'm.vance@vancefreight.com',
      whatsapp: '+1 312 555 0199',
      service: 'n8n Workflow Automation',
      message: 'We need to automate intake of 300+ daily freight quotes from PDF emails, validate tax ID, score margins with Gemini, and push to Postgres DB.'
    }
  },
  {
    label: 'Medical Clinic (WhatsApp Bot)',
    data: {
      name: 'Dr. Elena Rostova',
      businessName: 'Nova Dental Studio',
      email: 'elena@novadental.org',
      whatsapp: '+44 7911 123456',
      service: 'WhatsApp Business Bot',
      message: 'Looking for a 2-way WhatsApp appointment booking & confirmation bot synced with Google Calendar to reduce 30% patient no-shows.'
    }
  },
  {
    label: 'E-commerce (Support Chatbot)',
    data: {
      name: 'Liam Chen',
      businessName: 'Solstice Activewear',
      email: 'liam@solsticeapparel.com',
      whatsapp: '+1 415 555 7821',
      service: 'AI Support Chatbot',
      message: 'We want an AI chatbot grounded on our Shopify return policy & FAQs that can handle shipping status lookups and refund questions.'
    }
  }
];

export const LiveAutomationDemo: React.FC = () => {
  const [settings, setSettings] = useState<AutomationSettings>(() => automationService.getSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    businessName: '',
    email: '',
    whatsapp: '',
    service: 'n8n Workflow Automation',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  // Execution State
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [stepStatusMessage, setStepStatusMessage] = useState<string>('');
  const [completedLead, setCompletedLead] = useState<LeadRecord | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<'ai' | 'crm' | 'email' | 'payload'>('ai');
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Dashboard & Inspector State
  const [leadsList, setLeadsList] = useState<LeadRecord[]>(() => automationService.getLeads());
  const [selectedLeadForInspect, setSelectedLeadForInspect] = useState<LeadRecord | null>(null);

  const stepsList: { name: ExecutionLogItem['stepName']; icon: typeof Zap; label: string; desc: string }[] = [
    { name: 'Lead Received', icon: Zap, label: 'Lead Received', desc: 'Webhook validation & intake' },
    { name: 'AI Analysis', icon: Bot, label: 'AI Analysis', desc: 'LLM intent & complexity scoring' },
    { name: 'Lead Qualified', icon: Sparkles, label: 'Lead Qualified', desc: 'Routing tier assignment' },
    { name: 'Saved to CRM', icon: Database, label: 'Saved to CRM', desc: 'Google Sheets sync' },
    { name: 'Follow-up Sent', icon: Mail, label: 'Follow-up Sent', desc: 'Personalized email trigger' },
  ];

  const handleApplySample = (sample: LeadFormData) => {
    setFormData(sample);
    setFormErrors({});
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = automationService.validateForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsProcessing(true);
    setActiveStepIndex(0);
    setStepStatusMessage('Initiating webhook intake...');
    setCompletedLead(null);

    try {
      const stepIndexMap: Record<ExecutionLogItem['stepName'], number> = {
        'Lead Received': 0,
        'AI Analysis': 1,
        'Lead Qualified': 2,
        'Saved to CRM': 3,
        'Follow-up Sent': 4
      };

      const result = await automationService.submitLeadAutomation(formData, (stepName, status, summary) => {
        const idx = stepIndexMap[stepName];
        if (idx !== undefined) {
          setActiveStepIndex(idx);
          setStepStatusMessage(summary);
        }
      });

      setCompletedLead(result);
      setActiveStepIndex(5); // all completed
      setStepStatusMessage('Complete! All 5 nodes executed successfully.');
      setLeadsList(automationService.getLeads());
    } catch (err: unknown) {
      setStepStatusMessage('Execution failed. Please check endpoint connectivity.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyResultJson = () => {
    if (!completedLead) return;
    navigator.clipboard.writeText(JSON.stringify(completedLead, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <section 
      id="lead-demo" 
      className="py-20 md:py-28 bg-[#0b1120] relative border-t border-slate-800/80"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Workflow className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>LIVE AUTOMATION DEMO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Test Real-Time Lead Capture & AI Qualification
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Submit a simulated prospect inquiry below to watch the 5-node automation pipeline in action: Webhook intake → AI analysis → Tier qualification → CRM row sync → Automated response dispatch.
            </p>
          </div>

          {/* Engine Status & Settings Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            {settings.isLiveWebhookConfigured ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live n8n Webhook: Active</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Demo Automation (Simulated Engine)</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-colors shadow-sm"
              title="Configure n8n webhook or CRM"
            >
              <Settings className="w-3.5 h-3.5 text-sky-400" />
              <span>Configure Webhook</span>
            </button>
          </div>
        </div>

        {/* Visual 5-Step Pipeline Flow Diagram */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-400" />
              Pipeline Execution Sequence
            </span>
            <span className="font-mono text-slate-400 text-[11px]">
              {isProcessing ? 'Processing Active Payload...' : completedLead ? 'Workflow Finished' : 'Awaiting Inbound Payload'}
            </span>
          </div>

          {/* Nodes Horizontal Track */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stepsList.map((step, idx) => {
              const Icon = step.icon;
              const isPast = activeStepIndex > idx;
              const isCurrent = activeStepIndex === idx && isProcessing;
              const isPending = activeStepIndex < idx;

              return (
                <div
                  key={step.name}
                  className={`p-3.5 rounded-xl border transition-all duration-300 relative ${
                    isPast
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                      : isCurrent
                      ? 'bg-sky-500/15 border-sky-400 text-sky-200 ring-2 ring-sky-500/30 animate-pulse'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-slate-400">
                      Step {idx + 1}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isPast 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : isCurrent 
                        ? 'bg-sky-500/20 text-sky-400' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {step.label}
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Status String */}
          {stepStatusMessage && (
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                {stepStatusMessage}
              </span>
              {completedLead && (
                <span className="text-emerald-400 font-sans">
                  Total latency: {completedLead.totalExecutionTimeMs}ms
                </span>
              )}
            </div>
          )}
        </div>

        {/* Lead Intake Form & Live Execution Outcome Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Interactive Form */}
          <div className="lg:col-span-5 bg-[#131d31] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Inbound Lead Webhook Form</h3>
                <p className="text-xs text-slate-400">Enter prospect details to test qualification</p>
              </div>
            </div>

            {/* Quick Sample Leads Bar */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Prefill Quick Test Scenarios:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_LEADS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySample(sample.data)}
                    className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-sky-300 border border-slate-700/80 transition-colors"
                  >
                    + {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800">
              
              {/* Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Sarah Jenkins"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 ${
                      formErrors.name ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-400 mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Business Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Apex Logistics"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 ${
                      formErrors.businessName ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {formErrors.businessName && (
                    <span className="text-[10px] text-red-400 mt-1 block">{formErrors.businessName}</span>
                  )}
                </div>
              </div>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="s.jenkins@apexlogistics.io"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 ${
                      formErrors.email ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[10px] text-red-400 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+1 415 890 2234"
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 ${
                      formErrors.whatsapp ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {formErrors.whatsapp && (
                    <span className="text-[10px] text-red-400 mt-1 block">{formErrors.whatsapp}</span>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Service Needed <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value as ServiceType)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="n8n Workflow Automation">n8n Workflow Automation</option>
                  <option value="AI Support Chatbot">AI Support Chatbot</option>
                  <option value="WhatsApp Business Bot">WhatsApp Business Bot</option>
                  <option value="CRM & Google Sheets Sync">CRM & Google Sheets Sync</option>
                  <option value="Custom AI Agent">Custom AI Agent</option>
                  <option value="Webhook & API Integration">Webhook & API Integration</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Project Message / Automation Goal <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe your current bottleneck, tools you use, or what you want automated..."
                  className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 ${
                    formErrors.message ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
                {formErrors.message && (
                  <span className="text-[10px] text-red-400 mt-1 block">{formErrors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Executing Automation Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Trigger Lead Automation Demo</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Safe demo environment</span>
                {settings.isLiveWebhookConfigured ? (
                  <span className="text-emerald-400">Live webhook endpoint enabled</span>
                ) : (
                  <span>Realistic Demo Simulation Mode</span>
                )}
              </div>

            </form>
          </div>

          {/* Right Column (7 Cols): Real-time Output & Outcome Inspector */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Lead Received Status Banner */}
            {completedLead ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#131d31] border border-emerald-500/40 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Lead Received & Processed</span>
                        <span className="font-mono text-xs text-sky-400">
                          {completedLead.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {completedLead.formData.businessName} • {completedLead.formData.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
                      {completedLead.totalExecutionTimeMs} ms
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyResultJson}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 flex items-center gap-1 transition-colors"
                      title="Copy raw JSON payload"
                    >
                      {copiedPayload ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>JSON</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Switchable Result Tabs */}
                <div className="flex border-b border-slate-800 text-xs">
                  {[
                    { id: 'ai', label: 'AI Lead Qualification', icon: Bot },
                    { id: 'crm', label: 'CRM / Sheet Row', icon: Database },
                    { id: 'email', label: 'Auto Email Response', icon: Mail },
                    { id: 'payload', label: 'Raw Payload', icon: FileText },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeResultTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveResultTab(tab.id as typeof activeResultTab)}
                        className={`flex items-center gap-1.5 py-2 px-3 font-medium border-b-2 transition-colors ${
                          active
                            ? 'border-sky-400 text-sky-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: AI Qualification */}
                {activeResultTab === 'ai' && (
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">Qualification Tier:</span>
                        <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {completedLead.qualification.tier}
                        </span>
                      </div>
                      <div className="font-mono text-sky-400">
                        Lead Score: <strong>{completedLead.qualification.score}/100</strong>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {completedLead.qualification.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1">Architectural Insights:</span>
                        <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                          {completedLead.qualification.keyInsights.map((k, i) => (
                            <li key={i}>{k}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1">Recommended Nodes:</span>
                        <div className="flex flex-wrap gap-1">
                          {completedLead.qualification.recommendedWorkflowNodes.map((n, i) => (
                            <span key={i} className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-sky-300 rounded">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: CRM & Sheets */}
                {activeResultTab === 'crm' && (
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold text-white">Google Sheets Record Appended</span>
                      <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        Row #{completedLead.crmRecord.sheetRow}
                      </span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                      <div>[Record_ID]: {completedLead.crmRecord.recordId}</div>
                      <div>[Business]: {completedLead.formData.businessName}</div>
                      <div>[Contact]: {completedLead.formData.name} &lt;{completedLead.formData.email}&gt;</div>
                      <div>[WhatsApp]: {completedLead.formData.whatsapp}</div>
                      <div>[AI_Tier]: {completedLead.qualification.tier} (Score: {completedLead.qualification.score})</div>
                      <div>[Synced_At]: {completedLead.crmRecord.syncedAt}</div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Email Response */}
                {activeResultTab === 'email' && (
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                      <div>To: <strong className="text-white font-mono">{completedLead.emailResponse.recipient}</strong></div>
                      <span className="font-mono text-emerald-400 text-[10px]">
                        Status: {completedLead.emailResponse.status}
                      </span>
                    </div>
                    <div className="font-semibold text-sky-300">
                      Subject: {completedLead.emailResponse.subject}
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-sans text-slate-300 whitespace-pre-line leading-relaxed text-[11px]">
                      {completedLead.emailResponse.body}
                    </div>
                  </div>
                )}

                {/* Tab 4: Raw Payload */}
                {activeResultTab === 'payload' && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <pre className="font-mono text-[11px] text-sky-300 max-h-64 overflow-y-auto">
                      {JSON.stringify(completedLead, null, 2)}
                    </pre>
                  </div>
                )}

              </div>
            ) : (
              /* Awaiting Submission Empty State */
              <div className="bg-[#131d31] p-8 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                  <Workflow className="w-7 h-7" />
                </div>
                <div className="max-w-md">
                  <h4 className="text-base font-bold text-white">
                    Awaiting Inbound Webhook Payload
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Select one of the sample scenarios on the left or enter your own project details, then click "Trigger Lead Automation Demo" to see live node execution.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-sky-400" />
                    n8n Webhook Listener
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <Bot className="w-3 h-3 text-indigo-400" />
                    Gemini AI Qualifier
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                    <Database className="w-3 h-3 text-emerald-400" />
                    Google Sheets Row
                  </span>
                </div>
              </div>
            )}

            {/* Architecture Tip Pill */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">How this connects to real tools: </strong>
                In production, this intake form feeds directly into an n8n webhook node via HTTP POST. n8n executes Gemini reasoning, inserts records via Google Sheets or HubSpot APIs, and triggers auto-replies via Resend or WhatsApp Cloud API.
              </div>
            </div>

          </div>

        </div>

        {/* Professional Demo Automation Dashboard */}
        <div className="pt-8">
          <AutomationDashboard
            leads={leadsList}
            isLiveConnected={settings.isLiveWebhookConfigured}
            onInspectLead={(lead) => setSelectedLeadForInspect(lead)}
            onRefreshLeads={() => setLeadsList(automationService.getLeads())}
          />
        </div>

      </div>

      {/* Settings Modal */}
      <AutomationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsSaved={(newSettings) => {
          setSettings(newSettings);
        }}
      />

      {/* Lead Details Drill-Down Modal */}
      <LeadDetailsModal
        lead={selectedLeadForInspect}
        onClose={() => setSelectedLeadForInspect(null)}
      />

    </section>
  );
};
