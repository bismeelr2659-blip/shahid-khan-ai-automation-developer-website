import { Project, SkillItem, ServiceItem, ProcessStep } from '../types';

export const PERSONAL_INFO = {
  name: 'Shahid Khan',
  role: 'AI Automation Developer',
  tagline: 'I Build Practical AI Automation Solutions',
  subheading: 'I design and implement custom workflows, AI agents, and integration systems to help automate repetitive tasks and optimize modern digital processes.',
  email: '5566shahidkhank@gmail.com',
  location: 'Remote / Global Availability',
  status: 'Open for Freelance & Automation Contracts',
  aboutText: [
    'Hello! I am Shahid Khan, an enthusiastic AI Automation Developer focused on designing and deploying intelligent workflow systems.',
    'My work centers on leveraging modern platforms like n8n, AI agents, custom chatbots, and Webhook integrations to solve practical operational challenges. I continuously learn and experiment with emerging AI capabilities to build clear, maintainable, and effective solutions.',
    'Whether you need to eliminate manual data entry, streamline customer support with smart AI bots, or link disparate business apps into an autonomous engine, I architect resilient automation solutions that run smoothly around the clock.'
  ],
  stats: [
    { label: 'Primary Workflow Engine', value: 'n8n' },
    { label: 'AI Reasoning Models', value: 'Gemini / Claude' },
    { label: 'Integration Protocols', value: 'REST & Webhooks' },
    { label: 'Availability', value: 'Remote / Global' }
  ]
};

export const SKILLS_LIST: SkillItem[] = [
  {
    name: 'AI Automation',
    iconName: 'Bot',
    category: 'Core AI',
    description: 'End-to-end intelligent systems integrating LLMs with business logic.',
    level: 'Advanced',
    tags: ['Gemini', 'OpenAI', 'Autonomous Systems']
  },
  {
    name: 'AI Agents',
    iconName: 'Brain',
    category: 'Core AI',
    description: 'Autonomous goal-driven agents capable of multi-step task planning.',
    level: 'Proficient',
    tags: ['Tool Calling', 'ReAct Pattern', 'Memory']
  },
  {
    name: 'AI Chatbots',
    iconName: 'MessageSquare',
    category: 'Core AI',
    description: 'Context-aware conversational assistants with knowledge base retrieval.',
    level: 'Advanced',
    tags: ['RAG', 'Support Bots', 'Lead Qualifier']
  },
  {
    name: 'n8n Workflows',
    iconName: 'Workflow',
    category: 'Automation & Flows',
    description: 'Visual node orchestration for complex logic, branching, and cron jobs.',
    level: 'Expert',
    tags: ['Self-hosted n8n', 'Sub-workflows', 'Error Triggers']
  },
  {
    name: 'WhatsApp Automation',
    iconName: 'Smartphone',
    category: 'Automation & Flows',
    description: 'Interactive WhatsApp Business messaging, transactional alerts, and bots.',
    level: 'Advanced',
    tags: ['Cloud API', 'Twilio / Meta', 'Webhooks']
  },
  {
    name: 'Workflow Automation',
    iconName: 'Cog',
    category: 'Automation & Flows',
    description: 'System pipelines connecting CRMs, databases, and communication channels.',
    level: 'Expert',
    tags: ['Data Mapping', 'Conditional Logic', 'Syncing']
  },
  {
    name: 'HTML5',
    iconName: 'Code',
    category: 'Languages & Tools',
    description: 'Semantic markup structure for custom web embeds and portals.',
    level: 'Proficient',
    tags: ['Semantic Web', 'Embeds', 'DOM']
  },
  {
    name: 'CSS3',
    iconName: 'Palette',
    category: 'Languages & Tools',
    description: 'Responsive styling, UI customization, and modern layout techniques.',
    level: 'Proficient',
    tags: ['Tailwind CSS', 'Responsive Grid', 'Flexbox']
  },
  {
    name: 'JavaScript',
    iconName: 'FileCode',
    category: 'Languages & Tools',
    description: 'Node.js scripting, data transformations, API calls, and custom functions.',
    level: 'Advanced',
    tags: ['Node.js', 'Async/Await', 'JSON Parser']
  },
  {
    name: 'AI API Tools',
    iconName: 'Cpu',
    category: 'Languages & Tools',
    description: 'Direct integration with Gemini API, OpenAI, Anthropic, and vector endpoints.',
    level: 'Advanced',
    tags: ['Function Calling', 'Structured JSON', 'Embeddings']
  }
];

export const PROJECTS_LIST: Project[] = [
  {
    id: 'ai-support-chatbot',
    title: 'AI Support Chatbot',
    category: ['chatbots', 'ai-agents', 'n8n'],
    badge: 'Personal Demo',
    badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    shortDesc: 'A customer query bot powered by LLMs to answer support questions accurately.',
    fullDesc: 'An intelligent customer support agent designed to handle repetitive customer tickets, query internal knowledge bases, and provide immediate contextual resolutions. Features fallback to human operators when confidence scores fall below threshold.',
    techTags: ['Gemini API', 'JavaScript', 'n8n', 'Vector Search'],
    keyFeatures: [
      'Accurate context retrieval from company documentation',
      'Dynamic sentiment & urgency scoring',
      'Automatic conversation summary pushed to CRM',
      'Zero hallucinations via grounded system instructions'
    ],
    demoType: 'chatbot',
    workflowDiagram: [
      { id: '1', label: 'User Message', type: 'trigger', icon: 'MessageCircle', description: 'Webhook catches incoming customer inquiry' },
      { id: '2', label: 'Intent & KB Match', type: 'ai', icon: 'Brain', description: 'Semantic search matches query against verified knowledge' },
      { id: '3', label: 'LLM Generation', type: 'ai', icon: 'Bot', description: 'Gemini formats helpful, brand-aligned response' },
      { id: '4', label: 'Dispatch Answer', type: 'output', icon: 'Send', description: 'Instant response returned via widget or channel' }
    ],
    codeSnippet: `// n8n Code Node: Context Formatter
const userQuery = $input.first().json.query;
const kbArticles = $input.first().json.kb_matches || [];

const contextBlock = kbArticles.map((art, i) => 
  \`[Source \${i+1}: \${art.title}]\\n\${art.content}\`
).join('\\n\\n');

return {
  json: {
    system_prompt: "You are a courteous support assistant. Use ONLY the verified context below.",
    context: contextBlock,
    user_query: userQuery,
    timestamp: new Date().toISOString()
  }
};`,
    metrics: [
      { label: 'Latency Benchmark', value: '< 1.8s' },
      { label: 'Architecture Type', value: 'RAG Pipeline' }
    ]
  },
  {
    id: 'whatsapp-notification-bot',
    title: 'WhatsApp Notification Bot',
    category: ['chatbots', 'integrations', 'n8n'],
    badge: 'Concept Project',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    shortDesc: 'Automated message system sending real-time updates from webhooks to WhatsApp.',
    fullDesc: 'A reliable bridge connecting transactional event triggers (Stripe checkout, shipment status, appointment bookings) directly into WhatsApp with rich interactive buttons and delivery confirmations.',
    techTags: ['WhatsApp API', 'n8n', 'Webhooks', 'Meta Cloud'],
    keyFeatures: [
      'Template-compliant transactional message triggers',
      'Quick-reply buttons for confirmation and rescheduling',
      'Automated rate-limiting and retry logic for 100% delivery',
      'Webhook listener for status updates (sent, delivered, read)'
    ],
    demoType: 'whatsapp',
    workflowDiagram: [
      { id: '1', label: 'External Webhook', type: 'trigger', icon: 'Webhook', description: 'Event payload received from payment or CRM' },
      { id: '2', label: 'Data Sanitizer', type: 'action', icon: 'Filter', description: 'Normalize phone numbers and currency format' },
      { id: '3', label: 'WhatsApp Cloud API', type: 'action', icon: 'Smartphone', description: 'Send encrypted message template with action buttons' },
      { id: '4', label: 'Delivery Callback', type: 'output', icon: 'CheckCheck', description: 'Record delivery timestamp to database' }
    ],
    codeSnippet: `// n8n HTTP Request Node configuration for Meta WhatsApp API
const payload = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: cleanPhoneNumber,
  type: "template",
  template: {
    name: "order_confirmation_v2",
    language: { code: "en_US" },
    components: [
      {
        type: "body",
        parameters: [
          { type: "text", text: customerName },
          { type: "text", text: orderId }
        ]
      }
    ]
  }
};`,
    metrics: [
      { label: 'API Provider', value: 'Meta Cloud API' },
      { label: 'Trigger Latency', value: '< 650ms' }
    ]
  },
  {
    id: 'n8n-lead-sync',
    title: 'n8n Lead Sync Workflow',
    category: ['n8n', 'integrations'],
    badge: 'Personal Demo',
    badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    shortDesc: 'Connects form submissions directly to Google Sheets and sends automated alert emails.',
    fullDesc: 'An enterprise-grade lead intake workflow. Whenever a prospect submits an inquiry, the workflow validates the email domain, deduplicates against Google Sheets records, enriches the lead company with AI, and notifies the sales team instantly.',
    techTags: ['n8n', 'Google Sheets API', 'Email API', 'Data Enrichment'],
    keyFeatures: [
      'Instant duplicate detection prevents double outreach',
      'Automated domain categorization & spam filtering',
      'Bi-directional sync between web forms and Google Sheets',
      'Slack and Email emergency alerts for high-value leads'
    ],
    demoType: 'n8n-workflow',
    workflowDiagram: [
      { id: '1', label: 'Form Webhook', type: 'trigger', icon: 'FormInput', description: 'Catches web lead submission instantly' },
      { id: '2', label: 'Deduplication', type: 'condition', icon: 'GitFork', description: 'Checks if email already exists in records' },
      { id: '3', label: 'Google Sheets Append', type: 'action', icon: 'Table', description: 'Inserts row with calculated lead score' },
      { id: '4', label: 'Sales Email Alert', type: 'output', icon: 'Mail', description: 'Dispatches instant formatted summary' }
    ],
    codeSnippet: `// Lead Scoring Logic in JavaScript Node
const { email, companySize, budget } = items[0].json;

let score = 10;
if (budget === "$5,000+") score += 40;
if (budget === "$2,000 - $5,000") score += 25;
if (companySize === "11-50" || companySize === "50+") score += 30;
if (!email.includes("@gmail.com") && !email.includes("@yahoo.com")) {
  score += 20; // Corporate domain bonus
}

return [{
  json: {
    ...items[0].json,
    leadScore: score,
    priority: score >= 60 ? "HIGH_PRIORITY" : "STANDARD"
  }
}];`,
    metrics: [
      { label: 'Intake Latency', value: '< 1.2s' },
      { label: 'Target Destination', value: 'Google Sheets' }
    ]
  },
  {
    id: 'research-ai-agent',
    title: 'Research AI Agent',
    category: ['ai-agents'],
    badge: 'Concept Project',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    shortDesc: 'An autonomous agent configured to search, summarize, and format daily web news.',
    fullDesc: 'A scheduled autonomous research agent that scours industry feeds, parses unstructured HTML content, detects core market trends, and outputs an executive markdown digest delivered every morning.',
    techTags: ['AI Agent', 'Python/JS', 'Gemini API', 'Web Scraping'],
    keyFeatures: [
      'Multi-source aggregator with rate-limited fetching',
      'Deduplication and relevance scoring against user topics',
      'Concise 3-bullet executive synthesis with source links',
      'Automated export to Notion, PDF, or email dispatch'
    ],
    demoType: 'research-agent',
    workflowDiagram: [
      { id: '1', label: 'Cron Scheduler', type: 'trigger', icon: 'Clock', description: 'Fires daily at 07:00 AM UTC' },
      { id: '2', label: 'Web Source Fetcher', type: 'action', icon: 'Globe', description: 'Pulls RSS feeds and web article headlines' },
      { id: '3', label: 'Agent Synthesis', type: 'ai', icon: 'BrainCircuit', description: 'Evaluates importance, removes noise, summarizes' },
      { id: '4', label: 'Markdown Report', type: 'output', icon: 'FileText', description: 'Outputs clean, structured briefing document' }
    ],
    codeSnippet: `// Agent Prompt Pattern for Market Synthesis
const prompt = \`
You are an Executive Technology Analyst.
Review the following \${articles.length} raw articles gathered today.

OBJECTIVES:
1. Identify the top 3 high-impact advancements.
2. For each, give: Title, Why it matters (2 sentences), and Source URL.
3. Discard PR fluff and sponsored re-writes.

RAW ARTICLES:
\${JSON.stringify(articles)}
\`;`,
    metrics: [
      { label: 'Execution Schedule', value: 'Daily 07:00' },
      { label: 'Output Format', value: 'Markdown Digest' }
    ]
  },
  {
    id: 'email-responder-flow',
    title: 'Email Responder Flow',
    category: ['ai-agents', 'integrations', 'n8n'],
    badge: 'Personal Demo',
    badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    shortDesc: 'Automatically categorizes incoming emails and drafts context-aware responses.',
    fullDesc: 'An intelligent inbox copilot that listens to incoming messages, tags sender sentiment and category (Billing, Tech Support, Partnership, Spam), and crafts a personalized draft response stored directly in Gmail drafts for human review.',
    techTags: ['Email API', 'AI Models', 'n8n', 'Gmail / IMAP'],
    keyFeatures: [
      'Human-in-the-loop safety: drafts created without blind sending',
      'Sentiment classification and urgent escalation flagging',
      'Knowledge-retrieval for frequently asked questions',
      'Automatic tagging and archive of promotional spam'
    ],
    demoType: 'email-responder',
    workflowDiagram: [
      { id: '1', label: 'New Email Event', type: 'trigger', icon: 'Mail', description: 'IMAP or Gmail API webhook triggered' },
      { id: '2', label: 'Category & Sentiment', type: 'ai', icon: 'Sparkles', description: 'Classifies into Billing, Technical, Sales, or General' },
      { id: '3', label: 'Draft Generation', type: 'ai', icon: 'FileEdit', description: 'Creates polite, complete draft response' },
      { id: '4', label: 'Save to Drafts', type: 'output', icon: 'Inbox', description: 'Stored in Gmail with label for 1-click review' }
    ],
    codeSnippet: `// Structured Output Schema for Classification
const classificationSchema = {
  category: "Billing" | "Support" | "Partnership" | "Spam",
  urgency: "HIGH" | "MEDIUM" | "LOW",
  customerSentiment: "Positive" | "Neutral" | "Frustrated",
  keyIssue: "string",
  suggestedAction: "string",
  draftReply: "string"
};`,
    metrics: [
      { label: 'Human-in-Loop', value: 'Drafts Mode' },
      { label: 'Parsing Framework', value: 'Structured JSON' }
    ]
  },
  {
    id: 'multi-platform-social-automation',
    title: 'Social & Content Multi-Poster',
    category: ['n8n', 'integrations', 'ai-agents'],
    badge: 'Production Ready',
    badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    shortDesc: 'Scheduled content creation pipeline formatting posts across LinkedIn, Twitter, and Discord.',
    fullDesc: 'Takes a central source idea or blog post, uses an AI model to adapt tone and length for each social platform, schedules via n8n cron nodes, and handles image asset verification before publishing.',
    techTags: ['n8n', 'Social APIs', 'Gemini AI', 'Buffer / Webhooks'],
    keyFeatures: [
      'Platform-specific tone translation (threads vs professional posts)',
      'Character limit guardrails and automated hashtag selection',
      'Failure notification via Telegram/Discord if API tokens expire',
      'Centralised Google Sheets content calendar sync'
    ],
    demoType: 'social-automation',
    workflowDiagram: [
      { id: '1', label: 'Idea in Sheet', type: 'trigger', icon: 'Calendar', description: 'Triggers when draft status changes to APPROVED' },
      { id: '2', label: 'Tone Multi-Format', type: 'ai', icon: 'Shuffle', description: 'Generates LinkedIn post + Twitter thread variations' },
      { id: '3', label: 'API Dispatcher', type: 'action', icon: 'Share2', description: 'Sends to target social APIs at optimal hours' },
      { id: '4', label: 'Log & Metrics', type: 'output', icon: 'CheckCircle', description: 'Updates status to PUBLISHED with link' }
    ],
    codeSnippet: `// n8n Multi-Platform Payload Distributor
const platforms = ['linkedin', 'twitter', 'discord'];
return platforms.map(platform => ({
  json: {
    platform,
    text: adaptTone(sourceText, platform),
    scheduledAt: calculateBestTime(platform)
  }
}));`,
    metrics: [
      { label: 'Scheduler', value: 'n8n Cron Node' },
      { label: 'Target Channels', value: 'Multi-API' }
    ]
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'custom-agents',
    title: 'Custom AI Agents & Chatbots',
    iconName: 'Bot',
    shortDesc: 'Build context-aware conversational bots trained on your data to handle customer inquiries, qualify leads, and perform tasks.',
    deliverables: [
      'Grounded RAG architecture with company knowledge bases',
      'Web widget & multi-channel deployment (WhatsApp, Telegram, Web)',
      'Human handoff and escalation triggers',
      'Token usage and conversation logging'
    ],
    idealFor: 'Businesses aiming to automate tier-1 customer inquiries and capture leads 24/7.',
    timeline: '1-2 Weeks'
  },
  {
    id: 'n8n-workflows',
    title: 'n8n Workflow Automation',
    iconName: 'Workflow',
    shortDesc: 'End-to-end business logic orchestration linking your everyday apps without expensive recurring SaaS vendor lock-in.',
    deliverables: [
      'Self-hosted or cloud n8n architecture setup',
      'Custom JavaScript data transformation nodes',
      'Robust error-handling and failure notification workflows',
      'Documented runbooks and clean node structures'
    ],
    idealFor: 'Companies seeking custom integrations that Make/Zapier cannot handle.',
    timeline: '3-7 Days'
  },
  {
    id: 'crm-lead-sync',
    title: 'CRM & Lead Pipeline Sync',
    iconName: 'Database',
    shortDesc: 'Unify incoming leads across website forms, social ads, and email campaigns into your CRM and Google Sheets in real-time.',
    deliverables: [
      'Instant deduplication and contact normalization',
      'Automated company & profile data enrichment',
      'Instant salesperson notification via Slack, Teams, or SMS',
      'Audit logging and status progression tracking'
    ],
    idealFor: 'Sales and marketing teams losing warm leads due to slow manual follow-ups.',
    timeline: '4-8 Days'
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Business Automation',
    iconName: 'Smartphone',
    shortDesc: 'Deploy transactional message sequences, customer alerts, and interactive menus using official WhatsApp Cloud APIs.',
    deliverables: [
      'Meta Business Manager & WhatsApp Cloud API setup',
      'Template registration and interactive button menus',
      'Webhook listener for order updates and booking alerts',
      'Two-way conversational support flows'
    ],
    idealFor: 'E-commerce and service businesses with high mobile engagement.',
    timeline: '1-2 Weeks'
  },
  {
    id: 'webhook-integrations',
    title: 'Webhook & Custom API Integrations',
    iconName: 'Zap',
    shortDesc: 'Connect any modern SaaS or proprietary database through custom webhooks, REST APIs, and event-driven architectures.',
    deliverables: [
      'Secure webhook receivers with signature verification',
      'Data mapping and schema transformations',
      'Automated retry queues and exponential backoff',
      'API rate limit compliance guards'
    ],
    idealFor: 'Connecting specialized software that lacks out-of-the-box integrations.',
    timeline: '3-6 Days'
  },
  {
    id: 'audit-consulting',
    title: 'Workflow Audit & Optimization',
    iconName: 'Sliders',
    shortDesc: 'A comprehensive review of your existing manual processes to identify high-ROI automation opportunities and architecture blueprints.',
    deliverables: [
      'Process mapping & bottleneck analysis diagram',
      'ROI and time-saved estimation model',
      'Recommended tech stack & architectural blueprint',
      'Prioritized implementation roadmap'
    ],
    idealFor: 'Teams looking to adopt AI and automation strategically without wasted budget.',
    timeline: '2-4 Days'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Bottleneck Analysis',
    description: 'We analyze your current manual workflows, repetitive tasks, and communication bottlenecks to define exact automation requirements and KPIs.',
    deliverables: ['Requirements Checklist', 'Tool compatibility assessment', 'Scope & Milestone plan'],
    duration: 'Day 1 - 2'
  },
  {
    stepNumber: '02',
    title: 'Architecture & Flow Mapping',
    description: 'I design the node sequence, webhook triggers, AI prompt instructions, and edge-case fallbacks before writing a single line of code.',
    deliverables: ['Visual workflow wireframe', 'Data schema mapping', 'API authentication plan'],
    duration: 'Day 3 - 4'
  },
  {
    stepNumber: '03',
    title: 'Build, Integrate & Prompt Engineering',
    description: 'Building the workflows in n8n, crafting system instructions, establishing API keys, and linking endpoints with error handling nodes.',
    deliverables: ['Configured n8n workflows', 'Optimized AI prompts', 'Validation test cases'],
    duration: 'Day 5 - 8'
  },
  {
    stepNumber: '04',
    title: 'Stress Testing, Handover & Training',
    description: 'Rigorous testing with boundary data payloads, live scenario simulations, full documentation handover, and staff training.',
    deliverables: ['Video walkthrough & documentation', 'Production launch', 'Post-launch support window'],
    duration: 'Day 9 - 10'
  }
];
