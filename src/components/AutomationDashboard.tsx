import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Mail, 
  Clock, 
  Search, 
  Filter, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  Zap, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { LeadRecord, AutomationStats } from '../types/automation';
import { automationService } from '../services/automationService';

interface AutomationDashboardProps {
  leads: LeadRecord[];
  isLiveConnected: boolean;
  onInspectLead: (lead: LeadRecord) => void;
  onRefreshLeads: () => void;
}

export const AutomationDashboard: React.FC<AutomationDashboardProps> = ({
  leads,
  isLiveConnected,
  onInspectLead,
  onRefreshLeads
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'Tier A' | 'Tier B' | 'Tier C'>('all');

  const stats = automationService.getStats();

  const handleResetData = () => {
    automationService.resetDemoLeads();
    onRefreshLeads();
  };

  const handleClearData = () => {
    automationService.clearAllLeads();
    onRefreshLeads();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.formData.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.formData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.formData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.formData.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = 
      tierFilter === 'all' || 
      lead.qualification.tier.toLowerCase().includes(tierFilter.toLowerCase());

    return matchesSearch && matchesTier;
  });

  const getTierBadge = (tier: string) => {
    if (tier.includes('Tier A')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Tier A (High)
        </span>
      );
    }
    if (tier.includes('Tier B')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Tier B (Standard)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Tier C (Consult)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Dashboard Section Header with Honest Labeling */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-400" />
              <span>Live Automation Dashboard</span>
            </h3>
            {isLiveConnected ? (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Webhook Active
              </span>
            ) : (
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                Demo Automation Dashboard
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline metrics and lead records captured through the intake engine.
          </p>
        </div>

        {/* Controls: Reset / Clear */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-medium text-slate-300 border border-slate-700 transition-colors"
            title="Reset to sample demo leads"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>
          <button
            type="button"
            onClick={handleClearData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-850 text-xs font-medium text-red-400/90 border border-slate-800 hover:border-red-500/30 transition-colors"
          >
            <span>Clear Leads</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="bg-[#131d31] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl group-hover:bg-sky-500/10 transition-colors pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
              {stats.totalLeads}
            </span>
            <span className="text-[11px] text-slate-400">captured</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Recorded in session storage
          </p>
        </div>

        {/* Qualified Leads */}
        <div className="bg-[#131d31] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Qualified Leads</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
              {stats.qualifiedLeads}
            </span>
            <span className="text-[11px] text-slate-400">Tier A / B</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Scored by AI criteria
          </p>
        </div>

        {/* Follow-ups Sent */}
        <div className="bg-[#131d31] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Follow-ups Sent</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-indigo-300">
              {stats.followupsSent}
            </span>
            <span className="text-[11px] text-slate-400">emails</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Auto-composed & delivered
          </p>
        </div>

        {/* Avg Pipeline Latency */}
        <div className="bg-[#131d31] p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Avg Pipeline Time</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-purple-300">
              {stats.averageExecutionMs}
            </span>
            <span className="text-[11px] text-slate-400">ms</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            From webhook to response
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recent leads..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Tier:
          </span>
          {(['all', 'Tier A', 'Tier B', 'Tier C'] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setTierFilter(tier)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                tierFilter === tier
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800'
              }`}
            >
              {tier === 'all' ? 'All Leads' : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-[#131d31] rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Recent Leads Log ({filteredLeads.length})
          </h4>
          <span className="text-[11px] text-slate-400">
            Click any row to inspect execution payload
          </span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <p className="text-slate-400 text-xs">No leads match your filter criteria.</p>
            <button
              type="button"
              onClick={handleResetData}
              className="text-xs text-sky-400 hover:underline"
            >
              Restore sample demo leads
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Business & Contact</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">AI Score & Tier</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    onClick={() => onInspectLead(lead)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono text-[11px] text-sky-400 whitespace-nowrap">
                      {lead.id}
                      <span className="block text-[10px] text-slate-500 font-sans">
                        {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white group-hover:text-sky-300 transition-colors">
                        {lead.formData.businessName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lead.formData.name} • {lead.formData.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        {lead.formData.service}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {getTierBadge(lead.qualification.tier)}
                        <span className="font-mono text-[11px] text-slate-400">
                          {lead.qualification.score}/100
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        CRM Synced & Emailed
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectLead(lead);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
