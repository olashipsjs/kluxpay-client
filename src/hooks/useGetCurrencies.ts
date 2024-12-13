import { useQuery } from '@tanstack/react-query';
import env from 'src/constants/env';
import client from 'src/lib/queryClient';

const useGetCurrencies = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-ke': env.COINGECKO_API_KEY,
    },
  };

  const getCurrencies = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`,
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
      queryKey: ['getSupportedCurrency'],
      queryFn: getCurrencies,
    },
    client
  );

  return { currencies: data, isLoading, error };
};

export default useGetCurrencies;
