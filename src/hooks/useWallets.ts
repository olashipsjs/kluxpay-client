import React from 'react';
import { WalletsContext } from 'src/providers/WalletsProvider';

const useWallets = () => {
  const context = React.useContext(WalletsContext);

  if (!context) {
    throw new Error('useWallets must be used within a WalletsProvider');
  }

  return context;
};

export default useWallets;
