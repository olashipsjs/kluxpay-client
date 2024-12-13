import React from 'react';

type State = {
  loading: boolean;
  error?: Error;
  data?: any;
};

type Action =
  | {
      type: 'LOADING';
    }
  | {
      type: 'ERROR';
      payload: { message: string };
    }
  | {
      type: 'SUCCESS';
      payload: { data: any };
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: undefined, data: undefined };
    case 'ERROR':
      return {
        loading: false,
        data: undefined,
        error: new Error(action.payload.message || 'An error occurred'),
      };
    case 'SUCCESS':
      return { loading: false, error: undefined, data: action.payload.data };
    default:
      return state;
  }
};

const useActionState = (): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    error: undefined,
    data: undefined,
  });

  return [state, dispatch];
};

export default useActionState;
