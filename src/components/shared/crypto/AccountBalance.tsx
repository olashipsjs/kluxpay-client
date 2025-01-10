import Query from '@components/query/Query';
import { GET_USER_BALANCE } from '@graphql/wallet';
import React from 'react';
import Text from '@components/base/text/Text';

type Props = {
  children:
    | (({ balance }: { balance: number }) => React.ReactNode)
    | React.ReactNode;
};

const AccountBalance = ({ children }: Props) => {
  return (
    <Query
      query={GET_USER_BALANCE}
      pollInterval={60000}
    >
      <Query.Loader />
      <Query.Error>
        <Text
          fontSize={14}
          color={'gray-40'}
        >
          Unable to fetch your balance at the moment. Please try again later.
        </Text>
      </Query.Error>
      <Query.Data>
        {({ data }) => {
          const balance = data?.getUserBalance || 0;

          return typeof children === 'function'
            ? children({ balance })
            : children;
        }}
      </Query.Data>
    </Query>
  );
};

export default AccountBalance;
