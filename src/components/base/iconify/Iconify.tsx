/** @jsxImportSource @emotion/react */

import React from 'react';
import { Icon } from '@iconify/react';
import colorProps from '@props/color';
import spaceProps from '@props/space';
import borderProps from '@props/border';
import layoutProps from '@props/layout';
import Variants from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import Polymorphic from '@ts_types/polymorhic';
import createVariant from 'src/utils/createVariant';
import effectsProps from '@props/effects';

const variants = {
  ...spaceProps,
  ...borderProps,
  ...layoutProps,
  ...colorProps,
  ...effectsProps,
};

const iconifyVariants = createVariant({
  variants,
});

namespace Iconify {
  export type Props = Polymorphic.PropsWithRef<
    'svg',
    React.ComponentProps<typeof Icon> &
      Variants.VariantProps<typeof iconifyVariants>
  >;
}

const Iconify = React.forwardRef<SVGSVGElement, Iconify.Props>((props, ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    icon,
    ssr = true,
    css,
    _link,
    _hover,
    _active,
    _placeholder,
    notFirstChild,
    notLastChild,
    ...restProps
  } = extractedProps;

  return (
    <Icon
      ref={ref}
      ssr={ssr}
      icon={icon}
      {...restProps}
      css={iconifyVariants({
        ...extractedVariants,
        css,
        _link,
        _hover,
        _active,
        _placeholder,
        notFirstChild,
        notLastChild,
      })}
    />
  );
});

export default Iconify;
