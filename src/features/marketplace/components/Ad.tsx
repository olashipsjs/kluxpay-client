import React from 'react';
import Badge from '@components/badge/Badge';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import coins from 'src/constants/coins';
import Image from '@components/base/image/Image';
import useTanstackQuery from '@hooks/useTanstackQuery';
import { getCoinPrice } from 'src/apis/coins';
import Loader from '@components/base/button/Loader';
import Divider from '@components/divider/Divider';
import Iconify from '@components/base/iconify/Iconify';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Overlay from '@components/overlay/Overlay';
import TradeModal from './TradeModal';
import number from '@utils/number';
import Step from '@components/step/Step';
import TradeSuccess from './TradeSuccess';

const Price = ({
  fiat,
  coinId,
  priceMargin,
}: {
  fiat: string;
  coinId: string;
  priceMargin: number;
}) => {
  const { isFetching, error, data } = useTanstackQuery({
    queryFn: getCoinPrice,
    queryKey: [coinId, fiat],
    initialData: null,
    refetchInterval: 30000,
  });

  switch (true) {
    case isFetching:
      return (
        <Loader
          visible={true}
          color={'gray-60'}
        />
      );
    case error !== null:
      return (
        <Text
          fontSize={13}
          color={'red-60'}
        >
          Error fetching price
        </Text>
      );
    default:
      const price = data ? data[coinId][fiat] : 0;
      const rate = (price * priceMargin) / 100 + price;

      return (
        <Text
          fontSize={13}
          fontWeight={'medium'}
        >
          {`${number.formatDecimal(rate)} ${fiat.toUpperCase()}`}
        </Text>
      );
  }
};

const Ad = ({ offer }: { offer: any }) => {
  const selectedCoin = coins.find((coin) => coin.id === offer.coinId);
  const btnRef = React.useRef<HTMLButtonElement>(null!);

  const handleMouseOver = () => {
    gsap.to(btnRef.current, {
      x: 2,
      y: -4,
      opacity: 1,
      duration: 0.1,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      opacity: 0,
      duration: 0.1,
    });
  };

  return (
    <Overlay>
      <Overlay.Trigger
        px={12}
        py={16}
        rounded={12}
        cursor={'pointer'}
        color={'gray-10'}
        flexDirection={'column'}
        borderColor={'transparent'}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        backgroundColor={'transparent'}
        _hover={{
          backgroundColor: 'gray-100',
        }}
        boxShadow={
          '0px 0px 0px 1px rgb(var(--gray-95)), 0px 1px 1px 0px rgb(var(--gray-80))'
        }
      >
        <Box width={'full'}>
          <Flex
            alignItems={'center'}
            justifyContent={'between'}
          >
            <Heading
              fontSize={14}
              letterSpacing={'xs'}
              textTransform={'capitalize'}
            >
              {`${offer.type}ing ${offer.amount}`}
              <Image
                mx={4}
                size={'16px'}
                src={selectedCoin!.image}
                css={{ verticalAlign: 'middle' }}
              />
              {offer.coinId}
            </Heading>
            <Price
              fiat={offer.fiat}
              coinId={offer.coinId}
              priceMargin={Number(offer.priceMargin)}
            />
          </Flex>

          <Flex
            mt={8}
            gap={16}
            alignItems={'center'}
          >
            <Badge
              gap={2}
              backgroundColor={'transparent'}
            >
              <Badge.Icon
                width={'16px'}
                color={'gray-60'}
                icon={'material-symbols-light:stop-circle-rounded'}
              />
              <Badge.Caption fontSize={12}>
                {`${offer.minLimit} - ${
                  offer.maxLimit
                } ${offer.fiat.toUpperCase()}`}
              </Badge.Caption>
            </Badge>

            <Badge
              gap={2}
              css={{ flex: 1 }}
              backgroundColor={'transparent'}
            >
              <Badge.Icon
                width={'16px'}
                color={'gray-60'}
                icon={'material-symbols-light:timer-play'}
              />
              <Badge.Caption fontSize={12}>
                {`${offer.timeout} mins`}
              </Badge.Caption>
            </Badge>

            <Badge
              px={8}
              py={4}
              rounded={'full'}
              color={'indigo-30'}
              backgroundColor={'indigo-100'}
            >
              <Badge.Caption fontSize={12}>
                {`${offer.payment.method}`}
              </Badge.Caption>
            </Badge>
          </Flex>
        </Box>

        <Divider my={12} />

        <Flex
          gap={8}
          width={'full'}
          alignItems={'center'}
        >
          <Badge
            size={'24px'}
            rounded={'full'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Badge.Caption
              fontSize={10}
              fontWeight={'semibold'}
              textTransform={'uppercase'}
            >{`${offer.createdBy.firstName[0]}${offer.createdBy.lastName[0]}`}</Badge.Caption>
          </Badge>
          <Heading
            fontSize={13}
            textAlign={'left'}
            letterSpacing={'xs'}
            textTransform={'capitalize'}
            css={{ flex: 1 }}
          >
            {`${offer.createdBy.firstName} ${offer.createdBy.lastName}`}
          </Heading>

          <Button
            p={2}
            ref={btnRef}
            size={'24px'}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            style={{ opacity: 0 }}
            _hover={{
              color: 'gray-10',
              borderColor: 'gray-95',
              backgroundColor: 'gray-95',
            }}
          >
            <Iconify
              width={'20px'}
              icon={'material-symbols-light:arrow-outward-rounded'}
            />
          </Button>
        </Flex>
      </Overlay.Trigger>

      <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
        <Overlay.Background />
        <Overlay.Content
          py={20}
          maxWidth={'500px'}
        >
          <Step initialData={{ amount: '', rate: '' }}>
            <Step.Screen
              screens={[<TradeModal offerId={offer._id} />, <TradeSuccess />]}
            />
          </Step>
        </Overlay.Content>
      </Overlay.Panel>
    </Overlay>
  );
};

export default Ad;
