import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import client from 'src/lib/queryClient';

const useTanstackQuery = <Data extends any>(
  options: DefinedInitialDataOptions<Data>
) => {
  const states = useQuery<Data>({ ...options }, client);

  return states;
};

export default useTanstackQuery;
