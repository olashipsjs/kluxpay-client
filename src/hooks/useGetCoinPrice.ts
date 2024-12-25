import { useQuery } from '@tanstack/react-query';
import client from 'src/lib/queryClient';

const useGetCoinPrice = (coinId: string, currency: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
    },
  };

  const getCoinPrice = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`,
        options
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.log({ error });
      throw new Error((error as Error).message);
    }
  };

  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['coinPrice', coinId, currency],
      queryFn: getCoinPrice,
    },
    client
  );

  return { price: data ? data[coinId][currency] : 0, isLoading, error };
};

export default useGetCoinPrice;
