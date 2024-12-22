import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';
import React from 'react';
import Password from './components/ChangePassword';
import Flex from '@components/base/flex/Flex';
import Anchor from '@components/anchor/Anchor';

const SecuritySettingsFeature = () => {
  return (
    <React.Fragment>
      <Heading
        as={'h2'}
        fontSize={21}
      >
        Security
      </Heading>
      <Divider my={16} />
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading
          as={'h3'}
          fontSize={14}
        >
          Change Password
        </Heading>
        <Anchor to={'/auth/reset-password/'}>Reset password</Anchor>
      </Flex>
      <Divider my={4} />
      <Password />
    </React.Fragment>
  );
};

export default SecuritySettingsFeature;
