import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import React from 'react';
import useFormField from 'src/hooks/useFormField';

const Checkbox = React.forwardRef(
  (
    {
      p = 0,
      rounded = 6,
      size = '16px',
      borderColor = 'gray-90',
      backgroundColor = 'gray-95',
      onClick,
      ...rest
    }: React.ComponentProps<typeof Button>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { field, helper } = useFormField();

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      helper.setValue(!field.value);
      onClick && onClick(event);
    };

    return (
      <Button
        p={p}
        {...rest}
        ref={ref}
        size={size}
        rounded={rounded}
        onClick={handleToggle}
        color={field.value ? 'white' : 'gray-30'}
        borderColor={field.value ? 'indigo-60' : borderColor}
        backgroundColor={field.value ? 'indigo-60' : backgroundColor}
        _hover={{
          borderColor: field.value ? 'indigo-70' : 'gray-90',
          backgroundColor: field.value ? 'indigo-70' : 'gray-90',
        }}
      >
        {field.value === true ? (
          <Iconify
            width={'1.5em'}
            icon={'material-symbols-light:check-rounded'}
          />
        ) : null}
      </Button>
    );
  }
);

export default Checkbox;
