import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import React from 'react';

const Start = () => {
  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={'3em'}
        color={'indigo-50'}
        icon={'ph:mailbox-fill'}
      />
      <Heading
        mt={20}
        fontSize={19}
        textAlign={'center'}
        letterSpacing={'md'}
      >
        Verify your account
      </Heading>
      <Text
        as={'p'}
        mt={8}
        fontSize={14}
        color={'gray-50'}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        We've sent you mail sarahmande@gmail.com containing a One-Time Password
        for your account verification process.
      </Text>

      <Button mt={20}>Enter your OTP</Button>
    </Flex>
  );
};

export default Start;
