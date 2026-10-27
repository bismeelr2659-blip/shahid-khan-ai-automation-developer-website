import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  CheckCircle2, 
  Clock, 
  Database, 
  Mail, 
  Smartphone, 
  FileText, 
  Zap, 
  Copy, 
  Check, 
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { LeadRecord } from '../types/automation';

interface LeadDetailsModalProps {
  lead: LeadRecord | null;
  onClose: () => void;
}

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ lead, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'crm' | 'email' | 'payload'>('overview');
  const [copiedJson, setCopiedJson] = useState(false);

  if (!lead) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(lead, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const getTierColor = (tier: string) => {
    if (tier.includes('Tier A')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (tier.includes('Tier B')) return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-details-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#131d31] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="lead-details-modal-title" className="text-base font-bold text-white">
                  {lead.formData.businessName}
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {lead.id}
                </span>
                {lead.isDemo ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Demo Mode
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Live Webhook
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Contact: <strong className="text-slate-200">{lead.formData.name}</strong> • Service:{' '}
                <span className="text-sky-300">{lead.formData.service}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Summary & Trace', icon: Layers },
            { id: 'ai', label: 'AI Lead Qualification', icon: Bot },
            { id: 'crm', label: 'CRM / Sheet Record', icon: Database },
            { id: 'email', label: 'Follow-up Email', icon: Mail },
            { id: 'payload', label: 'Raw Webhook Payload', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active
                    ? 'border-sky-400 text-sky-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          
          {/* TAB 1: OVERVIEW & TRACE */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Metadata Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Qualification Tier</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${getTierColor(lead.qualification.tier)}`}>
                    {lead.qualification.tier}
                  </span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">AI Lead Score</span>
                  <span className="text-sm font-mono font-bold text-sky-400">
                    {lead.qualification.score}/100
                  </span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Execution Speed</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {lead.totalExecutionTimeMs} ms
                  </span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Captured At</span>
                  <span className="text-[11px] font-mono text-slate-300">
                    {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Inquiry Message Box */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-200">Original Inquiry Payload</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    WhatsApp: {lead.formData.whatsapp}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed italic bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  "{lead.formData.message}"
                </p>
              </div>

              {/* Visual 5-Step Execution Trace */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>Pipeline Execution Logs</span>
                </h4>
                <div className="space-y-2">
                  {lead.logs.map((log, index) => (
                    <div 
                      key={log.id || index}
                      className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>Step {index + 1}: {log.stepName}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {log.durationMs}ms
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">{log.outputSummary}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 bg-emerald-950/60 rounded border border-emerald-800/50">
                        200 OK
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI QUALIFICATION */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                    <Bot className="w-4 h-4" />
                    <span>Gemini Autonomous Lead Evaluation</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-mono text-xs border ${getTierColor(lead.qualification.tier)}`}>
                    Score: {lead.qualification.score}/100
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {lead.qualification.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">Key Architectural Insights:</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside text-[11px]">
                    {lead.qualification.keyInsights.map((insight, idx) => (
                      <li key={idx}>{insight}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold block">Recommended n8n Nodes:</span>
                  <div className="flex flex-wrap gap-1">
                    {lead.qualification.recommendedWorkflowNodes.map((node, idx) => (
                      <span key={idx} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">Recommended Operator Action:</span>
                <p className="text-slate-200 text-xs">{lead.qualification.suggestedAction}</p>
              </div>
            </div>
          )}

          {/* TAB 3: CRM RECORD */}
          {activeTab === 'crm' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <Database className="w-4 h-4" />
                    <span>CRM & Google Sheets Integration Record</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Row #{lead.crmRecord.sheetRow}
                  </span>
                </div>
                <p className="text-slate-400 text-xs">
                  Target Destination: <strong className="text-slate-200">{lead.crmRecord.destination}</strong>
                </p>
              </div>

              {/* Data Table Preview */}
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Column Header</th>
                      <th className="py-2.5 px-3">Mapped Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    <tr>
                      <td className="py-2 px-3 text-slate-400">A: Lead_ID</td>
                      <td className="py-2 px-3 text-sky-300">{lead.id}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">B: Created_At</td>
                      <td className="py-2 px-3 text-slate-300">{lead.crmRecord.syncedAt}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">C: Business_Name</td>
                      <td className="py-2 px-3 text-white font-sans">{lead.formData.businessName}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">D: Contact_Name</td>
                      <td className="py-2 px-3 text-slate-300 font-sans">{lead.formData.name}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">E: Email</td>
                      <td className="py-2 px-3 text-sky-300">{lead.formData.email}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">F: WhatsApp</td>
                      <td className="py-2 px-3 text-slate-300">{lead.formData.whatsapp}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">G: Service</td>
                      <td className="py-2 px-3 text-slate-200 font-sans">{lead.formData.service}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">H: AI_Tier</td>
                      <td className="py-2 px-3 text-emerald-400">{lead.qualification.tier}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">I: AI_Score</td>
                      <td className="py-2 px-3 text-amber-400">{lead.qualification.score}/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: EMAIL RESPONSE */}
          {activeTab === 'email' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="space-y-1 pb-3 border-b border-slate-800 text-xs">
                  <div className="flex">
                    <span className="w-16 text-slate-400">To:</span>
                    <span className="text-white font-mono">{lead.emailResponse.recipient}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-slate-400">From:</span>
                    <span className="text-slate-300 font-mono">{lead.emailResponse.sender}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-slate-400">Subject:</span>
                    <span className="text-sky-300 font-semibold">{lead.emailResponse.subject}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed border border-slate-800/80">
                  {lead.emailResponse.body}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RAW PAYLOAD */}
          {activeTab === 'payload' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Exact JSON Webhook Payload</span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-xs font-mono text-slate-300 transition-colors"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-sky-300 overflow-x-auto max-h-80">
                {JSON.stringify(lead, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Recorded in session storage • Safe demo environment
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
