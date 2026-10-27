import React, { useState } from 'react';
import { 
  Bot, 
  Brain, 
  MessageSquare, 
  Workflow, 
  Smartphone, 
  Cog, 
  Code, 
  Palette, 
  FileCode, 
  Cpu, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { SKILLS_LIST } from '../data/portfolioData';
import { SkillItem } from '../types';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Core AI', 'Automation & Flows', 'Languages & Tools'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-8 h-8 text-sky-400" />;
      case 'Brain': return <Brain className="w-8 h-8 text-indigo-400" />;
      case 'MessageSquare': return <MessageSquare className="w-8 h-8 text-cyan-400" />;
      case 'Workflow': return <Workflow className="w-8 h-8 text-sky-400" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-emerald-400" />;
      case 'Cog': return <Cog className="w-8 h-8 text-amber-400" />;
      case 'Code': return <Code className="w-8 h-8 text-orange-400" />;
      case 'Palette': return <Palette className="w-8 h-8 text-purple-400" />;
      case 'FileCode': return <FileCode className="w-8 h-8 text-yellow-400" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-rose-400" />;
      default: return <Bot className="w-8 h-8 text-sky-400" />;
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_LIST
    : SKILLS_LIST.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-[#0f172a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Technologies
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Tools and tech I build with
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filteredSkills.map((skill: SkillItem, index: number) => (
            <div
              key={index}
              className="bg-[#131d31] rounded-xl p-6 border border-slate-800 hover:border-sky-500/50 hover:bg-[#16233d] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-lg shadow-black/20"
            >
              <div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200 shadow-inner">
                  {getIcon(skill.iconName)}
                </div>

                {/* Skill Name */}
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Tags and Proficiency */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Proficiency</span>
                  <span className="text-sky-400 font-semibold">{skill.level}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-14 bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">
              Need a custom integration or specialized API connector?
            </h4>
            <p className="text-sm text-slate-400">
              I build custom n8n nodes, secure webhooks, and REST client wrappers tailored to your business software.
            </p>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all hover:-translate-y-0.5"
          >
            Request Custom Integration
          </a>
        </div>

      </div>
    </section>
  );
};
