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
import useFormField from 'src/hooks/useFormField';
import extractProps from '@utils/extractProps';

namespace Textarea {
  export type Props = Polymorphic.PropsWithRef<
    'textarea',
    Variants.VariantProps<typeof textareaVariants>
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

const textareaVariants = csx({
  variants,

  defaultVariants: {
    py: 6,
    px: 10,
    fontSize: 16,
    width: 'full',
    resize: 'none',
    outline: 'none',
    display: 'block',
    color: 'gray-10',
    lineHeight: '1.5em',
    letterSpacing: 'xs',
    backgroundColor: 'transparent',
  },
});

const Textarea = React.forwardRef(
  (props: Textarea.Props, ref: Textarea.Ref) => {
    const [extractedVariants, extractedProps] = extractProps(props, variants);

    const {
      as,
      onChange,
      rows,
      id,
      value,
      css,
      _hover,
      _active,
      _placeholder,
      ...restProps
    } = extractedProps;

    const Component = (as || 'textarea') as React.ElementType;

    const { field, helper } = useFormField();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      const value = event.target.value;
      helper.setValue(value);

      onChange && onChange(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      helper.setTouched(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      helper.setTouched(false);
    };

    return (
      <Component
        rows={rows}
        id={field.name || id}
        {...restProps}
        css={textareaVariants({
          ...extractedVariants,
          css,
          _active,
          _placeholder: {
            fontSize: 14,
            color: 'gray-60',
            ..._placeholder,
          },
          _hover,
        })}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={value || field.value}
        ref={ref}
      />
    );
  }
);

export default Textarea;
