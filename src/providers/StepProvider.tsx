import React from 'react';

type Context = {
  data: any;
  step: number;
  reset: () => void;
  previous: <T>(currentData: T) => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
  next: <T>(currentData: T, isMax?: boolean) => void;
};

export const StepContext = React.createContext<Context | undefined>(undefined);

type Props = {
  defaultStep?: number;
  children:
    | ((args: { step: number; data: Context['data'] }) => React.ReactNode)
    | React.ReactNode;
  initialData: { [key: string]: any };
};

const StepProvider = ({ defaultStep = 0, children, initialData }: Props) => {
  const [step, setStep] = React.useState(defaultStep);
  const [data, setData] = React.useState(initialData);

  const next = <T,>(currentData: T, isMax: boolean = false) => {
    setData((prevData) => ({ ...prevData, ...currentData }));
    if (!isMax) setStep((prevStep) => prevStep + 1);
  };

  const reset = () => {
    setData(initialData);
    setStep(defaultStep);
  };

  const previous = <T,>(currentData: T) => {
    if (step > 0) {
      setData((prevData) => ({ ...prevData, ...currentData }));
      setStep((prevStep) => prevStep - 1);
    }
  };

  const value = { step, data, next, previous, setData, reset };

  return (
    <StepContext.Provider value={value}>
      {typeof children === 'function' ? children({ step, data }) : children}
    </StepContext.Provider>
  );
};

export default StepProvider;
