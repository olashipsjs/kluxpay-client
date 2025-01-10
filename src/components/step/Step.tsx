import React from 'react';
import Box from '@components/base/box/Box';
import useStep from 'src/hooks/useStep';
import StepProvider from 'src/providers/StepProvider';
import Flex from '@components/base/flex/Flex';
import { EmotionJSX } from 'node_modules/@emotion/react/dist/declarations/src/jsx-namespace';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Compound = React.forwardRef(
  (
    {
      children,
      defaultStep,
      initialData,
      ...rest
    }: Omit<
      React.ComponentProps<typeof Box>,
      keyof React.ComponentProps<typeof StepProvider>
    > &
      React.ComponentProps<typeof StepProvider>,
    ref: React.ForwardedRef<React.ComponentRef<typeof Box>>
  ) => {
    return (
      <Box
        ref={ref}
        {...rest}
      >
        <StepProvider
          defaultStep={defaultStep}
          initialData={initialData}
        >
          {children}
        </StepProvider>
      </Box>
    );
  }
);

const Screen = React.forwardRef(
  (
    {
      screens,
      className,
      flexDirection = 'column',
      ...rest
    }: React.ComponentProps<typeof Flex> & { screens: EmotionJSX.Element[] },
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { step } = useStep();

    useGSAP(() => {
      gsap.fromTo(
        '.step',
        {
          opacity: 0,
          y: 50,
        },
        {
          y: 0,
          opacity: 1,
          delay: 0.2,
          duration: 0.5,
          ease: 'power2.inOut',
        }
      );
    }, [step]);

    return (
      <Flex
        {...rest}
        ref={ref}
        className={`step ${className}`}
        flexDirection={flexDirection}
      >
        {screens[step]}
      </Flex>
    );
  }
);

const Step = Compound as typeof Compound & {
  Screen: typeof Screen;
};

Step.Screen = Screen;
Step.displayName = 'Step';

export default Step;
