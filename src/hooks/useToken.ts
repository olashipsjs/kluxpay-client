import React from 'react';
import { TokenContext } from 'src/providers/TokenProvider';

const useToken = () => {
  const context = React.useContext(TokenContext);

  if (!context) {
    throw new Error('Context provider is not available');
  }

  return context;
};

export default useToken;
