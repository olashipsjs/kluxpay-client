import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import React from 'react';

const Header = () => {
  return (
    <Box>
      <Heading css={{ fontSize: 17, fontWeight: 600 }}>KluxPay.</Heading>
    </Box>
  );
};

export default Header;
