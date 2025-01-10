import React from 'react';
import Names from './components/Names';
import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';
import Username from './components/Username';
import Avatar from './components/Avatar';
import Bio from './components/Bio';

const ProfileSettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading fontSize={21}>Profile</Heading>
      <Avatar />
      <Divider backgroundColor={'gray-90'} />
      <Names />
      <Divider backgroundColor={'gray-90'} />
      <Username />
      <Divider backgroundColor={'gray-90'} />
      <Bio />
    </React.Fragment>
  );
};

export default ProfileSettingsFeature;
