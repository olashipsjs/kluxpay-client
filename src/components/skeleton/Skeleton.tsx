import gsap from 'gsap';
import React from 'react';
import { useGSAP } from '@gsap/react';
import Box from '@components/base/box/Box';

const Skeleton = React.forwardRef(
  (
    {
      backgroundColor = 'gray-80',
      ...restProps
    }: React.ComponentProps<typeof Box>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Box>>
  ) => {
    useGSAP(() => {
      gsap.fromTo(
        `.skeleton`,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, yoyo: true, repeat: -1, stagger: 0.2 }
      );
    }, []);

    return (
      <Box
        ref={ref}
        {...restProps}
        className={`skeleton`}
        backgroundColor={backgroundColor}
      />
    );
  }
);

export default Skeleton;
