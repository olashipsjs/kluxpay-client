import React from 'react';
import Fiat from './fiat';

namespace User {
  export type Type = {
    _id: string;
    bio?: string;
    email: string;
    trades: number;
    offers: number;
    avatar: any;
    fiat: Fiat.Type;
    username: string;
    lastName: string;
    payments: number;
    firstName: string;
    isOnline: boolean;
    referrals: number;
    createdAt: number;
    lastActive: number;
    dateOfBirth: string;
    referralCode: string;
    isEmailVerified: boolean;
    role: 'trader' | 'administrator';
  };

  export type State = {
    user: Type | undefined | null;
  };

  export type Action =
    | { type: 'VERIFY_EMAIL' }
    | { type: 'SET_USER'; payload: { user: State['user'] } }
    | { type: 'UPDATE_USER'; payload: { user: Partial<Type> } }
    | { type: 'CHANGE_USERNAME'; payload: { username: string } };

  export type Context = {
    setUser: React.Dispatch<Action>;
    user: State['user'];
  };
}

export default User;
