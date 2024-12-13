import Variants from 'src/types/variants';

const layoutProps = {
  boxSizing: {
    properties: ['boxSizing'],
    values: {
      content: 'content-box',
      border: 'border-box',
    },
  },

  pointerEvents: {
    properties: ['pointerEvents'],
    values: {
      none: 'none',
      auto: 'auto',
      all: 'all',
      visible: 'visible',
      painted: 'painted',
      nonePainted: 'nonePainted',
      visiblePainted: 'visiblePainted',
      paintedVisible: 'paintedVisible',
      allPainted: 'allPainted',
      visibleAllPainted: 'visibleAllPainted',
      paintedAll: 'paintedAll',
      visiblePaintedAll: 'visiblePaintedAll',
    },
  },

  display: {
    properties: ['display'],
    isResponsive: true,
    values: {
      flex: 'flex',
      grid: 'grid',
      hidden: 'none',
      block: 'block',
      inline: 'inline',
      contents: 'contents',
      inlineBlock: 'inline-block',
      inlineFlex: 'inline-flex',
      inlineGrid: 'inline-grid',
    },
  },

  objectFit: {
    properties: ['objectFit'],
    values: {
      cover: 'cover',
      contain: 'contain',
      scaleDown: 'scale-down',
      auto: 'auto',
    },
  },

  position: {
    properties: ['position'],
    isResponsive: true,
    values: {
      static: 'static',
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
      sticky: 'sticky',
    },
  },

  top: {
    properties: ['top'],
    isResponsive: true,
    values: {
      none: '0px',
    },
  },

  bottom: {
    properties: ['bottom'],
    isResponsive: true,
    values: {
      none: '0px',
    },
  },

  left: {
    properties: ['left'],
    isResponsive: true,
    values: {
      none: '0px',
    },
  },

  right: {
    properties: ['right'],
    isResponsive: true,
    values: {
      none: '0px',
    },
  },

  visibility: {
    isResponsive: true,
    properties: ['visibility'],
    values: {
      visible: 'visible',
      hidden: 'hidden',
    },
  },

  zIndex: {
    properties: ['zIndex'],
    values: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      max: 999,
    },
  },

  overflow: {
    properties: ['overflow'],
    values: {
      auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
  },

  overflowX: {
    properties: ['overflowX'],
    values: {
      auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
  },

  overflowY: {
    properties: ['overflowY'],
    values: {
      auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
    },
  },

  resize: {
    properties: ['resize'],
    values: {
      none: 'none',
      both: 'both',
      horizontal: 'horizontal',
      vertical: 'vertical',
    },
  },

  cursor: {
    properties: ['cursor'],
    values: {
      auto: 'auto',
      pointer: 'pointer',
      wait: 'wait',
      move: 'move',
      help: 'help',
      default: 'default',
      none: 'none',
      text: 'text',
      alias: 'alias',
      progress: 'progress',
      notAllowed: 'not-allowed',
      contextMenu: 'context-menu',
      cell: 'cell',
      crosshair: 'crosshair',
      grab: 'grab',
      grabbing: 'grabbing',
      zoomIn: 'zoom-in',
      zoomOut: 'zoom-out',
    },
  },
} satisfies Variants.VariantMap;

export default layoutProps;
