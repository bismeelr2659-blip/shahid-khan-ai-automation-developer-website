import React from 'react';
import { 
  Zap, 
  Bot, 
  Database, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Workflow, 
  ShieldCheck, 
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';

export const AutomationBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-400/10 border-amber-400/20',
      title: 'Captures Leads Automatically',
      highlight: 'Zero Lead Leakage',
      description: 'Incoming website inquiries, webhooks, or chat queries are caught instantly 24/7 without requiring manual human monitoring. Every prospect payload is validated, formatted, and ingested in milliseconds.',
      features: [
        'Instant webhook triggers with sub-second receipt',
        'Validates inputs (email, phone, business name)',
        'Guaranteed uptime with automated retry logic'
      ]
    },
    {
      icon: Bot,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10 border-indigo-400/20',
      title: 'Qualifies Leads with AI',
      highlight: 'Contextual Intelligence',
      description: 'Rather than basic keyword matching, LLMs (Gemini / Claude) analyze project depth, assess buying intent, calculate a suitability score (Tier A/B/C), and draft actionable next steps for your team.',
      features: [
        'Analyzes project scope and technical complexity',
        'Detects corporate email domains & buyer readiness',
        'Routes urgent high-priority deals to instant notifications'
      ]
    },
    {
      icon: Database,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10 border-emerald-400/20',
      title: 'Saves Leads to CRM / Google Sheets',
      highlight: 'Structured Central Source of Truth',
      description: 'Lead records are immediately deduplicated and synced into your database—whether that is Google Sheets, Airtable, HubSpot, or a relational SQL database—keeping sales records pristine.',
      features: [
        'Deduplicates records by email to avoid double contacts',
        'Maps AI scores, raw inquiry, and status fields',
        'Creates audit logs and sync timestamps automatically'
      ]
    },
    {
      icon: Mail,
      iconColor: 'text-sky-400',
      bgColor: 'bg-sky-400/10 border-sky-400/20',
      title: 'Sends Automatic Follow-ups',
      highlight: 'Speed to Lead Advantage',
      description: 'Inbound inquiries receive immediate, personalized email and WhatsApp confirmations within seconds of submitting. Prospects receive relevant information while their intent is at its peak.',
      features: [
        'Dynamically drafts responses tailored to specific service',
        'Includes calendar links or intake questionnaires',
        'Prevents lost deals due to delayed manual replies'
      ]
    },
    {
      icon: Clock,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-400/10 border-purple-400/20',
      title: 'Reduces Manual Work',
      highlight: 'Team Focus on Closing',
      description: 'Eliminates repetitive copy-pasting between web forms, spreadsheets, and inbox drafts. Your operational team only intervenes when a qualified, high-intent lead is ready for conversation.',
      features: [
        'Removes manual spreadsheet copy-pasting entirely',
        'Replaces routine sorting with deterministic rule nodes',
        'Standardizes follow-up quality across all inquiries'
      ]
    }
  ];

  return (
    <section 
      id="automation-benefits" 
      className="py-20 md:py-28 bg-[#0b1120] relative border-t border-slate-800/80 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5 text-sky-400" />
            <span>OPERATIONAL VALUE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How This Automation Helps Businesses
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            A breakdown of why end-to-end automation transforms inbound operations from slow, fragmented manual handling into a seamless, 24/7 lead intake engine.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-[#131d31] p-6 rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg shadow-black/40 ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Icon & Highlight Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${benefit.bgColor} ${benefit.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                      {benefit.highlight}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                </div>

                {/* Sub Features */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  {benefit.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Flow Summary Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-[#131d31] to-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Want to implement this workflow in your business?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every automation is tailored to your exact stack (n8n, Make, custom Webhooks, Gemini API, or Google Workspace).
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs shrink-0 shadow-md shadow-sky-500/20 transition-all hover:-translate-y-0.5"
          >
            <span>Discuss Your Workflow</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
