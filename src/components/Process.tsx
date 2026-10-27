import React from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Code2, 
  CheckCircle, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const Process: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return <Search className="w-5 h-5 text-sky-400" />;
      case 1: return <Layers className="w-5 h-5 text-indigo-400" />;
      case 2: return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 3: return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-[#0b1120] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Execution Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Work
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            A battle-tested 4-step engineering process designed to eliminate risks and deliver stable automations
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.stepNumber}
              className="bg-[#131d31] rounded-2xl border border-slate-800 hover:border-sky-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/20 group relative overflow-hidden"
            >
              {/* Giant Step Number in Background */}
              <div className="absolute top-2 right-4 text-6xl font-extrabold text-slate-800/40 font-mono select-none group-hover:text-sky-500/10 transition-colors">
                {step.stepNumber}
              </div>

              <div>
                {/* Step Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getStepIcon(index)}
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                    Step {step.stepNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Deliverables List & Timeline */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Key Milestones
                </div>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {step.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1.5 pt-2 text-[11px] font-mono text-slate-500">
                  <Clock className="w-3 h-3 text-sky-400" />
                  <span>Duration: {step.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
