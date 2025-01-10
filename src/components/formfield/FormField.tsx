import React from 'react';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import useFormField from 'src/hooks/useFormField';
import FormFieldProvider from 'src/providers/FormFieldProvider';

const Compound = React.forwardRef(
  (
    {
      name,
      gap = 8,
      children,
      width = 'full',
      flexDirection = 'column',
      ...rest
    }: Omit<
      React.ComponentProps<typeof Flex>,
      keyof React.ComponentProps<typeof FormFieldProvider>
    > &
      React.ComponentProps<typeof FormFieldProvider>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const eRef = React.useRef<HTMLDivElement>(null!);

    return (
      <Flex
        {...rest}
        gap={gap}
        ref={(element) => {
          eRef.current = element!;
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
        }}
        width={width}
        flexDirection={flexDirection}
      >
        <FormFieldProvider
          ref={eRef}
          name={name}
          children={children}
        />
      </Flex>
    );
  }
);

const Sheet = React.forwardRef(
  (
    {
      disabled,
      rounded = 8,
      outline = '1',
      pointerEvents,
      overflow = 'clip',
      position = 'relative',
      outlineStyle = 'solid',
      backgroundColor = 'white',
      outlineOffset = 'calc(1px * -1)',
      ...rest
    }: React.ComponentProps<typeof Flex> & { disabled?: boolean },
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { meta } = useFormField();

    return (
      <Flex
        {...rest}
        ref={ref}
        rounded={rounded}
        position={position}
        overflow={overflow}
        outlineStyle={outlineStyle}
        outlineOffset={outlineOffset}
        outlineWidth={meta.touched ? '2' : outline}
        pointerEvents={disabled ? 'none' : pointerEvents}
        backgroundColor={disabled ? 'gray-100' : backgroundColor}
        outlineColor={
          meta.error && meta.touched
            ? 'red-60'
            : meta.touched
            ? 'indigo-60'
            : 'gray-80'
        }
      />
    );
  }
);

const Slot = React.forwardRef(
  (
    { ...restProps }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        {...restProps}
      />
    );
  }
);

const Message = React.forwardRef(
  (
    {
      children,
      fontSize = 13,
      lineHeight = '1.36',
      color = 'gray-40',
      ...rest
    }: React.ComponentProps<typeof Text>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Text>>
  ) => {
    const { meta } = useFormField();

    const data = meta?.error && meta.touched ? meta.error : children;

    if (!data) return null;

    return (
      <Text
        as={'p'}
        {...rest}
        ref={ref}
        fontSize={fontSize}
        lineHeight={lineHeight}
        color={meta?.error && meta.touched ? 'red-60' : color}
      >
        {data}
      </Text>
    );
  }
);

const FormField = Compound as typeof Compound & {
  Sheet: typeof Sheet;
  Slot: typeof Slot;
  Message: typeof Message;
};

FormField.Sheet = Sheet;
FormField.Slot = Slot;
FormField.Message = Message;
FormField.displayName = 'FormField';

export default FormField;
