import Heading from '@components/base/heading/Heading';
import React from 'react';
import Names from './components/Names';
import Divider from '@components/divider/Divider';
import DateOfBirth from './components/DateOfBirth';

const ProfileSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading fontSize={21}>Profile</Heading>
      <Divider my={16} />
      <Heading fontSize={14}>Legal Names</Heading>
      <Divider my={4} />
      <Names />
      <Divider my={12} />
      <Heading fontSize={14}>Date of Birth</Heading>
      <Divider my={4} />
      <DateOfBirth />
    </React.Fragment>
  );
};

export default ProfileSettingsFeature;
