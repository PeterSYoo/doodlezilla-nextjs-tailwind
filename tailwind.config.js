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
        border: 'border 2s ease infinite',
        button: 'border 2s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 100%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        button: {
          '0%, 100%': { backgroundPosition: '50% 100%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      fontFamily: {
        openSans: ['var(--openSans)'],
      },
      colors: {
        cobalt: '#0095F6',
        sunset: '#FE446D',
        grayLight: '#EFEFEF',
        grayText: '#B2B2B2',
        placeholder: '#8E8E8E',
        grayBorder: '#EBEBEB',
      },
    },
    screens: {
      md: '769px',
      lg: '1265px',
    },
  },
  plugins: [],
};
