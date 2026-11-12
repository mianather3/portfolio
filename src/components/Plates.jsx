// Custom architectural plates: one SVG illustration per project.
// Palette: obsidian ink, vibrant emerald highlights, burnished gold secondaries.
const INK = '#141413';
const INK2 = '#575551';
const INK3 = '#85817A';
const LINE = '#DDD8CE';
const PAPER = '#F6F3EC';
const ACCENT = '#059669';
const AMBER = '#D97706';
const AMBER_SOFT = '#EBC27A';

const mono = { fontFamily: '"JetBrains Mono", ui-monospace, monospace', letterSpacing: '0.08em' };

function Label({ x, y, children, fill = INK3, size = 7.5, anchor = 'start', weight = 400 }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} style={mono}>
      {children}
    </text>
  );
}

function Plate({ title, children }) {
  return (
    <svg viewBox="0 0 480 240" role="img" aria-label={title} className="block h-full w-full">
      {/* registration ticks */}
      <path
        d="M12 20V12H20M460 12H468V20M468 220V228H460M20 228H12V220"
        fill="none"
        stroke={INK}
        strokeWidth="1"
      />
      {children}
    </svg>
  );
}

function Arrow({ d, stroke = INK, flow = false, dashed = false }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth="1.25"
      strokeDasharray={dashed ? '3 3' : undefined}
      className={flow ? 'plate-flow' : undefined}
      markerEnd={`url(#ah-${stroke === ACCENT ? 'o' : stroke === AMBER ? 'y' : 'k'})`}
    />
  );
}

function ArrowDefs() {
  const heads = { k: INK, o: ACCENT, y: AMBER };
  return (
    <defs>
      {Object.entries(heads).map(([k, c]) => (
        <marker key={k} id={`ah-${k}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill={c} />
        </marker>
      ))}
    </defs>
  );
}

/* 01 — NexusGraph: SIMD register lanes feeding a multi-hop BFS verification graph */
function NexusPlate() {
  const lanes = Array.from({ length: 8 }, (_, i) => 50 + i * 18);
  const nodes = {
    a: [290, 113],
    b: [332, 70],
    c: [332, 158],
    d: [382, 92],
    e: [382, 142],
    f: [430, 56],
    g: [438, 120],
    h: [426, 184],
  };
  const edges = [
    ['a', 'c'], ['b', 'f'], ['c', 'e'], ['c', 'h'], ['e', 'g'], ['d', 'f'],
  ];
  const path = [['a', 'b'], ['b', 'd'], ['d', 'g']];
  const hot = new Set(['a', 'b', 'd', 'g']);
  return (
    <Plate title="768-dimension SIMD register lanes feeding a multi-hop BFS verification graph">
      <ArrowDefs />
      <Label x={28} y={38}>768-DIM · SIMD REGISTER LANES</Label>
      {lanes.map((y, i) => (
        <g key={y}>
          <rect x={28} y={y} width={168} height={10} fill={PAPER} stroke={LINE} />
          {Array.from({ length: 12 }, (_, j) => {
            const on = (i * 5 + j * 3) % 7 === 0;
            const mid = (i + j * 2) % 5 === 0;
            return (
              <rect
                key={j}
                x={29 + j * 14}
                y={y + 1}
                width={12}
                height={8}
                fill={on ? ACCENT : mid ? INK : 'none'}
                opacity={on ? 1 : mid ? 0.85 : 1}
              />
            );
          })}
          <path d={`M196 ${y + 5}C214 ${y + 5} 214 113 228 113`} fill="none" stroke={INK3} strokeWidth="0.75" />
        </g>
      ))}
      <rect className="plate-scan" x={28} y={46} width={1.5} height={144} fill={AMBER} />
      <Label x={28} y={206}>ARM64 NEON / X86 AVX2</Label>

      <circle cx={240} cy={113} r={12} fill={INK} />
      <text x={240} y={117.5} fontSize="13" fill={PAPER} textAnchor="middle" style={mono}>Σ</text>
      <Label x={240} y={140} anchor="middle" fill={AMBER} weight={700}>35 ns</Label>
      <Arrow d="M252 113H278" />

      {edges.map(([p, q]) => (
        <line key={p + q} x1={nodes[p][0]} y1={nodes[p][1]} x2={nodes[q][0]} y2={nodes[q][1]} stroke={INK3} strokeWidth="0.9" />
      ))}
      {path.map(([p, q]) => (
        <line
          key={p + q}
          x1={nodes[p][0]} y1={nodes[p][1]} x2={nodes[q][0]} y2={nodes[q][1]}
          stroke={ACCENT}
          strokeWidth="1.75"
          className="plate-flow"
        />
      ))}
      {Object.entries(nodes).map(([k, [x, y]]) => (
        <circle
          key={k}
          cx={x}
          cy={y}
          r={k === 'g' ? 9 : 6.5}
          fill={k === 'g' ? ACCENT : hot.has(k) ? INK : PAPER}
          stroke={hot.has(k) ? 'none' : INK}
          strokeWidth="1"
        />
      ))}
      <path d="M434 120l3 3 5.5-6" fill="none" stroke="#fff" strokeWidth="1.75" />
      <Label x={332} y={38} anchor="middle">HOP 1</Label>
      <Label x={382} y={38} anchor="middle">HOP 2</Label>
      <Label x={438} y={38} anchor="middle">HOP 3</Label>
      <path d="M332 44V58M382 44V80M438 44V46" stroke={LINE} strokeWidth="1" strokeDasharray="2 2" />
      <Label x={290} y={206}>PETGRAPH BFS</Label>
      <Label x={456} y={206} anchor="end" fill={ACCENT} weight={700}>CLAIM VERIFIED</Label>
    </Plate>
  );
}

/* 02 — AetherLOB: cache-aligned L3 depth ladder and lock-free SPSC ring */
function AetherPlate() {
  const asks = [34, 52, 28, 64, 44];
  const bids = [58, 40, 70, 30, 48];
  const rowH = 14;
  const top = 44;
  const cx = 362;
  const cy = 108;
  return (
    <Plate title="64-byte cache-aligned L3 bid and ask depth ladder beside a lock-free SPSC ring buffer">
      <ArrowDefs />
      <Label x={28} y={36}>L3 DEPTH LADDER</Label>
      <Label x={212} y={36} anchor="end">alignas(64)</Label>
      {asks.map((w, i) => {
        const y = top + i * rowH;
        const best = i === asks.length - 1;
        return (
          <g key={`a${i}`}>
            <rect x={100} y={y} width={40} height={rowH - 2} fill={PAPER} stroke={LINE} />
            <rect x={142} y={y} width={w} height={rowH - 2} fill={best ? ACCENT : 'none'} stroke={best ? ACCENT : INK} strokeWidth="1" />
            <line x1={105} y1={y + 6} x2={135} y2={y + 6} stroke={INK3} strokeWidth="1" strokeDasharray="6 2 10 2" />
          </g>
        );
      })}
      <line x1={28} y1={top + 5 * rowH + 3} x2={212} y2={top + 5 * rowH + 3} stroke={INK} strokeWidth="1" strokeDasharray="1 3" />
      <Label x={28} y={top + 5 * rowH + 6} size={6.5}>SPREAD</Label>
      {bids.map((w, i) => {
        const y = top + 5 * rowH + 8 + i * rowH;
        const best = i === 0;
        return (
          <g key={`b${i}`}>
            <rect x={100} y={y} width={40} height={rowH - 2} fill={PAPER} stroke={LINE} />
            <rect x={98 - w} y={y} width={w} height={rowH - 2} fill={best ? INK : INK2} opacity={best ? 1 : 0.55 - i * 0.07} />
            <line x1={105} y1={y + 6} x2={135} y2={y + 6} stroke={INK3} strokeWidth="1" strokeDasharray="6 2 10 2" />
          </g>
        );
      })}
      <Label x={28} y={206}>BID</Label>
      <Label x={212} y={206} anchor="end">ASK</Label>

      <Arrow d="M222 108H280" stroke={ACCENT} flow />

      {/* SPSC ring: 16 slots, occupied window steps around */}
      <circle cx={cx} cy={cy} r={46} fill="none" stroke={LINE} strokeWidth="18" pathLength="16" strokeDasharray="0.86 0.14" />
      <g className="plate-step" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle
          cx={cx} cy={cy} r={46} fill="none" stroke={INK} strokeWidth="18" pathLength="16"
          strokeDasharray="0.86 0.14 0.86 0.14 0.86 0.14 0.86 0.14 0.86 11.14"
        />
        <circle
          cx={cx} cy={cy} r={46} fill="none" stroke={ACCENT} strokeWidth="18" pathLength="16"
          strokeDasharray="0.86 15.14" strokeDashoffset="-5"
        />
      </g>
      <circle cx={cx} cy={cy} r={30} fill={PAPER} stroke={LINE} />
      <Label x={cx} y={cy - 1} anchor="middle" fill={INK} size={9} weight={700}>SPSC</Label>
      <Label x={cx} y={cy + 10} anchor="middle" size={6.5}>LOCK-FREE</Label>
      <Label x={cx} y={36} anchor="middle">RING BUFFER · 0 B HEAP</Label>

      {/* one 64-byte cache line, eight 8-byte words */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={298 + i * 16} y={180} width={15} height={10} fill={i === 0 ? ACCENT : PAPER} stroke={i === 0 ? ACCENT : INK3} strokeWidth="0.75" />
      ))}
      <Label x={cx} y={206} anchor="middle">1 CACHE LINE = 64 B</Label>
    </Plate>
  );
}

/* 03 — Spreadsheet Engine & AI: cell grid, topological DAG, local LLM tool call */
function SheetPlate() {
  const cols = ['A', 'B', 'C', 'D'];
  const cw = 36;
  const ch = 26;
  const gx = 40;
  const gy = 52;
  const filled = { '0-0': INK, '1-1': INK, '2-2': INK, '0-3': INK2, '3-1': INK2 };
  const dag = [
    [236, 76, '1'],
    [236, 150, '2'],
    [286, 113, '3'],
    [336, 76, '4'],
    [336, 150, '5'],
  ];
  return (
    <Plate title="Spreadsheet cell grid resolved through a topological dependency graph into a local LLM tool-call node">
      <ArrowDefs />
      <Label x={28} y={36}>CELL GRID · 1,300 CELLS</Label>
      {cols.map((c, i) => (
        <Label key={c} x={gx + i * cw + cw / 2} y={gy - 5} anchor="middle" size={6.5}>{c}</Label>
      ))}
      {Array.from({ length: 5 }, (_, r) => (
        <g key={r}>
          <Label x={gx - 6} y={gy + r * ch + ch / 2 + 2.5} anchor="end" size={6.5}>{r + 1}</Label>
          {cols.map((c, i) => {
            const k = `${i}-${r}`;
            const target = k === '3-3';
            return (
              <g key={c}>
                <rect x={gx + i * cw} y={gy + r * ch} width={cw} height={ch} fill={target ? '#fff' : PAPER} stroke={target ? ACCENT : LINE} strokeWidth={target ? 1.5 : 1} />
                {filled[k] && <rect x={gx + i * cw + 6} y={gy + r * ch + 10} width={cw - 16} height={5} fill={filled[k]} opacity="0.8" />}
              </g>
            );
          })}
        </g>
      ))}
      <Label x={gx + 3 * cw + cw / 2} y={gy + 3 * ch + ch / 2 + 2.5} anchor="middle" fill={ACCENT} size={7} weight={700}>=ƒ(x)</Label>
      <Label x={28} y={206}>RECURSIVE-DESCENT AST</Label>

      <Arrow d="M190 113H220" />
      <Arrow d="M243 82L279 107" />
      <Arrow d="M243 144L279 119" />
      <Arrow d="M293 107L329 82" />
      <Arrow d="M293 119L329 144" />
      <Arrow d="M245 76H326" />
      <Arrow d="M336 141C352 128 352 98 339 86" stroke={AMBER} dashed />
      <Label x={356} y={116} fill={AMBER} size={6.5}>CYCLE</Label>
      {dag.map(([x, y, n]) => (
        <g key={n}>
          <circle cx={x} cy={y} r={9} fill={n === '5' ? INK : PAPER} stroke={INK} />
          <text x={x} y={y + 3} fontSize="8" textAnchor="middle" fill={n === '5' ? PAPER : INK} style={mono}>{n}</text>
        </g>
      ))}
      <Label x={286} y={36} anchor="middle">TOPOLOGICAL DAG</Label>
      <Label x={286} y={206} anchor="middle" fill={INK} weight={700}>O(V + E)</Label>

      <path d="M345 150H372C384 150 384 113 396 113" fill="none" stroke={ACCENT} strokeWidth="1.5" className="plate-flow" />
      <rect x={398} y={90} width={58} height={46} rx={6} fill="#fff" stroke={INK} strokeWidth="1.25" />
      <circle cx={408} cy={100} r={2.5} fill={AMBER} className="live-dot" />
      <Label x={427} y={112} anchor="middle" fill={INK} size={9} weight={700}>LLM</Label>
      <Label x={427} y={125} anchor="middle" fill={ACCENT} size={6}>TOOL CALL</Label>
      <Label x={427} y={36} anchor="middle">LOCAL · QWEN3 8B</Label>
    </Plate>
  );
}

/* 04 — Chameleon Engine: one layout retargeted across three aspect ratios */
function ChameleonPlate() {
  const Frame = ({ x, y, w, h, label, children }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#fff" stroke={INK} strokeWidth="1.25" />
      {children}
      <Label x={x + w / 2} y={206} anchor="middle" fill={INK} weight={700}>{label}</Label>
    </g>
  );
  const Box = ({ x, y, w, h }) => (
    <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} fill="none" stroke={AMBER} strokeWidth="0.75" strokeDasharray="2 2" />
  );
  const Img = ({ x, y, w, h }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={LINE} />
      <path d={`M${x} ${y + h}L${x + w * 0.38} ${y + h * 0.4}L${x + w * 0.62} ${y + h * 0.72}L${x + w * 0.78} ${y + h * 0.5}L${x + w} ${y + h}Z`} fill={INK3} />
      <Box x={x} y={y} w={w} h={h} />
    </g>
  );
  const Text = ({ x, y, w }) => (
    <g>
      <rect x={x} y={y} width={w} height={5} fill={INK} />
      <rect x={x} y={y + 9} width={w * 0.7} height={3} fill={INK3} />
      <rect x={x} y={y + 15} width={w * 0.85} height={3} fill={INK3} />
      <Box x={x} y={y} w={w} h={18} />
    </g>
  );
  const Cta = ({ x, y, w = 34 }) => <rect x={x} y={y} width={w} height={10} rx={5} fill={ACCENT} />;
  return (
    <Plate title="A single layout retargeted across 16 by 9, square, and 9 by 16 canvases with adapting bounding boxes">
      <ArrowDefs />
      <Label x={28} y={36}>SOURCE CANVAS</Label>
      <Label x={456} y={36} anchor="end">RETARGETED VIEWPORTS</Label>
      <Frame x={28} y={66} w={168} h={94.5} label="16:9">
        <Img x={38} y={76} w={72} h={74.5} />
        <Text x={122} y={84} w={62} />
        <Cta x={122} y={132} />
      </Frame>
      <Arrow d="M202 113H228" stroke={ACCENT} flow />
      <Frame x={236} y={58} w={110} h={110} label="1:1">
        <Img x={246} y={68} w={90} h={46} />
        <Text x={246} y={126} w={52} />
        <Cta x={306} y={146} w={30} />
      </Frame>
      <Arrow d="M352 113H374" stroke={ACCENT} flow />
      <Frame x={382} y={44} w={74} h={131.5} label="9:16">
        <Img x={390} y={52} w={58} h={62} />
        <Text x={390} y={126} w={58} />
        <Cta x={390} y={156} w={58} />
      </Frame>
    </Plate>
  );
}

/* 05 — RedRun: topographic contours, route line, avalanche danger rose */
function wedge(cx, cy, r0, r1, a0, a1) {
  const p = (r, a) => {
    const t = ((a - 90) * Math.PI) / 180;
    return `${(cx + r * Math.cos(t)).toFixed(2)} ${(cy + r * Math.sin(t)).toFixed(2)}`;
  };
  return `M${p(r0, a0)}L${p(r1, a0)}A${r1} ${r1} 0 0 1 ${p(r1, a1)}L${p(r0, a1)}A${r0} ${r0} 0 0 0 ${p(r0, a0)}Z`;
}

function RedRunPlate() {
  const rings = [
    [14, 30],
    [30, 46],
    [46, 62],
  ];
  // danger[ring][sector], sectors clockwise from N. 3 = high, 2 = considerable, 1 = moderate, 0 = low
  const danger = [
    [1, 1, 0, 0, 0, 0, 0, 1],
    [2, 2, 1, 0, 0, 0, 1, 2],
    [3, 3, 2, 1, 0, 0, 1, 2],
  ];
  const fills = [PAPER, LINE, AMBER_SOFT, AMBER];
  const cx = 372;
  const cy = 116;
  return (
    <Plate title="Topographic contour lines with a planned route and an avalanche danger rose by aspect and elevation">
      <Label x={28} y={36}>TOPO · CONTOUR MAP</Label>
      <g fill="none" stroke={INK2} strokeWidth="0.9" transform="rotate(-14 140 122)">
        {[104, 90, 76, 62, 48, 34, 21, 10].map((r, i) => (
          <ellipse key={r} cx={140 + i * 3.5} cy={122 - i * 2.5} rx={r * 1.12} ry={r * 0.72} strokeWidth={i % 4 === 3 ? 1.6 : 0.8} opacity={0.45 + i * 0.07} />
        ))}
        {[30, 19, 9].map((r, i) => (
          <ellipse key={r} cx={62 - i * 2} cy={170 + i} rx={r * 1.2} ry={r * 0.7} strokeWidth="0.8" opacity="0.6" />
        ))}
      </g>
      <path
        d="M34 196C62 190 70 168 96 164S128 176 146 158 150 132 168 124"
        fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" className="plate-flow"
      />
      <circle cx={34} cy={196} r={3.5} fill={INK} />
      <path d="M168 124V108l11 4.5-11 4.5" fill={ACCENT} stroke={ACCENT} strokeWidth="1.25" strokeLinejoin="round" />
      <Label x={186} y={112} fill={INK} size={7} weight={700}>SUMMIT</Label>
      <Label x={44} y={212} size={6.5}>TRAILHEAD</Label>

      <Label x={cx} y={36} anchor="middle">DANGER ROSE · ASPECT × ELEVATION</Label>
      {rings.map(([r0, r1], ri) =>
        danger[ri].map((d, s) => (
          <path key={`${ri}-${s}`} d={wedge(cx, cy, r0, r1, s * 45 - 22.5, s * 45 + 22.5)} fill={fills[d]} stroke={INK} strokeWidth="0.75" />
        )),
      )}
      <circle cx={cx} cy={cy} r={14} fill="#fff" stroke={INK} strokeWidth="0.75" />
      <path d={`M${cx} ${cy - 9}L${cx + 3.5} ${cy + 3}H${cx - 3.5}Z`} fill={INK} />
      {[['N', 0, -70], ['E', 72, 3], ['S', 0, 77], ['W', -72, 3]].map(([t, dx, dy]) => (
        <Label key={t} x={cx + dx} y={cy + dy} anchor="middle" fill={INK} weight={700}>{t}</Label>
      ))}
      <g>
        {[['HIGH', AMBER], ['CONSID.', AMBER_SOFT], ['MOD.', LINE]].map(([t, c], i) => (
          <g key={t}>
            <rect x={270 + i * 66} y={206} width={8} height={8} fill={c} stroke={INK} strokeWidth="0.5" />
            <Label x={282 + i * 66} y={213} size={6.5}>{t}</Label>
          </g>
        ))}
      </g>
    </Plate>
  );
}

/* 06 — PitWall: circuit loop with DRS zones, live timing tower, tire degradation curves */
function PitWallPlate() {
  const track =
    'M40 150C40 108 60 72 100 72L150 72C176 72 186 92 170 110C158 124 140 120 132 134C124 148 150 160 168 160C188 160 190 182 172 188L70 188C50 188 40 172 40 150Z';
  // tower rows: [position, gap bar width, compound]
  const rows = [
    ['P1', 0, 'M'],
    ['P2', 14, 'S'],
    ['P3', 22, 'M'],
    ['P4', 30, 'H'],
    ['P5', 36, 'S'],
  ];
  const compound = { S: AMBER, M: ACCENT, H: INK };
  return (
    <Plate title="F1 circuit loop with DRS zones, a live timing tower, and soft, medium and hard tire degradation curves with a pit-window crossover marker">
      {/* circuit */}
      <Label x={28} y={36}>CIRCUIT · DRS ZONES</Label>
      <path d={track} fill="none" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      <path d="M100 72H150" stroke={ACCENT} strokeWidth="7" />
      <path d="M78 188H164" stroke={ACCENT} strokeWidth="7" />
      <path d={track} fill="none" stroke={AMBER} strokeWidth="1.5" className="plate-flow" />
      <path d="M120 181V195" stroke={PAPER} strokeWidth="2.5" strokeDasharray="2.5 2.5" />
      <Label x={125} y={62} anchor="middle" fill={ACCENT} weight={700} size={7}>DRS 1</Label>
      <Label x={121} y={206} anchor="middle" fill={ACCENT} weight={700} size={7}>DRS 2 · S/F</Label>
      <circle cx={170} cy={110} r={4.5} fill={AMBER} stroke={PAPER} strokeWidth="1.5" className="live-dot" />

      {/* timing tower */}
      <Label x={208} y={36}>TIMING TOWER</Label>
      {rows.map(([pos, gap, c], i) => {
        const y = 48 + i * 26;
        return (
          <g key={pos}>
            <rect x={208} y={y} width={92} height={20} rx={3} fill={i === 0 ? INK : '#fff'} stroke={i === 0 ? INK : LINE} />
            <Label x={215} y={y + 13} fill={i === 0 ? PAPER : INK} size={8} weight={700}>{pos}</Label>
            <rect x={236} y={y + 8} width={Math.max(gap, 3)} height={4} rx={2} fill={i === 0 ? ACCENT : INK3} />
            <circle cx={289} cy={y + 10} r={6} fill="none" stroke={compound[c]} strokeWidth="2.5" />
            <text x={289} y={y + 12.5} fontSize="6.5" fontWeight="700" textAnchor="middle" fill={i === 0 ? PAPER : INK} style={mono}>{c}</text>
          </g>
        );
      })}
      <Label x={208} y={206}>GAP · COMPOUND</Label>

      {/* tire degradation */}
      <Label x={322} y={36}>TIRE DEGRADATION</Label>
      <path d="M322 56V176H438" fill="none" stroke={INK} strokeWidth="1" />
      {[86, 116, 146].map((y) => (
        <line key={y} x1={322} y1={y} x2={438} y2={y} stroke={LINE} strokeWidth="0.75" />
      ))}
      <path d="M322 126Q388 122 436 116" fill="none" stroke={INK} strokeWidth="1.75" />
      <path d="M322 138Q380 130 436 100" fill="none" stroke={ACCENT} strokeWidth="1.75" />
      <path d="M322 150Q372 140 436 70" fill="none" stroke={AMBER} strokeWidth="1.75" />
      <Label x={440} y={72} fill={AMBER} size={6.5} weight={700}>SOFT</Label>
      <Label x={440} y={102} fill={ACCENT} size={6.5} weight={700}>MED</Label>
      <Label x={440} y={119} fill={INK} size={6.5} weight={700}>HARD</Label>
      <line x1={378} y1={56} x2={378} y2={176} stroke={AMBER} strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={378} cy={125} r={4} fill="#fff" stroke={AMBER} strokeWidth="2" />
      <Label x={378} y={50} anchor="middle" fill={AMBER} size={6.5} weight={700}>PIT WINDOW</Label>
      <Label x={322} y={190} size={6.5}>LAP →</Label>
      <Label x={322} y={206}>LAP TIME BY COMPOUND</Label>
    </Plate>
  );
}

const PLATES = {
  nexus: NexusPlate,
  aether: AetherPlate,
  sheet: SheetPlate,
  chameleon: ChameleonPlate,
  redrun: RedRunPlate,
  pitwall: PitWallPlate,
};

export default function ProjectPlate({ kind }) {
  const Component = PLATES[kind];
  return Component ? <Component /> : null;
}
