/** @jsxImportSource @emotion/react */

import borderProps from '@props/border';
import colorProps from '@props/color';
import layoutProps from '@props/layout';
import outlineProps from '@props/outline';
import sizeProps from '@props/size';
import spaceProps from '@props/space';
import typographyProps from '@props/typography';
import Polymorphic from '@ts_types/polymorhic';
import Variants from '@ts_types/variants';
import React from 'react';
import csx from '@utils/createVariant';
import Password from './Password';
import useFormField from '@hooks/useFormField';
import extractProps from '@utils/extractProps';
import effectsProps from '@props/effects';

namespace TextField {
  export type Props = Polymorphic.PropsWithRef<
    'input',
    Variants.VariantProps<typeof textFieldVariants>
  >;
  export type Ref = Polymorphic.Ref<'input'>;
}

const variants = {
  ...typographyProps,
  ...spaceProps,
  ...sizeProps,
  ...outlineProps,
  ...borderProps,
  ...colorProps,
  ...layoutProps,
  ...effectsProps,
};

const textFieldVariants = csx({
  variants,

  defaultVariants: {
    py: 8,
    px: 10,
    fontSize: 14,
    width: 'full',
    outline: 'none',
    display: 'block',
    color: 'gray-10',
    letterSpacing: 'xs',
    fontWeight: 'medium',
    lineHeight: '1.5em',
    backgroundColor: 'transparent',
  },
});

const Compound = React.forwardRef(
  (props: TextField.Props, ref: TextField.Ref) => {
    const [extractedVariants, extractedProps] = extractProps(props, variants);

    const {
      as,
      id,
      css,
      value,
      type,
      onBlur,
      onChange,
      _active,
      disabled,
      _placeholder,
      ...restProps
    } = extractedProps;

    const Component = (as || 'input') as React.ElementType;

    const { field, helper } = useFormField();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      onChange && onChange(event);
      let value = event.target.value;

      if (type === 'number') {
        value = value.replace(/[^0-9\.]/g, '');

        // Ensure only one dot is allowed
        const dotCount = (value.match(/\./g) || []).length;
        if (dotCount > 1) {
          value = value.replace(/\.(?=[^.]*)$/, '');
        }

        const formattedNumber = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        value = formattedNumber;
      }

      helper.setValue(value);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
      helper.setTouched(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
      helper.setTouched(false);

      onBlur && onBlur(event);
    };

    return (
      <Component
        {...restProps}
        disabled={disabled}
        id={field.name || id}
        type={type === 'number' ? 'text' : type}
        css={textFieldVariants({
          ...extractedVariants,
          opacity: disabled ? '60' : extractedVariants.opacity,
          css,
          _placeholder: {
            fontSize: 14,
            color: 'gray-70',
            fontWeight: 'regular',
            ..._placeholder,
          },
          _active,
        })}
        value={value || field.value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        ref={ref}
      />
    );
  }
);

const TextField = Compound as typeof Compound & {
  Password: typeof Password;
};

TextField.Password = Password;
TextField.displayName = 'TextField';

export default TextField;
