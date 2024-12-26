import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import CoinPrice from '@components/shared/CoinPrice';
import coins from '@constants/coins';
import CreateTradeFeature from '@features/shared/modals/create-trade/Feature';
import { GET_OFFER } from '@graphql/offer';
import useApolloQuery from '@hooks/useApolloQuery';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import marginPrice from '@utils/marginPrice';
import toNumber from '@utils/toNumber';
import React from 'react';
import { useParams } from 'react-router-dom';

type ItemProps = {
  label: string;
  value: string;
};

const Item = ({ label, value }: ItemProps) => {
  return (
    <Flex
      py={12}
      px={12}
      alignItems={'center'}
      justifyContent={'between'}
    >
      <Text
        fontSize={13}
        lineHeight={'1'}
        color={'gray-60'}
      >
        {label}
      </Text>
      <Heading
        fontSize={13}
        lineHeight={'1'}
        textTransform={'capitalize'}
      >
        {value}
      </Heading>
    </Flex>
  );
};

const OfferFeature = () => {
  const { offerId } = useParams<{ offerId: string }>();

  const { data } = useApolloQuery(GET_OFFER, { variables: { id: offerId } });

  if (!data || !data?.getOffer) return null;

  const offer = data.getOffer;
  const COIN = coins.find((coin) => coin.id === offer.coinId)!;

  return (
    <React.Fragment>
      <CoinPrice
        fiat={offer.fiat}
        coinId={offer.coinId}
      >
        {({ price }) => {
          const RATE = marginPrice(price, offer.priceMargin);

          return (
            <React.Fragment>
              <Heading
                pt={32}
                textTransform={'capitalize'}
              >{`${offer.type}ing ${
                offer.amount
              } ${COIN.symbol.toUpperCase()}`}</Heading>

              <Text
                mt={6}
                as={'p'}
                fontSize={14}
              >{`${offer.notes}`}</Text>

              <Box
                mt={32}
                border={1}
                rounded={12}
                borderColor={'gray-90'}
                backgroundColor={'white'}
                boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
                notLastChild={{
                  borderBottom: 1,
                  borderBottomColor: 'gray-90',
                }}
              >
                <Item
                  label={'Type'}
                  value={offer.type}
                />
                <Item
                  label={'Amount'}
                  value={`${formatDecimal(
                    offer.amount
                  )} ${COIN.symbol.toUpperCase()}`}
                />
                <Item
                  label={'Rate'}
                  value={`${currencySymbol(offer.fiat)} ${RATE}`}
                />
                <Item
                  label={'Token'}
                  value={COIN.symbol.toUpperCase()}
                />
                <Item
                  label={'Min Amount'}
                  value={`${currencySymbol(offer.fiat)} ${formatDecimal(
                    offer.minLimit
                  )}`}
                />
                <Item
                  label={'Max Amount'}
                  value={`${currencySymbol(offer.fiat)} ${formatDecimal(
                    offer.maxLimit
                  )}`}
                />
              </Box>

              <Text
                mt={32}
                as={'p'}
                fontSize={12}
                color={'gray-60'}
              >
                You can trade this offer by clicking on the trade button below.
                Please note that you will be charged a 2% fee for the
                transaction. Please review the details before proceeding.
              </Text>

              <Overlay mt={80}>
                <Overlay.Trigger>Trade</Overlay.Trigger>
                <CreateTradeFeature rate={toNumber(RATE)} />
              </Overlay>
            </React.Fragment>
          );
        }}
      </CoinPrice>
    </React.Fragment>
  );
};

export default OfferFeature;
