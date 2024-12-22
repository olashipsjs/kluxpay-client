import NotFoundFeature from '@features/not-found/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Page Not Found - KluxPay</title>
        <meta
          name='description'
          content='Page not found on KluxPay'
        />
      </Helmet>
      <NotFoundFeature />
    </React.Fragment>
  );
};

export default NotFoundPage;
