import React from 'react';
import { OffersContext } from 'src/providers/OffersProvider';

const useOffers = () => {
  const context = React.useContext(OffersContext);

  if (!context) {
    throw new Error('No context provider provided');
  }

  const setter = React.useCallback(context.setOffers, [context.offers]);

  return { offers: context.offers, setOffers: setter };
};

export default useOffers;
