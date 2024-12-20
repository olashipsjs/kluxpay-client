/** @jsxImportSource @emotion/react */

import borderProps from '@props/border';
import colorProps from '@props/color';
import effectsProps from '@props/effects';
import layoutProps from '@props/layout';
import outlineProps from '@props/outline';
import placementProps from '@props/placement';
import sizeProps from '@props/size';
import spaceProps from '@props/space';
import Polymorphic from '@ts_types/polymorhic';
import Types from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import csx from '@utils/createVariant';
import gridProps from '@props/grid';

namespace Box {
  export type Props = Polymorphic.PropsWithRef<
    'div',
    Types.VariantProps<typeof boxProps>
  >;
  export type Ref = Polymorphic.Ref<'div'>;
}

const variants = {
  ...layoutProps,
  ...effectsProps,
  ...outlineProps,
  ...borderProps,
  ...placementProps,
  ...sizeProps,
  ...spaceProps,
  ...colorProps,
  ...gridProps,
};

const boxProps = csx({
  variants: variants,
  defaultVariants: {},
});

const Box = React.forwardRef((props: Box.Props, ref: Box.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    as,
    css,
    _hover,
    _link,
    _active,
    _placeholder,
    notFirstChild,
    notLastChild,
    ...restProps
  } = extractedProps;

  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      css={boxProps({
        ...extractedVariants,
        css,
        _hover,
        _link,
        _active,
        _placeholder,
        notFirstChild,
        notLastChild,
      })}
      {...restProps}
    />
  );
});

export default Box;
