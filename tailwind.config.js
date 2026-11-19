/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0A09',
        espresso: '#141210',
        limestone: '#F6F3EE',
        sand: '#EDE7DD',
        gold: '#C5B38E',
        'gold-deep': '#A8956F',
        ink: '#181614',
        'ink-muted': '#6B655E',
        'dark-muted': '#A39B90',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        meta: '0.22em',
      },
      transitionTimingFunction: {
        architectural: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        editorial: '1440px',
      },
    },
  },
  plugins: [],
};
