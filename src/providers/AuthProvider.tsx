import { REFRESH_ACCESS_TOKEN } from '@graphql/auth';
import useApolloQuery from '@hooks/useApolloQuery';
import useLocalStorage from '@hooks/useLocalStorage';
import Auth from '@ts_types/auth';
import React from 'react';

const initialState: Auth.State = {
  auth: { isLoggedIn: false },
};

export const AuthContext = React.createContext<Auth.Context | undefined>(
  undefined
);

const reducer = (state: Auth.State, action: Auth.Action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return { ...state, auth: { ...state.auth, isLoggedIn: true } };
    case 'SET_LOGGED_OUT':
      return { ...state, auth: { ...state.auth, isLoggedIn: false } };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { item, save } = useLocalStorage('kp_access_token');

  const { startPolling, loading } = useApolloQuery<any>(REFRESH_ACCESS_TOKEN, {
    onCompleted: (data) => {
      if (data?.refreshAccessToken) {
        dispatch({ type: 'SET_LOGGED_IN' });
        save(data.refreshAccessToken.accessToken);
      }
    },
    onError: () => {
      dispatch({ type: 'SET_LOGGED_OUT' });
    },

    variables: { payload: { accessToken: item || '' } },
  });

  const poll = React.useCallback(() => {
    if (item) startPolling(5 * 60 * 1000);
  }, [item, startPolling]);

  React.useEffect(() => {
    poll();
  }, [poll]);

  const value = React.useMemo(() => {
    return { auth: state.auth, setAuth: dispatch };
  }, [state.auth]);

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
