/** @jsxImportSource @emotion/react */

import borderProps from '@props/border';
import colorProps from '@props/color';
import effectsProps from '@props/effects';
import layoutProps from '@props/layout';
import outlineProps from '@props/outline';
import sizeProps from '@props/size';
import spaceProps from '@props/space';
import Polymorphic from '@ts_types/polymorhic';
import Types from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import createVariant from '@utils/createVariant';

namespace Container {
  export type Props = Polymorphic.PropsWithRef<
    'div',
    Types.VariantProps<typeof containerProps>
  >;
  export type Ref = Polymorphic.Ref<'div'>;
}

const variants = {
  ...layoutProps,
  ...sizeProps,
  ...spaceProps,
  ...effectsProps,
  ...borderProps,
  ...outlineProps,
  ...colorProps,
};

const containerProps = createVariant({
  variants,
  defaultVariants: {
    maxWidth: '1140px',
    mx: 'auto',
    px: 12,
    width: 'full',
  },
});

const Container = React.forwardRef(
  (props: Container.Props, ref: Container.Ref) => {
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
        css={containerProps({
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
  }
);

export default Container;
