import React from 'react';
import useGetCoinPrice from '@hooks/useGetCoinPrice';
import Loader from '@components/base/button/Loader';

type Props = {
  fiat?: string;
  coinId: string;
  children?:
    | ((options: { price: number }) => React.ReactNode)
    | React.ReactNode;
};

const CoinPrice = React.memo(({ fiat = 'usd', coinId, children }: Props) => {
  const { price, isLoading, error } = useGetCoinPrice(coinId, fiat);

  switch (true) {
    case isLoading:
      return (
        <Loader
          visible
          width={'16px'}
          color={'gray-60'}
        />
      );
    case error !== null:
      return null;

    default:
      return typeof children === 'function'
        ? children({ price: price || 0 })
        : children;
  }
});

export default CoinPrice;
