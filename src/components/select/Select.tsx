import React from 'react';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import useFormField from 'src/hooks/useFormField';
import useOverlay from 'src/hooks/useOverlay';
import Iconify from '@components/base/iconify/Iconify';
import Box from '@components/base/box/Box';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Compound = React.forwardRef(
  (
    {
      element,
      width = 'full',
      defaultValue,
      ...rest
    }: React.ComponentProps<typeof Overlay> & { defaultValue?: string },
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay>>
  ) => {
    const { refObject, helper } = useFormField();

    React.useEffect(() => {
      if (defaultValue) {
        helper.setValue(defaultValue);
      }
    }, [defaultValue]);

    return (
      <Overlay
        ref={ref}
        width={width}
        element={refObject as any}
        {...rest}
      />
    );
  }
);

const Trigger = React.forwardRef(
  (
    {
      px = 10,
      py = 8,
      onClick,
      children,
      gap = 8,
      rounded = 0,
      width = 'full',
      border = 'none',
      color = 'gray-10',
      lineHeight = '1.5em',
      justifyContent = 'between',
      backgroundColor = 'transparent',
      ...rest
    }: React.ComponentProps<typeof Overlay.Trigger>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay.Trigger>>
  ) => {
    const iconBoxRef = React.useRef<HTMLDivElement>(null!);

    const { helper } = useFormField();

    const { isOpen } = useOverlay();

    React.useEffect(() => {
      if (isOpen) {
        helper.setTouched(true);
        return;
      }

      helper.setTouched(false);
    }, [isOpen]);

    useGSAP(() => {
      if (isOpen) {
        gsap.to(iconBoxRef.current, {
          rotate: 180,
          duration: 0.1,
        });
      } else {
        gsap.to(iconBoxRef.current, {
          rotate: 0,
          duration: 0.1,
        });
      }
    }, [isOpen]);

    return (
      <Overlay.Trigger
        px={px}
        py={py}
        {...rest}
        ref={ref}
        gap={gap}
        width={width}
        color={color}
        border={border}
        rounded={rounded}
        lineHeight={lineHeight}
        justifyContent={justifyContent}
        backgroundColor={backgroundColor}
        _hover={{ backgroundColor: 'gray-100' }}
      >
        {children}
        <Box
          size={'16px'}
          overflow={'hidden'}
          ref={iconBoxRef}
        >
          <Iconify
            width={'full'}
            height={'full'}
            icon={'mdi:chevron-down'}
          />
        </Box>
      </Overlay.Trigger>
    );
  }
);

const Value = React.forwardRef(
  (
    {
      children,
      fontSize = 14,
      color = 'gray-10',
      fontWeight = 'medium',
      ...rest
    }: React.ComponentProps<typeof Text>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Text>>
  ) => {
    const { field } = useFormField();

    return (
      <Text
        ref={ref}
        {...rest}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {!children ? (field.value as any) : children}
      </Text>
    );
  }
);

const Content = React.forwardRef(
  (
    {
      width,
      left,
      top,
      p = 4,
      gap = 2,
      border = 1,
      rounded = 12,
      height = 'fit',
      overflowY = 'scroll',
      position = 'absolute',
      borderColor = 'gray-90',
      boxShadow = '0px .75px 0px 0px rgb(var(--gray-80))',
      ...rest
    }: React.ComponentProps<typeof Overlay.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Overlay.Content>>
  ) => {
    const { domRect, setIsOpen } = useOverlay();

    if (!domRect) return null;

    return (
      <Overlay.Panel>
        <Overlay.Background
          backdropBlur={'none'}
          onClick={() => setIsOpen(false)}
          backgroundColor={'rgba(0, 0, 0, 0)'}
        />
        <Overlay.Content
          {...rest}
          ref={ref}
          p={p}
          gap={gap}
          border={border}
          height={height}
          rounded={rounded}
          position={position}
          overflowY={overflowY}
          boxShadow={boxShadow}
          borderColor={borderColor}
          left={domRect.left + 'px' || left}
          width={domRect.width + 'px' || width}
          top={domRect.top + domRect.height + 8 + 'px' || top}
        />
      </Overlay.Panel>
    );
  }
);

const Option = React.memo(
  React.forwardRef(
    (
      {
        name,
        value,
        onClick,
        py = 4,
        px = 8,
        gap = 12,
        rounded = 8,
        color = 'gray-10',
        lineHeight = '1.5em',
        justifyContent = 'start',
        borderColor = 'transparent',
        backgroundColor = 'transparent',
        ...rest
      }: React.ComponentProps<typeof Overlay.Trigger> & {
        value: string | number;
      },
      ref: React.ForwardedRef<React.ComponentRef<typeof Overlay.Trigger>>
    ) => {
      const { helper, field } = useFormField();

      const handleValueChange = (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        helper.setValue(value);
        onClick && onClick(event);
      };

      const isSelectedOption = field.value === value;

      return (
        <Overlay.Trigger
          {...rest}
          py={py}
          px={px}
          ref={ref}
          gap={gap}
          rounded={rounded}
          lineHeight={lineHeight}
          borderColor={borderColor}
          onClick={handleValueChange}
          justifyContent={justifyContent}
          color={isSelectedOption ? 'gray-10' : color}
          backgroundColor={isSelectedOption ? 'gray-95' : backgroundColor}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-95',
          }}
        />
      );
    }
  )
);

const Select = Compound as typeof Compound & {
  Trigger: typeof Trigger;
  Option: typeof Option;
  Value: typeof Value;
  Content: typeof Content;
};

Select.Trigger = Trigger;
Select.Option = Option;
Select.Value = Value;
Select.Content = Content;
Select.displayName = 'Select';

export default Select;
