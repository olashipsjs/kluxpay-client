import React from 'react';
import { WalletContext } from 'src/providers/WalletProvider';

const useWallet = () => {
  const context = React.useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
};

export default useWallet;
