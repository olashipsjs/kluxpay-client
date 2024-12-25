import { getCoinList } from '@apis/coins';
import useUser from '@hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import client from 'src/lib/queryClient';

type Props = {
  category: string;
  children?:
    | ((opt: {
        loading: boolean;
        error: Error | null;
        data: any;
      }) => React.ReactNode)
    | React.ReactNode;
};

const CoinList = ({ category, children }: Props) => {
  const { user } = useUser();

  const { isLoading, error, data } = useQuery(
    {
      queryFn: getCoinList,
      queryKey: [user ? user.currency : 'usd', category],
    },
    client
  );

  return typeof children === 'function'
    ? children({ loading: isLoading, error, data })
    : children;
};

export default CoinList;
