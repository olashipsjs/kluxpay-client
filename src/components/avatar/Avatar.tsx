import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import useAvatar from '@hooks/useAvatar';
import React from 'react';
import AvatarProvider from 'src/providers/AvatarProvider';

const Compound = React.forwardRef(
  (
    {
      hasError,
      children,
      size = '32px',
      rounded = 'full',
      position = 'relative',
      alignItems = 'center',
      justifyContent = 'center',
      ...rest
    }: Omit<
      React.ComponentProps<typeof Flex>,
      keyof React.ComponentProps<typeof AvatarProvider>
    > &
      React.ComponentProps<typeof AvatarProvider>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    return (
      <Flex
        ref={ref}
        size={size}
        rounded={rounded}
        position={position}
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...rest}
      >
        <AvatarProvider
          hasError={hasError}
          children={children}
        />
      </Flex>
    );
  }
);

const Picture = React.forwardRef(
  (
    {
      width = 'full',
      height = 'full',
      rounded = 'full',
      objectFit = 'cover',
      ...rest
    }: React.ComponentProps<typeof Image>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Image>>
  ) => {
    const { isError, setIsError } = useAvatar();

    if (isError) return null;

    return (
      <Image
        ref={ref}
        width={width}
        height={height}
        rounded={rounded}
        objectFit={objectFit}
        onError={() => setIsError(true)}
        {...rest}
      />
    );
  }
);

const Fallback = React.forwardRef(
  (
    {
      fontSize = 12,
      color = 'gray-10',
      fontWeight = 'medium',
      textTransform = 'uppercase',
      ...rest
    }: React.ComponentProps<typeof Text>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Text>>
  ) => {
    const { isError } = useAvatar();

    if (!isError) return null;

    return (
      <Text
        ref={ref}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textTransform={textTransform}
        {...rest}
      />
    );
  }
);

const Indicator = React.forwardRef(
  (
    {
      border = 1,
      zIndex = '2',
      size = '8px',
      rounded = 'full',
      borderColor = 'white',
      position = 'absolute',
      backgroundColor = 'green-60',
      ...rest
    }: React.ComponentProps<typeof Box>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Box>>
  ) => {
    return (
      <Box
        ref={ref}
        size={size}
        zIndex={zIndex}
        border={border}
        rounded={rounded}
        position={position}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        {...rest}
      />
    );
  }
);

const Avatar = Compound as typeof Compound & {
  Picture: typeof Picture;
  Fallback: typeof Fallback;
  Indicator: typeof Indicator;
};

Avatar.displayName = 'Avatar';
Avatar.Picture = Picture;
Avatar.Fallback = Fallback;
Avatar.Indicator = Indicator;

export default Avatar;
