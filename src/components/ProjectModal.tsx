import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../types';
import { easeArchitectural } from '../lib/motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (project: Project) => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!project) return;
    setActiveImage(0);
    if (panelRef.current) panelRef.current.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
    };
  }, [project, onClose]);

  const specRows = project
    ? [
        { label: 'Client sector', value: project.clientSector },
        { label: 'Emirate', value: project.emirate },
        { label: 'Area', value: project.area },
        { label: 'Completion', value: project.timeline },
      ]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easeArchitectural }}
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-obsidian/85 p-0 backdrop-blur-sm sm:p-6 lg:p-10"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.995 }}
            transition={{ duration: 0.55, ease: easeArchitectural }}
            onClick={(event) => event.stopPropagation()}
            className="relative mx-auto w-full max-w-[1180px] overflow-y-auto border border-gold/20 bg-espresso text-limestone sm:max-h-[92vh]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center border border-limestone/25 bg-obsidian/70 text-limestone backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-obsidian"
            >
              <X className="h-4 w-4" strokeWidth={1.25} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
              <div className="bg-obsidian p-4 lg:p-6">
                <div className="aspect-[4/3] w-full overflow-hidden bg-obsidian">
                  <img
                    src={project.gallery[activeImage] ?? project.image}
                    alt={`${project.title} interior view ${activeImage + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {project.gallery.slice(0, 3).map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={activeImage === index}
                      className={`aspect-[4/3] overflow-hidden border transition-colors duration-300 ${
                        activeImage === index ? 'border-gold' : 'border-limestone/15 hover:border-limestone/40'
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <span className="meta-label text-[9px] text-gold">{project.category}</span>
                  <span className="h-px w-8 bg-gold/40" />
                  <span className="meta-label text-[9px] text-dark-muted">{project.emirate}</span>
                </div>

                <h2
                  id="project-modal-title"
                  className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] leading-none"
                >
                  {project.title}
                </h2>

                <p className="mt-5 text-sm leading-relaxed text-limestone/65">{project.summary}</p>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-limestone/10 py-6">
                  {specRows.map((row) => (
                    <div key={row.label}>
                      <dt className="meta-label text-[8.5px] text-dark-muted/70">{row.label}</dt>
                      <dd className="mt-1.5 text-[13px] leading-snug text-limestone/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7">
                  <h3 className="meta-label text-[9px] text-gold">Material & joinery spec</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.materials.map((material) => (
                      <li
                        key={material}
                        className="border border-limestone/15 px-3 py-1.5 text-[11px] text-limestone/70"
                      >
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <h3 className="meta-label text-[9px] text-gold">Scope of work</h3>
                  <ul className="mt-3 space-y-2.5">
                    {project.scope.map((item) => (
                      <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-limestone/60">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onInquire(project)}
                  className="group mt-9 flex w-full items-center justify-between border border-gold px-5 py-4 text-[10px] font-medium uppercase tracking-meta text-gold transition-colors duration-500 ease-architectural hover:bg-gold hover:text-obsidian"
                >
                  Inquire about a similar scope
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
