import WalletsFeature from '@features/wallets/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const WalletsPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Your wallets</title>
      </Helmet>
      <WalletsFeature />
    </React.Fragment>
  );
};

export default WalletsPage;
