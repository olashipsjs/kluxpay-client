import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Step from '@components/step/Step';
import React from 'react';
import Generate from './components/Generate';
import Verify from './components/Verify';
import ResetPassword from './components/ResetPassword';
import Success from './components/Success';
import Anchor from '@components/anchor/Anchor';

const initialData = { email: '', code: '', newPassword: '' };

const ResetPasswordFeature = () => {
  return (
    <React.Fragment>
      <Heading textAlign={'center'}>Reset Password</Heading>
      <Text
        mt={6}
        as={'p'}
        fontSize={16}
        textAlign={'center'}
      >
        Enter your email to receive OTP code.
      </Text>

      <Step
        mt={40}
        initialData={initialData}
      >
        <Step.Screen
          screens={[<Generate />, <Verify />, <ResetPassword />, <Success />]}
        />
      </Step>

      <Text
        mt={48}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        Jump back to trading?{' '}
        <Anchor
          to={'/auth/'}
          fontSize={'inherit'}
          color={'orange-60'}
          _hover={{
            color: 'orange-40',
          }}
        >
          Log in
        </Anchor>
      </Text>
    </React.Fragment>
  );
};

export default ResetPasswordFeature;
