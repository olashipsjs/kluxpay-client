import RegisterFeature from '@features/register/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Trade faster - Kluxpay</title>
        <meta
          name='description'
          content='Trade digital assets with no hidden fees at the best market rates.'
        />
      </Helmet>
      <RegisterFeature />
    </React.Fragment>
  );
};

export default RegisterPage;
