import Variants from '@ts_types/variants';

const borderProps = {
  border: {
    properties: ['border'],
    isResponsive: true,
    values: {
      none: 'none',
      1: '1px solid',
      2: '2px solid',
      3: '3px solid',
      4: '4px solid',
      5: '5px solid',
    },
  },

  borderRight: {
    properties: ['borderRight'],
    values: {
      none: 'none',
      1: '1px solid',
      2: '2px solid',
      3: '3px solid',
      4: '4px solid',
      5: '5px solid',
    },
  },

  borderLeft: {
    properties: ['borderLeft'],
    values: {
      none: 'none',
      1: '1px solid',
      2: '2px solid',
      3: '3px solid',
      4: '4px solid',
      5: '5px solid',
    },
  },

  borderTop: {
    properties: ['borderTop'],
    values: {
      none: 'none',
      1: '1px solid',
      2: '2px solid',
      3: '3px solid',
      4: '4px solid',
      5: '5px solid',
    },
  },

  borderBottom: {
    properties: ['borderBottom'],
    values: {
      none: 'none',
      1: '1px solid',
      2: '2px solid',
      3: '3px solid',
      4: '4px solid',
      5: '5px solid',
    },
  },

  borderStyle: {
    properties: ['borderStyle'],
    values: {
      solid: 'solid',
      dotted: 'dotted',
      dashed: 'dashed',
      double: 'double',
      groover: 'groove',
      ridge: 'ridge',
      inset: 'inset',
      outset: 'outset',
    },
  },

  borderWidth: {
    properties: ['borderWidth'],
    values: {
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
    },
  },

  rounded: {
    properties: ['borderRadius'],
    values: {
      0: '0px',
      none: 0,
      circle: '50%',
      2: 'calc(var(--border-radius) * 1)',
      4: 'calc(var(--border-radius) * 2)',
      6: 'calc(var(--border-radius) * 3)',
      8: 'calc(var(--border-radius) * 4)',
      10: 'calc(var(--border-radius) * 5)',
      12: 'calc(var(--border-radius) * 6)',
      16: 'calc(var(--border-radius) * 8)',
      20: 'calc(var(--border-radius) * 10)',
      24: 'calc(var(--border-radius) * 12)',
      32: 'calc(var(--border-radius) * 16)',
      40: 'calc(var(--border-radius) * 20)',
      48: 'calc(var(--border-radius) * 24)',
      full: 'calc(var(--border-radius) * 999)',
    },
  },
} satisfies Variants.VariantMap;

export default borderProps;
