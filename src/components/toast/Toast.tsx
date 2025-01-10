import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import React from 'react';
import AlertProvider from 'src/providers/AlertProvider';

const Compound = React.forwardRef(
  (
    {
      py = 20,
      px = 12,
      visible,
      onClose,
      children,
      gap = 6,
      top = '0px',
      left = '0px',
      zIndex = '999',
      timeout = 5000,
      width = 'full',
      position = 'fixed',
      minHeight = 'screen',
      alignItems = 'center',
      justifyContent = 'end',
      flexDirection = 'column',
      backgroundColor = 'transparent',
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
        portal={true}
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
                  top={top}
                  left={left}
                  width={width}
                  zIndex={zIndex}
                  position={position}
                  minHeight={minHeight}
                  alignItems={alignItems}
                  flexDirection={flexDirection}
                  justifyContent={justifyContent}
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

const Panel = React.forwardRef(
  (
    {
      py = 8,
      px = 16,
      rounded = 8,
      minWidth = 'fit',
      maxWidth = '400px',
      backgroundColor = 'red-60',
      ...restProps
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        px={px}
        py={py}
        ref={ref}
        rounded={8}
        minWidth={minWidth}
        maxWidth={maxWidth}
        backgroundColor={backgroundColor}
        {...restProps}
      />
    );
  }
);

const TextContent = React.forwardRef(
  (
    {
      fontSize = 13,
      color = 'white',
      fontWeight = 'medium',
      ...restProps
    }: React.ComponentProps<typeof Text>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Text>>
  ) => {
    return (
      <Text
        ref={ref}
        {...restProps}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
      />
    );
  }
);

const Toast = Compound as typeof Compound & {
  Panel: typeof Panel;
  TextContext: typeof TextContent;
};

Toast.Panel = Panel;
Toast.TextContext = TextContent;
Toast.displayName = 'Toast';

export default Toast;
