import Variants from 'src/types/variants';

const gridProps = {
  gridColumn: {
    properties: ['gridColumn'],
    isResponsive: true,
    values: {
      auto: 'auto',
      1: 'span 1/span 1',
      2: 'span 2/span 2',
      3: 'span 3/span 3',
      4: 'span 4/span 4',
      5: 'span 5/span 5',
      6: 'span 6/span 6',
      7: 'span 7/span 7',
      8: 'span 8/span 8',
      9: 'span 9/span 9',
      10: 'span 10/span 10',
      11: 'span 11/span 11',
      12: 'span 12/span 12',
    },
  },

  gridRow: {
    properties: ['gridRow'],
    isResponsive: true,
    values: {
      auto: 'auto',
      1: 'span 1/span 1',
      2: 'span 2/span 2',
      3: 'span 3/span 3',
      4: 'span 4/span 4',
      5: 'span 5/span 5',
      6: 'span 6/span 6',
      7: 'span 7/span 7',
      8: 'span 8/span 8',
      9: 'span 9/span 9',
      10: 'span 10/span 10',
      11: 'span 11/span 11',
      12: 'span 12/span 12',
    },
  },

  gridColumnEnd: {
    properties: ['gridColumnEnd'],
    isResponsive: true,
    values: {
      auto: 'auto',
      1: 'span 1',
      2: 'span 2',
      3: 'span 3',
      4: 'span 4',
      5: 'span 5',
      6: 'span 6',
      7: 'span 7',
      8: 'span 8',
      9: 'span 9',
      10: 'span 10',
      11: 'span 11',
      12: 'span 12',
    },
  },

  gridColumnStart: {
    properties: ['gridColumnStart'],
    isResponsive: true,
    values: {
      auto: 'auto',
      1: 'span 1',
      2: 'span 2',
      3: 'span 3',
      4: 'span 4',
      5: 'span 5',
      6: 'span 6',
      7: 'span 7',
      8: 'span 8',
      9: 'span 9',
      10: 'span 10',
      11: 'span 11',
      12: 'span 12',
    },
  },

  gridRowEnd: {
    properties: ['gridRowEnd'],
    isResponsive: true,
    values: {
      auto: 'auto',
      1: 'span 1',
      2: 'span 2',
      3: 'span 3',
      4: 'span 4',
      5: 'span 5',
      6: 'span 6',
      7: 'span 7',
      8: 'span 8',
      9: 'span 9',
      10: 'span 10',
      11: 'span 11',
      12: 'span 12',
    },
  },

  gridRowStart: {
    properties: ['gridRowStart'],
    isResponsive: true,
    values: {
      auto: 'auto',
      1: 'span 1',
      2: 'span 2',
      3: 'span 3',
      4: 'span 4',
      5: 'span 5',
      6: 'span 6',
      7: 'span 7',
      8: 'span 8',
      9: 'span 9',
      10: 'span 10',
      11: 'span 11',
      12: 'span 12',
    },
  },

  gridTemplateColumns: {
    properties: ['gridTemplateColumns'],
    isResponsive: true,
    values: {
      subgrid: 'subgrid',
      masonry: 'masonry',
    },
  },

  gridTemplateRows: {
    properties: ['gridTemplateRows'],
    isResponsive: true,
    values: {
      subgrid: 'subgrid',
      masonry: 'masonry',
    },
  },
} satisfies Variants.VariantMap;

export default gridProps;
