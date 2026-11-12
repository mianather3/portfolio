import { PROFILE, RESUMES } from '../data/content.js';

// Editorial closing card.
export default function Footer() {
  return (
    <footer id="contact" className="px-3 pb-8 pt-8 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-3xl bg-[#11221C] p-10 text-[#F6F3EC] sm:p-14">
        <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-[#F6F3EC]/70">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          Have a hard systems problem?
        </p>
        <h2 className="mt-6 font-serif text-6xl leading-[0.95] sm:text-8xl">
          <span className="block">Let&apos;s build</span>
          <span className="block">
            something <em className="italic text-[#E9A33B]">real.</em>
          </span>
        </h2>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <a
            href={`mailto:${PROFILE.email}`}
            className="break-all text-xl font-semibold underline decoration-[#F6F3EC]/40 decoration-2 underline-offset-[6px] hover:decoration-[#E9A33B] sm:text-3xl"
          >
            {PROFILE.email} ↗
          </a>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            {Object.values(RESUMES).map((r, i) => (
              <a
                key={r.file}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  i === 0
                    ? 'bg-[#F6F3EC] text-[#11221C] hover:bg-white'
                    : 'border border-[#F6F3EC]/40 hover:border-[#F6F3EC]'
                }`}
              >
                {r.short} Resume (PDF) ↗
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-[#F6F3EC]/20 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#F6F3EC]/80 sm:grid-cols-3 sm:items-center">
          <p>© 2026 Mian Ather Ali</p>
          <p className="flex gap-6 sm:justify-center">
            <a className="hover:text-white" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="hover:text-white" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
          <p className="sm:text-right">
            <a className="hover:text-white" href="#top">Back to top ↑</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
