import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project, ProjectFilter } from '../types';
import { easeArchitectural, reveal, stagger, viewport } from '../lib/motion';

const filters: ProjectFilter[] = ['All', 'Bespoke Woodwork', 'Commercial Fit-Out', 'Luxury Residential'];

const layoutFor = (index: number) => {
  const pattern = index % 4;
  if (pattern === 0) return { span: 'lg:col-span-7', ratio: 'aspect-[4/3]' };
  if (pattern === 1) return { span: 'lg:col-span-5', ratio: 'aspect-[4/5] lg:mt-20' };
  if (pattern === 2) return { span: 'lg:col-span-5', ratio: 'aspect-[4/5]' };
  return { span: 'lg:col-span-7', ratio: 'aspect-[4/3]' };
};

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void;
}

export default function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectFilter>('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="relative scroll-mt-24 bg-limestone py-24 text-ink md:py-32">
      <div className="container-editorial">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-10 border-b border-ink/10 pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.div variants={reveal} className="mb-6 flex items-center gap-4">
              <span className="meta-label text-[10px] text-gold-deep">01 / Selected work</span>
              <span className="h-px w-12 bg-ink/15" />
            </motion.div>
            <motion.h2
              variants={reveal}
              className="font-display text-[clamp(2.3rem,4.2vw,3.7rem)] leading-[1.02] tracking-[-0.01em]"
            >
              Six rooms we measured,
              <span className="block italic">machined and installed.</span>
            </motion.h2>
          </div>
          <motion.p variants={reveal} className="max-w-sm text-sm leading-relaxed text-ink-muted">
            Each project below lists the emirate, the year and the first scope item. Open a case study for the
            material schedule, areas and what happened on site.
          </motion.p>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" role="tablist" aria-label="Filter projects">
          {filters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={`relative pb-2 text-[10px] font-medium uppercase tracking-meta transition-colors duration-300 ${
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item}
                {active && (
                  <motion.span
                    layoutId="project-filter-underline"
                    transition={{ duration: 0.5, ease: easeArchitectural }}
                    className="absolute inset-x-0 bottom-0 h-px bg-gold-deep"
                  />
                )}
              </button>
            );
          })}
          <span className="meta-label ml-auto hidden text-[9px] text-ink-muted/70 sm:block">
            {String(visible.length).padStart(2, '0')} projects
          </span>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-y-20">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => {
              const layout = layoutFor(index);
              return (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease: easeArchitectural }}
                  className={`group ${layout.span}`}
                >
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    aria-label={`Open case study: ${project.title}`}
                    className="block w-full cursor-pointer text-left"
                  >
                    <div className={`relative overflow-hidden bg-sand ${layout.ratio}`}>
                      <img
                        src={project.image}
                        alt={`${project.title}, ${project.category.toLowerCase()} in ${project.emirate}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-architectural group-hover:scale-105"
                      />
                      <span className="absolute left-0 top-0 bg-limestone/95 px-3 py-2 text-[8.5px] font-medium uppercase tracking-meta text-ink">
                        {project.category}
                      </span>
                      <span className="absolute inset-0 bg-obsidian/0 transition-colors duration-700 group-hover:bg-obsidian/15" />
                      <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center border border-limestone/50 bg-obsidian/30 text-limestone opacity-0 backdrop-blur-sm transition-all duration-500 ease-architectural group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
                      </span>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-6 border-t border-ink/10 pt-4">
                      <div>
                        <h3 className="font-display text-[26px] leading-tight md:text-[30px]">{project.title}</h3>
                        <p className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                          {project.emirate} · {project.year} · {project.scope[0]}
                        </p>
                      </div>
                      <span className="meta-label pt-2 text-[9px] text-ink-muted/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <p className="mt-16 border-t border-ink/10 pt-6 text-xs text-ink-muted">
          Full material schedules and site photography available on request during a studio visit.
        </p>
      </div>
    </section>
  );
}
