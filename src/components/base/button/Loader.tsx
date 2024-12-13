import Iconify from '@components/base/iconify/Iconify';
import React from 'react';

const Loader = React.forwardRef(
  (
    {
      visible,
      width = '1em',
      color = 'white',
      icon = 'svg-spinners:3-dots-move',
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
          />
        )}
      </React.Fragment>
    );
  }
);

export default Loader;
