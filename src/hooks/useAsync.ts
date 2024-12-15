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

  const async = React.useCallback(
    async (args?: any) => {
      setState((prevState) => ({
        ...prevState,
        data: undefined,
        error: undefined,
        loading: true,
      }));
      try {
        const data = await fn(args);
        setState((prevState) => ({
          ...prevState,
          data,
          loading: false,
          error: undefined,
        }));
        options.onCompleted?.(data);
      } catch (error) {
        console.log({ error });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: undefined,
          error: error as Error,
        }));
      }
    },
    [fn, options.onCompleted]
  );

  return [async, state] as const;
};

export default useAsync;
