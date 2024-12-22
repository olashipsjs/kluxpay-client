import React from 'react';
import Button from '../button/Button';
import useFormField from '@hooks/useFormField';
import Box from '../box/Box';
import Flex from '../flex/Flex';

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
        {typeof children === 'function' ? children({ isActive }) : children}
      </Button>
    );
  }
);

const Switch = React.forwardRef(
  (
    {
      border = 1,
      size = '20px',
      rounded = 'full',
      alignItems = 'center',
      borderColor = 'gray-80',
      justifyContent = 'center',
      backgroundColor = 'transparent',
      boxShadow = '0px .75px 1px 0px rgb(var(--gray-80))',
      ...restProps
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        size={size}
        {...restProps}
        border={border}
        rounded={'full'}
        boxShadow={boxShadow}
        alignItems={alignItems}
        borderColor={borderColor}
        justifyContent={justifyContent}
        backgroundColor={backgroundColor}
      >
        <Box
          size={'8px'}
          rounded={'full'}
          backgroundColor={'currentColor'}
        />
      </Flex>
    );
  }
);

const Radio = Compound as typeof Compound & {
  Switch: typeof Switch;
};

Radio.Switch = Switch;
Radio.displayName = 'Radio';

export default Radio;
