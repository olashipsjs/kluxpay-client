import { useApolloClient } from '@apollo/client';
import { SEND_MAIL } from '@graphql/mail';
import { COMPLETE_TRADE } from '@graphql/trade';

const useCompleteTrade = () => {
  const client = useApolloClient();

  const completeTrade = async (payload: { tradeId: string }) => {
    const { tradeId } = payload;

    try {
      const { data: tradeData } = await client.mutate({
        mutation: COMPLETE_TRADE,
        variables: { tradeId },
      });

      const trade = tradeData && tradeData.completeTrade;

      if (!trade) {
        throw new Error('Unable to complete trade.');
      }

      const AMOUNT = `${(trade.amount / trade.rate).toFixed(4)} ${
        trade.offer.coin.symbol
      }`;

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          tradeId,
          amount: `${AMOUNT}`,
          template: 'trade-completed',
          recipients: `${trade.createdBy.email}`,
          subject: `Payment received ${AMOUNT}`,
          caption:
            trade.type === 'buy'
              ? 'has been paid into your wallet'
              : 'has been moved from your wallet to your partners wallet',
        },
      });

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          template: 'trade-completed',
          recipients: `${trade.offer.createdBy.email}`,
          subject: `Payment received ${AMOUNT}`,
          data: {
            tradeId,
            amount: `${AMOUNT}`,
            caption:
              trade.type === 'buy'
                ? 'has been moved from your wallet to your partners wallet'
                : 'has been paid into your wallet',
          },
        },
      });

      return { trade };
    } catch (error) {
      throw error;
    }
  };
  return { completeTrade };
};

export default useCompleteTrade;
