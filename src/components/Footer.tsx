import { ArrowUp, ArrowUpRight, Instagram } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { studio } from '../data/studio';

const navLinks = [
  { label: 'Selected Projects', href: '#projects' },
  { label: 'Woodwork & Materials', href: '#materials' },
  { label: 'Process', href: '#process' },
  { label: 'Studio & Inquiries', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-obsidian text-limestone">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <BrandLogo variant="stacked" tone="light" align="start" />
            <p className="mt-8 max-w-[290px] text-[13px] leading-relaxed text-limestone/50">
              Architectural joinery and interior fit-out, fabricated in Ajman and installed across the Emirates.
            </p>
            <p className="meta-label mt-6 text-[9px] text-gold/70">Ajman · Dubai · Sharjah · Abu Dhabi</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="meta-label text-[9px] text-dark-muted/60">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline text-[13px] text-limestone/70 transition-colors duration-300 hover:text-limestone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="meta-label text-[9px] text-dark-muted/60">Studio</h2>
            <ul className="mt-5 space-y-3 text-[13px] text-limestone/70">
              <li>
                <a href={`mailto:${studio.email}`} className="link-underline hover:text-limestone">
                  {studio.email}
                </a>
              </li>
              <li>
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-limestone"
                >
                  <Instagram className="h-3.5 w-3.5 text-gold/70" strokeWidth={1.25} />
                  {studio.instagramHandle}
                </a>
              </li>
              <li className="text-limestone/45">{studio.hours}</li>
              <li>
                <a
                  href="#contact"
                  className="mt-2 inline-flex items-center gap-2 border border-gold/35 px-4 py-2.5 text-[9px] uppercase tracking-meta text-gold transition-colors duration-500 hover:bg-gold hover:text-obsidian"
                >
                  Book a consultation
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-limestone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-limestone/35">
            © {new Date().getFullYear()} {studio.legalName}, Ajman, United Arab Emirates. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-meta text-limestone/45 transition-colors duration-300 hover:text-gold"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5" strokeWidth={1.4} />
          </a>
        </div>
      </div>
    </footer>
  );
}
