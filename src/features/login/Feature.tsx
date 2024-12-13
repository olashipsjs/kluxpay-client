import React from 'react';
import Text from '@components/base/text/Text';
import FormBlock from './components/FormBlock';
import Heading from '@components/base/heading/Heading';

const LoginFeature = () => {
  return (
    <React.Fragment>
      <Heading
        textAlign={'center'}
        fontSize={24}
      >
        Log in
      </Heading>
      <Text
        mt={12}
        as={'p'}
        fontSize={17}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        Please enter your details to login.
      </Text>
      <FormBlock />
    </React.Fragment>
  );
};

export default LoginFeature;
