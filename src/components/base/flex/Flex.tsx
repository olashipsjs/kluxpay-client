/** @jsxImportSource @emotion/react */

import Polymorphic from '@ts_types/polymorhic';
import React from 'react';
import csx from '@utils/createVariant';
import layoutProps from '@props/layout';
import flexProps from '@props/flex';
import Types from '@ts_types/variants';
import borderProps from '@props/border';
import colorProps from '@props/color';
import outlineProps from '@props/outline';
import effectsProps from '@props/effects';
import placementProps from '@props/placement';
import sizeProps from '@props/size';
import spaceProps from '@props/space';
import backgroundProps from '@props/background';
import extractProps from '@utils/extractProps';
import gridProps from '@props/grid';

namespace Flex {
  export type Props = Polymorphic.PropsWithRef<
    'div',
    Types.VariantProps<typeof flexVariants>
  >;
  export type Ref = Polymorphic.Ref<'div'>;
}

const variants = {
  ...layoutProps,
  ...flexProps,
  ...borderProps,
  ...colorProps,
  ...outlineProps,
  ...effectsProps,
  ...placementProps,
  ...sizeProps,
  ...spaceProps,
  ...backgroundProps,
  ...gridProps,
};

const flexVariants = csx({
  variants,
  defaultVariants: {
    display: 'flex',
  },
});

const Flex = React.forwardRef((props: Flex.Props, ref: Flex.Ref) => {
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
      {...restProps}
      css={flexVariants({
        ...extractedVariants,
        css,
        _hover,
        _link,
        _active,
        _placeholder,
        notFirstChild,
        notLastChild,
      })}
      ref={ref}
    />
  );
});

export default Flex;
