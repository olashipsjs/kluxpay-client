import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';
import React from 'react';
import ChangeEmail from './components/ChangeEmail';

const AuthenticationSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading
        as={'h2'}
        fontSize={21}
      >
        Authentication
      </Heading>

      <Divider my={16} />

      <Heading
        as={'h3'}
        fontSize={14}
      >
        Change email
      </Heading>
      <Divider my={4} />
      <ChangeEmail />
    </React.Fragment>
  );
};

export default AuthenticationSettingsFeature;
