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
      border = 1,
      rounded = 12,
      overflow = 'hidden',
      borderColor = 'gray-80',
      backgroundColor = 'white',
      css,
      ...rest
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { meta } = useFormField();

    return (
      <Flex
        {...rest}
        ref={ref}
        border={border}
        rounded={rounded}
        overflow={overflow}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        css={{
          transition: 'all .2s ease',
          boxShadow:
            meta!.error && meta!.touched
              ? '0px 0px 0px 1.25px rgb(var(--red-60))'
              : !meta!.error && meta!.touched
              ? '0px 0px 0px 1.25px rgb(var(--indigo-60))'
              : '0px .5px 1px 0px rgb(var(--gray-90))',
        }}
      ></Flex>
    );
  }
);

const Slot = React.forwardRef(
  (
    props: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        {...props}
        ref={ref}
      />
    );
  }
);

const Message = React.forwardRef(
  (
    {
      children,
      fontSize = 13,
      lineHeight = 'md',
      color = 'gray-30',
      letterSpacing = 'xs',
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
        letterSpacing={letterSpacing}
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
