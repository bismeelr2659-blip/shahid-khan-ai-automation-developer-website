import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { LiveAutomationDemo } from './components/LiveAutomationDemo';
import { AutomationBenefits } from './components/AutomationBenefits';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDemoModal } from './components/ProjectDemoModal';
import { ServicePage } from './components/ServicePage';
import { PROJECTS_LIST } from './data/portfolioData';
import { SERVICES_DATA } from './data/servicesData';

export default function App() {
  const [activeDemoProject, setActiveDemoProject] = useState<typeof PROJECTS_LIST[0] | null>(null);

  // Clean initial pathname (e.g. "/ai-automation-services" -> "ai-automation-services")
  const getPath = () => window.location.pathname.replace(/^\/+|\/+$/g, "");
  const [currentPath, setCurrentPath] = useState<string>(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (slug: string) => {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
    const targetUrl = cleanSlug ? `/${cleanSlug}` : '/';
    window.history.pushState(null, '', targetUrl);
    setCurrentPath(cleanSlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if current path matches any of the 5 dedicated service slugs
  const matchedService = SERVICES_DATA.find((item) => item.slug === currentPath);

  // When returning to home, reset page title
  useEffect(() => {
    if (!matchedService) {
      document.title = 'Shahid Khan | AI Automation Developer';
    }
  }, [matchedService]);

  const handleOpenLiveDemoFromHero = (demoType: string) => {
    const matched = PROJECTS_LIST.find(p => p.demoType === demoType) || PROJECTS_LIST[0];
    setActiveDemoProject(matched);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on a dedicated service page, render the ServicePage component
  if (matchedService) {
    return (
      <ServicePage 
        service={matchedService} 
        onNavigate={handleNavigate} 
      />
    );
  }

  // Otherwise render full home portfolio
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Home / Hero Section */}
        <Hero 
          onExploreProjects={handleScrollToProjects}
          onOpenLiveDemo={handleOpenLiveDemoFromHero}
        />

        {/* About Me Section */}
        <About />

        {/* Skills & Technologies */}
        <Skills />

        {/* Working Lead Capture Automation Demo Section */}
        <LiveAutomationDemo />

        {/* How This Automation Helps Businesses */}
        <AutomationBenefits />

        {/* Projects Grid with Interactive Demos */}
        <Projects />

        {/* Services Section with Direct Links to Dedicated Service Pages */}
        <Services onNavigateService={handleNavigate} />

        {/* How I Work Process */}
        <Process />

        {/* Contact Me Form & Information */}
        <Contact />
      </main>

      {/* Footer with Service Deep Links */}
      <Footer onNavigateService={handleNavigate} />

      {/* Standalone Demo Modal for Quick Launch from Hero */}
      {activeDemoProject && (
        <ProjectDemoModal
          project={activeDemoProject}
          mode="demo"
          onClose={() => setActiveDemoProject(null)}
        />
      )}
    </div>
  );
}
