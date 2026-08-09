/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", 'Georgia', 'serif'],
        sans: ["'Manrope'", 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: '#0b0a0d',
        'bg-elevated': '#131218',
        card: '#17161d',
        'card-hover': '#1e1c26',
        fg: '#f6f4f2',
        muted: '#a9a4b4',
        accent: '#ff5a5f',
        'accent-soft': '#ff8a63',
        'accent-deep': '#c8375d',
        teal: '#00a699',
      },
    },
  },
  plugins: [],
};
