import React from 'react';
import { 
  Bot, 
  Workflow, 
  Database, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { SERVICES_DATA, ServiceDetail } from '../data/servicesData';

interface ServicesProps {
  onNavigateService?: (slug: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigateService }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-sky-400" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-indigo-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case 'Database': return <Database className="w-6 h-6 text-cyan-400" />;
      default: return <Workflow className="w-6 h-6 text-sky-400" />;
    }
  };

  const handleServiceClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateService) {
      onNavigateService(slug);
    } else {
      window.location.href = `/${slug}`;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0f172a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Solutions & Specialized Scopes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Automation Services
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Practical AI agents and workflow architectures engineered for reliability, speed, and measurable ROI
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.slug}
              id={`service-card-${service.slug}`}
              className="bg-[#131d31] rounded-2xl border border-slate-800 hover:border-sky-500/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/20 group"
            >
              <div>
                {/* Top Icon and Timeline Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  <a
                    href={`/${service.slug}`}
                    onClick={(e) => handleServiceClick(service.slug, e)}
                  >
                    {service.title}
                  </a>
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables List */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Core Capabilities
                  </div>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Links */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                <a
                  href={`/${service.slug}`}
                  onClick={(e) => handleServiceClick(service.slug, e)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold text-xs border border-sky-500/30 hover:border-transparent flex items-center justify-center gap-2 transition-all group/btn"
                >
                  <span>Explore Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className="w-full py-2 px-3 rounded-lg text-slate-400 hover:text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Direct Consultation Request</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
