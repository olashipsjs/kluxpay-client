import Variants from '@ts_types/variants';

const effectsProps = {
  textShadow: {
    properties: ['textShadow'],
    values: {},
  },

  boxShadow: {
    properties: ['boxShadow'],
    values: {
      ringGray10: '0px 0px 0px 1px rgb(var(--gray-10))',
      ringGray20: '0px 0px 0px 1px rgb(var(--gray-20))',
      ringGray30: '0px 0px 0px 1px rgb(var(--gray-30))',
      ringGray40: '0px 0px 0px 1px rgb(var(--gray-40))',
      ringGray50: '0px 0px 0px 1px rgb(var(--gray-50))',
      ringGray60: '0px 0px 0px 1px rgb(var(--gray-60))',
      ringGray70: '0px 0px 0px 1px rgb(var(--gray-70))',
      ringGray80: '0px 0px 0px 1px rgb(var(--gray-80))',
      ringGray90: '0px 0px 0px 1px rgb(var(--gray-90))',
      ringGray95: '0px 0px 0px 1px rgb(var(--gray-95))',
      ringGray100: '0px 0px 0px 1px rgb(var(--gray-100))',
    },
  },

  scale: {
    properties: ['transform'],
    values: {
      0: 'scale(0)',
      0.25: 'scale(0.25)',
      0.5: 'scale(0.5)',
      0.75: 'scale(0.75)',
      1: 'scale(1)',
      1.05: 'scale(1.05)',
      1.1: 'scale(1.1)',
      1.25: 'scale(1.25)',
      1.5: 'scale(1.5)',
      1.75: 'scale(1.75)',
      2: 'scale(2)',
    },
  },

  scaleX: {
    properties: ['transform'],
    values: {
      0: 'scaleX(0)',
      0.25: 'scaleX(0.25)',
      0.5: 'scaleX(0.5)',
      0.75: 'scaleX(0.75)',
      1: 'scaleX(1)',
      1.05: 'scaleX(1.05)',
      1.1: 'scaleX(1.1)',
      1.25: 'scaleX(1.25)',
      1.5: 'scaleX(1.5)',
      1.75: 'scaleX(1.75)',
      2: 'scaleX(2)',
    },
  },

  scaleY: {
    properties: ['transform'],
    values: {
      0: 'scaleY(0)',
      0.25: 'scaleY(0.25)',
      0.5: 'scaleY(0.5)',
      0.75: 'scaleY(0.75)',
      1: 'scaleY(1)',
      1.05: 'scaleY(1.05)',
      1.1: 'scaleY(1.1)',
      1.25: 'scaleY(1.25)',
      1.5: 'scaleY(1.5)',
      1.75: 'scaleY(1.75)',
      2: 'scaleY(2)',
    },
  },

  translateX: {
    properties: ['transform'],
    values: {
      0: 'translateX(0)',
      0.25: 'translateX(0.25)',
      0.5: 'translateX(0.5)',
      0.75: 'translateX(0.75)',
      1: 'translateX(1)',
      1.05: 'translateX(1.05)',
      1.1: 'translateX(1.1)',
      1.25: 'translateX(1.25)',
      1.5: 'translateX(1.5)',
      1.75: 'translateX(1.75)',
      2: 'translateX(2)',
    },
  },

  translateY: {
    properties: ['transform'],
    values: {
      0: 'translateY(0)',
      0.25: 'translateY(0.25)',
      0.5: 'translateY(0.5)',
      0.75: 'translateY(0.75)',
      1: 'translateY(1)',
      1.05: 'translateY(1.05)',
      1.1: 'translateY(1.1)',
      1.25: 'translateY(1.25)',
      1.5: 'translateY(1.5)',
      1.75: 'translateY(1.75)',
      2: 'translateY(2)',
    },
  },

  transition: {
    properties: ['transition'],
    values: {
      '200': 'all 0.2s ease-in-out',
      '300': 'all 0.3s ease-in-out',
      '500': 'all 0.5s ease-in-out',
    },
  },

  transitionTimingFunction: {
    properties: ['transitionTimingFunction'],
    values: {
      ease: 'ease',
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },

  backdropBlur: {
    properties: ['backdropFilter'],
    values: {
      none: 'blur(0em)',
      xs: 'blur(0.25em)',
      sm: 'blur(0.5em)',
      md: 'blur(0.75em)',
      lg: 'blur(1.0em)',
      xl: 'blur(1.5em)',
    },
  },

  opacity: {
    properties: ['opacity'],
    values: {
      0: 0,
      10: 0.1,
      20: 0.2,
      30: 0.3,
      40: 0.4,
      50: 0.5,
      60: 0.6,
      70: 0.7,
      80: 0.8,
      90: 0.9,
      100: 1,
    },
  },
} satisfies Variants.VariantMap;

export default effectsProps;
