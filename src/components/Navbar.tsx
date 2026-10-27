import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'lead-demo', 'automation-benefits', 'projects', 'services', 'process', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Live Demo', href: '#lead-demo', id: 'lead-demo', isSpecial: true },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20 py-3'
          : 'bg-[#0f172a]/70 backdrop-blur-sm border-b border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="brand-logo"
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Shahid Khan
              <span className="text-sky-400 animate-pulse">.</span>
            </span>
            <span className="block text-[11px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
              AI Automation Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                id={`nav-link-${link.id}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-sky-400 bg-sky-500/10'
                    : link.isSpecial
                    ? 'text-sky-300 hover:text-white bg-sky-500/5 hover:bg-sky-500/15 border border-sky-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.isSpecial && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                )}
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Status Pill & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>Open for Work</span>
          </div>
          <a
            href="#contact"
            id="nav-hire-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 text-sm font-semibold shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 mb-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PERSONAL_INFO.status}</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={`mobile-link-${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                activeSection === link.id
                  ? 'text-sky-400 bg-sky-500/10'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              id="mobile-hire-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-400 text-slate-950 font-semibold text-center shadow-lg shadow-sky-400/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Contact Shahid</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
