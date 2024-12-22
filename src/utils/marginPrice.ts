const marginPrice = (a: number, percentage: number) => {
  const result = a * (percentage / 100) + a;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const format = formatter.format(result);

  return format;
};

export default marginPrice;
