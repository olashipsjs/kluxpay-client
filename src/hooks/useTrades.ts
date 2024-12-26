import React from 'react';
import { TradeContext } from 'src/providers/TradesProvider';

const useTrades = () => {
  const context = React.useContext(TradeContext);

  if (!context) {
    throw new Error('No context provider provided');
  }

  return context;
};

export default useTrades;
