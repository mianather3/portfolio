import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Segmented from './Segmented.jsx';
import SectionHeader from './SectionHeader.jsx';
import ProjectPlate from './Plates.jsx';
import { PROJECTS, TRACKS } from '../data/content.js';

const TRACK_TAG = { quant: 'Quant & Low-Latency', ai: 'AI & Distributed Infra' };

// Metric callouts alternate between a soft emerald badge and a warm amber one.
const METRIC_TINTS = {
  emerald: { box: 'border-[#059669]/20 bg-[#ECFDF5] text-[#065F46]', value: 'text-[#059669]' },
  amber: { box: 'border-[#D97706]/25 bg-[#FFFBEB] text-[#92400E]', value: 'text-[#B45309]' },
};

function ProjectCard({ project, fig }) {
  const flagship = project.flagship;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#059669]/15 bg-gradient-to-br from-[#ECFDF5] via-[#F5F2EB] to-[#FEF3C7]/50">
        <span className="absolute left-4 top-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#065F46]">
          FIG. {fig}
          {project.figTitle && ` // ${project.figTitle}`}
        </span>
        <div className="aspect-[2/1] w-full pt-3">
          <ProjectPlate kind={project.plate} />
        </div>
      </div>

      <p className="mt-6 font-mono text-[10.5px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#D97706]">
        {project.eyebrow ?? project.tracks.map((t) => TRACK_TAG[t]).join(' · ')}
      </p>
      <h3 className={`mt-2 font-serif leading-[1.05] ${flagship ? 'text-5xl' : 'text-4xl'}`}>{project.name}</h3>
      <p className={`mt-3 leading-relaxed text-ink-2 ${flagship ? 'max-w-xl text-base' : 'text-[15px]'}`}>
        {project.summary}
      </p>

      {project.metrics.length > 0 && (
        <dl className={`mt-6 grid grid-cols-2 gap-2.5 ${flagship ? 'sm:grid-cols-3' : ''}`}>
          {project.metrics.map((m, i) => {
            const tint = METRIC_TINTS[i % 3 === 2 ? 'amber' : 'emerald'];
            return (
              <div key={m.label} className={`rounded-xl border px-3.5 py-3 ${tint.box} ${m.wide ? 'col-span-2' : ''}`}>
                <dd className={`break-words font-mono font-bold leading-tight tracking-tight ${tint.value} ${flagship ? 'text-lg' : 'text-base'}`}>
                  {m.value}
                </dd>
                <dt className="mt-1 text-xs leading-snug">{m.label}</dt>
              </div>
            );
          })}
        </dl>
      )}

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li key={s} className="chip border-black/10 bg-[#F6F3EC] text-[#141413]">{s}</li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-[#059669]/40 px-4 py-2.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#065F46] transition-colors hover:border-[#059669] hover:bg-[#059669] hover:text-white"
        >
          View on GitHub
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D97706]/40 bg-[#FFFBEB] px-4 py-2.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-[#92400E] transition-colors hover:border-[#D97706] hover:bg-[#D97706] hover:text-white"
          >
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-current" />
            Live demo
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [track, setTrack] = useState('all');
  const count = (id) => (id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.tracks.includes(id)).length);
  const options = TRACKS.map((t) => ({ id: t.id, label: t.long, count: count(t.id) }));
  const visible = PROJECTS.filter((p) => track === 'all' || p.tracks.includes(track));

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="01 / Systems"
        line1="Built for throughput,"
        line2="verified to the nanosecond."
        note="Six builds, each with its own architectural plate. Filter by the track you are hiring for."
      />

      <div className="mt-10">
        <Segmented label="Filter projects by track" options={options} value={track} onChange={setTrack} />
      </div>

      {/* two flagships on top, then a 2x2 of the remaining four */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AnimatePresence initial={false}>
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} fig={String(PROJECTS.indexOf(p) + 1).padStart(2, '0')} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
