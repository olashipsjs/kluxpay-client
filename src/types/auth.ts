namespace Auth {
  export type Type = {
    accessToken: string | undefined | null;
  };

  export type State = { auth: Type };

  export type Action =
    | { type: 'SET_LOGGED_IN'; payload: { accessToken: string } }
    | { type: 'SET_LOGGED_OUT' };

  export type Context = {
    auth: State['auth'];
    setAuth: React.Dispatch<Action>;
  };
}

export default Auth;
