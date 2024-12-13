import React from 'react';
import { StepContext } from 'src/providers/StepProvider';

const useStep = <T>() => {
  const context = React.useContext(StepContext);

  if (context === undefined) {
    throw new Error('');
  }

  const { data, ...rest } = context;

  return { data: data as T, ...rest };
};

export default useStep;
