/** @jsxImportSource @emotion/react */

import Polymorphic from '@ts_types/polymorhic';
import React from 'react';
import csx from '@utils/createVariant';
import layoutProps from '@props/layout';
import flexProps from '@props/flex';
import Types from '@ts_types/variants';
import borderProps from '@props/border';
import colorProps from '@props/color';
import sizeProps from '@props/size';
import typographyProps from '@props/typography';
import spaceProps from '@props/space';
import effectsProps from '@props/effects';
import placementProps from '@props/placement';
import Loader from './Loader';
import extractProps from '@utils/extractProps';

namespace Button {
  export type Props = Polymorphic.PropsWithRef<
    'button',
    Types.VariantProps<typeof buttonProps>
  >;
  export type Ref = Polymorphic.Ref<'button'>;
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
  ...flexProps,
  ...placementProps,
};

const buttonProps = csx({
  variants: variants,
  defaultVariants: {
    width: 'full',
    py: 10,
    px: 12,
    gap: 4,
    border: 1,
    rounded: 6,
    fontSize: 14,
    color: 'white',
    transition: '200',
    cursor: 'pointer',
    textAlign: 'center',
    letterSpacing: 'xs',
    fontWeight: 'medium',
    alignItems: 'center',
    display: 'inlineFlex',
    justifyContent: 'center',
    borderColor: 'indigo-60',
    backgroundColor: 'indigo-60',
  },
});

const Compound = React.forwardRef((props: Button.Props, ref: Button.Ref) => {
  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    as,
    disabled,
    type = 'button',
    css,
    _link,
    _active,
    _placeholder,
    notFirstChild,
    notLastChild,
    _hover = { borderColor: 'indigo-70', backgroundColor: 'indigo-70' },
    ...restProps
  } = extractedProps;

  const Component = as || 'button';

  return (
    <Component
      type={type}
      {...restProps}
      disabled={disabled}
      css={buttonProps({
        ...extractedVariants,
        opacity: disabled ? '70' : extractedVariants.opacity,
        cursor: disabled ? 'notAllowed' : extractedVariants.cursor,
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

const Button = Compound as typeof Compound & {
  Loader: typeof Loader;
};

Button.Loader = Loader;
Button.displayName = 'Button';

export default Button;