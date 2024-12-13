import Variants from '../types/variants';

const typographyProps = {
  fontSize: {
    isResponsive: true,
    properties: ['fontSize'],
    values: {
      10: 'var(--font-size)',
      12: 'calc(var(--font-size) * 1.2)',
      13: 'calc(var(--font-size) * 1.3)',
      14: 'calc(var(--font-size) * 1.4)',
      16: 'calc(var(--font-size) * 1.6)',
      17: 'calc(var(--font-size) * 1.7)',
      19: 'calc(var(--font-size) * 1.9)',
      21: 'calc(var(--font-size) * 2.1)',
      24: 'calc(var(--font-size) * 2.4)',
      32: 'calc(var(--font-size) * 3.2)',
      40: 'calc(var(--font-size) * 4.0)',
      48: 'calc(var(--font-size) * 4.8)',
      56: 'calc(var(--font-size) * 5.6)',
      64: 'calc(var(--font-size) * 6.4)',
      80: 'calc(var(--font-size) * 8.0)',
    },
  },

  fontWeight: {
    properties: ['fontWeight'],
    values: {
      thin: 100,
      light: 300,
      extraLight: 200,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },

  textAlign: {
    properties: ['textAlign'],
    isResponsive: true,
    values: {
      left: 'left',
      right: 'right',
      center: 'center',
      justify: 'justify',
    },
  },

  textTransform: {
    properties: ['textTransform'],
    values: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
  },

  lineHeight: {
    properties: ['lineHeight'],
    isResponsive: true,
    values: {
      xs: '0.8',
      sm: '1.1',
      md: '1.25',
      lg: '1.35',
      xl: '1.45',
    },
  },

  letterSpacing: {
    properties: ['letterSpacing'],
    isResponsive: true,
    values: {
      xs: '0.005em',
      sm: '0.0025em',
      md: -0.8,
      lg: -1,
      xl: -1.2,
    },
  },

  textDecoration: {
    properties: ['textDecoration'],
    values: {
      none: 'none',
      overline: 'overline',
      underline: 'underline',
      lineThrough: 'line-through',
    },
  },

  listStyleType: {
    isResponsive: true,
    properties: ['listStyleType'],
    values: {
      none: 'none',
      circle: 'circle',
      square: 'square',
      upperRoman: 'upper-roman',
      lowerRoman: 'lower-roman',
    },
  },
} satisfies Variants.VariantMap;

export default typographyProps;
