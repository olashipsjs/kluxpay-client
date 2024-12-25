import React from 'react';
import client from 'src/lib/queryClient';
import { getCoinData } from '@apis/coins';
import { useQuery } from '@tanstack/react-query';
import useUser from '@hooks/useUser';

type Props = {
  id: string;
  network: string;
  children?:
    | ((opt: {
        loading: boolean;
        error: Error | null;
        data: any;
      }) => React.ReactNode)
    | React.ReactNode;
};

const CoinData = React.memo(({ id, network = 'ethereum', children }: Props) => {
  const { user } = useUser();
  const { isLoading, error, data } = useQuery(
    {
      queryFn: getCoinData,
      queryKey: [id, network, user?.currency],
    },
    client
  );

  return typeof children === 'function'
    ? children({ loading: isLoading, error, data })
    : children;
});

export default CoinData;
