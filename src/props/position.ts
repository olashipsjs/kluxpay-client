import Variants from '@ts_types/variants';

const positionProps = {
  top: {
    properties: ['top'],
    isResponsive: true,
    values: {
      0: '',
    },
  },
  bottom: {
    properties: ['top'],
    isResponsive: true,
    values: {
      0: '',
    },
  },
  left: {
    properties: ['top'],
    isResponsive: true,
    values: {
      0: '',
    },
  },
  right: {
    properties: ['top'],
    isResponsive: true,
    values: {
      0: '',
    },
  },

  cursor: {
    properties: ['cursor'],
    values: {
      default: 'pointer',
      drag: 'drag',
    },
  },

  pointerEvents: {
    properties: ['pointerEvents'],
    values: {
      auto: 'auto',
      none: 'none',
    },
  },
} satisfies Variants.VariantMap;
