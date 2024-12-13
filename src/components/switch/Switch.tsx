import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import { useGSAP } from '@gsap/react';
import useFormField from '@hooks/useFormField';
import gsap from 'gsap';
import React from 'react';

const Switch = React.forwardRef(
  (
    {
      value,
      onClick,
      width = '32px',
      height = '16px',
      rounded = 'full',
      color = 'white',
      overflow = 'clip',
      alignItems = 'center',
      justifyContent = 'start',
      borderColor = 'transparent',
      backgroundColor = 'gray-90',
      ...restProps
    }: Omit<React.ComponentProps<typeof Button>, 'value'> & { value: boolean },
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { helper } = useFormField();

    const btnRef = React.useRef<HTMLButtonElement>(null!);
    const handleRef = React.useRef<HTMLDivElement>(null!);

    const handleSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
      helper.setValue(!value);
      onClick && onClick(event);
    };

    useGSAP(() => {
      if (value === true) {
        gsap.to(btnRef.current, {
          duration: 0.1,
          ease: 'back.in(1.5)',
          backgroundColor: 'rgb(var(--green-60))',
        });

        gsap.to(handleRef.current, {
          x: 15,
          duration: 0.25,
          ease: 'elastic.out(1)',
        });
      } else {
        gsap.to(btnRef.current, {
          duration: 0.1,
          ease: 'back.out(1.5)',
          backgroundColor: 'rgb(var(--gray-90))',
        });

        gsap.to(handleRef.current, {
          x: 0,
          duration: 0.25,
          ease: 'elastic.out(1)',
        });
      }
    }, [value]);

    return (
      <Button
        py={8}
        px={'1px'}
        border={1}
        _hover={{}}
        ref={btnRef}
        width={width}
        color={color}
        height={height}
        rounded={rounded}
        overflow={overflow}
        onClick={handleSwitch}
        alignItems={alignItems}
        borderColor={borderColor}
        justifyContent={justifyContent}
        backgroundColor={backgroundColor}
        {...restProps}
      >
        <Flex
          ref={handleRef}
          rounded={'full'}
          backgroundColor={'currentColor'}
          boxShadow={'0px 0px 4px 1px rgba(0, 0, 0, 0.1)'}
          size={Number(height.toString().split('px')[0]) - 2 + 'px'}
        />
      </Button>
    );
  }
);

export default Switch;
