import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import React from 'react';

const Compound = React.forwardRef(
  (
    {
      width = 'fit',
      alignItems = 'center',
      backgroundColor = 'indigo-95',
      ...rest
    }: React.ComponentProps<typeof Flex>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        width={width}
        alignItems={alignItems}
        backgroundColor={backgroundColor}
        {...rest}
      />
    );
  }
);

const Icon = React.forwardRef(
  (
    { width = '1.5em', ...rest }: React.ComponentProps<typeof Iconify>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Iconify>>
  ) => {
    return (
      <Iconify
        {...rest}
        width={width}
        ref={ref}
      />
    );
  }
);

const Caption = React.forwardRef(
  (
    {
      fontSize = 13,
      fontWeight = 'medium',
      ...rest
    }: React.ComponentProps<typeof Text>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Text>>
  ) => {
    return (
      <Text
        ref={ref}
        fontSize={fontSize}
        fontWeight={fontWeight}
        {...rest}
      />
    );
  }
);

const Badge = Compound as typeof Compound & {
  Icon: typeof Icon;
  Caption: typeof Caption;
};

Badge.Icon = Icon;
Badge.Caption = Caption;
Badge.displayName = 'Badge';

export default Badge;
