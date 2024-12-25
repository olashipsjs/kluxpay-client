import { useQuery } from '@tanstack/react-query';
import client from 'src/lib/queryClient';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
};

const useGetCoinById = (id: string) => {
  const fetchCoinById = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        options
      );

      const json = await response.json();

      return json;
    } catch (error) {
      console.log({ error });
      throw new Error((error as Error).message);
    }
  };

  const { data, isLoading, error } = useQuery(
    { queryKey: ['fetchCoinById'], queryFn: fetchCoinById },
    client
  );

  return { coin: data, isLoading, error };
};

export default useGetCoinById;
