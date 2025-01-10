import React from 'react';
import { ReferralsContext } from 'src/providers/ReferralsProvider';

const useReferrals = () => {
  const context = React.useContext(ReferralsContext);

  if (!context) {
    throw new Error('Provider context is required');
  }

  return context;
};

export default useReferrals;
