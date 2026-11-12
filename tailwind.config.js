/** Clarendon Editorial & Systems Studio theme (light). */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F3EC', // warm alabaster canvas
        card: '#FFFFFF', // elevated surface
        stone: '#EAE6DF', // secondary stone
        line: '#DDD8CE', // hairlines
        ink: {
          DEFAULT: '#141413', // obsidian
          2: '#575551', // muted slate
          3: '#85817A', // captions
        },
        emerald: '#059669', // vibrant emerald jade: italics, active pills, metrics
        forest: '#0B4F3A', // rich forest: primary buttons, monogram, deep cards
        gold: '#D97706', // burnished gold: eyebrows, dates, units
        amber: '#D97706', // secondary accent: benchmark highlights, status dots
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        well: 'inset 0 1px 2px rgba(20,20,19,0.08)',
        key: '0 1px 0 rgba(20,20,19,0.12), 0 2px 6px -2px rgba(20,20,19,0.18)',
        plate: '0 1px 0 #DDD8CE, 0 24px 48px -32px rgba(20,20,19,0.25)',
      },
    },
  },
  plugins: [],
};
