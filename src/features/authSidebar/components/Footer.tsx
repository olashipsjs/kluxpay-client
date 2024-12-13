import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import React from 'react';

const Footer = () => {
  return (
    <Flex>
      <Text css={{ fontSize: 13 }}>
        All rights reserved &copy; Kluxpay Inc.
      </Text>
    </Flex>
  );
};

export default Footer;
