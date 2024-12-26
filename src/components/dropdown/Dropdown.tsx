import Overlay from '@components/overlay/Overlay';
import useOverlay from '@hooks/useOverlay';
import React from 'react';

type CompoundProps = Omit<
  React.ComponentProps<typeof Overlay>,
  keyof React.ComponentProps<typeof Overlay>
> &
  React.ComponentProps<typeof Overlay>;

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
        ref={(element) => {
          elementRef.current = element!;

          if (typeof ref === 'function') {
            return ref(element);
          }
          return elementRef;
        }}
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
    const { domRect, setIsOpen } = useOverlay();

    if (!domRect) return null;

    return (
      <Overlay.Panel
        alignItems={'start'}
        justifyContent={'start'}
      >
        <Overlay.Background
          backdropBlur={'none'}
          backgroundColor={'transparent'}
          onClick={() => setIsOpen(false)}
        />
        <Overlay.Content
          ref={ref}
          {...restProps}
          maxWidth={maxWidth}
          position={position}
          top={top || domRect.top + 32 + 'px'}
          right={right || domRect.right + 'px'}
          width={width || domRect.width + 'px'}
          left={left || domRect.left + 'px'}
        />
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
      fontWeight = 'medium',
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
        fontWeight={fontWeight}
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
