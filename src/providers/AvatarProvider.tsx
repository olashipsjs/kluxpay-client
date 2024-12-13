import React from 'react';

type Context = {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AvatarContext = React.createContext<Context | undefined>(
  undefined
);

type Props = {
  hasError?: boolean;
  children: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const AvatarProvider = ({ children, hasError = false }: Props) => {
  const [isError, setIsError] = React.useState(hasError);

  return (
    <AvatarContext.Provider value={{ isError, setIsError }}>
      {typeof children === 'function'
        ? children({ isError, setIsError })
        : children}
    </AvatarContext.Provider>
  );
};

export default AvatarProvider;
