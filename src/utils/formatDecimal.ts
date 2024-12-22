const formatDecimal = (int: number = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const result = formatter.format(int);

  return result;
};

export default formatDecimal;
