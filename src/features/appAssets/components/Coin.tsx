import gsap from 'gsap';
import Box from '@components/base/box/Box';
import Link from '@components/anchor/Link';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Flex from '@components/base/flex/Flex';
import BigChart from 'src/templates/BigChart';
import React from 'react';

type Props = {
  coin: any;
  network: 'ethereum' | 'bitcoin' | 'solana';
};

const Coin = React.memo(({ coin, network }: Props) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null!);

  const handleMouseOver = () => {
    gsap.to(linkRef.current, {
      scale: 1.05,
      duration: 0.25,
      ease: 'power1.in',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(linkRef.current, {
      scale: 1,
      duration: 0.25,
      ease: 'power1.out',
    });
  };

  const current_price = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(coin.current_price);

  const percentage_24h_change =
    coin.price_change_percentage_24h > 0
      ? `${coin.price_change_percentage_24h?.toFixed(2)}`
      : coin.price_change_percentage_24h?.toFixed(2);

  return (
    <Link
      ref={linkRef}
      width={'full'}
      textDecoration={'none'}
      href={`/app/assets/${coin.id}/?days=1&network=${network}`}
    >
      <Flex
        rounded={16}
        height={'30vh'}
        color={'gray-10'}
        flexDirection={'column'}
        boxShadow={'ringGray95'}
        justifyContent={'between'}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        width={{ initial: '44vw', sm: '20vw', md: '12vw' }}
      >
        <Flex
          p={12}
          gap={8}
          overflow={'hidden'}
        >
          <Image
            size={'24px'}
            alt={coin.name}
            src={coin.image}
            rounded={'full'}
            id={`logo-${coin.symbol}`}
          />
          <Box css={{ flex: 1 }}>
            <Heading
              mb={4}
              fontSize={14}
              textAlign={'left'}
              letterSpacing={'xs'}
              textTransform={'uppercase'}
            >
              {coin.symbol}
            </Heading>
            <Text
              as={'p'}
              fontSize={12}
              color={'gray-30'}
              textAlign={'left'}
              lineHeight={'sm'}
            >
              {coin.name}
            </Text>
          </Box>
        </Flex>

        <Flex
          width={'100%'}
          height={'140px'}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <BigChart id={coin.id} />
        </Flex>

        <Flex
          pb={8}
          px={12}
          alignItems={'baseline'}
          justifyContent={'between'}
        >
          <Text
            as={'p'}
            fontSize={16}
            letterSpacing={'sm'}
          >
            ${current_price}
          </Text>
          <Text
            mt={6}
            as={'p'}
            fontSize={12}
            textAlign={'right'}
            letterSpacing={'xs'}
            color={coin.price_change_percentage_24h < 0 ? 'red-50' : 'green-50'}
          >
            {percentage_24h_change}%
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
});

export default Coin;
