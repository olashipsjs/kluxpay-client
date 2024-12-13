import { QueryFunction } from '@tanstack/react-query';
import env from 'src/constants/env';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': env.COINGECKO_API_KEY,
  },
};

export const getCoinPrice: QueryFunction<any> = async ({ queryKey }) => {
  const [coinId, currency] = queryKey;

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
