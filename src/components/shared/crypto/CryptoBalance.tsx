import React from 'react';
import { GET_TOKEN_BALANCE } from '@graphql/token';
import Query from '@components/query/Query';

type Props = {
  contractAddress?: string;
  walletId: string;
  children?:
    | ((options: { balance: number; timestamp: number }) => React.ReactNode)
    | React.ReactNode;
};

const CryptoBalance = React.memo(
  ({ contractAddress, walletId, children }: Props) => {
    return (
      <Query
        pollInterval={6000}
        query={GET_TOKEN_BALANCE}
        keys={{ contractAddress, walletId }}
      >
        <Query.Loader width={14} />
        <Query.Error></Query.Error>
        <Query.Data>
          {({ data }) => {
            const timestamp = Date.now();
            const balance = data && data.getTokenBalance;

            return typeof children === 'function'
              ? children({ balance, timestamp })
              : children;
          }}
        </Query.Data>
      </Query>
    );
  }
);

export default CryptoBalance;
