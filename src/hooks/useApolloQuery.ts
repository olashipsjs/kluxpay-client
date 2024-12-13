import { QueryHookOptions } from '@apollo/client';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { DocumentNode } from 'graphql';
import client from 'src/lib/apolloClient';

const useApolloQuery = <TData extends any>(
  query: DocumentNode,
  options?: Omit<QueryHookOptions<TData>, 'client'>
) => {
  const states = useQuery(query, {
    ...options,
    client,
    onError: (error) => {
      console.log({ error });
      options?.onError && options.onError(error);
    },
  });

  return states;
};

export default useApolloQuery;
