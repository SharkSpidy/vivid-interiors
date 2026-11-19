import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { easeArchitectural } from '../lib/motion';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Woodwork & Materials', href: '#materials' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-architectural ${
          scrolled
            ? 'border-b border-gold/15 bg-obsidian/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-editorial flex h-[76px] items-center justify-between gap-6 lg:h-[88px]"
        >
          <a href="#top" className="shrink-0" aria-label="Vivid Interiors, back to top">
            <BrandLogo variant="compact" tone="light" />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="meta-label link-underline text-[10px] text-limestone/65 transition-colors duration-300 hover:text-limestone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 border border-gold/45 px-6 py-3 text-[10px] font-medium uppercase tracking-meta text-limestone transition-colors duration-500 ease-architectural hover:border-gold hover:bg-gold hover:text-obsidian sm:inline-flex"
            >
              Book Consultation
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-architectural group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.25} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-gold/25 text-limestone transition-colors duration-300 hover:bg-gold hover:text-obsidian lg:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeArchitectural }}
            className="fixed inset-0 z-[70] flex flex-col bg-obsidian text-limestone lg:hidden"
          >
            <div className="container-editorial flex h-[76px] items-center justify-between border-b border-gold/15">
              <BrandLogo variant="compact" tone="light" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center border border-gold/25 transition-colors duration-300 hover:bg-gold hover:text-obsidian"
              >
                <X className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-editorial flex flex-1 flex-col justify-center py-10">
              <ul className="flex flex-col">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 + index * 0.06, ease: easeArchitectural }}
                    className="border-b border-limestone/10"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-6"
                    >
                      <span className="font-display text-3xl font-light">{link.label}</span>
                      <span className="meta-label text-[9px] text-gold/70">0{index + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeArchitectural }}
                className="mt-12 flex flex-col gap-4"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border border-gold px-6 py-4 text-[10px] font-medium uppercase tracking-meta text-gold transition-colors duration-300 hover:bg-gold hover:text-obsidian"
                >
                  Book Consultation
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
                </a>
                <p className="meta-label text-[9px] leading-relaxed text-limestone/40">
                  Ajman workshop · Dubai · Sharjah · Abu Dhabi
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
