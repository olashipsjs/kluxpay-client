import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import React from 'react';

const tokens = [
  'logos:bitcoin',
  'cryptocurrency-color:dai',
  'cryptocurrency-color:usdt',
  'token-branded:binance-smart-chain',
];

const TradeCard = () => {
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
        background: 'linear-gradient(rgb(var(--gray-95)), rgb(var(--white)))',
      }}
    >
      <Grid
        gap={4}
        width={'fit'}
        gridTemplateColumns={'1fr 1fr'}
      >
        {tokens.map((token, index) => {
          return (
            <Button
              p={'4px'}
              key={index}
              size={'44px'}
              rounded={'full'}
              backdropBlur={'lg'}
              borderColor={'gray-95'}
              backgroundColor={'white'}
              style={{
                overflow: 'hidden',
              }}
              _hover={{
                backgroundColor: 'white',
              }}
            >
              <Iconify
                icon={token}
                width={'1.9em'}
              />
            </Button>
          );
        })}
      </Grid>

      <Box>
        <Heading
          fontSize={17}
          letterSpacing={'sm'}
        >
          P2P Trading
        </Heading>
        <Text
          mt={8}
          as={'p'}
          fontSize={13}
          lineHeight={'md'}
          fontWeight={'medium'}
        >
          Sell or buy tokens from other Kluxpay users
        </Text>
      </Box>
    </Flex>
  );
};

export default TradeCard;
