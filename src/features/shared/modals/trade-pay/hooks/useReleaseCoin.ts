import { SEND_TOKEN } from '@graphql/wallet';
import useApolloMutation from '@hooks/useApolloMutation';

const useReleaseCoin = () => {
  const [sendToken] = useApolloMutation(SEND_TOKEN);

  const releaseCoin = async (payload: any) => {
    const { to, fee, amount, contractAddress, walletId } = payload;

    try {
      const sendToAdmin = await sendToken({
        variables: { payload: { to, amount: fee, contractAddress, walletId } },
      });

      if (sendToAdmin.errors) {
        throw new Error(sendToAdmin.errors[0].message);
      }

      const sendToTrader = await sendToken({
        variables: {
          payload: { to, amount: amount, contractAddress, walletId },
        },
      });

      if (sendToTrader.errors) {
        throw new Error(sendToTrader.errors[0].message);
      }

      return { to, fee, amount, contractAddress, walletId };
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };

  return { releaseCoin };
};

export default useReleaseCoin;
