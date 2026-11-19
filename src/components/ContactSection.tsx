import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { emirates, projectScopes, studio } from '../data/studio';
import type { InquiryErrors, InquiryForm, ProjectScope } from '../types';
import { easeArchitectural, reveal, stagger, viewport } from '../lib/motion';

const emptyForm: InquiryForm = {
  fullName: '',
  phone: '',
  emirate: '',
  scope: '',
  brief: '',
};

interface ContactSectionProps {
  prefill: { scope: ProjectScope; nonce: number } | null;
}

function validate(values: InquiryForm): InquiryErrors {
  const errors: InquiryErrors = {};
  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please write your name as we should address you.';
  }
  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) {
    errors.phone = 'A phone or WhatsApp number is needed for the site visit.';
  } else if (digits.length < 8 || digits.length > 15) {
    errors.phone = 'Check the number, including the country code.';
  }
  if (!values.emirate) errors.emirate = 'Select the emirate for the project.';
  if (!values.scope) errors.scope = 'Select the work you have in mind.';
  return errors;
}

function briefText(values: InquiryForm) {
  return [
    'New inquiry via vividinteriors.ae',
    `Name: ${values.fullName.trim()}`,
    `Phone / WhatsApp: ${values.phone.trim()}`,
    `Emirate: ${values.emirate}`,
    `Scope: ${values.scope}`,
    values.brief.trim() ? `Brief: ${values.brief.trim()}` : 'Brief: to be discussed',
  ].join('\n');
}

export default function ContactSection({ prefill }: ContactSectionProps) {
  const [values, setValues] = useState<InquiryForm>(emptyForm);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const scopeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!prefill) return;
    setValues((current) => ({ ...current, scope: prefill.scope }));
    setErrors((current) => ({ ...current, scope: undefined }));
    setSubmitted(false);
    scopeRef.current?.focus({ preventScroll: true });
  }, [prefill]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const update = (key: keyof InquiryForm, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(studio.email);
      setToast('Email address copied.');
    } catch {
      setToast(`Copy blocked by the browser. The address is ${studio.email}`);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const field = event.currentTarget.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      field?.focus();
      return;
    }
    setSubmitted(true);
  };

  const reset = () => {
    setValues(emptyForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-limestone py-24 text-ink md:py-32">
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
              <span className="meta-label text-[10px] text-gold-deep">04 / Studio &amp; inquiries</span>
              <span className="h-px w-12 bg-ink/15" />
            </motion.div>
            <motion.h2
              variants={reveal}
              className="font-display text-[clamp(2.3rem,4.2vw,3.7rem)] leading-[1.02] tracking-[-0.01em]"
            >
              Send the room dimensions.
              <span className="block italic">We will bring the samples.</span>
            </motion.h2>
          </div>
          <motion.p variants={reveal} className="text-sm leading-relaxed text-ink-muted lg:col-span-5">
            A site visit in Ajman, Dubai, Sharjah or Abu Dhabi usually happens within a week. If you already
            have drawings or a mood board, mention it in the brief and we will come prepared.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={stagger(0, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-5"
          >
            <motion.div variants={reveal}>
              <h3 className="font-display text-2xl md:text-[28px]">Ajman studio &amp; joinery workshop</h3>
              <div className="mt-4 flex gap-3 text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.25} />
                <address className="not-italic text-[13px] leading-relaxed">
                  {studio.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </motion.div>

            <motion.dl variants={reveal} className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              <div className="flex items-start gap-3 py-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.25} />
                <div className="flex-1">
                  <dt className="meta-label text-[8.5px] text-ink-muted/70">Direct line</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink">
                    {studio.phoneDisplay}
                    <span className="border border-gold-deep/40 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-gold-deep">
                      Placeholder
                    </span>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 py-4">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.25} />
                <div className="flex-1">
                  <dt className="meta-label text-[8.5px] text-ink-muted/70">Email</dt>
                  <dd className="mt-1 text-sm text-ink">{studio.email}</dd>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 border border-ink/15 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 hover:border-gold-deep hover:text-ink"
                >
                  <Copy className="h-3 w-3" strokeWidth={1.4} />
                  Copy
                </button>
              </div>
              <div className="flex items-start gap-3 py-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.25} />
                <div>
                  <dt className="meta-label text-[8.5px] text-ink-muted/70">Workshop hours</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink">{studio.hours}</dd>
                </div>
              </div>
            </motion.dl>

            <motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent('Hello Vivid Interiors, I would like to discuss a joinery or fit-out project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-between gap-4 border border-ink bg-ink px-5 py-3.5 text-[10px] font-medium uppercase tracking-meta text-limestone transition-colors duration-500 ease-architectural hover:bg-gold-deep hover:text-obsidian"
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.25} />
                  WhatsApp direct
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} />
              </a>
              <a
                href={studio.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-between gap-4 border border-ink/20 px-5 py-3.5 text-[10px] font-medium uppercase tracking-meta text-ink transition-colors duration-500 ease-architectural hover:border-gold-deep"
              >
                <span className="flex items-center gap-2.5">
                  <Instagram className="h-4 w-4" strokeWidth={1.25} />
                  {studio.instagramHandle}
                </span>
                <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} />
              </a>
            </motion.div>

            <motion.p variants={reveal} className="mt-6 text-[11px] leading-relaxed text-ink-muted">
              Street address and direct line are placeholders until the studio confirms them. Email and
              Instagram reach us today.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-7"
          >
            <div className="border border-ink/10 bg-sand p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeArchitectural }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center border border-gold-deep/50 text-gold-deep">
                      <Check className="h-5 w-5" strokeWidth={1.25} />
                    </div>
                    <h3 className="mt-6 font-display text-3xl">Brief received.</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                      Thank you, {values.fullName.trim().split(' ')[0]}. Copy the brief to WhatsApp if you want
                      the studio to see it before the working day starts.
                    </p>

                    <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10 text-[13px]">
                      {[
                        { label: 'Phone', value: values.phone },
                        { label: 'Emirate', value: values.emirate },
                        { label: 'Scope', value: values.scope },
                        { label: 'Brief', value: values.brief.trim() || 'To be discussed' },
                      ].map((row) => (
                        <div key={row.label} className="flex gap-4 py-3">
                          <dt className="w-20 shrink-0 text-[9px] uppercase tracking-[0.14em] text-ink-muted/70">
                            {row.label}
                          </dt>
                          <dd className="text-ink">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={`https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(briefText(values))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-1 items-center justify-between gap-4 border border-ink bg-ink px-5 py-3.5 text-[10px] font-medium uppercase tracking-meta text-limestone transition-colors duration-500 ease-architectural hover:bg-gold-deep hover:text-obsidian"
                      >
                        Open brief in WhatsApp
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} />
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="border border-ink/20 px-5 py-3.5 text-[10px] font-medium uppercase tracking-meta text-ink transition-colors duration-300 hover:border-gold-deep"
                      >
                        Edit details
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl md:text-[26px]">Project inquiry</h3>
                      <span className="meta-label text-[8.5px] text-ink-muted/60">1 of 1</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                      Fields marked with an asterisk are needed to arrange the visit.
                    </p>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="meta-label mb-2 block text-[9px] text-ink-muted">
                          Full name *
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          value={values.fullName}
                          onChange={(event) => update('fullName', event.target.value)}
                          aria-invalid={Boolean(errors.fullName)}
                          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                          className={`field ${errors.fullName ? 'field-error' : ''}`}
                          placeholder="Your name"
                        />
                        {errors.fullName && (
                          <p id="fullName-error" className="mt-2 text-[11px] text-[#8C3B2E]">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="meta-label mb-2 block text-[9px] text-ink-muted">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={(event) => update('phone', event.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          className={`field ${errors.phone ? 'field-error' : ''}`}
                          placeholder="+971 50 000 0000"
                        />
                        {errors.phone && (
                          <p id="phone-error" className="mt-2 text-[11px] text-[#8C3B2E]">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="emirate" className="meta-label mb-2 block text-[9px] text-ink-muted">
                          Emirate *
                        </label>
                        <div className="relative">
                          <select
                            id="emirate"
                            name="emirate"
                            value={values.emirate}
                            onChange={(event) => update('emirate', event.target.value)}
                            aria-invalid={Boolean(errors.emirate)}
                            aria-describedby={errors.emirate ? 'emirate-error' : undefined}
                            className={`field appearance-none pr-10 ${errors.emirate ? 'field-error' : ''} ${
                              values.emirate ? '' : 'text-ink-muted/70'
                            }`}
                          >
                            <option value="">Select emirate</option>
                            {emirates.map((emirate) => (
                              <option key={emirate} value={emirate}>
                                {emirate}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                            strokeWidth={1.25}
                          />
                        </div>
                        {errors.emirate && (
                          <p id="emirate-error" className="mt-2 text-[11px] text-[#8C3B2E]">
                            {errors.emirate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="scope" className="meta-label mb-2 block text-[9px] text-ink-muted">
                          Project scope *
                        </label>
                        <div className="relative">
                          <select
                            id="scope"
                            name="scope"
                            ref={scopeRef}
                            value={values.scope}
                            onChange={(event) => update('scope', event.target.value)}
                            aria-invalid={Boolean(errors.scope)}
                            aria-describedby={errors.scope ? 'scope-error' : undefined}
                            className={`field appearance-none pr-10 ${errors.scope ? 'field-error' : ''} ${
                              values.scope ? '' : 'text-ink-muted/70'
                            }`}
                          >
                            <option value="">Select scope</option>
                            {projectScopes.map((scope) => (
                              <option key={scope} value={scope}>
                                {scope}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                            strokeWidth={1.25}
                          />
                        </div>
                        {errors.scope && (
                          <p id="scope-error" className="mt-2 text-[11px] text-[#8C3B2E]">
                            {errors.scope}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <div className="mb-2 flex items-baseline justify-between">
                          <label htmlFor="brief" className="meta-label text-[9px] text-ink-muted">
                            Estimated area / brief
                          </label>
                          <span className="text-[10px] text-ink-muted/60">{values.brief.length}/600</span>
                        </div>
                        <textarea
                          id="brief"
                          name="brief"
                          rows={4}
                          maxLength={600}
                          value={values.brief}
                          onChange={(event) => update('brief', event.target.value)}
                          className="field resize-none"
                          placeholder="e.g. 3-bedroom villa in Al Zorah, walnut wardrobes and a fluted TV wall, handover by March."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group mt-6 flex w-full items-center justify-between border border-ink bg-ink px-6 py-4 text-[10px] font-medium uppercase tracking-meta text-limestone transition-colors duration-500 ease-architectural hover:border-gold-deep hover:bg-gold-deep hover:text-obsidian"
                    >
                      Send inquiry
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-architectural group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} />
                    </button>
                    <p className="mt-3 text-[10px] leading-relaxed text-ink-muted/70">
                      This form confirms on your device. Nothing is sent to a server, and the WhatsApp option
                      opens with the brief already written.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: easeArchitectural }}
            className="fixed bottom-6 left-6 z-[90] flex max-w-sm items-center gap-3 border border-gold/30 bg-obsidian px-5 py-4 text-[12px] text-limestone shadow-xl"
          >
            <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
