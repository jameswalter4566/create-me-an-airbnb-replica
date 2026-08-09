/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Mulish'", '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        rausch: '#ff385c',
        'rausch-dark': '#e00b41',
        fg: '#222222',
        'fg-soft': '#6a6a6a',
        line: '#dddddd',
      },
    },
  },
  plugins: [],
};
