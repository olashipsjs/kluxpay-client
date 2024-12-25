import { useQuery } from '@tanstack/react-query';
import client from 'src/lib/queryClient';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
};

const useGetCoinPrices = (params: { id: string; days: number }) => {
  const { id, days } = params;

  const fetchCoinPrices = () => {
    const response = fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
      options
    )
      .then((response) => response.json())
      .then((data) => data.prices)
      .catch((error) => console.log({ error }));

    return response;
  };

  const { data, isLoading, error } = useQuery(
    { queryKey: ['fetchCoinPrices'], queryFn: fetchCoinPrices },
    client
  );

  return { prices: data, isLoading, error };
};

export default useGetCoinPrices;
