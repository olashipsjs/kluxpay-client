import React from 'react';
import Loader from '@components/base/button/Loader';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_ASSET_BALANCE } from '@graphql/wallet';

type Props = {
  contractAddress?: string;
  walletId: string;
  children?:
    | ((options: { balance: number }) => React.ReactNode)
    | React.ReactNode;
};

const AssetBalance = React.memo(
  ({ contractAddress, walletId, children }: Props) => {
    const { loading, error, data } = useApolloQuery(GET_ASSET_BALANCE, {
      pollInterval: 60000,
      variables: {
        payload: {
          walletId,
          contractAddress,
        },
      },
    });

    const balance = data?.getAssetBalance;

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
  }
);

export default AssetBalance;
