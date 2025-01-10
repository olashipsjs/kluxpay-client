type FormatDecimalOptions = {
  maxFraction: number;
  minFraction: number;
};

const formatDecimal = (int: number = 0, options?: FormatDecimalOptions) => {
  options = options || {
    maxFraction: 2,
    minFraction: 2,
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: options.minFraction,
    maximumFractionDigits: options.maxFraction,
  });

  const result = formatter.format(int);

  return result;
};

export default formatDecimal;
