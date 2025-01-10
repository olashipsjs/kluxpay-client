import Variants from '@ts_types/variants';

const outlineProps = {
  outline: {
    properties: ['outline'],
    values: {
      xs: '1px',
      sm: '2px',
      md: '4px',
      lg: '8px',
      none: 'none',
    },
  },

  outlineStyle: {
    properties: ['outlineStyle'],
    values: {
      none: 'none',
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted',
    },
  },

  outlineOffset: {
    properties: ['outlineOffset'],
    values: {
      '-1': -1,
      '-2': -2,
      '-3': -3,
      '-4': -4,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
    },
  },

  outlineWidth: {
    properties: ['outlineWidth'],
    values: {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
    },
  },
} satisfies Variants.VariantMap;

export default outlineProps;
