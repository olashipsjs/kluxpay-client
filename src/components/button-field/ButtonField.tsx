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
      value,
      onClick,
      children,
      fontSize = 13,
      color = 'gray-40',
      borderColor = 'gray-95',
      backgroundColor = 'gray-95',
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
        ref={ref}
        fontSize={fontSize}
        onClick={handleSetValue}
        color={isActive ? 'white' : color}
        borderColor={isActive ? 'gray-10' : borderColor}
        backgroundColor={isActive ? 'gray-10' : backgroundColor}
        _hover={{
          backgroundColor: isActive ? '' : 'gray-90',
        }}
        {...rest}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
      </Button>
    );
  }
);

export default ButtonField;
