import { useLazyQuery } from '@apollo/client';
import { GET_BALANCE } from '@graphql/wallet';
import client from 'src/lib/apolloClient';

const useGetBalance = () => {
  const [get] = useLazyQuery(GET_BALANCE, { client: client });

  const getBalance = async () => {
    try {
      const { data } = await get();

      console.log({ data });

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { getBalance };
};

export default useGetBalance;
