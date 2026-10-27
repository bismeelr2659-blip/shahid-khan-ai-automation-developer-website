import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Code, 
  Play, 
  Layers, 
  ArrowUpRight,
  Bot,
  Workflow,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectDemoModal } from './ProjectDemoModal';

interface ProjectsProps {
  initialSelectedId?: string | null;
}

export const Projects: React.FC<ProjectsProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [modalMode, setModalMode] = useState<'demo' | 'code'>('demo');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-agents', label: 'AI Agents & LLMs' },
    { id: 'n8n', label: 'n8n Workflows' },
    { id: 'chatbots', label: 'AI Chatbots' },
    { id: 'integrations', label: 'API Integrations' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_LIST
    : PROJECTS_LIST.filter(p => p.category.includes(selectedCategory as any));

  const handleOpenDemo = (project: Project) => {
    setActiveModalProject(project);
    setModalMode('demo');
  };

  const handleOpenCode = (project: Project) => {
    setActiveModalProject(project);
    setModalMode('code');
  };

  return (
    <section id="projects" className="py-24 bg-[#0b1120] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Automations
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Recent demos, client concepts, and production builds with live test sandboxes
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                id={`filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-[#131d31] rounded-2xl border border-slate-800 hover:border-sky-500/50 hover:bg-[#16233d] transition-all duration-300 flex flex-col justify-between p-6 shadow-xl shadow-black/30 group hover:-translate-y-1"
            >
              <div>
                {/* Header: Title & Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${project.badgeColor || 'border-sky-500/30 text-sky-400 bg-sky-500/10'}`}>
                    {project.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {project.shortDesc}
                </p>

                {/* Metrics Highlight (if any) */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 mb-5 p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-sky-400 font-bold font-mono text-sm">{m.value}</div>
                        <div className="text-slate-400 text-[10px]">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800/80 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Demo & View Code */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id={`btn-demo-${project.id}`}
                  onClick={() => handleOpenDemo(project)}
                  className="w-full py-2.5 px-3 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-semibold text-xs border border-sky-500/30 hover:border-transparent flex items-center justify-center gap-1.5 transition-all shadow-sm group/btn"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>View Demo</span>
                </button>

                <button
                  type="button"
                  id={`btn-code-${project.id}`}
                  onClick={() => handleOpenCode(project)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-700/60 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Code className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Code</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Have an existing manual spreadsheet or workflow you'd like transformed into a 24/7 automated pipeline?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 hover:border-sky-500/50 transition-all hover:-translate-y-0.5"
          >
            <span>Request a Custom Solution Blueprint</span>
            <ArrowUpRight className="w-4 h-4 text-sky-400" />
          </a>
        </div>

      </div>

      {/* Interactive Project Demo / Code Modal */}
      {activeModalProject && (
        <ProjectDemoModal
          project={activeModalProject}
          mode={modalMode}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};
