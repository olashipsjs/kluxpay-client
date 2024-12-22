import { REFRESH_ACCESS_TOKEN } from '@graphql/auth';
import useApolloQuery from '@hooks/useApolloQuery';
import useLocalStorage from '@hooks/useLocalStorage';
import Auth from '@ts_types/auth';
import React from 'react';

const initialState: Auth.State = {
  auth: { accessToken: undefined },
};

export const AuthContext = React.createContext<Auth.Context | undefined>(
  undefined
);

const reducer = (state: Auth.State, action: Auth.Action): Auth.State => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        ...state,
        auth: { accessToken: action.payload.accessToken },
      };
    case 'SET_LOGGED_OUT':
      return { ...state, auth: { accessToken: null } };
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { item, save } = useLocalStorage('kp_access_token');

  const { refetch } = useApolloQuery<any>(REFRESH_ACCESS_TOKEN, {
    onError: (error) => {
      console.log(error);
      dispatch({ type: 'SET_LOGGED_OUT' });
    },
    variables: { payload: { accessToken: item || '' } },
  });

  const refetchCallback = React.useCallback(async () => {
    try {
      const { data } = await refetch({
        payload: { accessToken: item || '' },
      });

      if (data?.refreshAccessToken) {
        dispatch({
          type: 'SET_LOGGED_IN',
          payload: data.refreshAccessToken.accessToken,
        });
        save(data.refreshAccessToken.accessToken);
      }

      return data;
    } catch (error) {}
  }, [item, dispatch, save]);

  React.useEffect(() => {
    const DURATION = 5 * 60 * 1000; // 15 minutes

    const intervals = setInterval(refetchCallback, DURATION);

    return () => clearInterval(intervals);
  }, [refetchCallback]);

  const value = React.useMemo(() => {
    return { auth: state.auth, setAuth: dispatch };
  }, [state.auth, dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
