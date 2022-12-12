const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        spinFast: 'spin 0.35s linear infinite',
      },
      fontFamily: {
        primary: ['var(--openSans-font)', ...fontFamily.sans],
        serif: ['var(--openSans-font)', ...fontFamily.serif],
      },
    },
    screens: {
      md: '769px',
      lg: '1265px',
    },
  },
  plugins: [],
};
