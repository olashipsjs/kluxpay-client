import React from 'react';
import ChangeEmail from './components/ChangeEmail';
import Heading from '@components/base/heading/Heading';

const AuthenticationSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading
        as={'h2'}
        fontSize={21}
      >
        Authentication
      </Heading>

      <ChangeEmail />
    </React.Fragment>
  );
};

export default AuthenticationSettingsFeature;
