import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Segmented from './Segmented.jsx';
import SectionHeader from './SectionHeader.jsx';

const TONE = {
  primary: 'bg-gradient-to-r from-[#059669] to-[#10B981]',
  secondary: 'bg-[#D97706]',
  muted: 'bg-[#CBD5E1]',
};

const WORKLOADS = [
  {
    id: 'aether',
    tab: 'AetherLOB',
    channel: 'CH-1',
    title: 'Order-Processing Latency & Cache-Line Inspector',
    readouts: [
      { value: '19.7M–21.5M', unit: 'msg/s', label: 'Lock-free SPSC throughput' },
      { value: '13M+', unit: 'payloads', label: 'Differential fuzzer validated' },
      { value: '0', unit: 'B', label: 'Hot-path heap allocations' },
    ],
    charts: [
      {
        title: 'Order-Processing Latency latency · Poisson arrivals',
        scale: '0 – 400 ns · lower is better',
        bars: [
          { label: 'p50 Order-Processing Latency', display: '125 ns', pct: (125 / 400) * 100, tone: 'primary' },
          { label: 'p99 Order-Processing Latency', display: '375 ns', pct: (375 / 400) * 100, tone: 'secondary' },
        ],
      },
      {
        title: 'SPSC throughput range',
        scale: '0 – 25M msg/s · higher is better',
        bars: [
          {
            label: 'Lock-free SPSC',
            display: '19.7M–21.5M',
            start: (19.7 / 25) * 100,
            pct: ((21.5 - 19.7) / 25) * 100,
            tone: 'primary',
          },
        ],
      },
    ],
    inspector: true,
  },
  {
    id: 'nexus',
    tab: 'NexusGraph',
    channel: 'CH-2',
    title: 'SIMD & Multi-Hop RAG Verifier',
    readouts: [
      { value: '35', unit: 'ns', label: '768-dim SIMD dot' },
      { value: '2.0', unit: 'ms', label: 'Top-10 k-NN · 100K vectors' },
      { value: '155', unit: 'MiB', label: 'RSS at 100K vectors' },
      { value: '20,500', unit: 'req/s', label: 'HTTP · 302 µs p50 / 598 µs p99' },
    ],
    charts: [
      {
        title: 'Multi-hop evidence path recovery',
        scale: '0 – 100% · higher is better',
        bars: [
          { label: 'Hybrid Graph + BFS verification', display: '80%', pct: 80, tone: 'primary' },
          { label: 'Vector-only baseline', display: '20%', pct: 20, tone: 'muted' },
        ],
      },
      {
        title: 'SIMD kernel latency',
        scale: '0 – 40 ns · lower is better',
        bars: [
          { label: '384-dim cosine', display: '26.5 ns', pct: (26.5 / 40) * 100, tone: 'secondary' },
          { label: '768-dim dot', display: '35 ns', pct: (35 / 40) * 100, tone: 'primary' },
        ],
      },
    ],
  },
  {
    id: 'clausly',
    tab: 'Clausly & DAG',
    channel: 'CH-3',
    title: 'Deterministic Verification',
    readouts: [
      { value: '100', unit: '%', label: 'Legal citation precision' },
      { value: '360', unit: 'suites', label: 'Test suites' },
      { value: '50', unit: 'states', label: 'US jurisdictions' },
    ],
    charts: [
      {
        title: 'Legal citation precision',
        scale: '0 – 100% · higher is better',
        bars: [
          { label: 'Deterministic statutory validator', display: '100%', pct: 100, tone: 'primary' },
          { label: 'Unconstrained LLM baseline', display: '7%', pct: 7, tone: 'muted' },
        ],
      },
    ],
    note: 'Spreadsheet Engine: O(V + E) topological DAG execution with cycle resolution across a 1,300-cell runtime.',
  },
];

function Bar({ bar, index }) {
  return (
    <div className="grid grid-cols-[minmax(0,7.5rem)_1fr_auto] sm:grid-cols-[minmax(0,15rem)_1fr_auto] items-center gap-3">
      <span className="text-[12.5px] leading-snug text-ink-2">{bar.label}</span>
      <span className="relative block h-4 rounded-[3px] bg-stone shadow-well">
        <motion.span
          className={`absolute inset-y-0 rounded-[3px] ${TONE[bar.tone]}`}
          style={{ left: `${bar.start ?? 0}%`, minWidth: 3 }}
          initial={{ width: 0 }}
          animate={{ width: `${bar.pct}%` }}
          transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </span>
      <span className="w-[6.5rem] text-right font-mono text-[12.5px] font-bold">{bar.display}</span>
    </div>
  );
}

function CacheLineInspector() {
  const [aligned, setAligned] = useState(true);
  // Each row is one 64-byte cache line drawn as eight 8-byte words.
  const lines = aligned
    ? [
        ['head', null, null, null, null, null, null, null],
        ['tail', null, null, null, null, null, null, null],
      ]
    : [
        ['head', 'tail', null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ];
  return (
    <div className="mt-6 border border-line bg-paper p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="idx text-ink">Cache-line inspector</p>
          <p className="mt-1.5 text-[12px] text-ink-3">Schematic: where the SPSC head and tail indices land.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={aligned}
          onClick={() => setAligned((v) => !v)}
          className="flex items-center gap-2.5"
        >
          <span className="font-mono text-[11px] font-medium">alignas(64)</span>
          <span
            className={`flex h-6 w-11 items-center rounded-full border p-0.5 shadow-well transition-colors ${
              aligned ? 'justify-end border-emerald bg-emerald' : 'justify-start border-line bg-stone'
            }`}
          >
            <motion.span layout transition={{ type: 'spring', stiffness: 600, damping: 36 }} className="h-[18px] w-[18px] rounded-full bg-white shadow-key" />
          </span>
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {lines.map((line, row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="w-14 shrink-0 font-mono text-[10px] uppercase text-ink-3">Line {row}</span>
            <div className="grid flex-1 grid-cols-8 gap-1">
              {line.map((word, i) => (
                <span
                  key={i}
                  className={`grid h-7 place-items-center rounded-[2px] border font-mono text-[9.5px] font-medium uppercase ${
                    word ? 'border-transparent' : 'border-line bg-card text-ink-3/60'
                  }`}
                >
                  {word ? (
                    <motion.span
                      layoutId={`word-${word}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className={`grid h-full w-full place-items-center rounded-[2px] text-white ${
                        word === 'head' ? 'bg-emerald' : 'bg-amber'
                      }`}
                    >
                      {word}
                    </motion.span>
                  ) : (
                    '··'
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className={`mt-3 font-mono text-[11px] ${aligned ? 'text-ink-2' : 'font-bold text-amber'}`}>
        {aligned
          ? '64 B per line · producer and consumer indices isolated on separate lines'
          : 'Indices share one line · producer and consumer writes invalidate each other (false sharing)'}
      </p>
    </div>
  );
}

const SUMMARY = [
  { value: '125 ns', label: 'L3 p50' },
  { value: '35 ns', label: 'SIMD Dot' },
  { value: '20.5K req/s', label: 'HTTP' },
  { value: '360', label: 'Test Suites' },
];

export default function TelemetryLab() {
  const [active, setActive] = useState(WORKLOADS[0].id);
  const workload = WORKLOADS.find((w) => w.id === active);

  return (
    <section id="telemetry" className="px-3 sm:px-5">
      <div className="mx-auto my-16 max-w-7xl rounded-[36px] bg-gradient-to-br from-[#0A3D2E] via-[#0D523E] to-[#072B20] p-6 text-white shadow-xl sm:p-14">
        <SectionHeader eyebrow="02 / Telemetry" line1="Proof lives in" line2="the telemetry." tone="dark" />

        <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {SUMMARY.map((s, i) => (
            <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-5">
              <dd className={`font-serif text-4xl leading-none sm:text-6xl ${i % 2 === 0 ? 'text-[#FBBF24]' : 'text-white'}`}>
                {s.value}
              </dd>
              <dt className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#A7F3D0]">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="relative mt-6 rounded-3xl bg-card p-4 text-ink shadow-lg sm:p-8">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <div className="flex items-center gap-3">
              <span className="live-dot h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_0_3px_rgba(217,119,6,0.2)]" />
              <span className="idx text-ink">Benchmark Studio</span>
              <span className="idx hidden sm:inline">/ 3 channels</span>
            </div>
            <Segmented
              label="Select workload"
              options={WORKLOADS.map((w) => ({ id: w.id, label: w.tab }))}
              value={active}
              onChange={setActive}
            />
          </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={workload.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="grid gap-8 pt-6 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <p className="idx">
                <span className="font-semibold text-[#D97706]">{workload.channel}</span> / {workload.tab}
              </p>
              <h3 className="mt-3 font-serif text-3xl leading-tight">{workload.title}</h3>
              <dl className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {workload.readouts.map((r, i) => (
                  <div key={r.label} className={`rounded-xl border px-4 py-3.5 ${i % 3 === 2 ? 'border-[#D97706]/25 bg-[#FFFBEB]/80' : 'border-[#059669]/20 bg-[#ECFDF5]/70'}`}>
                    <dd className="font-mono text-2xl font-bold leading-none tracking-tight text-[#059669]">
                      {r.value}
                      <span className="ml-1.5 text-[11px] font-semibold text-[#D97706]">{r.unit}</span>
                    </dd>
                    <dt className="idx mt-2.5 text-[10px] text-[#575551]">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-7">
                {workload.charts.map((chart) => (
                  <div key={chart.title}>
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
                      <h4 className="text-sm font-bold">{chart.title}</h4>
                      <span className="idx text-[10px]">{chart.scale}</span>
                    </div>
                    <div className="space-y-2.5">
                      {chart.bars.map((bar, i) => (
                        <Bar key={bar.label} bar={bar} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {workload.inspector && <CacheLineInspector />}
              {workload.note && (
                <p className="mt-6 border-l-2 border-emerald bg-paper px-4 py-3 text-[13.5px] leading-relaxed text-ink-2">
                  {workload.note}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-[#A7F3D0]/90">
          Verified release-build telemetry (cargo bench / Google Benchmark -O3) • ARM64 NEON &amp; x86_64 AVX2 • Reproduce via
          each repository&apos;s benchmark harness.
        </p>
      </div>
    </section>
  );
}
