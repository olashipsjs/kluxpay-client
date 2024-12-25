/** @jsxImportSource @emotion/react */

import Polymorphic from '@ts_types/polymorhic';
import React from 'react';
import csx from '@utils/createVariant';
import layoutProps from '@props/layout';
import flexProps from '@props/flex';
import Variants from '@ts_types/variants';
import borderProps from '@props/border';
import colorProps from '@props/color';
import sizeProps from '@props/size';
import typographyProps from '@props/typography';
import spaceProps from '@props/space';
import extractProps from '@utils/extractProps';
import effectsProps from '@props/effects';
import { NavLink } from 'react-router-dom';
import placementProps from '@props/placement';

namespace Link {
  export type Props = Polymorphic.PropsWithRef<
    'a',
    Variants.VariantProps<typeof linkVariants> &
      React.ComponentProps<typeof NavLink>
  >;
  export type Ref = Polymorphic.Ref<'a'>;
}

const variants = {
  ...layoutProps,
  ...flexProps,
  ...borderProps,
  ...colorProps,
  ...sizeProps,
  ...spaceProps,
  ...typographyProps,
  ...effectsProps,
  ...placementProps,
};

const linkVariants = csx({
  variants,
  defaultVariants: {
    rounded: 12,
    fontSize: 14,
    lineHeight: '1',
    transition: '200',
    cursor: 'pointer',
    textAlign: 'center',
    letterSpacing: 'xs',
    color: 'gray-60',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    textDecoration: 'none',
  },
});

const Anchor = React.forwardRef((props: Link.Props, ref: Link.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    as = 'a',
    _link,
    _hover = { color: 'orange-10' },
    _active,
    ...restProps
  } = extractedProps;

  return (
    <NavLink
      {...restProps}
      css={linkVariants({
        ...extractedVariants,
        _link,
        _hover,
        _active,
      })}
      ref={ref}
    />
  );
});

export default Anchor;
