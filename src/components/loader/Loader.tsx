import Iconify from '@components/base/iconify/Iconify';
import React from 'react';

const Loader = React.forwardRef(
  (
    {
      visible,
      width = 20,
      height = 20,
      color = 'gray-10',
      icon = 'svg-spinners:bars-rotate-fade',
      ...rest
    }: Omit<React.ComponentProps<typeof Iconify>, 'icon'> & {
      icon?: string;
      visible: boolean;
    },
    ref: React.ForwardedRef<React.ComponentRef<typeof Iconify>>
  ) => {
    return (
      <React.Fragment>
        {visible && (
          <Iconify
            {...rest}
            ref={ref}
            icon={icon}
            width={width}
            color={color}
            height={height}
          />
        )}
      </React.Fragment>
    );
  }
);

export default Loader;
