import ResetPasswordFeature from '@features/reset-password/Feature';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ResetPasswordPage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Reset your password</title>
      </Helmet>
      <ResetPasswordFeature />
    </React.Fragment>
  );
};

export default ResetPasswordPage;
