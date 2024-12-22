import currencies from '@constants/currencies';
import React from 'react';

namespace User {
  export type Type = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    dateOfBirth: string;
    currency: (typeof currencies)[number]['name'];
  };

  export type State = {
    user: Type | undefined | null;
  };

  export type Action =
    | { type: 'ERROR' }
    | { type: 'VERIFY_EMAIL' }
    | { type: 'SET_USER'; payload: { user: Type } }
    | { type: 'UPDATE_USER'; payload: { user: Type } };

  export type Context = {
    setUser: React.Dispatch<Action>;
    user: State['user'];
  };
}

export default User;
