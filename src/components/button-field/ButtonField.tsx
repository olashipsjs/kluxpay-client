import Button from '@components/base/button/Button';
import React from 'react';
import useFormField from 'src/hooks/useFormField';

type OmitProps = {
  children?:
    | ((props: { isActive: boolean }) => React.ReactNode)
    | React.ReactNode;
  value: string | number;
};

type Props = Omit<React.ComponentProps<typeof Button>, keyof OmitProps> &
  OmitProps;

const ButtonField = React.forwardRef(
  (
    {
      py = 6,
      value,
      onClick,
      children,
      fontSize = 13,
      color = 'gray-10',
      fontWeight = 'semibold',
      borderColor = 'gray-80',
      backgroundColor = 'transparent',
      ...rest
    }: Props,
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { field, helper } = useFormField();

    const handleSetValue = (event: React.MouseEvent<HTMLButtonElement>) => {
      helper.setValue(value);
      onClick && onClick(event);
    };

    const isActive = field.value === value;

    return (
      <Button
        py={py}
        ref={ref}
        fontSize={fontSize}
        fontWeight={fontWeight}
        onClick={handleSetValue}
        color={isActive ? 'indigo-60' : color}
        borderColor={isActive ? 'indigo-60' : borderColor}
        backgroundColor={isActive ? 'white' : backgroundColor}
        _hover={{
          backgroundColor: isActive ? '' : 'gray-100',
        }}
        {...rest}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
      </Button>
    );
  }
);

export default ButtonField;
