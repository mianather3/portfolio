import { asset } from '../lib/paths.js';

export const PROFILE = {
  name: 'Mian Ather Ali',
  role: 'Systems & AI Infrastructure Engineer',
  portraitLine: 'Mian Ather Ali · Systems & AI Engineer',
  portraitSub: "University of Utah Honors '27",
  email: 'mianather783@gmail.com',
  github: 'https://github.com/mianather3',
  linkedin: 'https://linkedin.com/in/mianather',
  eyebrow: 'HONORS DATA SCIENCE @ UNIVERSITY OF UTAH • EXPECTED DEC 2027 • 3.6 GPA',
  caption: 'FIG. 00 — MIAN ATHER ALI // SALT LAKE CITY, UT // 40.7608° N, 111.8910° W',
};

export const RESUMES = {
  quant: {
    label: 'Quant & Low-Latency Resume',
    short: 'Quant & Low-Latency',
    nav: 'Quant',
    file: 'Mian_Ather_Ali_Quant_Systems_Resume.pdf',
    href: asset('resumes/Mian_Ather_Ali_Quant_Systems_Resume.pdf'),
  },
  infra: {
    label: 'Big Tech SWE & AI Infra Resume',
    short: 'SWE & AI Infra',
    nav: 'SWE & AI',
    file: 'Mian_Ather_Ali_SWE_AI_Infra_Resume.pdf',
    href: asset('resumes/Mian_Ather_Ali_SWE_AI_Infra_Resume.pdf'),
  },
};

export const NAV_LINKS = [
  { label: 'Systems', href: '#projects' },
  { label: 'Telemetry', href: '#telemetry' },
  { label: 'Experience', href: '#experience' },
  { label: 'Oxford & Leadership', href: '#honors' },
];

export const TRACKS = [
  { id: 'all', label: 'All', long: 'All Systems' },
  { id: 'quant', label: 'Quant & Low-Latency', long: 'Quant & Low-Latency' },
  { id: 'ai', label: 'AI & Infra', long: 'AI & Distributed Infra' },
];

export const HERO_SPECS = [
  { value: '35', unit: 'ns', label: '768-dim SIMD dot' },
  { value: '125', unit: 'ns', label: 'L3 tick-to-trade p50' },
  { value: '21.5M', unit: 'msg/s', label: 'Lock-free SPSC' },
  { value: '100', unit: '%', label: 'Citation precision' },
];

export const PROJECTS = [
  {
    id: 'nexusgraph',
    plate: 'nexus',
    name: 'NexusGraph',
    flagship: true,
    tracks: ['ai', 'quant'],
    url: 'https://github.com/mianather3/nexus_graph',
    plateCaption: '768-dim SIMD lanes → multi-hop BFS verification',
    summary:
      'Multi-tenant hybrid vector + knowledge graph retrieval engine in Rust. ARM64 NEON / x86 AVX2 SIMD kernels feed deterministic multi-hop BFS claim verification.',
    stack: ['Rust', 'ARM64 NEON / x86 AVX2 SIMD', 'Tokio', 'Axum', 'Petgraph', 'Docker'],
    metrics: [
      { value: '35 ns', label: '768-dim SIMD dot product' },
      { value: '26.5 ns', label: '384-dim cosine similarity' },
      { value: '2.0 ms', label: 'Exact top-10 k-NN over 100K vectors' },
      { value: '155 MiB', label: 'RSS at 100K vectors' },
      { value: '20,500 req/s', label: 'HTTP throughput' },
      { value: '302 µs / 598 µs', label: 'p50 / p99 request latency' },
      { value: '20% → 80%', label: 'Multi-hop evidence path recovery', wide: true },
    ],
  },
  {
    id: 'aetherlob',
    plate: 'aether',
    name: 'AetherLOB',
    flagship: true,
    tracks: ['quant'],
    url: 'https://github.com/mianather3/aether_lob',
    plateCaption: 'alignas(64) L3 depth ladder + lock-free SPSC ring',
    summary:
      'Deterministic, cache-aligned L3 limit order book and matching engine in C++20. A lock-free SPSC pipeline keeps the hot path free of heap allocations.',
    stack: ['C++20', 'POSIX', 'Lock-Free SPSC', 'ASan/UBSan/TSan', 'Docker'],
    metrics: [
      { value: '19.7M–21.5M msg/s', label: 'Lock-free SPSC throughput', wide: true },
      { value: '125 ns', label: 'p50 tick-to-trade, Poisson arrivals' },
      { value: '375 ns', label: 'p99 tick-to-trade, Poisson arrivals' },
      { value: '0 B', label: 'Hot-path heap allocations' },
      { value: '13M+', label: 'Differential fuzzer payloads validated' },
    ],
  },
  {
    id: 'spreadsheet',
    plate: 'sheet',
    name: 'Spreadsheet Engine & AI',
    tracks: ['ai'],
    url: 'https://github.com/mianather3/Spreadsheet-AI',
    plateCaption: 'Cell grid → topological DAG → local LLM tool call',
    summary:
      '1,300-cell evaluation runtime with a recursive-descent AST formula parser and O(V + E) topological DAG execution with cycle resolution. Deterministic tool-calling runs against a local LLM.',
    stack: ['C#/.NET', 'Ollama Qwen3 8B', 'SQL'],
    metrics: [
      { value: '1,300 cells', label: 'Evaluation runtime' },
      { value: 'O(V + E)', label: 'Topological DAG execution' },
    ],
  },
  {
    id: 'chameleon',
    plate: 'chameleon',
    name: 'Chameleon Engine',
    tracks: ['ai'],
    url: 'https://github.com/mianather3/PolymorphicTrio',
    plateCaption: 'Layout retargeting across aspect ratios',
    summary:
      'Autonomous layout-retargeting engine that adapts one design across viewports and aspect ratios. Co-engineered with team PolymorphicTrio and benchmarked in isolated Docker containers.',
    stack: ['Python', 'Skia', 'Pillow', 'Docker'],
    metrics: [],
  },
  {
    id: 'redrun',
    plate: 'redrun',
    name: 'RedRun',
    tracks: ['ai'],
    url: 'https://github.com/rishSaini/crimson-hacks',
    plateCaption: 'Topographic contours + avalanche danger rose',
    summary:
      'Avalanche-aware 3D backcountry route planner. Paired with an operational telemetry dashboard for real-time risk matrix analytics.',
    stack: ['Next.js', 'Python', 'FastAPI'],
    metrics: [],
  },
  {
    id: 'pitwall',
    plate: 'pitwall',
    name: 'PitWall — AI F1 Race Strategist',
    figTitle: 'PitWall Telemetry',
    eyebrow: 'Real-Time F1 Telemetry & AI Strategy Engine',
    tracks: ['ai'],
    url: 'https://github.com/mianather3/PitWall',
    demo: 'https://pitwallapp.vercel.app/app',
    plateCaption: 'Circuit + DRS zones, timing tower, tire degradation',
    summary:
      'Full-stack iOS (SwiftUI) and React web application streaming live OpenF1 telemetry via a C#/.NET 10 backend on Azure to compute real-time AI pit-stop and undercut strategies.',
    stack: ['Swift / SwiftUI', 'C# / .NET 10', 'React / Vite', 'OpenF1 Telemetry', 'GPT-4o-mini', 'Azure & Vercel'],
    metrics: [
      { value: 'SwiftUI + React', label: 'Native iOS LiveRaceView & Web Timing Tower' },
      { value: 'OpenF1 API', label: 'Live lap deltas, DRS zones & tire compound degradation' },
      { value: '.NET 10 + Azure', label: 'C# REST API orchestrating GPT-4o-mini strategy calls' },
      { value: 'Real-Time', label: 'Undercut window, safety car & weather modeling' },
    ],
  },
];

export const EXPERIENCE = [
  {
    org: 'Clausly',
    title: 'Founder & Software Engineer',
    dates: 'APR 2026 — PRESENT',
    bullets: [
      'Automated legal-tech contract telemetry across 50 US states on GPT-4o-mini, PostgreSQL, and AWS.',
      'Built a deterministic citation validator that lifted precision from 7% to 100% across 360 test suites.',
    ],
    metric: '100%',
    caption: 'Citation precision',
  },
  {
    org: 'University of Utah, Office of Admissions',
    title: 'Data Assistant',
    dates: 'JUN 2024 — PRESENT',
    bullets: [
      'Built Python/Pandas and SQL validation pipelines that audit 500+ student records.',
      'Cut manual audit time by 30%.',
    ],
    metric: '-30%',
    caption: 'Audit latency',
  },
  {
    org: 'Adobe',
    title: 'Student Ambassador',
    dates: 'NOV 2025 — PRESENT',
    bullets: [
      'Led technical generative AI workshops for 50+ attendees per session.',
      'Boosted tool adoption by 40%.',
    ],
    metric: '+40%',
    caption: 'GenAI adoption',
  },
];

export const HONORS = {
  oxford: {
    title: 'Oxford Consortium for Human Rights',
    place: 'Magdalen College, Oxford, UK — July 2026',
    body: 'Honors College Delegate on Ethical AI & Cloud Governance.',
  },
  club: {
    title: 'AI4U Club',
    place: 'University of Utah',
    body: 'Technical Member & Systems Workshop Lead.',
  },
  scholarships: [
    'Pehrson Family Trust & Scott L. Pehrson Scholarship',
    'ISSS Scholarship (2026–2027)',
    'Utah Global Scholarship',
  ],
};

export const GITHUB = {
  handle: '@mianather3',
  stack: 'Rust · C++20 · C# · Python · Swift · JS',
  display: 'github.com/mianather3',
};
