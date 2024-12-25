import Offer from '@ts_types/offer';
import Button from '@components/base/button/Button';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Flex from '@components/base/flex/Flex';
import Divider from '@components/divider/Divider';
import CoinPrice from '@components/shared/CoinPrice';
import coins from '@constants/coins';
import marginPrice from '@utils/marginPrice';
import Overlay from '@components/overlay/Overlay';
import Iconify from '@components/base/iconify/Iconify';
import MangeOfferFeature from '@features/shared/modals/manage-offer/Feature';
import Anchor from '@components/anchor/Anchor';
import React from 'react';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';

type Props = { offer: Offer.Type };

const Item = ({ offer }: Props) => {
  const activeCoin = coins.find((coin) => coin.id === offer.coinId)!;

  return (
    <Button
      p={0}
      gap={0}
      rounded={12}
      width={'full'}
      overflow={'clip'}
      color={'gray-40'}
      alignItems={'stretch'}
      borderColor={'gray-90'}
      flexDirection={'column'}
      justifyContent={'start'}
      backgroundColor={'white'}
      boxShadow={'0px .5px 1px 0px rgb(var(--gray-90))'}
      _hover={{ backgroundColor: 'gray-100' }}
    >
      <Flex
        p={12}
        gap={12}
        width={'full'}
        alignItems={'start'}
      >
        <Avatar
          p={8}
          border={1}
          size={'40px'}
          rounded={'full'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .75px 1px 0px rgb(var(--gray-80))'}
        >
          <Avatar.Picture src={activeCoin.image} />
        </Avatar>

        <Box
          py={2}
          css={{ flex: 1 }}
        >
          <Heading
            fontSize={14}
            textAlign={'left'}
            fontWeight={'semibold'}
            textTransform={'capitalize'}
          >{`${offer.type} ${activeCoin.symbol.toUpperCase()}`}</Heading>
          <Text
            mt={8}
            as={'p'}
            fontSize={13}
            color={'gray-40'}
            textAlign={'left'}
            textTransform={'capitalize'}
          >{`${offer.payment.method}`}</Text>
        </Box>

        <Overlay>
          {({ setIsOpen }) => {
            return (
              <React.Fragment>
                <Anchor
                  px={12}
                  py={2}
                  borderColor={'transparent'}
                  backgroundColor={'gray-90'}
                  onClick={() => setIsOpen(true)}
                  to={`/app/my-offers/?id=${offer._id}`}
                  _hover={{
                    color: 'gray-10',
                    backgroundColor: 'gray-80',
                  }}
                >
                  <Iconify
                    width={'16px'}
                    icon={'ph:sliders-horizontal-fill'}
                  />
                </Anchor>
                <MangeOfferFeature />
              </React.Fragment>
            );
          }}
        </Overlay>
      </Flex>

      <Divider backgroundColor={'gray-90'} />

      <Box p={12}>
        <Flex justifyContent={'between'}>
          <Text fontSize={13}>{`${currencySymbol(offer.fiat)} ${formatDecimal(
            offer.minLimit
          )} `}</Text>
          <Text fontSize={13}>{`${currencySymbol(offer.fiat)} ${formatDecimal(
            offer.maxLimit
          )}`}</Text>
        </Flex>

        <Divider my={12} />

        <Flex justifyContent={'between'}>
          <Box>
            <Heading
              fontSize={12}
              textAlign={'left'}
            >
              Amount
            </Heading>
            <Heading
              mt={8}
              fontSize={21}
            >
              {`${offer.amount} `}
              <Text
                fontSize={12}
                color={'gray-60'}
                css={{ verticalAlign: 'middle' }}
              >{` ${activeCoin.symbol.toUpperCase()}`}</Text>
            </Heading>
          </Box>

          <Box>
            <Heading
              fontSize={12}
              textAlign={'right'}
            >
              Price
            </Heading>
            <CoinPrice
              coinId={offer.coinId}
              fiat={offer.fiat}
            >
              {({ price }) => {
                return (
                  <Heading
                    mt={8}
                    fontSize={21}
                  >
                    <Text
                      fontSize={12}
                      color={'gray-60'}
                      css={{ verticalAlign: 'middle' }}
                    >{`${currencySymbol(offer.fiat)} `}</Text>
                    {`${marginPrice(price, offer.priceMargin)} `}
                  </Heading>
                );
              }}
            </CoinPrice>
          </Box>
        </Flex>
      </Box>
    </Button>
  );
};

export default Item;
