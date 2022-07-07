const colors = require ('tailwindcss/colors');
const plugin = require ('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      hue: {
        light: '#F5F1EB', // example usage
        dark: '#0F111A',
      },
      white: colors.white,
      primary: colors.red,
      black: '#1C1C20',
      'blend-pink': '#F9B7DD',
      gray: '#AAABAC',
    },
    fontFamily: {
      'kiona-bold': ['"Kiona-Bold"', 'sans-serif'],
      'kiona-regular': ['"Kiona-Regular"', 'sans-serif'],
      'kiona-light': ['"Kiona-light"', 'sans-serif'],
      sans: ['Kiona', 'sans-serif'],
      normal: ['Kiona', 'sans-serif'],
      light: ['Kiona', 'sans-serif'],
      'gilroy-ultra-light': ['"Gilroy-UltraLight"', 'sans-serif'],
      'gilroy-light': ['"Gilroy-Light"', 'sans-serif'],
      'gilroy-extra-bold': ['"Gilroy-ExtraBold"', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2048px',
      '4xl': '2560px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require ('@tailwindcss/forms'),
    plugin (function({addUtilities}) {
      addUtilities ({
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    }),
  ],
};
