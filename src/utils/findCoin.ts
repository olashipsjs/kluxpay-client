import coins from '@constants/coins';

const findCoin = (coinId: string = '') => {
  const coin = coins.find((c) => c.id === coinId);

  return coin;
};

export default findCoin;
