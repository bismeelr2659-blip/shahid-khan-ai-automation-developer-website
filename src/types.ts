export type ProjectCategory = 'all' | 'ai-agents' | 'n8n' | 'chatbots' | 'integrations';

export interface WorkflowNode {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'ai' | 'condition' | 'output';
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: ('ai-agents' | 'n8n' | 'chatbots' | 'integrations')[];
  badge: 'Personal Demo' | 'Concept Project' | 'Production Ready';
  badgeColor?: string;
  shortDesc: string;
  fullDesc: string;
  techTags: string[];
  keyFeatures: string[];
  demoType: 'chatbot' | 'whatsapp' | 'n8n-workflow' | 'research-agent' | 'email-responder' | 'social-automation';
  workflowDiagram?: WorkflowNode[];
  codeSnippet?: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  iconName: string;
  category: 'Core AI' | 'Automation & Flows' | 'Languages & Tools';
  description: string;
  level: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  deliverables: string[];
  idealFor: string;
  timeline: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
}
