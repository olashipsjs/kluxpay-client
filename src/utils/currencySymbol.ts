import currencies from '@constants/currencies';

const currencySymbol = (currencyCode: string = 'usd'): string => {
  const symbol = currencies.find(
    (currency) => currency.name === currencyCode
  )!.symbol;

  return symbol;
};

export default currencySymbol;
