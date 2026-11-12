import { useId } from 'react';
import { motion } from 'framer-motion';

// Tactile pill toggle. The emerald key slides between options via a shared layoutId.
export default function Segmented({ options, value, onChange, label, className = '' }) {
  const id = useId();
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`inline-flex max-w-full flex-wrap gap-0.5 rounded-[1.25rem] border border-line bg-stone p-1 shadow-well ${className}`}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={`relative whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] transition-colors ${
              active ? 'text-white' : 'text-ink-2 hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                className="absolute inset-0 rounded-full bg-emerald shadow-key"
                transition={{ type: 'spring', stiffness: 520, damping: 40 }}
              />
            )}
            <span className="relative z-10">
              {opt.label}
              {opt.count != null && <span className="ml-1.5 opacity-70">({opt.count})</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
