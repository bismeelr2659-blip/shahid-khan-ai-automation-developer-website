import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bot, 
  Workflow, 
  Database, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Cpu,
  ChevronRight,
  ExternalLink,
  Send,
  Home
} from 'lucide-react';
import { ServiceDetail, SERVICES_DATA } from '../data/servicesData';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ServicePageProps {
  service: ServiceDetail;
  onNavigate: (slug: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service, onNavigate }) => {
  useEffect(() => {
    // Dynamic document title matching requested requirement
    document.title = `${service.title} | AI Automation Agency`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  const otherServices = SERVICES_DATA.filter((item) => item.slug !== service.slug);

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

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('');
  };

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('');
    setTimeout(() => {
      const el = document.getElementById('lead-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="service-page min-h-screen bg-[#0b1120] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Top Header / Breadcrumb Bar */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <a 
              href="/"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-slate-800"
            >
              <Home className="w-4 h-4 text-sky-400" />
              <span>Home</span>
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500">Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-400 font-medium truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </nav>

          {/* Quick CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              onClick={handleConsultationClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-800/80">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Badge & Quick Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{service.badge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Typical Timeline: {service.timeline}</span>
            </div>
            <span className="text-xs text-slate-500">
              Shahid Khan • AI Automation Developer
            </span>
          </div>

          {/* Title (h1) & Description (p) as specified in prompt */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#131d31] border border-slate-700 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/10">
                {getServiceIcon(service.iconName)}
              </div>
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="mt-3 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
                  {service.description}
                </p>
              </div>
            </div>
          </div>

          {/* Key Value Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
            {service.keyBenefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-[#131d31]/80 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 leading-normal">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/#contact"
              onClick={handleConsultationClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/#lead-demo"
              onClick={handleDemoClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Test Live Lead Capture Demo</span>
            </a>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Section 2: How We Help Businesses (Exact user requirements) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Implementation Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How We Help Businesses
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              A structured 4-step delivery pipeline engineered to turn repetitive bottlenecks into high-reliability automation engines.
            </p>
          </div>

          {/* The Exact 4 Steps Displayed with Depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.howWeHelp.map((item) => (
              <div 
                key={item.step}
                className="bg-[#131d31] p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950 px-2.5 py-1 rounded-md border border-sky-800/60">
                      Step {item.step}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">Process Milestone</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-sky-400 font-semibold shrink-0">Focus:</span>
                  <span>{item.actionDetail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simple bulleted semantic list as requested in prompt */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Core Engagement Steps at a Glance:
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Analyze repetitive business tasks.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Design an appropriate automation workflow.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Integrate compatible tools and APIs.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Test the workflow before deployment.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Sample Workflow Architecture Blueprint */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Sample Production Node Architecture
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Typical workflow stages orchestrated in n8n for {service.title}
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60 self-start sm:self-auto">
              Sub-second Execution
            </span>
          </div>

          {/* Node Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {service.sampleWorkflow.map((node) => (
              <div 
                key={node.nodeNumber}
                className="bg-[#131d31] p-4 rounded-xl border border-slate-800 space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-sky-400 font-bold">Node 0{node.nodeNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px]">
                    {node.role}
                  </span>
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  {node.title}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {node.description}
                </p>
              </div>
            ))}
          </div>

          {/* Deliverables & Technologies Used */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#131d31] p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>What's Included in Every Project</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {service.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#131d31] p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Supported Technologies & APIs</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {service.techStack.map((tech, i) => (
                  <span 
                    key={i}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-sky-300 border border-slate-700/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Best fit for: </strong>
                {service.idealFor}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Request a Consultation Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#131d31] to-slate-900 p-8 rounded-2xl border border-sky-500/30 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Automate Your Stack?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a custom {service.title} project in mind?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Book a 20-minute technical discovery session with Shahid Khan to audit your current manual bottlenecks and map out an automation blueprint.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/#contact"
              onClick={handleConsultationClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>Email: {PERSONAL_INFO.email}</span>
            </a>
          </div>
        </section>

        {/* Section 5: Explore Other Services (Exact user requirements) */}
        <section className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Explore Other Services
            </h2>
            <a
              href="/"
              onClick={handleHomeClick}
              className="text-xs text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherServices.map((item) => (
              <article 
                key={item.slug}
                className="bg-[#131d31] p-5 rounded-xl border border-slate-800 hover:border-sky-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {getServiceIcon(item.iconName)}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                        <a 
                          href={`/${item.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(item.slug);
                          }}
                        >
                          {item.title}
                        </a>
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {item.timeline}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    /{item.slug}
                  </span>
                  <a
                    href={`/${item.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.slug);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-white">Shahid Khan</span>
            <span>•</span>
            <span>AI Automation Developer</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" onClick={handleHomeClick} className="hover:text-sky-400 transition-colors">Home</a>
            <a href="/#lead-demo" onClick={handleDemoClick} className="hover:text-sky-400 transition-colors">Live Demo</a>
            <a href="/#contact" onClick={handleConsultationClick} className="hover:text-sky-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  );
};
