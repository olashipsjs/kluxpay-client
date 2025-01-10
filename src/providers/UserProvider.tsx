import { GET_LOGGED_IN_USER } from '@graphql/user';
import useApolloQuery from '@hooks/useApolloQuery';
import User from '@ts_types/user';
import React from 'react';

const initialState: User.State = { user: undefined };

export const UserContext = React.createContext<User.Context | undefined>(
  undefined
);

const reducer = (state: User.State, action: User.Action): User.State => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload.user };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user!, ...action.payload.user } };
    case 'VERIFY_EMAIL':
      return { ...state, user: { ...state.user!, isEmailVerified: true } };
    case 'CHANGE_USERNAME':
      return {
        ...state,
        user: { ...state.user!, username: action.payload.username },
      };

    default:
      return state;
  }
};

type Props = React.PropsWithChildren;
const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useApolloQuery<any>(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      if (data && data?.getLoggedInUser) {
        dispatch({ type: 'SET_USER', payload: { user: data.getLoggedInUser } });
      }
    },
    onError: () => dispatch({ type: 'SET_USER', payload: { user: null } }),
  });

  const value = React.useMemo(
    () => ({
      setUser: dispatch,
      user: state.user,
    }),
    [state.user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
