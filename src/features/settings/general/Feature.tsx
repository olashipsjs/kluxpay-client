import React from 'react';
import Fiat from './components/Fiat';
import Heading from '@components/base/heading/Heading';

const GeneralSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading
        fontSize={19}
        fontWeight={'semibold'}
      >
        General
      </Heading>
      <Fiat />
    </React.Fragment>
  );
};

export default GeneralSettingsFeature;
