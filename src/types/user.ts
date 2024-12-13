import React from 'react';

namespace User {
  export type Type = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
  };

  export type State = { user: Type | null };

  export type Action =
    | { type: 'LOGIN'; payload: { user: Type } }
    | { type: 'UPDATE_USER'; payload: { user: Type } }
    | { type: 'LOGOUT' };

  export type Context = {
    setUser: React.Dispatch<Action>;
    user: State['user'];
  };
}

export default User;
