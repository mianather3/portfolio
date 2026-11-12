// Two-tone editorial heading. Eyebrow in burnished gold with an emerald dot;
// line 1 roman, line 2 italic in vibrant emerald (amber gold on the dark block).
const TONES = {
  light: { eyebrow: 'text-[#D97706]', dot: 'bg-[#059669]', line1: 'text-ink', line2: 'text-[#059669]', note: 'text-ink-2' },
  dark: { eyebrow: 'text-[#F59E0B]', dot: 'bg-[#34D399]', line1: 'text-white', line2: 'text-[#FBBF24]', note: 'text-white/80' },
};

export default function SectionHeader({ eyebrow, line1, line2, note, tone = 'light' }) {
  const t = TONES[tone];
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className={`flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.18em] ${t.eyebrow}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
            {eyebrow}
          </p>
        )}
        <h2 className="mt-5 font-serif text-[2.75rem] leading-[1] tracking-[-0.01em] sm:text-6xl lg:text-7xl">
          <span className={`block ${t.line1}`}>{line1}</span>
          <em className={`block italic ${t.line2}`}>{line2}</em>
        </h2>
      </div>
      {note && <p className={`max-w-xs text-[15px] leading-relaxed md:pb-2 ${t.note}`}>{note}</p>}
    </header>
  );
}
