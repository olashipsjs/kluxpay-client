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
};

const textFieldVariants = csx({
  variants,

  defaultVariants: {
    py: 6,
    px: 10,
    fontSize: 16,
    width: 'full',
    outline: 'none',
    display: 'block',
    color: 'gray-10',
    letterSpacing: 'xs',
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
      value,
      onChange,
      type,
      onBlur,
      css,
      _placeholder,
      _active,
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
        id={field.name || id}
        type={type === 'number' ? 'text' : type}
        css={textFieldVariants({
          ...extractedVariants,
          css,
          _placeholder: {
            fontSize: 14,
            color: 'gray-60',
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
