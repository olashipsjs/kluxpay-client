/** @jsxImportSource @emotion/react */

import colorProps from '@props/color';
import spaceProps from '@props/space';
import typographyProps from '@props/typography';
import Polymorphic from '@ts_types/polymorhic';
import Variants from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import csx from '@utils/createVariant';

namespace Text {
  export type Props = Polymorphic.PropsWithRef<
    'span',
    Variants.VariantProps<typeof textVariants>
  >;
  export type Ref = Polymorphic.Ref<'span'>;
}

const variants = {
  ...typographyProps,
  ...colorProps,
  ...spaceProps,
};

const textVariants = csx({
  variants,
  defaultVariants: {
    color: 'inherit',
  },
});

const Text = React.forwardRef((props: Text.Props, ref: Text.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const { as, css, ...restProps } = extractedProps;

  const Component = as || 'span';

  return (
    <Component
      {...restProps}
      css={textVariants({ ...extractedVariants, css })}
      ref={ref}
    />
  );
});

export default Text;
