import Variants from '@ts_types/variants';

const sizeProps = {
  size: {
    properties: ['width', 'height'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
    },
  },

  width: {
    properties: ['width'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
    },
  },

  minWidth: {
    properties: ['minWidth'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
    },
  },

  maxWidth: {
    properties: ['maxWidth'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
    },
  },

  height: {
    properties: ['height'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
    },
  },

  minHeight: {
    properties: ['minHeight'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
      screen: '100vh',
    },
  },

  maxHeight: {
    properties: ['maxHeight'],
    isResponsive: true,
    values: {
      full: '100%',
      fit: 'fit-content',
      auto: 'auto',
    },
  },
} satisfies Variants.VariantMap;

export default sizeProps;
