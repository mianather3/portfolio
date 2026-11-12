import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { GithubIcon } from './BrandIcons.jsx';
import { EXPERIENCE, GITHUB, HONORS, PROFILE } from '../data/content.js';

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: 'easeOut' },
};

function ExperienceLedger() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader eyebrow="03 / Experience" line1="Where I've made" line2="systems move." />

      <ol className="mt-12 divide-y divide-black/10 rounded-3xl border border-black/5 bg-white px-6 py-4 shadow-sm sm:px-10">
        {EXPERIENCE.map((job) => (
          <motion.li key={job.org} {...reveal} className="grid gap-5 py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D97706]">{job.dates}</p>
              <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight">{job.org}</h3>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#059669]/25 bg-[#ECFDF5] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#059669]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                {job.title}
              </p>
            </div>
            <div className="md:col-span-6">
              <ul className="space-y-3">
                {job.bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#059669]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 md:text-right">
              <p className="font-serif text-6xl leading-none text-[#059669] sm:text-7xl">{job.metric}</p>
              <p className="mt-4 inline-block rounded-full border border-[#D97706]/25 bg-[#FFFBEB] px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#D97706]">
                {job.caption}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

function PhotoCard() {
  const fallback = `${import.meta.env.BASE_URL}images/community-placeholder.svg`;
  return (
    <motion.figure
      {...reveal}
      className="relative col-span-12 min-h-[360px] overflow-hidden rounded-3xl border border-black/5 bg-stone shadow-sm lg:col-span-5"
    >
      <img
        src={`${import.meta.env.BASE_URL}images/community.jpg`}
        alt="Mian Ather Ali with the Oxford Consortium delegation and campus community"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.dataset.fallback) return;
          img.dataset.fallback = 'true';
          img.src = fallback;
        }}
      />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink shadow-sm backdrop-blur-sm">
        Oxford Consortium &amp; Campus Leadership
      </figcaption>
    </motion.figure>
  );
}

function HonorsCard() {
  const { oxford, club, scholarships } = HONORS;
  return (
    <motion.article {...reveal} className="col-span-12 rounded-3xl bg-[#0B4F3A] p-8 text-white lg:col-span-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">Delegation</p>
      <h3 className="mt-4 font-serif text-4xl leading-[1.05]">{oxford.title}</h3>
      <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-[#F2C078]">{oxford.place}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-white/85">{oxford.body}</p>

      <div className="mt-7 border-t border-white/20 pt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">Leadership</p>
        <h4 className="mt-2 text-lg font-bold">
          {club.title} <span className="font-normal text-white/70">· {club.place}</span>
        </h4>
        <p className="mt-1 text-[15px] leading-relaxed text-white/85">{club.body}</p>
      </div>

      <div className="mt-7 border-t border-white/20 pt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">Scholarships</p>
        <ul className="mt-3 space-y-2.5">
          {scholarships.map((s, i) => (
            <li key={s} className="flex items-baseline gap-3 text-[15px] leading-snug">
              <span className="font-mono text-[11px] text-[#F2C078]">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function GithubCard() {
  return (
    <motion.a
      {...reveal}
      href={PROFILE.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-12 flex flex-col justify-between gap-12 rounded-3xl bg-[#EAE6DF] p-8 transition-colors hover:bg-[#E2DDD4] lg:col-span-3"
    >
      <div>
        <GithubIcon size={40} />
        <p className="mt-6 font-serif text-4xl leading-none">{GITHUB.handle}</p>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Languages across the projects</p>
        <p className="mt-2 font-mono text-[13px] font-medium leading-relaxed">{GITHUB.stack}</p>
      </div>
      <p className="flex items-center justify-between gap-3 border-t border-black/15 pt-5 font-mono text-[12px] font-bold text-emerald">
        {GITHUB.display}
        <ArrowUpRight
          size={22}
          className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </p>
    </motion.a>
  );
}

export default function ExperienceAndHonors() {
  return (
    <>
      <ExperienceLedger />
      <section id="honors" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeader eyebrow="04 / Oxford & Leadership" line1="Oxford, community" line2="& open source." />
        <div className="mt-12 grid grid-cols-12 gap-6">
          <PhotoCard />
          <HonorsCard />
          <GithubCard />
        </div>
      </section>
    </>
  );
}
