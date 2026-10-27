import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Smartphone, 
  Workflow, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Check, 
  FileText, 
  Mail, 
  Clock, 
  User, 
  ArrowRight,
  Code,
  Layers,
  Info
} from 'lucide-react';
import { Project } from '../types';

interface ProjectDemoModalProps {
  project: Project | null;
  mode: 'demo' | 'code';
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, mode, onClose }) => {
  if (!project) return null;

  // Active view toggle in modal
  const [viewMode, setViewMode] = useState<'demo' | 'code'>(mode);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; citations?: string[] }>>([
    {
      sender: 'bot',
      text: 'Hello! I am the automated customer support assistant for Apex Solutions. How can I help you today?',
      time: '10:00 AM'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // WhatsApp Simulator State
  const [whatsappEvents, setWhatsappEvents] = useState<Array<{ text: string; time: string; status: 'sent' | 'delivered' | 'read' }>>([
    {
      text: '📦 *Order #AX-9428 Shipped!*\nYour package is in transit with DHL Express.\nEstimated arrival: *Tomorrow by 4:00 PM*.',
      time: '10:14 AM',
      status: 'read'
    }
  ]);

  // n8n Workflow Simulator State
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [executionOutput, setExecutionOutput] = useState<any>(null);
  const [leadForm, setLeadForm] = useState({ name: 'Sarah Jenkins', email: 'sarah@enterprise.io', budget: '$5,000+' });

  // Research Agent State
  const [researchTopic, setResearchTopic] = useState('Enterprise AI Workflow Adoption');
  const [agentStep, setAgentStep] = useState(0);
  const [agentRunning, setAgentRunning] = useState(false);
  const [researchReport, setResearchReport] = useState<string | null>(null);

  // Email Responder State
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(0);
  const [emailApproved, setEmailApproved] = useState(false);

  const sampleEmails = [
    {
      from: 'alex.chen@fintech.co',
      subject: 'Inquiry regarding n8n enterprise workflows and pricing',
      date: '10 mins ago',
      body: 'Hi team, We are looking to replace our Zapier bills with a self-hosted n8n cluster. Do you offer deployment and custom node development? What is your typical turnaround time?',
      category: 'Sales / High Intent',
      urgency: 'HIGH',
      sentiment: 'Curious & Interested',
      draftReply: 'Hi Alex,\n\nThanks for reaching out! Yes, I specialize in architecting production n8n workflows and self-hosted instances. For an enterprise migration, typical delivery is 5–8 business days including failover testing and staff handover.\n\nCould we jump on a brief 15-minute call this Thursday to review your current Zapier volume?\n\nBest regards,\nShahid Khan\nAI Automation Developer'
    },
    {
      from: 'marcus@retailgroup.net',
      subject: 'Urgent: Webhook payload failing with 401 error',
      date: '35 mins ago',
      body: 'Our Shopify order webhook is returning an authentication failed response to our inventory database since 8 AM today. Need immediate assistance.',
      category: 'Technical Support',
      urgency: 'CRITICAL',
      sentiment: 'Frustrated / Urgent',
      draftReply: 'Hi Marcus,\n\nI have received your alert. 401 indicates an expired HMAC secret token on the Shopify webhook listener header. I have initiated the key rotation protocol and verified the endpoint signature.\n\nPlease check your n8n workflow credentials tab and re-save the bearer token.\n\nStanding by for confirmation,\nShahid'
    }
  ];

  // Chatbot send handler
  const handleSendChat = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'user' as const, text: query, time: timeString };
    setChatMessages(prev => [...prev, newMsg]);
    if (!textToSend) setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      let botReply = "I've logged your request into our CRM ticketing system. A specialist will follow up shortly.";
      let citations: string[] = ['Company Knowledge Base: FAQ_2026.pdf'];

      const lower = query.toLowerCase();
      if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('ship')) {
        botReply = "Standard shipping takes 2-4 business days, while Express courier arrives within 24-48 hours. Tracking details are automatically pushed to your email and WhatsApp.";
        citations = ['KB: Shipping_Policy_v4.pdf'];
      } else if (lower.includes('return') || lower.includes('refund')) {
        botReply = "We offer a 30-day no-questions-asked refund policy. Items must be in original condition with packaging intact. You can generate a prepaid return label through our portal.";
        citations = ['KB: Returns_Exchanges_Doc.pdf'];
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('person')) {
        botReply = "I have flagged this conversation for human transfer. Senior Automation Support Specialist Shahid Khan has been notified and will take over.";
        citations = ['System: Human_Escalation_Protocol.json'];
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('quote')) {
        botReply = "Automation workflows start with modular fixed-price deliverables or custom retainer scopes. You can schedule a direct discovery consultation via the contact form!";
        citations = ['KB: Service_Catalogue_Q3.pdf'];
      }

      setChatMessages(prev => [
        ...prev, 
        { sender: 'bot', text: botReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), citations }
      ]);
      setIsBotTyping(false);
    }, 900);
  };

  // WhatsApp send handler
  const triggerWhatsAppEvent = (type: 'payment' | 'booking' | 'otp') => {
    let msg = '';
    if (type === 'payment') {
      msg = '💳 *Payment Received: $450.00 USD*\nInvoice: #INV-2026-88\nService: n8n Lead Pipeline Setup\nStatus: *Completed & Logged*';
    } else if (type === 'booking') {
      msg = '📅 *Discovery Call Confirmed*\nDate: Thursday, Sept 18\nTime: 11:30 AM EST\nGoogle Meet: meet.google.com/xyz-auto';
    } else {
      msg = '🔐 *Verification Code: 839-204*\nDo not share this code with anyone. Expires in 10 minutes.';
    }

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWhatsappEvents(prev => [...prev, { text: msg, time: timeString, status: 'delivered' }]);
  };

  // n8n workflow execution handler
  const runWorkflowSimulation = () => {
    if (workflowRunning) return;
    setWorkflowRunning(true);
    setActiveNodeIndex(0);
    setExecutionOutput(null);

    // Step 1: Webhook
    setTimeout(() => {
      setActiveNodeIndex(1);
    }, 700);

    // Step 2: Validator & AI
    setTimeout(() => {
      setActiveNodeIndex(2);
    }, 1400);

    // Step 3: Google Sheets
    setTimeout(() => {
      setActiveNodeIndex(3);
    }, 2100);

    // Step 4: Finished
    setTimeout(() => {
      setWorkflowRunning(false);
      setActiveNodeIndex(4);
      setExecutionOutput({
        status: 'SUCCESS',
        leadId: 'LD-' + Math.floor(1000 + Math.random() * 9000),
        leadScore: leadForm.budget === '$5,000+' ? 95 : 75,
        priority: leadForm.budget === '$5,000+' ? 'TIER_1_ENTERPRISE' : 'TIER_2_STANDARD',
        sheetRowAppended: 142,
        alertDispatched: 'Slack #leads-high-priority & Email Notification'
      });
    }, 2900);
  };

  // Research Agent simulation
  const runResearchAgent = () => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(1);
    setResearchReport(null);

    setTimeout(() => setAgentStep(2), 1000);
    setTimeout(() => setAgentStep(3), 2000);
    setTimeout(() => {
      setAgentStep(4);
      setAgentRunning(false);
      setResearchReport(`### Executive Briefing: ${researchTopic}
**Generated on**: ${new Date().toLocaleDateString()} | **Agent Model**: Gemini-1.5-Pro

1. **Mass Transition from Cloud SaaS to Self-Hosted n8n**
   - *Key Trend*: Organizations are reducing Zapier/Make expenses by 60%+ by deploying self-hosted n8n on Docker/Cloud Run with private database storage.
   - *Action Item*: Standardize template library for enterprise CRM webhooks.

2. **Grounded RAG Replacing Generic Chatbots**
   - *Key Trend*: Businesses reject hallucinating bots in favor of vector-indexed knowledge bases with verified citation references and strict tone guardrails.

3. **Autonomous Agent Multi-Step Orchestration**
   - *Key Trend*: Workflows now combine deterministic code nodes (data cleanliness) with nondeterministic LLM nodes (summarization, extraction).`);
    }, 3200);
  };

  return (
    <div 
      id="project-demo-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#131d31] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {project.title}
                </h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${project.badgeColor || 'border-sky-500/30 text-sky-400 bg-sky-500/10'}`}>
                  {project.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {project.shortDesc}
              </p>
            </div>
          </div>

          {/* Controls: Mode Switcher & Close */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex text-xs">
              <button
                type="button"
                onClick={() => setViewMode('demo')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  viewMode === 'demo'
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Demo
              </button>
              <button
                type="button"
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  viewMode === 'code'
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Architecture & Code
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {viewMode === 'demo' ? (
            /* ================= INTERACTIVE DEMO VIEW ================= */
            <div>
              {project.demoType === 'chatbot' && (
                <div className="space-y-4">
                  <div className="bg-sky-950/30 border border-sky-500/20 p-3 rounded-lg text-xs text-sky-300 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Interactive AI Chatbot Demo:</strong> Try asking customer questions below or click preset prompts. The model retrieves context from the simulated knowledge base and crafts verified responses.
                    </span>
                  </div>

                  {/* Preset prompt pills */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSendChat('What are your delivery times?')}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      "What are your delivery times?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendChat('What is your refund policy?')}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      "What is your refund policy?"
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendChat('I want to speak with a human support agent.')}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      "Speak with a human agent"
                    </button>
                  </div>

                  {/* Chat Container */}
                  <div className="bg-[#0b1120] rounded-xl border border-slate-800 p-4 h-[320px] overflow-y-auto space-y-3 flex flex-col justify-between">
                    <div className="space-y-3 overflow-y-auto pr-1">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.sender === 'bot' && (
                            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4" />
                            </div>
                          )}
                          <div className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-sky-500 text-slate-950 font-medium'
                              : 'bg-slate-800 text-slate-200 border border-slate-700/80'
                          }`}>
                            <p>{msg.text}</p>
                            {msg.citations && (
                              <div className="mt-2 pt-2 border-t border-slate-700/60 text-[10px] text-sky-400 font-mono">
                                📚 {msg.citations.join(' • ')}
                              </div>
                            )}
                            <div className={`text-[9px] mt-1 text-right ${
                              msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                            }`}>
                              {msg.time}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isBotTyping && (
                        <div className="flex gap-2.5 items-center text-xs text-slate-400">
                          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="flex gap-1 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-200" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input Field */}
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
                      className="flex gap-2 pt-2 border-t border-slate-800"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a support question (e.g. returns, hours, quotes)..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || isBotTyping}
                        className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {project.demoType === 'whatsapp' && (
                <div className="space-y-4">
                  <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-lg text-xs text-emerald-300 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>WhatsApp API Webhook Simulator:</strong> Click the trigger buttons below to simulate incoming webhook events (Stripe, booking calendar, OTP) dispatched directly through the WhatsApp Cloud API.
                    </span>
                  </div>

                  {/* Trigger Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => triggerWhatsAppEvent('payment')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-colors"
                    >
                      Trigger "Payment Received" ($450)
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerWhatsAppEvent('booking')}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-medium transition-colors"
                    >
                      Trigger "Discovery Call Reminder"
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerWhatsAppEvent('otp')}
                      className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-medium transition-colors"
                    >
                      Trigger "Security OTP"
                    </button>
                  </div>

                  {/* Phone Simulator Card */}
                  <div className="max-w-md mx-auto bg-[#0b141a] rounded-2xl border-4 border-slate-700 overflow-hidden shadow-2xl">
                    {/* WhatsApp Top Bar */}
                    <div className="bg-[#1f2c34] p-3 flex items-center justify-between text-white border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-slate-950">
                          SK
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1">
                            <span>Shahid Khan Automation</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <div className="text-[10px] text-slate-400">Official Business Account</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">ENCRYPTED</span>
                    </div>

                    {/* Messages Container */}
                    <div className="p-4 space-y-3 h-[260px] overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                      {whatsappEvents.map((msg, i) => (
                        <div key={i} className="flex justify-end">
                          <div className="max-w-[85%] bg-[#005c4b] text-white p-3 rounded-lg rounded-tr-none text-xs leading-relaxed shadow">
                            <p className="whitespace-pre-line">{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-300">
                              <span>{msg.time}</span>
                              <span className="text-sky-300">✓✓</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 bg-[#1f2c34] text-[11px] text-center text-slate-400 border-t border-slate-800">
                      Automated 2-way webhook responder active
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'n8n-workflow' && (
                <div className="space-y-4">
                  <div className="bg-sky-950/30 border border-sky-500/20 p-3 rounded-lg text-xs text-sky-300 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>n8n Lead Sync Simulator:</strong> Modify sample lead details and press "Execute Workflow". Watch real-time node illumination, data scoring, and sheet synchronization.
                    </span>
                  </div>

                  {/* Sample Input Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Prospect Name</label>
                      <input
                        type="text"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Corporate Email</label>
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Project Budget</label>
                      <select
                        value={leadForm.budget}
                        onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                      >
                        <option value="$5,000+">$5,000+ (Enterprise)</option>
                        <option value="$2,000 - $5,000">$2,000 - $5,000 (Standard)</option>
                        <option value="Under $2,000">Under $2,000 (Basic)</option>
                      </select>
                    </div>
                  </div>

                  {/* Visual Node Flow */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { title: '1. Webhook Intake', desc: 'POST /v1/intake' },
                      { title: '2. Scoring & Dedup', desc: 'JS Function Node' },
                      { title: '3. Sheets Append', desc: 'Google Sheets v4' },
                      { title: '4. Instant Alert', desc: 'Slack & Email Push' }
                    ].map((step, idx) => {
                      const isActive = activeNodeIndex === idx;
                      const isDone = activeNodeIndex > idx;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            isActive
                              ? 'bg-sky-500/20 border-sky-400 ring-2 ring-sky-400/40 text-white'
                              : isDone
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-center gap-1 mb-1">
                            {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            <span>{step.title}</span>
                          </div>
                          <div className="text-[11px] opacity-80">{step.desc}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Execution Button */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={runWorkflowSimulation}
                      disabled={workflowRunning}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/20"
                    >
                      {workflowRunning ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Processing n8n Nodes...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Execute Workflow</span>
                        </>
                      )}
                    </button>

                    {executionOutput && (
                      <span className="text-xs text-emerald-400 font-mono font-medium">
                        ✓ Execution completed in 620ms
                      </span>
                    )}
                  </div>

                  {/* Result Payload JSON */}
                  {executionOutput && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <div className="text-slate-500 pb-1 border-b border-slate-900">
                        // Output Payload
                      </div>
                      <pre className="text-emerald-400">{JSON.stringify(executionOutput, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}

              {project.demoType === 'research-agent' && (
                <div className="space-y-4">
                  <div className="bg-purple-950/30 border border-purple-500/20 p-3 rounded-lg text-xs text-purple-300 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Autonomous Research Agent:</strong> The agent loops through: planning search queries, scraping web sources, ranking information density, and producing a structured executive report.
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={researchTopic}
                      onChange={(e) => setResearchTopic(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                      placeholder="Enter research topic..."
                    />
                    <button
                      type="button"
                      onClick={runResearchAgent}
                      disabled={agentRunning}
                      className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {agentRunning ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Agent Running...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Run Agent</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Agent Progress Pipeline */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[
                      { step: 1, label: '1. Plan Queries' },
                      { step: 2, label: '2. Scrape Feeds' },
                      { step: 3, label: '3. Filter Noise' },
                      { step: 4, label: '4. Synthesize' }
                    ].map((s) => (
                      <div
                        key={s.step}
                        className={`p-2 rounded border text-center transition-all ${
                          agentStep >= s.step
                            ? 'bg-purple-950/40 border-purple-400 text-purple-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>

                  {/* Output Briefing */}
                  {researchReport && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed">
                      {researchReport}
                    </div>
                  )}
                </div>
              )}

              {project.demoType === 'email-responder' && (
                <div className="space-y-4">
                  <div className="bg-sky-950/30 border border-sky-500/20 p-3 rounded-lg text-xs text-sky-300 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Intelligent Email Responder:</strong> Select an incoming email to view AI classification, sentiment tags, and the drafted response ready for 1-click human verification.
                    </span>
                  </div>

                  {/* Email Selector Tabs */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {sampleEmails.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => { setSelectedEmailIndex(idx); setEmailApproved(false); }}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          selectedEmailIndex === idx
                            ? 'bg-slate-800 border-sky-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-semibold text-slate-200 truncate">{item.subject}</div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                          <span>{item.from}</span>
                          <span className="text-sky-400">{item.urgency}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Detail & AI Draft */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-500">From: </span>
                        <span className="text-slate-300 font-mono">{sampleEmails[selectedEmailIndex].from}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 text-[10px]">
                          {sampleEmails[selectedEmailIndex].category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
                          Sentiment: {sampleEmails[selectedEmailIndex].sentiment}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg text-xs text-slate-300 italic border border-slate-800/80">
                      "{sampleEmails[selectedEmailIndex].body}"
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-sky-400 flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5" />
                          AI Context-Aware Draft
                        </span>
                        <span className="text-[11px] text-slate-400">Grounded with FAQ knowledge</span>
                      </div>
                      <div className="bg-[#101929] p-3 rounded-lg text-xs text-slate-200 font-mono whitespace-pre-line border border-slate-800">
                        {sampleEmails[selectedEmailIndex].draftReply}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-400">
                        Human-in-the-loop: Review before dispatch
                      </span>
                      <button
                        type="button"
                        onClick={() => setEmailApproved(true)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          emailApproved
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                        }`}
                      >
                        {emailApproved ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Draft Approved & Queued</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Approve & Send Draft</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'social-automation' && (
                <div className="space-y-4">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-lg text-xs text-indigo-300 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Cross-Platform Social Automation:</strong> Automatically translates 1 core message into tone-optimized formats for LinkedIn, Twitter, and Discord, scheduled through n8n cron nodes.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-sky-400 flex items-center gap-1.5">
                        <span>LinkedIn Format</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Why modern teams are replacing manual spreadsheet copy-pasting with event-driven automation:
                        <br/><br/>
                        1. 75% faster lead response times<br/>
                        2. 100% data fidelity across CRM<br/>
                        3. Zero missed customer inquiries
                        <br/><br/>
                        #Automation #AIWorkflows #n8n
                      </p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                        <span>Twitter / X Thread Hook</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Stop paying thousands in monthly Zapier fees. 🧵
                        <br/><br/>
                        Here is how we built a resilient n8n lead engine with Gemini API scoring that runs on autopilot for $5/month: ⬇️
                      </p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                        <span>Discord / Community</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        📢 **New Automation Case Study Published!**
                        <br/><br/>
                        Check out the architecture breakdown in #resources. Live webhook demonstration included!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ================= ARCHITECTURE & CODE VIEW ================= */
            <div className="space-y-6">
              {/* Full Description & Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                  Project Deep Dive
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.fullDesc}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                  Engineered Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Diagram Nodes */}
              {project.workflowDiagram && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                    n8n Workflow Nodes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {project.workflowDiagram.map((node) => (
                      <div key={node.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{node.label}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 font-mono">
                            {node.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {node.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Snippet */}
              {project.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-bold text-white uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-sky-400" />
                      Production Node Logic (JavaScript / n8n)
                    </h4>
                    <span className="font-mono text-slate-500">ECMAScript / Node 20</span>
                  </div>
                  <pre className="bg-[#0b1120] p-4 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">
                    {project.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Tech Badges */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#131d31] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready for production customisation</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all"
            >
              <span>Build Similar Workflow for Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
