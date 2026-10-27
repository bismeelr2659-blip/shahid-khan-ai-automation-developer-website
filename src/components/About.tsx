import React from 'react';
import { 
  Bot, 
  Workflow, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Workflow,
      title: 'Practical, Real-World Logic',
      desc: 'No theoretical toys. Every workflow is built around real operational bottlenecks, automating hours of manual data copying and client follow-ups.'
    },
    {
      icon: ShieldCheck,
      title: 'Error Handling & Resilience',
      desc: 'Workflows fail when external APIs change. I build multi-tier fallback nodes, validation checks, and automatic alert escalations so pipelines never silently break.'
    },
    {
      icon: Bot,
      title: 'Grounded AI, Zero Fluff',
      desc: 'Prompt engineering designed to eliminate hallucinations. I configure strict system constraints, temperature controls, and context injection.'
    },
    {
      icon: Zap,
      title: 'Cost & Token Efficiency',
      desc: 'Smart routing to use the right model for the right task (e.g. lightweight models for categorization, high-reasoning models only when required).'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0b1120] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Practical AI Solutions & Workflow Design
          </p>
        </div>

        {/* Main About Card */}
        <div className="max-w-4xl mx-auto bg-[#131d31] rounded-2xl border border-slate-700/80 p-6 sm:p-10 shadow-xl shadow-black/30 backdrop-blur-sm mb-12">
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {PERSONAL_INFO.aboutText.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'text-slate-100 font-medium' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Core Stack: n8n, Gemini API, Webhooks, Node.js & Meta Cloud APIs</span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              <span>Discuss a project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Engineering Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={i}
                className="bg-slate-900/60 rounded-xl p-6 border border-slate-800 hover:border-sky-500/40 transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 group-hover:bg-sky-500/20 group-hover:scale-110 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
