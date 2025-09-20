const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,jsx,tsx}', './index.html'],
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
    screens: {
      'xs': '340px',
      ...defaultTheme.screens,
    },
    extend: {
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.blue[500]'),
            '--tw-prose-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': '#1a1a1a',
            '--tw-prose-bullets': theme('colors.gray[600]'),

            p: {
              fontSize: '1.5rem',
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.7',
            },
            code: {
              backgroundColor: '#2a2a2a',
              padding: '3px 6px',
              borderRadius: '4px',
              fontSize: '0.9em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              border: '1px solid #2a2a2a',
              padding: '15px',
              borderRadius: '8px',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            a: {
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                textDecoration: 'underline',
                color: theme('colors.blue[600]'),
              },
            },
            img: {
              display: 'block',
              margin: '2em auto',
              borderRadius: '8px',
              maxWidth: '100%',
            },
            'ul, ol': {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '2rem',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
          },
        },
      }),
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