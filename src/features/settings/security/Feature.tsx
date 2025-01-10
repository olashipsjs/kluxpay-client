import Heading from '@components/base/heading/Heading';
import React from 'react';
import Password from './components/ChangePassword';

const SecuritySettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading
        as={'h2'}
        fontSize={21}
      >
        Security
      </Heading>

      <Password />
    </React.Fragment>
  );
};

export default SecuritySettingsFeature;
