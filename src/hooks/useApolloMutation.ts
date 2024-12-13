import { MutationHookOptions, MutationTuple } from '@apollo/client';

import { useMutation } from '@apollo/client';

const useApolloMutation = <TData = any, TVariables = any>(
  mutation: Parameters<typeof useMutation>[0],
  options?: Omit<MutationHookOptions<TData, TVariables>, 'client'>
): MutationTuple<TData, TVariables> => {
  const states = useMutation<TData, TVariables>(mutation, {
    ...options,
    onError: (error) => {
      console.log({ error });
      options?.onError && options?.onError(error);
    },
  });

  return states;
};

export default useApolloMutation;
