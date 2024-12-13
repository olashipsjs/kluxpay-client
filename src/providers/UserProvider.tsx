import { GET_USER } from '@graphql/user';
import useApolloQuery from '@hooks/useApolloQuery';
import User from '@ts_types/user';
import React from 'react';

const initialState: User.State = {
  user: null,
};

export const UserContext = React.createContext<User.Context | undefined>(
  undefined
);

const reducer = (state: User.State, action: User.Action): User.State => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload.user } };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

type Props = React.PropsWithChildren;
const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {} = useApolloQuery<any>(GET_USER, {
    onCompleted: (data) =>
      dispatch({ type: 'LOGIN', payload: { user: data?.getUser } }),
  });

  return (
    <UserContext.Provider value={{ setUser: dispatch, user: state.user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
