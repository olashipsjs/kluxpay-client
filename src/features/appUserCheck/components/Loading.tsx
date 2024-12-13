import React from 'react';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';

const Loading = () => {
  return (
    <Flex
      width={'full'}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Iconify
        width={'4em'}
        icon={'eos-icons:three-dots-loading'}
      />
    </Flex>
  );
};

export default Loading;
