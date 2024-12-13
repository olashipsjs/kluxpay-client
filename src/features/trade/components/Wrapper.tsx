import React from 'react';
import ChartBar from './ChartBar';
import ChatBoard from './ChatBoard';
import ChatHeader from './ChatHeader';
import { GET_TRADE } from '@graphql/trade';
import useApolloQuery from '@hooks/useApolloQuery';

const Wrapper = () => {
  const { data } = useApolloQuery(GET_TRADE, {
    variables: { id: '6759e0ca59a62e95f7f55de4' },
  });

  const trade = data?.getTrade;

  if (!trade) return null;

  return (
    <React.Fragment>
      <ChatHeader trade={trade} />
      <ChatBoard />
      <ChartBar />
    </React.Fragment>
  );
};

export default Wrapper;
