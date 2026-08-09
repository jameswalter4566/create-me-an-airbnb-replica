/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "'Figtree'",
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        rausch: '#ff385c',
        'rausch-deep': '#e61e4d',
        'rausch-dark': '#d70466',
        ink: '#222222',
        muted: '#6a6a6a',
        line: '#dddddd',
      },
    },
  },
  plugins: [],
};
