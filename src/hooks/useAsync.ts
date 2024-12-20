import React from 'react';

type State<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
};

type Fn<T> = (...args: any[]) => Promise<T>;

type Options<T> = {
  onCompleted?: (data: T) => void;
};

const useAsync = <T = any>(
  fn: Fn<T>,
  options: Options<T> = {}
): [typeof async, typeof state] => {
  const [state, setState] = React.useState<State<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const { onCompleted } = options;

  const async = React.useCallback(
    async (...args: any) => {
      setState({
        loading: true,
        data: undefined,
        error: undefined,
      });
      try {
        const data = await fn(...args);
        setState({
          data,
          loading: false,
          error: undefined,
        });
        onCompleted && onCompleted(data);
      } catch (error) {
        console.log({ error });
        setState({
          loading: false,
          data: undefined,
          error: error as Error,
        });
      }
    },
    [fn, onCompleted]
  );

  return [async, state];
};

export default useAsync;
