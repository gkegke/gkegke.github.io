const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/index.html', './src/index.jsx', './src/components/**/*.jsx'],
  theme: {
    colors: {
      amber: colors.amber,
      black: colors.black,
      blue: colors.blue,
      bluegray: colors.slate,
      coolgray: colors.gray,
      cyan: colors.cyan,
      emerald: colors.emerald,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      sky: colors.sky,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      truegray: colors.neutral,
      violet: colors.violet,
      warmgray: colors.stone,
      white: colors.white,
      yellow: colors.yellow,
      transparent: colors.transparent,
    },
    extend: {
      screens: {
        'sm': '640px', // Small screens
        'md': '768px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra-large screens
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [],
  },
};
