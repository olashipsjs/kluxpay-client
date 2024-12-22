import Heading from '@components/base/heading/Heading';
import Currency from './components/Currency';
import React from 'react';
import Divider from '@components/divider/Divider';

const GeneralSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading fontSize={19}>General Settings</Heading>
      <Divider my={16} />
      <Currency />
    </React.Fragment>
  );
};

export default GeneralSettingsFeature;
