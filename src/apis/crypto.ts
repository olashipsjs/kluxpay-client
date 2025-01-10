import { QueryFunction } from '@tanstack/react-query';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
};

export const getCryptoPrice: QueryFunction<any> = async ({ queryKey }) => {
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

export const getCryptoList: QueryFunction = async ({ queryKey }) => {
  const [currency, category] = queryKey;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&category=${category}&per_page=2`,
      options
    );

    const platforms = await fetch(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=true`
    );

    const data = await response.json();
    const platformsResponse = await platforms.json();

    const objects = data
      ? data.map((token: any) => {
          return {
            id: token.id,
            image: token.image,
            symbol: token.symbol,
            name: token.name,
            platforms: platformsResponse
              ? platformsResponse.find(
                  (platform: any) => platform.id === token.id
                )?.platforms
              : undefined,
            dailyChange: token.price_change_percentage_24h,
          };
        })
      : [];

    return objects;
  } catch (error) {
    console.log({ error });
    throw new Error((error as Error).message);
  }
};

export const getCryptoData: QueryFunction = async ({ queryKey }) => {
  const [id, network, currency] = queryKey;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&community_data=false&developer_data=false&sparkline=false`,
      options
    );

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      image: data.image,
      symbol: data.symbol,
      contractAddress: data?.platforms[network as string],
      volume: data?.market_data?.total_volume?.[currency as string],
      dailyLow: data?.market_data?.low_24h?.[currency as string],
      dailyHigh: data?.market_data?.high_24h?.[currency as string],
      marketCap: data?.market_data?.market_cap?.[currency as string],
      dailyChange:
        data?.market_data?.price_change_24h_in_currency?.[currency as string],
    };
  } catch (error) {
    console.log({ error });
    throw new Error((error as Error).message);
  }
};

export const getCryptoChart: QueryFunction = async ({ queryKey }) => {
  const [days, coinId, currency] = queryKey;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&precision=2`,
      options
    );

    const data = await response.json();

    return data?.prices;
  } catch (error) {
    console.log({ error });
    throw new Error((error as Error).message);
  }
};
