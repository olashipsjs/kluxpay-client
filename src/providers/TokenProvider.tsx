import Token from '@ts_types/token';
import React, { useReducer } from 'react';

const initialState: Token.State = {
  token: undefined,
};

export const TokenContext = React.createContext<Token.Context | undefined>(
  undefined
);

const reducer = (state: Token.State, action: Token.Action): Token.State => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload.token };
    case 'UNSET_TOKEN':
      return { ...state, token: null };
  }
};

type Props = React.PropsWithChildren;

const TokenProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = React.useMemo(() => {
    return {
      token: state.token,
      setToken: dispatch,
    };
  }, [state.token, dispatch]);

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export default TokenProvider;
