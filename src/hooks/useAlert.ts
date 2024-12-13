import React from 'react';
import { AlertContext } from 'src/providers/AlertProvider';

const useAlert = () => {
  const context = React.useContext(AlertContext);

  if (context === undefined) {
    throw new Error('useAlert hook requires the AlertProvider component');
  }

  return context;
};

export default useAlert;
