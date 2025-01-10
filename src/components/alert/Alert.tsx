import React from 'react';
import Flex from '@components/base/flex/Flex';
import AlertProvider from 'src/providers/AlertProvider';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Anchor from '@components/anchor/Anchor';
import Button from '@components/base/button/Button';
import useAlert from '@hooks/useAlert';

const Compound = React.forwardRef(
  (
    {
      px = 10,
      py = 8,
      visible,
      timeout,
      onClose,
      children,
      gap = 6,
      rounded = 8,
      zIndex = '999',
      alignItems = 'start',
      flexDirection = 'row',
      backgroundColor = 'red-60',
      ...rest
    }: Omit<
      React.ComponentProps<typeof Flex>,
      React.ComponentProps<keyof typeof AlertProvider>
    > &
      React.ComponentProps<typeof AlertProvider>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <AlertProvider
        visible={visible}
        timeout={timeout}
      >
        {({ isVisible, setIsVisible }) => {
          return (
            <React.Fragment>
              {isVisible && (
                <Flex
                  px={px}
                  py={py}
                  ref={ref}
                  {...rest}
                  gap={gap}
                  zIndex={zIndex}
                  rounded={rounded}
                  alignItems={alignItems}
                  flexDirection={flexDirection}
                  backgroundColor={backgroundColor}
                >
                  {typeof children === 'function'
                    ? children({ isVisible, setIsVisible })
                    : children}
                </Flex>
              )}
            </React.Fragment>
          );
        }}
      </AlertProvider>
    );
  }
);

const Icon = React.forwardRef(
  (
    {
      color = 'white',
      width = '20px',
      icon = 'ph:cloud-warning-fill',
      ...rest
    }: Omit<React.ComponentProps<typeof Iconify>, 'icon'> & { icon?: string },
    ref: React.ForwardedRef<React.ComponentRef<typeof Iconify>>
  ) => {
    return (
      <Iconify
        ref={ref}
        {...rest}
        icon={icon}
        width={width}
        color={color}
      />
    );
  }
);

const Message = React.forwardRef(
  (
    {
      fontSize = 13,
      color = 'white',
      lineHeight = '1.36',
      fontWeight = 'medium',
      ...rest
    }: React.ComponentProps<typeof Text>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Text>>
  ) => {
    return (
      <Text
        ref={ref}
        {...rest}
        color={color}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fontWeight={fontWeight}
      />
    );
  }
);

const Action = React.forwardRef(
  (
    {
      fontSize = 14,
      color = 'white',
      ...rest
    }: React.ComponentProps<typeof Anchor>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Anchor>>
  ) => {
    return (
      <Anchor
        ref={ref}
        {...rest}
        color={color}
        _hover={{ color: 'red-95' }}
        fontSize={fontSize}
      />
    );
  }
);

const Dismiss = React.forwardRef(
  (
    { onClick, ...restProps }: React.ComponentProps<typeof Button>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { setIsVisible } = useAlert();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsVisible(false);
      onClick && onClick(event);
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...restProps}
      />
    );
  }
);

const Alert = Compound as typeof Compound & {
  Icon: typeof Icon;
  Action: typeof Action;
  Message: typeof Message;
  Dismiss: typeof Dismiss;
};

Alert.Icon = Icon;
Alert.Action = Action;
Alert.Message = Message;
Alert.Dismiss = Dismiss;
Alert.displayName = 'Alert';

export default Alert;
