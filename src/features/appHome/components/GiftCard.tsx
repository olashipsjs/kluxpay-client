import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import React from 'react';

const GiftCard = () => {
  return (
    <Flex
      p={16}
      rounded={24}
      width={'full'}
      height={'240px'}
      animate={{ x: [0, 40] }}
      flexDirection={'column'}
      boxShadow={'ringGray95'}
      justifyContent={'between'}
      style={{
        background:
          'linear-gradient(rgb(var(--purple-70)), rgb(var(--purple-60)))',
      }}
    >
      <Iconify
        width={'5em'}
        color={'white'}
        icon={'fluent:gift-open-16-filled'}
      />

      <Box>
        <Heading
          fontSize={17}
          color={'white'}
          letterSpacing={'sm'}
        >
          Earn
        </Heading>
        <Text
          mt={8}
          as={'p'}
          fontSize={13}
          color={'white'}
          lineHeight={'md'}
          fontWeight={'medium'}
        >
          Refer users and earn 1% of the user first 5 trade.
        </Text>
      </Box>
    </Flex>
  );
};

export default GiftCard;
