const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,jsx,tsx}', './index.html'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      // Using Zinc for a premium, slightly warm industrial dark mode feel
      gray: colors.zinc,
      blue: colors.blue,
      sky: colors.sky,
      red: colors.red,
      // Keep other colors available if needed, but gray is the primary structural color
      amber: colors.amber,
      emerald: colors.emerald,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
      teal: colors.teal,
    },
    screens: {
      'xs': '340px',
      ...defaultTheme.screens,
    },
    extend: {
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.3)',
        'glow-white': '0 0 10px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'card-fade': 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.gray[100]'),
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[500]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quotes': theme('colors.gray[100]'),
            '--tw-prose-quote-borders': theme('colors.blue[500]'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.blue[200]'),
            '--tw-prose-pre-code': theme('colors.gray[200]'),
            '--tw-prose-pre-bg': '#18181b', // zinc-900
          },
        },
        invert: {
          css: {
            // Refined spacing and sizing for "Pro" feel
            p: {
              fontSize: '1.125rem', // 18px
              lineHeight: '1.8',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              fontWeight: '300', 
            },
            h1: { fontWeight: '800', letterSpacing: '-0.025em' },
            h2: { fontWeight: '700', marginTop: '2em' },
            h3: { fontWeight: '600', marginTop: '1.5em' },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              paddingLeft: '1.5em',
              fontWeight: '400',
              opacity: '0.9',
            },
            code: {
              backgroundColor: 'rgba(59, 130, 246, 0.1)', // Subtle blue tint
              padding: '2px 6px',
              borderRadius: '6px',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
              border: '1px solid ' + theme('colors.gray[800]'),
            },
            img: {
              borderRadius: '12px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
            },
            a: {
              textDecoration: 'none',
              borderBottom: '1px solid ' + theme('colors.blue[500]'),
              transition: 'all 0.2s ease',
              '&:hover': {
                borderBottomWidth: '2px',
                color: theme('colors.blue[300]'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [], // Disable default themes to rely on our custom dark mode
  },
};