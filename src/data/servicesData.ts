export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  timeline: string;
  idealFor: string;
  keyBenefits: string[];
  howWeHelp: {
    step: string;
    title: string;
    description: string;
    actionDetail: string;
  }[];
  deliverables: string[];
  techStack: string[];
  sampleWorkflow: {
    nodeNumber: number;
    title: string;
    role: string;
    description: string;
  }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    slug: 'ai-automation-services',
    title: 'AI Automation Services',
    description: 'Automate repetitive business tasks and improve workflow efficiency.',
    iconName: 'Zap',
    badge: 'Core Specialty',
    timeline: '1-2 Weeks',
    idealFor: 'Businesses aiming to eliminate manual data entry, streamline operations, and run tasks 24/7.',
    keyBenefits: [
      'Eliminate repetitive manual data entry and routine admin work',
      'Leverage AI reasoning models (Gemini / Claude) to parse unstructured files',
      'Connect disparate software platforms into unified automated pipelines',
      'Maintain continuous operational execution with zero fatigue'
    ],
    howWeHelp: [
      {
        step: '01',
        title: 'Analyze repetitive business tasks',
        description: 'We audit your daily operations to identify repetitive time drains, manual copying, and workflow handoffs that can be safely automated.',
        actionDetail: 'Identify bottlenecks across emails, forms, documents, and tool-switching.'
      },
      {
        step: '02',
        title: 'Design an appropriate automation workflow',
        description: 'Map out the complete node logic, data schemas, decision branches, and fallback routines before writing code.',
        actionDetail: 'Create visual architecture blueprints with clear inputs, outputs, and safety guardrails.'
      },
      {
        step: '03',
        title: 'Integrate compatible tools and APIs',
        description: 'Connect your business software via REST APIs, webhooks, databases, and LLM reasoning nodes.',
        actionDetail: 'Seamlessly link n8n, Google Workspace, CRMs, WhatsApp, and custom webhooks.'
      },
      {
        step: '04',
        title: 'Test the workflow before deployment',
        description: 'Run comprehensive end-to-end payload simulations to verify data integrity, rate limits, and error handling.',
        actionDetail: 'Stress test edge cases and establish automated failure alerts prior to production launch.'
      }
    ],
    deliverables: [
      'End-to-end visual workflow blueprints in n8n',
      'AI prompt engineering & JSON schema extraction',
      'Custom webhook receivers & signature verification',
      'Operational monitoring & failure notification channels'
    ],
    techStack: ['n8n', 'Gemini API', 'Node.js', 'REST APIs', 'Webhooks', 'PostgreSQL'],
    sampleWorkflow: [
      { nodeNumber: 1, title: 'Inbound Event Trigger', role: 'Trigger', description: 'Catches new documents, form submissions, or scheduled cron intervals.' },
      { nodeNumber: 2, title: 'AI Extraction Node', role: 'AI Reasoning', description: 'Gemini model analyzes unstructured text and converts it to strict JSON.' },
      { nodeNumber: 3, title: 'Validation & Routing', role: 'Logic', description: 'Checks data constraints and routes to appropriate execution branches.' },
      { nodeNumber: 4, title: 'System Dispatch', role: 'Action', description: 'Updates ERP, appends database record, and alerts stakeholders.' }
    ]
  },
  {
    slug: 'ai-chatbot-services',
    title: 'AI Chatbot Services',
    description: 'Build AI chatbots to answer customer questions and qualify leads.',
    iconName: 'Bot',
    badge: 'High Conversion',
    timeline: '1-2 Weeks',
    idealFor: 'Companies seeking 24/7 customer support deflection, lead qualification, and instant response times.',
    keyBenefits: [
      'Grounded answers using your official company documentation and FAQs',
      'Multi-channel deployment across website widgets, WhatsApp, and Slack',
      'Automated intent analysis and lead qualification scores',
      'Graceful handoff to human representatives when confidence thresholds require it'
    ],
    howWeHelp: [
      {
        step: '01',
        title: 'Analyze repetitive business tasks',
        description: 'Examine support tickets and frequently asked customer questions to identify what queries can be autonomously answered.',
        actionDetail: 'Categorize top 20+ repetitive customer inquiries, return policies, and pricing questions.'
      },
      {
        step: '02',
        title: 'Design an appropriate automation workflow',
        description: 'Architect a Retrieval-Augmented Generation (RAG) system with clear system prompts, boundaries, and tone guidelines.',
        actionDetail: 'Define strict guardrails to prevent hallucinations and maintain brand voice.'
      },
      {
        step: '03',
        title: 'Integrate compatible tools and APIs',
        description: 'Connect vector databases, live inventory/order APIs, and conversational user interfaces.',
        actionDetail: 'Deploy responsive chat widgets or link directly to WhatsApp and Telegram.'
      },
      {
        step: '04',
        title: 'Test the workflow before deployment',
        description: 'Evaluate hundreds of adversarial and ambiguous queries to ensure reliable answers and smooth fallback paths.',
        actionDetail: 'Simulate edge cases, out-of-scope inquiries, and verify human handoff triggers.'
      }
    ],
    deliverables: [
      'Custom trained vector knowledge base retrieval system',
      'Responsive web chat widget and multi-channel connectors',
      'Confidence scoring with human handoff escalation triggers',
      'Conversation logging and lead qualification CRM sync'
    ],
    techStack: ['Gemini 1.5 / Claude', 'Vector Search', 'n8n', 'JavaScript', 'Webhooks'],
    sampleWorkflow: [
      { nodeNumber: 1, title: 'Customer Query Intake', role: 'Trigger', description: 'Receives customer message from web chat widget or messaging app.' },
      { nodeNumber: 2, title: 'Semantic Knowledge Search', role: 'RAG Retrieval', description: 'Queries company documentation to extract exact verified facts.' },
      { nodeNumber: 3, title: 'AI Response Synthesis', role: 'LLM Generation', description: 'Formats polite, factual answer without hallucinated claims.' },
      { nodeNumber: 4, title: 'Lead Qualification & Push', role: 'Output', description: 'Extracts prospect details and syncs directly into CRM.' }
    ]
  },
  {
    slug: 'n8n-workflow-automation',
    title: 'n8n Workflow Automation',
    description: 'Connect webhooks, email, Google Sheets, and business applications.',
    iconName: 'Workflow',
    badge: 'Zero Vendor Lock-in',
    timeline: '3-7 Days',
    idealFor: 'Businesses wanting flexible, high-volume automation without expensive monthly SaaS seat limits.',
    keyBenefits: [
      'Self-hosted or managed n8n architectures with full data ownership',
      'Custom JavaScript data transformation nodes for complex requirements',
      'Transactional safety with error triggers and automatic retry mechanisms',
      'Seamless connectivity across hundreds of enterprise APIs and databases'
    ],
    howWeHelp: [
      {
        step: '01',
        title: 'Analyze repetitive business tasks',
        description: 'Review multi-app processes where team members manually move data between emails, forms, and databases.',
        actionDetail: 'Document data payloads, frequency, and trigger events across all tools.'
      },
      {
        step: '02',
        title: 'Design an appropriate automation workflow',
        description: 'Structure modular node sequences, branching conditions, and error-handling sub-workflows.',
        actionDetail: 'Produce clean node flowcharts showing every transformation and destination.'
      },
      {
        step: '03',
        title: 'Integrate compatible tools and APIs',
        description: 'Authenticate APIs, configure webhook listeners, and set up bi-directional sync routines.',
        actionDetail: 'Connect Google Sheets, PostgreSQL, Slack, Stripe, and internal endpoints.'
      },
      {
        step: '04',
        title: 'Test the workflow before deployment',
        description: 'Execute mock payloads, verify data formatting under edge cases, and ensure retry queues work.',
        actionDetail: 'Test API rate limits, payload schema validation, and failure alerts.'
      }
    ],
    deliverables: [
      'Production-ready n8n workflow JSON blueprints',
      'Custom JavaScript/TypeScript data normalization nodes',
      'Comprehensive error handler with notification alert channel',
      'Architecture documentation & maintenance runbooks'
    ],
    techStack: ['n8n', 'Docker', 'JavaScript / Node.js', 'PostgreSQL', 'Google Sheets API', 'Webhooks'],
    sampleWorkflow: [
      { nodeNumber: 1, title: 'Webhook Receiver', role: 'Trigger', description: 'Receives instant POST payload from payment or form trigger.' },
      { nodeNumber: 2, title: 'Data Transformation', role: 'JavaScript Node', description: 'Sanitizes inputs, validates emails, and cleans currency strings.' },
      { nodeNumber: 3, title: 'Database / Sheet Commit', role: 'Database Action', description: 'Upserts normalized record to Google Sheets and internal DB.' },
      { nodeNumber: 4, title: 'Notification Pulse', role: 'Communication', description: 'Dispatches confirmation alert to team Slack channel.' }
    ]
  },
  {
    slug: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    description: 'Automate eligible business notifications and customer messaging.',
    iconName: 'Smartphone',
    badge: 'Mobile First',
    timeline: '1-2 Weeks',
    idealFor: 'Retail, appointment, and service businesses requiring high-engagement mobile communication.',
    keyBenefits: [
      'Official Meta WhatsApp Cloud API integration with compliant templates',
      'Interactive button menus for one-tap confirmations and rescheduling',
      'Instant transactional alerts for bookings, orders, and payment updates',
      'Direct webhook callbacks to update your CRM and Google Calendar'
    ],
    howWeHelp: [
      {
        step: '01',
        title: 'Analyze repetitive business tasks',
        description: 'Identify customer touchpoints that suffer from missed emails, phone tag, or patient no-shows.',
        actionDetail: 'Target appointment reminders, order confirmations, and status updates.'
      },
      {
        step: '02',
        title: 'Design an appropriate automation workflow',
        description: 'Craft conversational interactive message sequences with quick-reply buttons and fallback routing.',
        actionDetail: 'Draft Meta-compliant message templates with variables and buttons.'
      },
      {
        step: '03',
        title: 'Integrate compatible tools and APIs',
        description: 'Link your booking system, Google Calendar, or e-commerce platform to the Meta WhatsApp Cloud API.',
        actionDetail: 'Configure webhook listeners for delivery reports and user button taps.'
      },
      {
        step: '04',
        title: 'Test the workflow before deployment',
        description: 'Test incoming and outgoing message sequences across real mobile devices in sandbox and live modes.',
        actionDetail: 'Verify delivery speed, button callbacks, and calendar updates under active conditions.'
      }
    ],
    deliverables: [
      'Meta Business Manager & WhatsApp Cloud API configuration',
      'Registered & approved interactive message templates',
      'Webhook listener handling inbound user responses',
      'Two-way synchronization with Google Calendar & CRM'
    ],
    techStack: ['Meta WhatsApp Cloud API', 'n8n', 'Google Calendar API', 'Webhooks', 'Node.js'],
    sampleWorkflow: [
      { nodeNumber: 1, title: 'Appointment Created Event', role: 'Trigger', description: 'Webhook catches newly booked slot in calendar system.' },
      { nodeNumber: 2, title: 'Template Variable Mapper', role: 'Data Mapping', description: 'Injects customer name, time, and service into message body.' },
      { nodeNumber: 3, title: 'WhatsApp API Send', role: 'API Action', description: 'Sends interactive message with [Confirm] and [Reschedule] buttons.' },
      { nodeNumber: 4, title: 'Response Listener', role: 'Webhook Callback', description: 'Catches button tap and automatically marks status in CRM.' }
    ]
  },
  {
    slug: 'crm-lead-automation',
    title: 'CRM & Lead Automation',
    description: 'Organize incoming leads and streamline follow-up workflows.',
    iconName: 'Database',
    badge: 'Revenue Acceleration',
    timeline: '4-8 Days',
    idealFor: 'Sales and marketing teams losing warm leads due to slow manual entry and delayed replies.',
    keyBenefits: [
      'Sub-second intake from website forms, social campaigns, and landing pages',
      'Automated email deduplication to prevent double outreach',
      'AI lead qualification scoring (Tier A/B/C) based on buyer readiness',
      'Immediate personalized follow-up emails and urgent team notifications'
    ],
    howWeHelp: [
      {
        step: '01',
        title: 'Analyze repetitive business tasks',
        description: 'Audit the inbound lead journey from first form submission to sales contact to eliminate response delays.',
        actionDetail: 'Map every inbound lead channel and measure current speed-to-lead gaps.'
      },
      {
        step: '02',
        title: 'Design an appropriate automation workflow',
        description: 'Establish clear qualification criteria, scoring rules, and routing paths for high-priority inquiries.',
        actionDetail: 'Define tier boundaries (Tier A Enterprise, Tier B Standard, Tier C Consult).'
      },
      {
        step: '03',
        title: 'Integrate compatible tools and APIs',
        description: 'Connect form webhooks to Google Sheets, Airtable, HubSpot, and transactional email providers.',
        actionDetail: 'Build automated email response generators and instant Slack/WhatsApp alerts.'
      },
      {
        step: '04',
        title: 'Test the workflow before deployment',
        description: 'Submit diverse test inquiries to verify scoring accuracy, deduplication logic, and email delivery.',
        actionDetail: 'Inspect logs to ensure zero lead drops and confirm sub-second CRM row syncing.'
      }
    ],
    deliverables: [
      'Unified multi-channel lead intake webhook listener',
      'Automated deduplication and normalization algorithm',
      'AI lead qualification scoring engine with tier routing',
      'Dynamic personalized auto-responder and Google Sheets sync'
    ],
    techStack: ['n8n', 'Google Sheets API', 'Gemini AI', 'Resend / SMTP', 'HubSpot / Airtable'],
    sampleWorkflow: [
      { nodeNumber: 1, title: 'Web Form Webhook', role: 'Trigger', description: 'Instantly catches lead name, business, email, phone, and requirements.' },
      { nodeNumber: 2, title: 'AI Intent & Tier Scoring', role: 'AI Analysis', description: 'Gemini evaluates project complexity and assigns Tier A/B/C.' },
      { nodeNumber: 3, title: 'CRM Row Synchronization', role: 'Database Sync', description: 'Appends structured lead row with timestamp and score to Sheets.' },
      { nodeNumber: 4, title: 'Personalized Email Sent', role: 'Automated Response', description: 'Dispatches tailored acknowledgement email and alerts sales team.' }
    ]
  }
];
