import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import MaterialsSection from './components/MaterialsSection';
import ProcessSection from './components/ProcessSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { getProjectBySlug } from './data/projects';
import type { Project, ProjectScope } from './types';

const scopeForCategory = (project: Project): ProjectScope => {
  if (project.category === 'Luxury Residential') return 'Luxury Residential Interiors';
  return project.category;
};

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [prefill, setPrefill] = useState<{ scope: ProjectScope; nonce: number } | null>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const match = window.location.hash.match(/^#project-(.+)$/);
      setActiveProject(match ? getProjectBySlug(decodeURIComponent(match[1])) ?? null : null);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, []);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
    if (window.location.hash !== `#project-${project.slug}`) {
      window.history.pushState({ project: project.slug }, '', `#project-${project.slug}`);
    }
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    if (window.location.hash.startsWith('#project-')) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  const inquireAbout = useCallback((project: Project) => {
    setActiveProject(null);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setPrefill({ scope: scopeForCategory(project), nonce: Date.now() });
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }, []);

  return (
    <div className="min-h-screen bg-limestone">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Skip to projects
      </a>
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection onOpenProject={openProject} />
        <MaterialsSection />
        <ProcessSection />
        <ContactSection prefill={prefill} />
      </main>
      <Footer />
      <ProjectModal project={activeProject} onClose={closeProject} onInquire={inquireAbout} />
    </div>
  );
}
