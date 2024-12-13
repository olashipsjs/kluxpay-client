import Box from '@components/base/box/Box';
import React from 'react';

const Divider = React.forwardRef(
  (
    {
      width,
      height,
      orientation = 'vertical',
      backgroundColor = 'gray-95',
      ...rest
    }: React.ComponentProps<typeof Box> & {
      orientation?: 'vertical' | 'horizontal';
    },
    ref: React.ForwardedRef<React.ComponentRef<typeof Box>>
  ) => {
    switch (orientation) {
      case 'horizontal':
        return (
          <Box
            ref={ref}
            width={width || '1px'}
            height={height || 'full'}
            backgroundColor={backgroundColor}
            {...rest}
          />
        );
      case 'vertical':
        return (
          <Box
            ref={ref}
            width={width || 'full'}
            height={height || '1px'}
            backgroundColor={backgroundColor}
            {...rest}
          />
        );
      default:
        return null;
    }
  }
);

export default Divider;
