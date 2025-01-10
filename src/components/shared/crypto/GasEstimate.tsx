import Text from '@components/base/text/Text';
import Query from '@components/query/Query';
import { GET_GAS_ESTIMATE } from '@graphql/token';
import useWallets from '@hooks/useWallets';
import React from 'react';

type Props = {
  to?: string;
  value?: string;
  children: (({ gas }: any) => React.ReactNode) | React.ReactNode;
};

const GasEstimate = ({ to, value, children }: Props) => {
  const { wallet } = useWallets();

  return (
    <Query
      pollInterval={60000}
      query={GET_GAS_ESTIMATE}
      keys={{
        value: value || '40',
        maxPriorityFee: '0.09',
        to: to || wallet?.publicKey,
      }}
    >
      <Query.Loader width={14} />
      <Query.Error>
        <Text
          fontSize={13}
          color={'red-60'}
          fontWeight={'medium'}
        >
          Gas estimation query failed.
        </Text>
      </Query.Error>
      <Query.Data>
        {({ data }) => {
          const gas = data && data.getGasEstimate;

          return typeof children === 'function' ? children({ gas }) : children;
        }}
      </Query.Data>
    </Query>
  );
};

export default GasEstimate;
