import TradesFeature from '@features/trades/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const TradesPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Your trades</title>
      </Helmet>
      <TradesFeature />
    </React.Fragment>
  );
};

export default TradesPage;
