import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import { createPortal } from 'react-dom';
import useOverlay from 'src/hooks/useOverlay';
import OverlayProvider from 'src/providers/OverlayProvider';

const Compound = React.forwardRef(
  (
    {
      children,
      open,
      element,
      ...rest
    }: Omit<
      React.ComponentProps<typeof Flex>,
      keyof React.ComponentProps<typeof OverlayProvider>
    > &
      React.ComponentProps<typeof OverlayProvider>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        {...rest}
      >
        <OverlayProvider
          open={open}
          element={element}
          children={children}
        />
      </Flex>
    );
  }
);

const Trigger = React.forwardRef(
  (
    { onClick, ...rest }: React.ComponentProps<typeof Button>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { isOpen, setIsOpen } = useOverlay();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
      onClick && onClick(event);
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...rest}
      />
    );
  }
);

const Panel = React.forwardRef(
  (
    {
      p = 8,
      top = '0px',
      left = '0px',
      zIndex = '99',
      width = '100%',
      height = '100%',
      position = 'fixed',
      alignItems = 'center',
      flexDirection = 'column',
      justifyContent = 'center',
      ...rest
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { isOpen } = useOverlay();

    if (!isOpen) return null;

    return createPortal(
      <Flex
        p={p}
        ref={ref}
        top={top}
        left={left}
        width={width}
        height={height}
        zIndex={zIndex}
        position={position}
        alignItems={alignItems}
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        {...rest}
      />,
      document.querySelector('#overlay')!
    );
  }
);

const Background = React.forwardRef(
  (
    {
      top = '0px',
      left = '0px',
      zIndex = '9',
      width = '100%',
      height = '100%',
      backdropBlur = 'lg',
      position = 'absolute',
      backgroundColor = 'rgba(var(--gray-10), 0.15)',
      ...rest
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { isOpen } = useOverlay();

    if (!isOpen) {
      return null;
    }

    return (
      <Flex
        ref={ref}
        top={top}
        left={left}
        width={width}
        height={height}
        zIndex={zIndex}
        position={position}
        backdropBlur={backdropBlur}
        backgroundColor={backgroundColor}
        {...rest}
      />
    );
  }
);

const Content = React.forwardRef(
  (
    {
      rounded = 8,
      zIndex = '999',
      width = 'full',
      maxWidth = '720px',
      overflow = 'hidden',
      position = 'relative',
      flexDirection = 'column',
      backgroundColor = 'white',
      boxShadow = '0px 0px 0px 1px rgb(var(--gray-95)), 0px 2px 4px 1px rgba(var(--gray-90), 0.15)',
      ...rest
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { isOpen } = useOverlay();

    const contentRef = React.useRef<HTMLDivElement>(null!);

    useGSAP(() => {
      gsap.set(contentRef.current, {
        scale: 0,
      });

      gsap.to('#overlay-content', {
        scale: 1,
        duration: 0.25,
        ease: 'power.in1',
      });
    }, [isOpen]);

    return (
      <Flex
        width={width}
        ref={(element) => {
          contentRef.current = element!;
          if (typeof ref === 'function') {
            return ref(element);
          }
          return element;
        }}
        zIndex={zIndex}
        rounded={rounded}
        maxWidth={maxWidth}
        overflow={overflow}
        position={position}
        boxShadow={boxShadow}
        id={'overlay-content'}
        flexDirection={flexDirection}
        backgroundColor={backgroundColor}
        {...rest}
      />
    );
  }
);

const Overlay = Compound as typeof Compound & {
  Panel: typeof Panel;
  Content: typeof Content;
  Trigger: typeof Trigger;
  Background: typeof Background;
};

Overlay.Panel = Panel;
Overlay.Content = Content;
Overlay.Trigger = Trigger;
Overlay.Background = Background;
Overlay.displayName = 'Overlay';

export default Overlay;
