import { DocumentNode } from 'graphql';
import { ApolloError } from '@apollo/client';
import useApolloQuery from '@hooks/useApolloQuery';
import React from 'react';

type Context<T extends any> = {
  error: undefined | ApolloError;
  isLoading: boolean;
  data: T;
};

export const QueryContext = React.createContext<Context<any> | undefined>(
  undefined
);

type Props = {
  keys?: any;
  query: DocumentNode;
  pollInterval?: number;
  onCompleted?: ((data: any) => void) | undefined;
  children?: ((context: Context<any>) => React.ReactNode) | React.ReactNode;
};

const QueryProvider = ({
  query,
  keys,
  pollInterval,
  children,
  onCompleted,
}: Props) => {
  const { data, loading, error } = useApolloQuery(query, {
    onCompleted,
    pollInterval,
    variables: keys,
  });

  const value = { data, isLoading: loading, error };

  return (
    <QueryContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
