import React, { useState } from 'react';
import { 
  ArrowRight, 
  Bot, 
  Workflow, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Terminal, 
  ExternalLink,
  Cpu,
  Database,
  Send,
  Copy,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenLiveDemo: (demoType: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenLiveDemo }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'flow' | 'terminal'>('flow');
  const [simulatedExecution, setSimulatedExecution] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleRunQuickTest = () => {
    setSimulatedExecution(true);
    setTimeout(() => {
      setSimulatedExecution(false);
    }, 2800);
  };

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0b1120]"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-xs sm:text-sm font-medium shadow-sm shadow-sky-950">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>{PERSONAL_INFO.role}</span>
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              <span className="text-slate-400">n8n & AI Agent Specialist</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              I Build Practical{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
                AI Automation
              </span>{' '}
              Solutions
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {PERSONAL_INFO.subheading}
            </p>

            {/* Buttons & Direct Action */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#lead-demo"
                id="hero-live-demo-cta-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Test Live Lead Automation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                id="hero-view-projects-btn"
                onClick={onExploreProjects}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-0.5"
              >
                <span>View Portfolio Projects</span>
              </a>

              <button
                type="button"
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-xs font-mono text-slate-400 hover:text-sky-300 border border-slate-800 transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-sans">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Proof Stats Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/60 text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono text-sky-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Profile & Live Automation Dashboard Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container */}
              <div className="bg-[#131d31] rounded-2xl border border-slate-700/80 shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl">
                
                {/* Card Header & Profile Identity */}
                <div className="p-5 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* Stylized Profile Avatar with Tech Ring */}
                      <div className="w-13 h-13 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-sky-500/20">
                        <div className="w-full h-full rounded-[10px] bg-slate-900 flex flex-col items-center justify-center text-white">
                          <span className="font-extrabold text-base tracking-wider text-sky-400">SK</span>
                        </div>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-base">Shahid Khan</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">
                          DEV
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        AI & n8n Architect
                      </p>
                    </div>
                  </div>

                  {/* Switchable View Tabs */}
                  <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('flow')}
                      className={`px-2.5 py-1 rounded font-medium transition-all ${
                        activeTab === 'flow'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Visual Flow
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('terminal')}
                      className={`px-2.5 py-1 rounded font-medium transition-all ${
                        activeTab === 'terminal'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Terminal
                    </button>
                  </div>
                </div>

                {/* Card Body: Interactive Live Architecture */}
                <div className="p-5">
                  {activeTab === 'flow' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-slate-300">Live Automation Pipeline</span>
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Engine Ready
                        </span>
                      </div>

                      {/* Micro Node Graph */}
                      <div className="space-y-2.5 relative">
                        {/* Step 1 */}
                        <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                          simulatedExecution ? 'bg-sky-500/10 border-sky-500/50' : 'bg-slate-900/70 border-slate-800'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">Webhook Receiver</div>
                              <div className="text-[11px] text-slate-400">POST /api/v1/lead-intake</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            200 OK
                          </span>
                        </div>

                        {/* Step 2 */}
                        <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                          simulatedExecution ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-slate-900/70 border-slate-800'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">Gemini LLM Classifier</div>
                              <div className="text-[11px] text-slate-400">Intent analysis & data extraction</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                            AI Node
                          </span>
                        </div>

                        {/* Step 3 */}
                        <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                          simulatedExecution ? 'bg-sky-500/10 border-sky-500/50' : 'bg-slate-900/70 border-slate-800'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center">
                              <Database className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">CRM & Google Sheets</div>
                              <div className="text-[11px] text-slate-400">Deduplicate & sync customer row</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Synced
                          </span>
                        </div>

                        {/* Step 4 */}
                        <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                          simulatedExecution ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-900/70 border-slate-800'
                        }`}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                              <Send className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">WhatsApp Notification</div>
                              <div className="text-[11px] text-slate-400">Direct message alert dispatched</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            Delivered
                          </span>
                        </div>
                      </div>

                      {/* Interactive Trigger Button */}
                      <button
                        type="button"
                        id="hero-test-pipeline-btn"
                        onClick={handleRunQuickTest}
                        disabled={simulatedExecution}
                        className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-xs font-medium text-sky-300 border border-sky-500/30 flex items-center justify-center gap-2 transition-all"
                      >
                        {simulatedExecution ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                            <span>Simulating Payload Execution...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>Run Test Automation Pulse</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    /* Terminal View */
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs space-y-2 text-slate-300 overflow-x-auto">
                      <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-900">
                        <span>n8n-worker-cluster: active</span>
                        <span>node v20.11</span>
                      </div>
                      <p className="text-emerald-400">$ n8n execute --workflow=lead-ai-enricher</p>
                      <p className="text-slate-400">[info] Webhook triggered by endpoint /intake</p>
                      <p className="text-slate-400">[ai] Gemini-1.5 token prompt sent (412 tokens)</p>
                      <p className="text-sky-400">[intent] Classified as "Enterprise Automation"</p>
                      <p className="text-slate-400">[db] Row created in Google Sheets ID: 1k9F...39</p>
                      <p className="text-emerald-400">✓ Status: Execution #4892 completed in 480ms</p>
                    </div>
                  )}
                </div>

                {/* Card Footer: Quick Action links to Live Project Demos */}
                <div className="px-5 py-3.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs">
                  <a
                    href="#lead-demo"
                    className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Run Full Lead Capture Demo</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenLiveDemo('chatbot')}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 font-medium"
                  >
                    <span>Try Chatbot Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
