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
import backgroundProps from '@props/background';

namespace Section {
  export type Props = Polymorphic.PropsWithRef<
    'section',
    Variants.VariantProps<typeof sectionVariants>
  >;
  export type Ref = Polymorphic.Ref<'section'>;
}

const variants = {
  ...layoutProps,
  ...colorProps,
  ...sizeProps,
  ...spaceProps,
  ...effectsProps,
  ...outlineProps,
  ...borderProps,
  ...backgroundProps,
};

const sectionVariants = csx({
  variants,
  defaultVariants: {
    width: 'full',
  },
});

const Section = React.forwardRef((props: Section.Props, ref: Section.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    as,
    css,
    _hover,
    _active,
    notFirstChild,
    notLastChild,
    ...restProps
  } = extractedProps;

  const Component = as || 'section';

  return (
    <Component
      {...restProps}
      css={sectionVariants({
        ...extractedVariants,
        css,
        _hover,
        _active,
        notFirstChild,
        notLastChild,
      })}
      ref={ref}
    />
  );
});

export default Section;
