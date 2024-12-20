import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import React from 'react';
import useFormField from 'src/hooks/useFormField';

const Compound = React.forwardRef(
  (
    {
      p = 0,
      _hover,
      children,
      rounded = 'none',
      justifyContent = 'start',
      borderColor = 'transparent',
      backgroundColor = 'transparent',
      ...restProps
    }: Omit<React.ComponentProps<typeof Button>, 'children'> & {
      children?:
        | ((options: { isActive: boolean }) => React.ReactNode)
        | React.ReactNode;
    },
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { field, helper } = useFormField();

    const handleClick = () => {
      helper.setValue(!field.value);
    };

    const isActive = field.value === true;

    return (
      <Button
        p={p}
        ref={ref}
        rounded={rounded}
        borderColor={borderColor}
        justifyContent={justifyContent}
        backgroundColor={backgroundColor}
        {...restProps}
        onClick={handleClick}
        _hover={{ backgroundColor: 'transparent', ..._hover }}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
      </Button>
    );
  }
);

const Switch = React.forwardRef(
  (
    {
      p = 0,
      onClick,
      rounded = 'full',
      size = '16px',
      borderColor = 'gray-80',
      backgroundColor = 'transparent',
      boxShadow = '0px .5px 1px 0px rgb(var(--gray-90))',
      ...restProps
    }: React.ComponentProps<typeof Button>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { field } = useFormField();

    return (
      <Button
        p={p}
        {...restProps}
        ref={ref}
        size={size}
        rounded={rounded}
        boxShadow={boxShadow}
        color={field.value ? 'white' : 'gray-30'}
        borderColor={field.value ? 'indigo-60' : borderColor}
        backgroundColor={field.value ? 'indigo-60' : backgroundColor}
        _hover={{
          borderColor: field.value ? 'indigo-70' : 'gray-80',
          backgroundColor: field.value ? 'indigo-70' : 'gray-100',
        }}
      >
        {field.value === true ? (
          <Iconify
            width={'20px'}
            icon={'material-symbols-light:check-rounded'}
          />
        ) : null}
      </Button>
    );
  }
);

const Checkbox = Compound as typeof Compound & {
  Switch: typeof Switch;
};

Checkbox.Switch = Switch;
Checkbox.displayName = 'Checkbox';

export default Checkbox;
