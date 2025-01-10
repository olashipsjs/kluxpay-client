import { useApolloClient } from '@apollo/client';
import { SEND_MAIL } from '@graphql/mail';
import { CREATE_TRADE } from '@graphql/trade';
import formatDecimal from '@utils/formatDecimal';

const useCreateTrade = () => {
  const client = useApolloClient();

  const createTrade = async (payload: any) => {
    const { offerId, rate, amount } = payload;

    try {
      const { data } = await client.mutate({
        mutation: CREATE_TRADE,
        variables: { offerId, rate, amount },
      });

      const trade = data?.createTrade;

      if (!trade) {
        throw new Error('Failed to create trade');
      }

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          template: 'trade-request',
          recipients: trade.offer.createdBy.email,
          subject: `New Trade Request: ${trade.amount} ${trade.offer.fiat.symbol}`,
          data: {
            username: trade.createdBy.username,
            caption: `${trade.offer.type} ${formatDecimal(amount)}${
              trade.offer.fiat.symbol
            }.`,
            url: `${import.meta.env.VITE_CLIENT_URI}/app/trades/${trade._id}/`,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return { createTrade };
};

export default useCreateTrade;
