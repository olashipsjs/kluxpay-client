import React from 'react';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';
import useGetAssetBalance from 'src/hooks/useGetAssetBalance';
import params from 'src/utils/params';
import Box from '@components/base/box/Box';
import Image from '@components/base/image/Image';
import Iconify from '@components/base/iconify/Iconify';

type Props = {
  platform?:
    | {
        decimal_place: number;
        contract_address: string;
      }
    | undefined;
  id: string;
  image: string;
  price: number;
  symbol: string;
};

const Header = ({ id, image, symbol, price, platform }: Props) => {
  const network = params.queryValue('network');

  const { balance, loading, error } = useGetAssetBalance({
    contractAddress: platform?.contract_address,
    platform: network || '',
  });

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 5,
  }).format(price);

  return (
    <Flex
      gap={12}
      justifyContent={'between'}
    >
      <Image
        src={image}
        size={'32px'}
        rounded={'full'}
        alt={symbol + '-logo'}
      />

      <Box css={{ flex: 1 }}>
        <Heading
          fontSize={{ initial: 21, sm: 24 }}
          css={{ ':first-letter': { textTransform: 'uppercase' } }}
        >
          {id}
        </Heading>

        <Text
          mt={8}
          as={'p'}
          color={'gray-50'}
          letterSpacing={'xs'}
          fontSize={{ initial: 14, sm: 17 }}
        >
          ${price ? formattedPrice : '0.00'}
        </Text>
      </Box>

      {loading ? (
        <Iconify
          width={'3.5em'}
          icon={'eos-icons:three-dots-loading'}
        />
      ) : (
        <Text
          as={'p'}
          color={'gray-10'}
          textAlign={'right'}
          letterSpacing={'sm'}
          fontWeight={'medium'}
          textTransform={'uppercase'}
          fontSize={{ initial: 17, sm: 19 }}
        >
          {new Intl.NumberFormat('en-US', {
            style: 'decimal',
            maximumFractionDigits: 2,
          }).format(balance) || 'error'}{' '}
          {symbol}
        </Text>
      )}
    </Flex>
  );
};

export default Header;
