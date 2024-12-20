import React from 'react';
import { Helmet } from 'react-helmet-async';
import HomePageFeature from '@features/homepage/Feature';

const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet></Helmet>
      <HomePageFeature />
    </React.Fragment>
  );
};

export default HomePage;
