import React from 'react';
import Box from '@components/base/box/Box';
import useStep from 'src/hooks/useStep';
import StepProvider from 'src/providers/StepProvider';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Flex from '@components/base/flex/Flex';

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
      flexDirection = 'column',
      ...rest
    }: React.ComponentProps<typeof Flex> & { screens: EmotionJSX.Element[] },
    ref: React.ForwardedRef<React.ComponentRef<typeof Flex>>
  ) => {
    const { step } = useStep();

    return (
      <Flex
        {...rest}
        ref={ref}
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
