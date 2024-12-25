import { getCoinChart } from '@apis/coins';
import Flex from '@components/base/flex/Flex';
import useUser from '@hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import client from 'src/lib/queryClient';

type Props = {
  coinId: string;
  days?: number;
  children?:
    | ((opt: {
        loading: boolean;
        error: Error | null;
        prices: any;
      }) => React.ReactNode)
    | React.ReactNode;
};

const CoinChart = ({ days = 0.5, coinId, children }: Props) => {
  const { user } = useUser();
  const CURRENCY = user ? user.currency : 'usd';

  const { data, isLoading, error } = useQuery(
    { queryFn: getCoinChart, queryKey: [days, coinId, CURRENCY] },
    client
  );

  if (isLoading) {
    return (
      <Flex
        width={'full'}
        rounded={'full'}
        height={'1.5px'}
        backgroundColor={'gray-70'}
        className={'pulse'}
      />
    );
  }

  return typeof children === 'function'
    ? children({ prices: data, loading: isLoading, error })
    : children;
};

export default CoinChart;
