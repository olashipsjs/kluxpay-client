import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Step from '@components/step/Step';
import React from 'react';
import Generate from './components/Generate';
import Verify from './components/Verify';
import ResetPassword from './components/ResetPassword';
import Success from './components/Success';

const initialData = { email: '', code: '', newPassword: '' };

const ResetPasswordFeature = () => {
  return (
    <React.Fragment>
      <Heading textAlign={'center'}>Reset Password</Heading>
      <Text
        mt={12}
        as={'p'}
        fontSize={17}
        textAlign={'center'}
      >
        Enter your email to reset your password.
      </Text>

      <Step initialData={initialData}>
        <Step.Screen
          screens={[<Generate />, <Verify />, <ResetPassword />, <Success />]}
        />
      </Step>
    </React.Fragment>
  );
};

export default ResetPasswordFeature;