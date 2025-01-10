import Query from '@components/query/Query';
import { GET_ALL_COINS } from '@graphql/coin';
import useUser from '@hooks/useUser';
import React from 'react';

type Props = {
  page?: number;
  children?: ((opt: { coins: any }) => React.ReactNode) | React.ReactNode;
};

const CryptoList = ({ children, page }: Props) => {
  const { user } = useUser();

  return (
    <Query
      query={GET_ALL_COINS}
      keys={{
        page,
        convert: user?.fiat.symbol,
      }}
    >
      <Query.Loader />
      <Query.Error></Query.Error>
      <Query.Data>
        {({ data }) => {
          const coins = data?.getAllCoins;
          return typeof children == 'function' ? children({ coins }) : children;
        }}
      </Query.Data>
    </Query>
  );
};

export default CryptoList;
