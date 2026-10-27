import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'n8n Workflow Automation',
    message: '',
    budget: '$2,000 - $5,000'
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    // Simulate submission delivery
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-[#0f172a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Let's automate your repetitive operations or build your next custom AI assistant
          </p>
        </div>

        {/* Main Contact Container */}
        <div className="max-w-5xl mx-auto bg-[#131d31] rounded-3xl border border-slate-800 p-6 sm:p-12 shadow-2xl shadow-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get In Touch Directly
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Have an automation concept or an existing workflow problem? Fill out the brief form or send an email. I typically respond in under 24 hours.
                </p>
              </div>

              {/* Status Badge */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{PERSONAL_INFO.status}</span>
                </div>
                <p className="text-xs text-slate-400">
                  Available for full workflow implementations, node fixes, and weekly consulting retainers.
                </p>
              </div>

              {/* Contact Method Items */}
              <div className="space-y-4 pt-2">
                {/* Email item */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Direct Email</div>
                      <a 
                        href={`mailto:${PERSONAL_INFO.email}`} 
                        className="text-xs sm:text-sm font-mono text-white hover:text-sky-300 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Location & Work Style</div>
                    <div className="text-xs sm:text-sm text-white">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

                {/* Response time */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Average Response Time</div>
                    <div className="text-xs sm:text-sm text-white">&lt; 24 Hours on Business Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-[#0b1120] p-6 sm:p-8 rounded-2xl border border-slate-800">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. I have received your project details and will review your requirements promptly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'n8n Workflow Automation',
                          message: '',
                          budget: '$2,000 - $5,000'
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="portfolio-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Type */}
                    <div>
                      <label htmlFor="contact-project-type" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Project / Solution Type
                      </label>
                      <select
                        id="contact-project-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                      >
                        <option value="n8n Workflow Automation">n8n Workflow Automation</option>
                        <option value="Custom AI Agent / Chatbot">Custom AI Agent / Chatbot</option>
                        <option value="WhatsApp Business Automation">WhatsApp Business Automation</option>
                        <option value="CRM & Lead Pipeline Sync">CRM & Lead Pipeline Sync</option>
                        <option value="Custom API / Webhook Integration">Custom API / Webhook Integration</option>
                        <option value="Consulting / Architecture Audit">Consulting / Architecture Audit</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Estimated Scope / Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                      >
                        <option value="Under $1,000">Under $1,000 (Quick Script / Fix)</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500 (Standard Workflow)</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000 (Multi-node System)</option>
                        <option value="$5,000+">$5,000+ (Enterprise Pipeline)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Describe Your Workflow or Challenge <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share what tools you use today (e.g. Google Sheets, HubSpot, Shopify) and what process you want automated..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Project Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
