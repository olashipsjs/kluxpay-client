import DashboardFeature from '@features/dashboard/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const DashboardPage = () => {
  return (
    <React.Fragment>
      <Helmet></Helmet>
      <DashboardFeature />
    </React.Fragment>
  );
};

export default DashboardPage;
