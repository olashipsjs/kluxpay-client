/** @jsxImportSource @emotion/react */

import borderProps from '@props/border';
import colorProps from '@props/color';
import effectsProps from '@props/effects';
import layoutProps from '@props/layout';
import outlineProps from '@props/outline';
import sizeProps from '@props/size';
import spaceProps from '@props/space';
import Polymorphic from '@ts_types/polymorhic';
import Variants from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import csx from '@utils/createVariant';

const variants = {
  ...outlineProps,
  ...borderProps,
  ...colorProps,
  ...effectsProps,
  ...sizeProps,
  ...spaceProps,
  ...layoutProps,
};

const imageVariants = csx({
  variants,
  defaultVariants: {
    objectFit: 'cover',
  },
});

namespace Image {
  export type Props = Polymorphic.PropsWithRef<
    'img',
    Variants.VariantProps<typeof imageVariants>
  >;

  export type Ref = Polymorphic.Ref<'img'>;
}

const Image = React.forwardRef((props: Image.Props, ref: Image.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const { as, _hover, ...restProps } = extractedProps;

  const Component = as || 'img';

  return (
    <Component
      ref={ref}
      {...restProps}
      css={imageVariants({ ...extractedVariants, _hover })}
    />
  );
});

export default Image;
