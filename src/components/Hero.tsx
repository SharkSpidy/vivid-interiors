import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { easeArchitectural, reveal, stagger } from '../lib/motion';

const metaItems = ['Ajman, UAE', 'Residential & Commercial', 'In-house joinery workshop'];

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-obsidian text-limestone">
      <img
        src="/images/travertine-lounge.jpg"
        alt="Double-height lounge with book-matched travertine wall and warm cove lighting"
        className="absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,rgba(197,179,142,0.10),transparent_60%)]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        {[25, 50, 75].map((left) => (
          <span
            key={left}
            className="absolute top-0 h-full w-px bg-limestone/[0.06]"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      <div className="container-editorial relative flex min-h-screen flex-col justify-end pb-0 pt-32">
        <motion.div
          variants={stagger(0.15, 0.11)}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col justify-center pb-20 pt-16 lg:max-w-[62%]"
        >
          <motion.div variants={reveal} className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/70" />
            <span className="meta-label text-[10px] text-gold">Interior fit-out & architectural joinery</span>
          </motion.div>

          <motion.h1
            variants={reveal}
            className="text-balance font-display text-[clamp(2.9rem,6.4vw,5.9rem)] font-light leading-[0.95] tracking-[-0.015em]"
          >
            Architectural woodwork
            <span className="block italic text-gold/90">&amp; interior fit-out</span>
            in the UAE.
          </motion.h1>

          <motion.p variants={reveal} className="mt-8 max-w-xl text-[15px] leading-relaxed text-limestone/65">
            We draw, machine and assemble in our own Ajman workshop, then install across Dubai, Sharjah and
            Abu Dhabi. Fluted walnut, rift-cut oak, curved glass partitions and stone walls, made to drawings
            that survive site conditions.
          </motion.p>

          <motion.div variants={reveal} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="group inline-flex items-center justify-between gap-8 border border-gold bg-gold px-7 py-4 text-[10px] font-semibold uppercase tracking-meta text-obsidian transition-colors duration-500 ease-architectural hover:bg-limestone"
            >
              View Selected Projects
              <ArrowDownRight className="h-4 w-4 transition-transform duration-500 ease-architectural group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.4} />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-between gap-8 border border-limestone/25 px-7 py-4 text-[10px] font-medium uppercase tracking-meta text-limestone transition-colors duration-500 ease-architectural hover:border-gold hover:text-gold"
            >
              Request a Site Visit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: easeArchitectural }}
          className="border-t border-limestone/12 py-6"
        >
          <ul className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {metaItems.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden="true" className="hidden h-1 w-1 bg-gold/60 sm:block" />}
                <span className="meta-label text-[9px] text-limestone/45 sm:text-[10px]">{item}</span>
              </li>
            ))}
            <li className="hidden sm:block">
              <a href="#projects" className="meta-label flex items-center gap-2 text-[9px] text-gold/70 hover:text-gold">
                Scroll
                <ArrowDownRight className="h-3 w-3" strokeWidth={1.4} />
              </a>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
