const number = {
  formatDecimal: (value: number = 0) => {
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(value);

    return formattedValue;
  },

  removeComma: (value: string) => {
    const result = value.replace(/[\s,]/g, '');
    return result;
  },
};

export default number;
