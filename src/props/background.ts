import Variants from 'src/types/variants';

const backgroundProps = {
  backgroundAttachment: {
    properties: ['backgroundAttachment'],
    values: {
      fixed: 'fixed',
      scroll: 'scroll',
    },
  },

  backgroundImage: {
    properties: ['backgroundImage'],
    values: {
      none: 'none',
    },
  },

  backgroundClip: {
    properties: ['backgroundClip'],
    values: {
      borderBox: 'border-box',
      paddingBox: 'padding-box',
      contentBox: 'content-box',
    },
  },

  backgroundOrigin: {
    properties: ['backgroundOrigin'],
    values: {
      borderBox: 'border-box',
      paddingBox: 'padding-box',
      contentBox: 'content-box',
    },
  },

  backgroundPosition: {
    properties: ['backgroundPosition'],
    isResponsive: true,
    values: {
      top: 'top',
      left: 'left',
      right: 'right',
      bottom: 'bottom',
      center: 'center',
    },
  },

  backgroundRepeat: {
    properties: ['backgroundRepeat'],
    values: {
      noRepeat: 'no-repeat',
      repeat: 'repeat',
      repeatX: 'repeat-x',
      repeatY: 'repeat-y',
    },
  },

  backgroundSize: {
    properties: ['backgroundSize'],
    values: {
      cover: 'cover',
      contain: 'contain',
    },
  },
} satisfies Variants.VariantMap;

export default backgroundProps;
