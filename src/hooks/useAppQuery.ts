import React from 'react';
import { QueryContext } from 'src/providers/QueryProvider';

const useAppQuery = <T extends any>() => {
  const context = React.useContext(QueryContext);

  if (!context) {
    throw new Error('Query provider is missing');
  }

  const { data, ...rest } = context;

  return {
    ...rest,
    data: data as T,
  };
};

export default useAppQuery;
