/** @jsxImportSource @emotion/react */

import colorProps from '@props/color';
import layoutProps from '@props/layout';
import typographyProps from '@props/typography';
import Polymorphic from '@ts_types/polymorhic';
import Variants from '@ts_types/variants';
import extractProps from '@utils/extractProps';
import React from 'react';
import useFormField from 'src/hooks/useFormField';
import csx from '@utils/createVariant';

namespace Label {
  export type Props = Polymorphic.PropsWithRef<
    'label',
    Variants.VariantProps<typeof labelVariants>
  >;
  export type Ref = Polymorphic.Ref<'label'>;
}

const variants = {
  ...layoutProps,
  ...typographyProps,
  ...colorProps,
};

const labelVariants = csx({
  variants,
  defaultVariants: {
    fontSize: 14,
    lineHeight: 'md',
    fontWeight: 'medium',
    letterSpacing: 'xs',
    display: 'inlineBlock',
  },
});

const Label = React.forwardRef((props: Label.Props, ref: Label.Ref) => {
  const { field } = useFormField();

  const [extractedVariants, extractedProps] = extractProps(props, variants);

  const {
    as,
    htmlFor,
    css,
    _hover,
    _active,
    _placeholder,
    notFirstChild,
    notLastChild,
    ...restProps
  } = extractedProps;

  const Component = as || 'label';

  return (
    <Component
      {...restProps}
      htmlFor={field.name || htmlFor}
      css={labelVariants({
        ...extractedVariants,
        css,
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

export default Label;
