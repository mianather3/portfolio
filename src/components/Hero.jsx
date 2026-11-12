import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import { HERO_SPECS, PROFILE, RESUMES } from '../data/content.js';
import { asset } from '../lib/paths.js';

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      // Fallback for browsers without async clipboard access.
      const el = document.createElement('textarea');
      el.value = PROFILE.email;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    setCopied(true);
  };

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={copy} className="pill-link font-mono text-[12px]" aria-label={`Copy email ${PROFILE.email}`}>
        {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
        {PROFILE.email}
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] font-medium text-paper shadow-key"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function PortraitFrame() {
  const fallback = asset('images/profile-placeholder.svg');
  return (
    <div className="mx-auto w-full max-w-sm">
      <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-[#EAE6DF] shadow-lg">
        <img
          src={asset('images/profile.jpg')}
          alt="Portrait of Mian Ather Ali"
          className="h-full w-full object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback) return;
            img.dataset.fallback = 'true';
            img.src = fallback;
          }}
        />
        <figcaption className="absolute bottom-3 left-3 right-3 flex w-fit max-w-[calc(100%-1.5rem)] items-start gap-2.5 rounded-xl border border-white/50 bg-white/75 px-3.5 py-2.5 shadow-sm backdrop-blur-md">
          <span className="live-dot mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#D97706]" />
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold leading-snug">{PROFILE.portraitLine}</span>
            <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-2">
              {PROFILE.portraitSub}
            </span>
          </span>
        </figcaption>
      </figure>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border border-[#059669]/20 bg-gradient-to-br from-white via-[#FBF9F4] to-[#ECFDF5]/60 p-5 shadow-sm">
        {HERO_SPECS.map((s) => (
          <div key={s.label}>
            <dd className="whitespace-nowrap font-serif text-2xl leading-none text-[#059669] sm:text-3xl">
              {s.value}
              <span className="ml-1 text-[0.72em] text-[#D97706]">{s.unit}</span>
            </dd>
            <dt className="mt-2 font-mono text-[9.5px] font-medium uppercase leading-snug tracking-[0.08em] text-[#575551]">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-40">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="inline-flex items-start gap-2.5 font-mono text-[10.5px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#D97706] sm:text-[11px]">
            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#059669]" />
            {PROFILE.eyebrow}
          </p>

          <h1 className="mt-7 text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.1rem]">
            Engineering{' '}
            <em className="font-serif text-[1.1em] font-normal italic tracking-[-0.01em] text-emerald">
              deterministic low-latency systems
            </em>{' '}
            &amp; multi-tenant AI infrastructure with{' '}
            <em className="font-serif text-[1.1em] font-normal italic tracking-[-0.01em] text-emerald">
              industrial precision.
            </em>
          </h1>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={RESUMES.quant.href} target="_blank" rel="noopener noreferrer" className="btn bg-[#0B4F3A] text-white hover:bg-[#059669]">
              {RESUMES.quant.label} (PDF)
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
            <a href={RESUMES.infra.href} target="_blank" rel="noopener noreferrer" className="btn bg-[#141413] text-white hover:bg-black">
              {RESUMES.infra.label} (PDF)
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="pill-link">
              <GithubIcon size={15} />
              github.com/mianather3
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="pill-link">
              <LinkedinIcon size={14} />
              linkedin.com/in/mianather
            </a>
            <CopyEmail />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <PortraitFrame />
        </motion.div>
      </div>
    </section>
  );
}
