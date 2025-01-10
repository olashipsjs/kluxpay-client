import { css, Global } from '@emotion/react';
import colors from '../../theme/colors';
import global from '../../theme/global';

const Theme = () => {
  return (
    <Global
      styles={css({
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          border: '0px solid',
        },

        '.pulse': {
          opacity: 0.5,
          animation: 'pulse 1s infinite',
        },

        '@keyframes pulse': {
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },

        body: {
          minHeight: '100vh',
        },

        '::-webkit-scrollbar': {
          width: 0,
        },

        '@font-face': [
          {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            src: `
            url('/assets/fonts/Inter-Regular.woff2')
          `,
          },
          {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            src: `
            url('/assets/fonts/Inter-Medium.woff2')
          `,
          },
          {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            src: `
            url('/assets/fonts/Inter-SemiBold.woff2')
          `,
          },
          {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            src: `
            url('/assets/fonts/Inter-Bold.woff2')
          `,
          },
        ],

        /* Track */
        '::-webkit-scrollbar-track': {
          background: 'rgb(0, 0, 0, 0)',
        },

        /* Handle */
        '::-webkit-scrollbar-thumb': {
          width: 1,
          height: 4,
          borderRadius: 999,
          background: 'rgb(var(--gray-95))',
        },

        /* Handle on hover */
        '::-webkit-scrollbar-thumb:hover': {
          background: 'rgb(var(--gray-80))',
        },

        'html, a, input, textarea, button': {
          tabSize: 4,
          fontWeight: 400,
          fontSize: '62.5%',
          lineHeight: 1.5,
          letterSpacing: '0.02em',
          WebkitTextSizeAdjust: '100%',
          color: 'rgb(var(--gray-40))',
          fontFeatureSettings: 'normal',
          fontVariationSettings: 'normal',
          fontFamily:
            'Inter tight, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        },

        ':root': {
          ...global,
          // red colors
          '--red-10': colors.red[10],
          '--red-20': colors.red[20],
          '--red-30': colors.red[30],
          '--red-40': colors.red[40],
          '--red-50': colors.red[50],
          '--red-60': colors.red[60],
          '--red-70': colors.red[70],
          '--red-80': colors.red[80],
          '--red-90': colors.red[90],
          '--red-95': colors.red[95],
          '--red-100': colors.red[100],

          // yellow colors
          '--yellow-10': colors.yellow[10],
          '--yellow-20': colors.yellow[20],
          '--yellow-30': colors.yellow[30],
          '--yellow-40': colors.yellow[40],
          '--yellow-50': colors.yellow[50],
          '--yellow-60': colors.yellow[60],
          '--yellow-70': colors.yellow[70],
          '--yellow-80': colors.yellow[80],
          '--yellow-90': colors.yellow[90],
          '--yellow-95': colors.yellow[95],
          '--yellow-100': colors.yellow[100],

          // gray colors
          '--gray-10': colors.gray[10],
          '--gray-20': colors.gray[20],
          '--gray-30': colors.gray[30],
          '--gray-40': colors.gray[40],
          '--gray-50': colors.gray[50],
          '--gray-60': colors.gray[60],
          '--gray-70': colors.gray[70],
          '--gray-80': colors.gray[80],
          '--gray-90': colors.gray[90],
          '--gray-95': colors.gray[95],
          '--gray-100': colors.gray[100],

          // brown colors
          '--brown-10': colors.brown[10],
          '--brown-20': colors.brown[20],
          '--brown-30': colors.brown[30],
          '--brown-40': colors.brown[40],
          '--brown-50': colors.brown[50],
          '--brown-60': colors.brown[60],
          '--brown-70': colors.brown[70],
          '--brown-80': colors.brown[80],
          '--brown-90': colors.brown[90],
          '--brown-95': colors.brown[95],
          '--brown-100': colors.brown[100],

          // greeb colors
          '--green-10': colors.green[10],
          '--green-20': colors.green[20],
          '--green-30': colors.green[30],
          '--green-40': colors.green[40],
          '--green-50': colors.green[50],
          '--green-60': colors.green[60],
          '--green-70': colors.green[70],
          '--green-80': colors.green[80],
          '--green-90': colors.green[90],
          '--green-95': colors.green[95],
          '--green-100': colors.green[100],

          // purple colors
          '--purple-10': colors.purple[10],
          '--purple-20': colors.purple[20],
          '--purple-30': colors.purple[30],
          '--purple-40': colors.purple[40],
          '--purple-50': colors.purple[50],
          '--purple-60': colors.purple[60],
          '--purple-70': colors.purple[70],
          '--purple-80': colors.purple[80],
          '--purple-90': colors.purple[90],
          '--purple-95': colors.purple[95],
          '--purple-100': colors.purple[100],

          // orange colors
          '--orange-10': colors.orange[10],
          '--orange-20': colors.orange[20],
          '--orange-30': colors.orange[30],
          '--orange-40': colors.orange[40],
          '--orange-50': colors.orange[50],
          '--orange-60': colors.orange[60],
          '--orange-70': colors.orange[70],
          '--orange-80': colors.orange[80],
          '--orange-90': colors.orange[90],
          '--orange-95': colors.orange[95],
          '--orange-100': colors.orange[100],

          // cyan colors
          '--cyan-10': colors.cyan[10],
          '--cyan-20': colors.cyan[20],
          '--cyan-30': colors.cyan[30],
          '--cyan-40': colors.cyan[40],
          '--cyan-50': colors.cyan[50],
          '--cyan-60': colors.cyan[60],
          '--cyan-70': colors.cyan[70],
          '--cyan-80': colors.cyan[80],
          '--cyan-90': colors.cyan[90],
          '--cyan-95': colors.cyan[95],
          '--cyan-100': colors.cyan[100],

          // indigo colors
          '--indigo-10': colors.indigo[10],
          '--indigo-20': colors.indigo[20],
          '--indigo-30': colors.indigo[30],
          '--indigo-40': colors.indigo[40],
          '--indigo-50': colors.indigo[50],
          '--indigo-60': colors.indigo[60],
          '--indigo-70': colors.indigo[70],
          '--indigo-80': colors.indigo[80],
          '--indigo-90': colors.indigo[90],
          '--indigo-95': colors.indigo[95],
          '--indigo-100': colors.indigo[100],

          '--white': colors.white,
          '--black': colors.black,
        },
      })}
    />
  );
};

export default Theme;
