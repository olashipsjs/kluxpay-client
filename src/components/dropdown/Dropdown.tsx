import Flex from '@components/base/flex/Flex';
import Overlay from '@components/overlay/Overlay';
import useOverlay from '@hooks/useOverlay';
import React from 'react';
import OverlayProvider from 'src/providers/OverlayProvider';

type CompoundProps = Omit<
  React.ComponentProps<typeof Overlay>,
  keyof React.ComponentProps<typeof Overlay>
> &
  React.ComponentProps<typeof OverlayProvider>;

const Compound = React.forwardRef(
  (
    { children, open, ...restProps }: CompoundProps,
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay>>
  ) => {
    const elementRef = React.useRef<HTMLDivElement>(null!);

    return (
      <Overlay
        open={open}
        {...restProps}
        ref={elementRef}
        children={children}
        element={elementRef}
      />
    );
  }
);

const Content = React.forwardRef(
  (
    {
      top,
      left,
      right,
      width,
      maxWidth = 'auto',
      position = 'absolute',
      ...restProps
    }: React.ComponentProps<typeof Overlay.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay.Content>>
  ) => {
    const { domRect } = useOverlay();

    if (!domRect) return null;

    return (
      <Overlay.Panel>
        <Overlay.Background
          backdropBlur={'none'}
          backgroundColor={'transparent'}
        />
        <Overlay.Content
          ref={ref}
          {...restProps}
          maxWidth={maxWidth}
          position={position}
          top={top || domRect.top + 32 + 'px'}
          right={right || domRect.right + 'px'}
          width={width || domRect.width + 'px'}
          left={domRect.left + Number(left || 0) + 'px'}
        ></Overlay.Content>
      </Overlay.Panel>
    );
  }
);

const Trigger = React.forwardRef(
  (
    { ...restProps }: React.ComponentProps<typeof Overlay.Trigger>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay.Trigger>>
  ) => {
    return (
      <Overlay.Trigger
        ref={ref}
        {...restProps}
      />
    );
  }
);

const Item = React.forwardRef(
  (
    {
      py = 6,
      gap = 10,
      fontSize = 13,
      rounded = 'none',
      color = 'gray-30',
      justifyContent = 'start',
      borderColor = 'transparent',
      backgroundColor = 'transparent',
      ...restProps
    }: React.ComponentProps<typeof Overlay.Trigger>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay.Trigger>>
  ) => {
    return (
      <Overlay.Trigger
        py={py}
        ref={ref}
        gap={gap}
        color={color}
        {...restProps}
        rounded={rounded}
        fontSize={fontSize}
        borderColor={borderColor}
        justifyContent={justifyContent}
        backgroundColor={backgroundColor}
        _hover={{
          color: 'gray-10',
          backgroundColor: 'gray-95',
        }}
      />
    );
  }
);

const Dropdown = Compound as typeof Compound & {
  Item: typeof Item;
  Content: typeof Content;
  Trigger: typeof Trigger;
};

Dropdown.Item = Item;
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.displayName = 'Dropdown';

export default Dropdown;
