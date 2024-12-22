import React from 'react';
import { PaymentsContext } from 'src/providers/PaymentsProvider';

const usePayments = () => {
  const context = React.useContext(PaymentsContext);

  if (!context) {
    throw new Error('No context provider provided');
  }

  return context;
};

export default usePayments;
