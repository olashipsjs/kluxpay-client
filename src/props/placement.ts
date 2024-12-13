import Variants from '@ts_types/variants';

const placementProps = {
  justifyItems: {
    properties: ['justifyItems'],
    isResponsive: true,
    values: {
      stretch: 'stretch',
      center: 'center',
      start: 'start',
      end: 'end',
      baseline: 'baseline',
    },
  },

  justifySelf: {
    properties: ['justifySelf'],
    isResponsive: true,
    values: {
      stretch: 'stretch',
      center: 'center',
      start: 'start',
      end: 'end',
      baseline: 'baseline',
    },
  },

  justifyContent: {
    properties: ['justifyContent'],
    isResponsive: true,
    values: {
      center: 'center',
      start: 'start',
      end: 'end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    },
  },

  alignItems: {
    properties: ['alignItems'],
    isResponsive: true,
    values: {
      stretch: 'stretch',
      center: 'center',
      start: 'start',
      end: 'end',
      baseline: 'baseline',
    },
  },
} satisfies Variants.VariantMap;

export default placementProps;
