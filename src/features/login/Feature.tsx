import React from 'react';
import Text from '@components/base/text/Text';
import FormBlock from './components/FormBlock';
import Heading from '@components/base/heading/Heading';
import Anchor from '@components/anchor/Anchor';

const LoginFeature = () => {
  return (
    <React.Fragment>
      <Heading
        fontSize={24}
        textAlign={'center'}
      >
        Log In
      </Heading>
      <Text
        mt={6}
        as={'p'}
        fontSize={16}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        Enter your details to login.
      </Text>
      <FormBlock />

      <Text
        mt={48}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        Don't have an account?
        <Anchor
          ms={4}
          color={'orange-60'}
          fontSize={'inherit'}
          to={'/auth/register/'}
          _hover={{ color: 'orange-40' }}
        >
          Register
        </Anchor>
      </Text>
    </React.Fragment>
  );
};

export default LoginFeature;
