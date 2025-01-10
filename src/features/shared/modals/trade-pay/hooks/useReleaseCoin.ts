import { SEND_TOKEN } from '@graphql/token';
import useApolloMutation from '@hooks/useApolloMutation';

const useReleaseCoin = () => {
  const [sendToken] = useApolloMutation(SEND_TOKEN);

  const releaseCoin = async (payload: any) => {
    const { to, fee, amount, contractAddress, walletId } = payload;

    try {
      await sendToken({
        variables: {
          payload: {
            to: import.meta.env.VITE_ADMIN_WALLET_ADDRESS,
            amount: fee,
            contractAddress,
            walletId,
          },
        },
        onError(error) {
          throw new Error(error.message);
        },
      });

      await sendToken({
        variables: {
          payload: { to, amount: amount, contractAddress, walletId },
        },
        onError(error) {
          throw new Error(error.message);
        },
      });

      return { to, fee, amount, contractAddress, walletId };
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  };

  return { releaseCoin };
};

export default useReleaseCoin;
