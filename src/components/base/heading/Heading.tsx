/** @jsxImportSource @emotion/react */

import colorProps from '@props/color';
import spaceProps from '@props/space';
import typographyProps from '@props/typography';
import Polymorphic from '@ts_types/polymorhic';
import Types from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import csx from '@utils/createVariant';

namespace Heading {
  export type Props = Polymorphic.PropsWithRef<
    'h1',
    Types.VariantProps<typeof headingVariants>
  >;
  export type Ref = Polymorphic.Ref<'h1'>;
}

const variants = {
  ...typographyProps,
  ...spaceProps,
  ...colorProps,
};

const headingVariants = csx({
  variants,
  defaultVariants: {
    fontSize: 24,
    fontWeight: 'medium',
    letterSpacing: 'xs',
    color: 'gray-10',
  },
});

const Heading = React.forwardRef((props: Heading.Props, ref: Heading.Ref) => {
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

  const Component = as || 'h3';

  return (
    <Component
      {...restProps}
      css={headingVariants({
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

export default Heading;
