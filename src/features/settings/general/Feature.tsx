import Heading from '@components/base/heading/Heading';
import Currency from './components/Currency';
import React from 'react';

const GeneralSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading
        fontSize={19}
        mb={20}
      >
        General Settings
      </Heading>
      <Currency />
    </React.Fragment>
  );
};

export default GeneralSettingsFeature;
