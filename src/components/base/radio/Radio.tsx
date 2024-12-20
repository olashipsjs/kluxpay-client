import React from 'react';
import Button from '../button/Button';
import useFormField from '@hooks/useFormField';
import Box from '../box/Box';

const Compound = React.forwardRef(
  (
    {
      py = 10,
      px = 12,
      gap = 16,
      rounded = 0,
      width = 'full',
      height = 'fit',
      color = 'gray-10',
      border = 'none',
      borderColor = 'transparent',
      backgroundColor = 'transparent',
      value,
      _hover,
      children,
      ...restProps
    }: Omit<React.ComponentProps<typeof Button>, 'value' | 'children'> & {
      value: string | number;
      children:
        | ((options: { isActive: boolean }) => React.ReactNode)
        | React.ReactNode;
    },
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { field, helper } = useFormField();

    const isActive = field.value === value;

    console.log({ val: field.value });

    const handleClick = () => helper.setValue(value);

    return (
      <Button
        py={py}
        px={px}
        gap={gap}
        width={width}
        color={color}
        border={1}
        height={height}
        rounded={rounded}
        onClick={handleClick}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        _hover={{ backgroundColor: 'gray-100', ..._hover }}
        ref={ref}
        {...restProps}
      >
        {' '}
        {typeof children === 'function'
          ? children({ isActive })
          : children}{' '}
      </Button>
    );
  }
);

const Switch = React.forwardRef(
  (
    {
      p = 0,
      size = '20px',
      rounded = 'full',
      borderColor = 'gray-80',
      backgroundColor = 'transparent',
      boxShadow = '0px .5px 1px 0px rgb(var(--gray-90))',
      ...restProps
    }: React.ComponentProps<typeof Button>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    return (
      <Button
        p={0}
        ref={ref}
        size={size}
        {...restProps}
        rounded={'full'}
        boxShadow={boxShadow}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
      >
        <Box
          size={'8px'}
          rounded={'full'}
          backgroundColor={'currentColor'}
        />
      </Button>
    );
  }
);

const Radio = Compound as typeof Compound & {
  Switch: typeof Switch;
};

Radio.Switch = Switch;
Radio.displayName = 'Radio';

export default Radio;
