/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: '#e50914',
        'ink-900': '#1a1a1a',
        'ink-600': '#555',
        'ink-400': '#888',
        'surface-soft': '#2a2a2a',
        border: '#333',
      },
      boxShadow: {
        soft: '0 4px 14px rgba(0,0,0,0.15)',
        warm: '0 4px 14px rgba(229,9,20,0.35)',
      },
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
