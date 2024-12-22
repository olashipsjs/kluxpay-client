import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Loader from '@components/base/button/Loader';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import Overlay from '@components/overlay/Overlay';
import CoinPrice from '@components/shared/CoinPrice';
import coins from '@constants/coins';
import { GET_OFFER } from '@graphql/offer';
import useApolloQuery from '@hooks/useApolloQuery';
import currencySymbol from '@utils/currencySymbol';
import marginPrice from '@utils/marginPrice';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CreateOfferFeature from '../create-offer/Feature';
import useOverlay from '@hooks/useOverlay';
import Anchor from '@components/anchor/Anchor';
import Delete from './components/Delete';
import Activate from './components/Activate';
import Alert from '@components/alert/Alert';
import formatDecimal from '@utils/formatDecimal';

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <React.Fragment>
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Text fontSize={13}>{label}</Text>
        <Heading fontSize={13}>{value}</Heading>
      </Flex>
    </React.Fragment>
  );
};

const Content = () => {
  const [searchParams] = useSearchParams();
  const ID = searchParams.get('id');
  const { data, loading, error } = useApolloQuery(GET_OFFER, {
    variables: { id: ID ?? '' },
  });

  const offer = data?.getOffer;

  const coin = coins.find((coin) => coin.id === offer?.coinId)!;

  switch (true) {
    case loading:
      return (
        <Loader
          mt={20}
          width={'20px'}
          color={'gray-10'}
          visible={true}
        />
      );
    case error !== undefined:
      return (
        <Alert
          rounded={0}
          visible={error !== undefined}
        >
          <Alert.Icon />
          <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
        </Alert>
      );

    case !offer:
      return null;

    default:
      return (
        <Box
          px={20}
          py={12}
          width={'full'}
        >
          <Flex gap={12}>
            <Avatar>
              <Avatar.Picture
                alt={coin?.name}
                src={coin?.image}
              />
            </Avatar>
            <Box css={{ flex: 1 }}>
              <Heading
                textTransform={'capitalize'}
                fontSize={16}
              >{`${offer.type} ${coin.symbol.toUpperCase()}`}</Heading>
              <Text
                mt={2}
                as={'p'}
                fontSize={13}
              >{`${offer.payment?.method}`}</Text>
            </Box>
            <CoinPrice
              fiat={offer?.fiat || ''}
              coinId={offer?.coinId || ''}
            >
              {({ price }) => {
                return (
                  <Heading fontSize={16}>{`${currencySymbol(
                    offer?.fiat
                  )} ${marginPrice(price, offer?.priceMargin || 0)}`}</Heading>
                );
              }}
            </CoinPrice>
          </Flex>

          <Box
            mt={40}
            width={'full'}
            notLastChild={{ mb: 12 }}
          >
            <Item
              label={'Amount'}
              value={`${formatDecimal(
                offer?.amount
              )} ${coin?.symbol.toUpperCase()}`}
            />
            <Item
              label={'Limit'}
              value={`${currencySymbol(offer?.fiat)} ${formatDecimal(
                offer?.minLimit
              )} - ${formatDecimal(offer?.maxLimit)}`}
            />
            <Item
              label={'Duration'}
              value={`${offer?.timeout} mins`}
            />
          </Box>

          <Box mt={40}>
            <Heading fontSize={16}>Notes</Heading>
            <Text
              mt={8}
              as={'p'}
              fontSize={13}
              lineHeight={'xl'}
            >{`${offer?.notes}`}</Text>
          </Box>

          <Box mt={40}>
            <Heading fontSize={16}>
              Payment - {`${offer.payment?.method}`}
            </Heading>
            <Text
              mt={8}
              as={'p'}
              fontSize={13}
              lineHeight={'xl'}
            >
              {`${offer?.payment?.bankName}`}
              <br />
              {`${offer?.payment?.bankAccountNumber}`}
              <br />
              {`${offer?.payment?.bankAccountName}`}
              <br />
              {`${offer?.payment?.details}`}
            </Text>
          </Box>

          <Flex
            gap={6}
            mt={24}
            width={'full'}
          >
            <Delete />
            <Overlay width={'full'}>
              <Overlay.Trigger
                color={'gray-60'}
                borderColor={'gray-90'}
                backgroundColor={'transparent'}
                _hover={{
                  color: 'gray-10',
                  backgroundColor: 'gray-95',
                }}
              >
                Edit
              </Overlay.Trigger>
              <CreateOfferFeature />
            </Overlay>
          </Flex>
          {offer.isActive ? null : <Activate />}
        </Box>
      );
  }
};

const MangeOfferFeature = () => {
  const { setIsOpen } = useOverlay();
  const [searchParams] = useSearchParams();
  const ID = searchParams.get('id');

  if (!ID) return null;

  return (
    <Overlay.Panel
      alignItems={'end'}
      justifyContent={'end'}
    >
      <Overlay.Background />
      <Overlay.Content
        maxWidth={'400px'}
        minHeight={'50vh'}
        maxHeight={'90vh'}
        overflowY={'scroll'}
        alignItems={'center'}
        flexDirection={'column'}
        css={{
          transition: 'height .5s ease-in-out',
        }}
      >
        <Box
          top={'0px'}
          zIndex={2}
          width={'full'}
          position={'sticky'}
        >
          <Flex
            py={12}
            px={20}
            alignItems={'center'}
            backgroundColor={'white'}
            justifyContent={'between'}
          >
            <Heading fontSize={21}>Manage Offer</Heading>
            <Anchor
              py={2}
              px={12}
              zIndex={2}
              width={'fit'}
              to={'/app/my-offers/'}
              onClick={() => setIsOpen(false)}
              borderColor={'transparent'}
              backgroundColor={'gray-90'}
              _hover={{ backgroundColor: 'gray-80' }}
            >
              <Iconify
                width={'16px'}
                color={'gray-10'}
                icon={'fluent:arrow-minimize-24-regular'}
              />
            </Anchor>
          </Flex>
          <Divider backgroundColor={'gray-90'} />
        </Box>

        <Content />
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default MangeOfferFeature;
