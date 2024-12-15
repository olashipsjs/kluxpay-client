import React from 'react';

namespace User {
  export type Type = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    dateOfBirth: string;
  };

  export type State = {
    user?: Type;
  };

  export type Action =
    | { type: 'SET_USER'; payload: { user: Type } }
    | { type: 'UPDATE_USER'; payload: { user: Type } }
    | { type: 'VERIFY_EMAIL' };

  export type Context = {
    setUser: React.Dispatch<Action>;
    user: State['user'];
  };
}

export default User;
