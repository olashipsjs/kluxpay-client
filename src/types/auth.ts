namespace Auth {
  export type Type = {
    isLoggedIn: boolean;
  };

  export type State = { auth: Type };

  export type Action = {
    type: 'SET_LOGGED_IN' | 'SET_LOGGED_OUT';
  };

  export type Context = {
    auth: State['auth'];
    setAuth: React.Dispatch<Action>;
  };
}

export default Auth;
