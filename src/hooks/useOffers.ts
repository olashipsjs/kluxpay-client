import React from 'react';
import { OffersContext } from 'src/providers/OffersProvider';

const useOffers = () => {
  const context = React.useContext(OffersContext);

  if (!context) {
    throw new Error('No context provider provided');
  }

  return context;
};

export default useOffers;
