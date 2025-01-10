namespace Token {
  export type Type = any;

  export type State = { token: any };

  export type Action =
    | { type: 'SET_TOKEN'; payload: { token: any } }
    | { type: 'UNSET_TOKEN' };

  export type Context = {
    token: State['token'];
    setToken: React.Dispatch<Action>;
  };
}

export default Token;
