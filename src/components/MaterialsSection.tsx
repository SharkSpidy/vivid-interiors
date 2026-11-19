import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { materials } from '../data/materials';
import { easeArchitectural, reveal, stagger, viewport } from '../lib/motion';

export default function MaterialsSection() {
  const [activeId, setActiveId] = useState(materials[0].id);
  const active = materials.find((material) => material.id === activeId) ?? materials[0];

  return (
    <section id="materials" className="scroll-mt-24 border-y border-ink/10 bg-sand py-24 text-ink md:py-32">
      <div className="container-editorial">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <motion.div variants={reveal} className="mb-6 flex items-center gap-4">
              <span className="meta-label text-[10px] text-gold-deep">02 / Woodwork &amp; materials</span>
              <span className="h-px w-12 bg-ink/15" />
            </motion.div>
            <motion.h2
              variants={reveal}
              className="font-display text-[clamp(2.3rem,4.2vw,3.7rem)] leading-[1.02] tracking-[-0.01em]"
            >
              Four finishes we know
              <span className="block italic">down to the last coat.</span>
            </motion.h2>
          </div>
          <motion.p variants={reveal} className="text-sm leading-relaxed text-ink-muted lg:col-span-5">
            Every panel starts as a spec sheet. Select a finish to see the veneer, core and lacquer build we
            use, plus what the coastal air does to it over five years.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <ul className="border-t border-ink/15">
              {materials.map((material, index) => {
                const selected = material.id === active.id;
                return (
                  <li key={material.id} className="border-b border-ink/15">
                    <button
                      type="button"
                      onClick={() => setActiveId(material.id)}
                      aria-pressed={selected}
                      className="group relative flex w-full items-start gap-5 py-6 text-left"
                    >
                      {selected && (
                        <motion.span
                          layoutId="material-indicator"
                          transition={{ duration: 0.5, ease: easeArchitectural }}
                          className="absolute left-0 top-0 h-full w-px bg-gold-deep"
                        />
                      )}
                      <span
                        className={`meta-label mt-1.5 text-[9px] transition-colors duration-300 ${
                          selected ? 'text-gold-deep' : 'text-ink-muted/60'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 pl-2">
                        <span
                          className={`block font-display text-2xl leading-tight transition-colors duration-300 md:text-[27px] ${
                            selected ? 'text-ink' : 'text-ink/55 group-hover:text-ink'
                          }`}
                        >
                          {material.name}
                        </span>
                        <span className="mt-1 block text-[11px] leading-relaxed text-ink-muted">
                          {material.species}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`mt-2 h-4 w-4 shrink-0 transition-all duration-500 ease-architectural ${
                          selected ? 'text-gold-deep' : 'text-ink/20 group-hover:text-ink/50'
                        }`}
                        strokeWidth={1.25}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 max-w-sm text-[11px] leading-relaxed text-ink-muted">
              Samples of all four finishes are kept in the Ajman studio. Bring a floor tile or a stone offcut
              and we will match it in daylight.
            </p>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: easeArchitectural }}
                className="bg-obsidian text-limestone"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={active.image}
                    alt={`${active.name} finish reference`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
                    <div>
                      <span className="meta-label text-[8.5px] text-gold">Finish {String(materials.indexOf(active) + 1).padStart(2, '0')}</span>
                      <h3 className="mt-2 font-display text-[26px] leading-tight md:text-[32px]">{active.name}</h3>
                    </div>
                    <span className="meta-label hidden shrink-0 text-[8.5px] text-limestone/45 sm:block">
                      Ajman workshop
                    </span>
                  </div>
                </div>

                <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
                  <div>
                    <p className="text-[13px] leading-relaxed text-limestone/65">{active.description}</p>
                    <h4 className="meta-label mt-6 text-[9px] text-gold">Common applications</h4>
                    <ul className="mt-3 space-y-2">
                      {active.applications.map((application) => (
                        <li key={application} className="flex items-center gap-2.5 text-[12px] text-limestone/60">
                          <span aria-hidden="true" className="h-px w-3 bg-gold/50" />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="meta-label text-[9px] text-gold">Technical build-up</h4>
                    <dl className="mt-3 divide-y divide-limestone/10 border-y border-limestone/10">
                      {active.technical.map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                          <dt className="text-[10px] uppercase tracking-[0.12em] text-dark-muted/60">{row.label}</dt>
                          <dd className="text-right text-[12px] text-limestone/85">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mx-6 mb-6 border border-gold/25 bg-gold/[0.04] p-5 md:mx-8 md:mb-8">
                  <h4 className="meta-label flex items-center gap-2 text-[9px] text-gold">
                    <span aria-hidden="true" className="h-1 w-1 bg-gold" />
                    UAE climate finish note
                  </h4>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-limestone/60">{active.climateNote}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
