import { motion } from 'framer-motion';
import { reveal, stagger, viewport } from '../lib/motion';

const steps = [
  {
    number: '01',
    title: 'Site survey & brief',
    duration: 'Week 1',
    detail:
      'We measure the room, photograph the services and check how the doors and windows actually sit. The brief gets written down with dimensions, budgets and the finish schedule agreed before anything is drawn.',
  },
  {
    number: '02',
    title: '3D visualisation & shop drawings',
    duration: 'Weeks 2 to 4',
    detail:
      'You see the joinery in 3D, then we produce shop drawings at 1:1 for every panel, flute pitch and hinge. These are the drawings the workshop builds from, not a sales sketch.',
  },
  {
    number: '03',
    title: 'Ajman workshop fabrication',
    duration: 'Weeks 4 to 10',
    detail:
      'CNC cutting, veneer sequencing and edge banding happen under one roof. Every unit is dry-fitted and checked square in the workshop, with client sign-off on the sample panel before lacquer.',
  },
  {
    number: '04',
    title: 'On-site installation & handover',
    duration: 'Final week',
    detail:
      'The same fitters who dry-fitted the units travel to site. Floors and lifts are protected, daily clean-down is part of the programme, and we walk the job with you before the snag list is closed.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-obsidian py-24 text-limestone md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(197,179,142,0.10),transparent_55%)]"
      />
      <div className="container-editorial relative">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-8 border-b border-limestone/12 pb-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <motion.div variants={reveal} className="mb-6 flex items-center gap-4">
              <span className="meta-label text-[10px] text-gold">03 / Process</span>
              <span className="h-px w-12 bg-limestone/20" />
            </motion.div>
            <motion.h2
              variants={reveal}
              className="font-display text-[clamp(2.3rem,4.2vw,3.7rem)] leading-[1.02] tracking-[-0.01em]"
            >
              One workshop, one team,
              <span className="block italic text-gold/90">from survey to handover.</span>
            </motion.h2>
          </div>
          <motion.p variants={reveal} className="text-sm leading-relaxed text-limestone/55 lg:col-span-5">
            Twelve to sixteen weeks is typical for a villa package, less for a single room. Because fabrication
            stays in Ajman, a change to the drawings does not wait on a shipment from Europe.
          </motion.p>
        </motion.div>

        <ol className="mt-2">
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-1 gap-4 border-b border-limestone/10 py-9 md:grid-cols-12 md:items-start md:gap-6 md:py-10"
            >
              <div className="flex items-baseline gap-4 md:col-span-2 md:block">
                <span className="font-display text-3xl leading-none text-gold md:text-[40px]">{step.number}</span>
                <span className="meta-label text-[9px] text-dark-muted/60 md:mt-2 md:block">{step.duration}</span>
              </div>
              <h3 className="font-display text-2xl leading-tight md:col-span-5 md:text-[30px]">{step.title}</h3>
              <p className="text-[13px] leading-relaxed text-limestone/55 md:col-span-5">{step.detail}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8 }}
          className="mt-10 flex flex-col gap-4 text-[10px] uppercase tracking-[0.18em] text-limestone/40 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>CNC cutting · Veneer matching · Dry fitting in Ajman</span>
          <span className="text-gold/60">No subcontracted installers</span>
        </motion.div>
      </div>
    </section>
  );
}
