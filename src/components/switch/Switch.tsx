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
      width = '28px',
      height = '12px',
      rounded = 'full',
      color = 'white',
      overflow = 'clip',
      alignItems = 'center',
      justifyContent = 'start',
      borderColor = 'transparent',
      backgroundColor = 'gray-95',
      ...restProps
    }: Omit<React.ComponentProps<typeof Button>, 'value'> & { value: boolean },
    ref: React.ForwardedRef<React.ComponentRef<typeof Button>>
  ) => {
    const { field, helper } = useFormField();

    const btnRef = React.useRef<HTMLButtonElement>(null!);
    const handleRef = React.useRef<HTMLDivElement>(null!);

    const handleSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
      helper.setValue(!field.value);
      onClick && onClick(event);
    };

    useGSAP(() => {
      if (field.value === true) {
        gsap.to(btnRef.current, {
          duration: 0.1,
          ease: 'back.in(1.5)',
          backgroundColor: 'rgb(var(--green-60))',
        });

        gsap.to(handleRef.current, {
          x: 12,
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
    }, [field.value]);

    return (
      <Button
        py={'1.5px'}
        px={'1px'}
        border={1}
        _hover={{
          backgroundColor: 'gray-95',
        }}
        ref={(element) => {
          btnRef.current = element!;
          if (typeof ref === 'function') {
            ref(element);
          }
        }}
        width={width}
        color={color}
        height={'fit'}
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
          size={height}
          ref={handleRef}
          rounded={'full'}
          backgroundColor={'currentColor'}
          boxShadow={'0px 10px 12px 0px inherit'}
        />
      </Button>
    );
  }
);

export default Switch;
