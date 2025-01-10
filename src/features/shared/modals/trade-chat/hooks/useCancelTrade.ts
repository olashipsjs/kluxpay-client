import { SEND_MAIL } from '@graphql/mail';
import { CANCEL_TRADE } from '@graphql/trade';
import { useApolloClient } from '@apollo/client';

const useCancelTrade = () => {
  const client = useApolloClient();

  const cancelTrade = async (payload: { tradeId: string }) => {
    const { tradeId } = payload;

    try {
      const { data: tradeData } = await client.mutate({
        mutation: CANCEL_TRADE,
        variables: { tradeId },
      });

      const trade = tradeData && tradeData.cancelTrade;

      if (!trade) {
        throw new Error('Unable to complete trade.');
      }

      const AMOUNT = `${(trade.amount / trade.rate).toFixed(4)} ${
        trade.offer.coin.symbol
      }`;

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          template: 'trade-cancelled',
          subject: `Payment received ${AMOUNT}`,
          recipients: `${trade.createdBy.email}`,
          data: {
            tradeId,
            amount: `${AMOUNT}`,
            caption:
              trade.type === 'buy'
                ? `We've released ${AMOUNT} from escrow back into your wallet.`
                : `Send a ticket via your dashboard to log a complaint about this trade`,
          },
        },
      });

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          template: 'trade-cancelled',
          subject: `Payment received ${AMOUNT}`,
          recipients: `${trade.offer.createdBy.email}`,
          data: {
            tradeId,
            amount: `${AMOUNT}`,
            caption:
              trade.type !== 'buy'
                ? `We've released ${AMOUNT} from escrow back into your wallet.`
                : `Send a ticket via your dashboard to log a complaint about this trade`,
          },
        },
      });

      return { trade };
    } catch (error) {
      throw error;
    }
  };

  return { cancelTrade };
};

export default useCancelTrade;
