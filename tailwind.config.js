const { nextui } = require('@nextui-org/react');
const { typewindTransforms } = require('typewind/transform');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    transform: typewindTransforms,
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/container-queries'), nextui()],
};
