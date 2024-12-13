/** @jsxImportSource @emotion/react */

import borderProps from '@props/border';
import gridProps from '@props/grid';
import layoutProps from '@props/layout';
import outlineProps from '@props/outline';
import sizeProps from '@props/size';
import spaceProps from '@props/space';
import Polymorphic from '@ts_types/polymorhic';
import Types from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import csx from '@utils/createVariant';

namespace Grid {
  export type Props = Polymorphic.PropsWithRef<
    'div',
    Types.VariantProps<typeof gridVariants>
  >;
  export type Ref = Polymorphic.Ref<'div'>;
}

const variants = {
  ...layoutProps,
  ...spaceProps,
  ...sizeProps,
  ...borderProps,
  ...outlineProps,
  ...gridProps,
};

const gridVariants = csx({
  variants,

  defaultVariants: {
    display: 'grid',
  },
});

const Grid = React.forwardRef((props: Grid.Props, ref: Grid.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    as,
    css,
    _link,
    _hover,
    _active,
    _placeholder,
    notFirstChild,
    notLastChild,
    ...restProps
  } = extractedProps;

  const Component = as || 'div';

  return (
    <Component
      {...restProps}
      css={gridVariants({
        ...extractedVariants,
        css,
        _link,
        _hover,
        _active,
        _placeholder,
        notFirstChild,
        notLastChild,
      })}
      ref={ref}
    />
  );
});

export default Grid;
