import Variants from 'src/types/variants';

const spaceProps = {
  m: {
    properties: ['margin'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  mt: {
    properties: ['marginTop'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  mb: {
    properties: ['marginBottom'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },
  ms: {
    properties: ['marginLeft'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  me: {
    properties: ['marginRight'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  mx: {
    properties: ['marginRight', 'marginLeft'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  my: {
    properties: ['marginTop', 'marginBottom'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  p: {
    properties: ['padding'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  pt: {
    properties: ['paddingTop'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  pb: {
    properties: ['paddingBottom'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },
  pe: {
    properties: ['paddingRight'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },
  ps: {
    properties: ['paddingLeft'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  px: {
    properties: ['paddingLeft', 'paddingRight'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  py: {
    properties: ['paddingTop', 'paddingBottom'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },

  gapX: {
    properties: ['columnGap'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },
  gapY: {
    properties: ['rowGap'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },
  gap: {
    properties: ['gap'],
    isResponsive: true,
    values: {
      auto: 'auto',
      0: 'calc(var(--space) * 0)',
      2: 'calc(var(--space) * 1)',
      4: 'calc(var(--space) * 2)',
      6: 'calc(var(--space) * 3)',
      8: 'calc(var(--space) * 4)',
      10: 'calc(var(--space) * 5)',
      12: 'calc(var(--space) * 6)',
      16: 'calc(var(--space) * 8)',
      20: 'calc(var(--space) * 10)',
      24: 'calc(var(--space) * 12)',
      32: 'calc(var(--space) * 16)',
      40: 'calc(var(--space) * 20)',
      48: 'calc(var(--space) * 24)',
      56: 'calc(var(--space) * 28)',
      64: 'calc(var(--space) * 32)',
      72: 'calc(var(--space) * 36)',
      80: 'calc(var(--space) * 40)',
    },
  },
} satisfies Variants.VariantMap;

export default spaceProps;