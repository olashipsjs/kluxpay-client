const marginPrice = (a: number, percentage: number) => {
  const result = a * (percentage / 100) + a;

  return parseFloat(result.toFixed(2));
};

export default marginPrice;
