export type ServiceType = 
  | 'AI Support Chatbot'
  | 'n8n Workflow Automation'
  | 'WhatsApp Business Bot'
  | 'CRM & Google Sheets Sync'
  | 'Custom AI Agent'
  | 'Webhook & API Integration';

export interface LeadFormData {
  name: string;
  businessName: string;
  email: string;
  whatsapp: string;
  service: ServiceType;
  message: string;
}

export type LeadQualificationTier = 'Tier A (High Priority)' | 'Tier B (Standard Project)' | 'Tier C (Consultation/Info)';

export interface LeadQualification {
  tier: LeadQualificationTier;
  score: number; // 0 - 100
  intentLevel: 'High' | 'Medium' | 'Informational';
  summary: string;
  complexity: 'Low' | 'Moderate' | 'High' | 'Enterprise';
  keyInsights: string[];
  recommendedWorkflowNodes: string[];
  suggestedAction: string;
}

export interface CrmRecord {
  sheetRow: number;
  recordId: string;
  syncedAt: string;
  destination: string; // e.g. "Google Sheets / CRM Intake tab"
  status: 'Appended' | 'Pending' | 'Mock Synced';
}

export interface EmailResponseDraft {
  recipient: string;
  subject: string;
  sender: string;
  body: string;
  sentAt: string;
  status: 'Delivered (Live)' | 'Simulated Sent' | 'Queued';
}

export interface ExecutionLogItem {
  id: string;
  stepName: 'Lead Received' | 'AI Analysis' | 'Lead Qualified' | 'Saved to CRM' | 'Follow-up Sent';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: string;
  durationMs: number;
  outputSummary: string;
  payloadData: Record<string, unknown>;
}

export interface LeadRecord {
  id: string; // e.g. LEAD-2026-8812
  createdAt: string;
  formData: LeadFormData;
  qualification: LeadQualification;
  crmRecord: CrmRecord;
  emailResponse: EmailResponseDraft;
  isDemo: boolean;
  webhookStatus: {
    attempted: boolean;
    connected: boolean;
    url?: string;
    statusCode?: number;
    latencyMs?: number;
    errorMessage?: string;
  };
  overallStatus: 'completed' | 'processing' | 'failed';
  totalExecutionTimeMs: number;
  logs: ExecutionLogItem[];
}

export interface AutomationSettings {
  n8nWebhookUrl: string;
  emailService: 'smtp' | 'resend' | 'sendgrid' | 'simulated';
  emailFrom: string;
  crmService: 'google_sheets' | 'airtable' | 'hubspot' | 'simulated';
  crmTargetName: string;
  isLiveWebhookConfigured: boolean;
  lastTestedAt?: string;
}

export interface AutomationStats {
  totalLeads: number;
  qualifiedLeads: number;
  followupsSent: number;
  averageExecutionMs: number;
}
