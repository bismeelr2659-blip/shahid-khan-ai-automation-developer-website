import React from 'react';
import { 
  Bot, 
  ArrowUp, 
  Mail, 
  Github, 
  Linkedin, 
  Smartphone, 
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SERVICES_DATA } from '../data/servicesData';

interface FooterProps {
  onNavigateService?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateService }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Live Demo', href: '#lead-demo' },
    { label: 'Benefits', href: '#automation-benefits' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleServiceClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateService) {
      onNavigateService(slug);
    } else {
      window.location.href = `/${slug}`;
    }
  };

  return (
    <footer className="bg-[#0b1120] border-t border-slate-800/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid: Brand, Navigation, Services */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-slate-950 font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Shahid Khan<span className="text-sky-400">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              AI Automation Developer designing practical n8n workflows, custom chatbots, and intelligent business pipelines.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white font-mono">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </div>
            <nav className="flex flex-col space-y-2 text-xs text-slate-400">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="hover:text-sky-400 transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Dedicated Service Pages (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Dedicated Service Pages</span>
            </div>
            <div className="flex flex-col space-y-2 text-xs">
              {SERVICES_DATA.map((srv) => (
                <a
                  key={srv.slug}
                  href={`/${srv.slug}`}
                  onClick={(e) => handleServiceClick(srv.slug, e)}
                  className="text-slate-400 hover:text-sky-300 transition-colors flex items-center justify-between group py-0.5"
                >
                  <span>{srv.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Shahid Khan. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Built with React, Tailwind CSS & n8n logic</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="text-sky-400">Practical AI</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              id="back-to-top-btn"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-400 hover:text-white transition-all group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
