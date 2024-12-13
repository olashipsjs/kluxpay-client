import LoginFeature from '@features/login/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>KluxPay - Login</title>
        <meta
          name='description'
          content='Login to KluxPay'
        />
      </Helmet>
      <LoginFeature />
    </React.Fragment>
  );
};

export default LoginPage;
