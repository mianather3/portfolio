import { useEffect, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS, PROFILE } from '../data/content.js';

function NavPills({ active }) {
  const id = useId();
  return (
    <nav
      aria-label="Sections"
      className="no-scrollbar flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-black/5 bg-stone/70 p-1"
    >
      {NAV_LINKS.map((l) => {
        const on = active === l.href.slice(1);
        return (
          <a
            key={l.href}
            href={l.href}
            aria-current={on ? 'true' : undefined}
            className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              on ? 'text-white' : 'text-ink-2 hover:text-ink'
            }`}
          >
            {on && (
              <motion.span
                layoutId={`nav-${id}`}
                className="absolute inset-0 rounded-full bg-emerald"
                transition={{ type: 'spring', stiffness: 480, damping: 40 }}
              />
            )}
            <span className="relative z-10">{l.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

// Full-width studio header: transparent at the top, frosted with a hairline once scrolled.
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['top', ...NAV_LINKS.map((l) => l.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? 'border-black/5 bg-[#F6F3EC]/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#0B4F3A] font-mono text-xs font-bold tracking-[0.04em] text-white">
            MA
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold leading-tight tracking-tight">{PROFILE.name}</span>
            <span className="hidden truncate text-xs text-ink-2 sm:block">{PROFILE.role}</span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">
            <NavPills active={active} />
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap rounded-full bg-[#0D684A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0B4F3A] active:translate-y-px"
          >
            Let&apos;s talk ↗
          </a>
        </div>
      </div>

      <div className={`px-5 pb-2.5 sm:px-8 lg:hidden ${scrolled ? '' : 'hidden'}`}>
        <NavPills active={active} />
      </div>
    </header>
  );
}
