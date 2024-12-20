import React from 'react';
import coins from '@constants/coins';
import useGetAssetBalance from '@hooks/useGetAssetBalance';
import Loader from '@components/base/button/Loader';

type Props = {
  coinId: string;
  children?:
    | ((options: { balance: number }) => React.ReactNode)
    | React.ReactNode;
};

const AssetBalance = React.memo(({ coinId, children }: Props) => {
  const selectedCoin = coins.find((coin) => coin.id === coinId);

  const { loading, balance, error } = useGetAssetBalance({
    contractAddress: selectedCoin!.contractAddress,
    platform: selectedCoin!.network,
  });

  switch (true) {
    case loading:
      return (
        <Loader
          visible
          width={'16px'}
          color={'gray-60'}
        />
      );
    case error !== undefined:
      return null;

    default:
      return typeof children === 'function'
        ? children({ balance: balance || 0 })
        : children;
  }
});

export default AssetBalance;
