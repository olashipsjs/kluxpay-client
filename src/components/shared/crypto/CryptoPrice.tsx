import React from 'react';
import Query from '@components/query/Query';
import { GET_COIN_QUOTE } from '@graphql/coin';
import Text from '@components/base/text/Text';
import useUser from '@hooks/useUser';

type Props = {
  convert?: string;
  coinId: number;
  children?: ((options: { data: any }) => React.ReactNode) | React.ReactNode;
};

const CryptoPrice = React.memo(({ convert, coinId, children }: Props) => {
  const { user } = useUser();

  return (
    <Query
      query={GET_COIN_QUOTE}
      keys={{ coinId, convert: convert || user?.fiat?.symbol }}
    >
      <Query.Loader width={14} />
      <Query.Error>
        <Text
          fontSize={14}
          color={'red-60'}
        >
          Error fetching data.
        </Text>
      </Query.Error>
      <Query.Data>
        {({ data }) => {
          const quote = data?.getCoinQuote;
          return typeof children === 'function'
            ? children({ data: quote })
            : children;
        }}
      </Query.Data>
    </Query>
  );
});

export default CryptoPrice;
