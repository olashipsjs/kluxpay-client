import { useQuery } from '@tanstack/react-query';
import client from 'src/lib/queryClient';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
};

const useGetCoins = (
  platform: 'ethereum' | 'bitcoin' | 'solana' = 'ethereum'
) => {
  const fetchCoins = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=25&category=${platform}-ecosystem`,
        options
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log({ error });
      throw new Error((error as Error).message);
    }
  };

  const {
    data: coins,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ['coins-list', platform],
      queryFn: fetchCoins,
    },
    client
  );

  return { coins, error, isLoading };
};

export default useGetCoins;
