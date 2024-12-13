import Variants from 'src/types/variants';

const flexProps = {
  flexBasis: {
    properties: ['flexBasis'],
    isResponsive: true,
    values: {
      max: 'max-content',
      min: 'min-content',
      fit: 'fit-content',
      '1/12': '8.33%',
      '2/12': '16.66%',
      '3/12': '25%',
      '4/12': '33.33%',
      '5/12': '41.66%',
      '6/12': '50%',
      '7/12': '58.33%',
      '8/12': '67.66%',
      '9/12': '75%',
      '10/12': '83.33%',
      '11/12': '91.66',
      full: '100%',
    },
  },

  flexDirection: {
    properties: ['flexDirection'],
    isResponsive: true,
    values: {
      row: 'row',
      column: 'column',
      rowAlt: 'row-reverse',
      columnAlt: 'column-reverse',
    },
  },

  flexFlow: {
    properties: ['flexFlow'],
    isResponsive: true,
    values: {
      row: 'row',
      column: 'column',
      rowColumn: 'row-column',
      columnRow: 'column-row',
      rowReverse: 'row-reverse',
      columnReverse: 'column-reverse',
      rowColumnReverse: 'row-column-reverse',
      columnRowReverse: 'column-row-reverse',
    },
  },

  flexGrow: {
    properties: ['flexGrow'],
    isResponsive: true,
    values: {
      1: 1,
      2: 2,
      3: 3,
    },
  },

  flexShrink: {
    properties: ['flexShrink'],
    isResponsive: true,
    values: {
      1: 1,
      2: 2,
      3: 3,
    },
  },

  flexWrap: {
    properties: ['flexWrap'],
    isResponsive: true,
    values: {
      yes: 'wrap',
      no: 'no-wrap',
      reverse: 'wrap-reverse',
    },
  },

  flex: {
    properties: ['flex'],
    isResponsive: true,
    values: {
      1: 1,
      none: 'none',
      auto: '1 1 auto',
    },
  },
} satisfies Variants.VariantMap;

export default flexProps;
