import NotFoundFeature from '@features/not-found/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Missing resource</title>
      </Helmet>
      <NotFoundFeature />
    </React.Fragment>
  );
};

export default NotFoundPage;
