import { GET_USER_OFFERS } from '@graphql/offer';
import useApolloQuery from '@hooks/useApolloQuery';
import useOffers from '@hooks/useOffers';
import Offer from '@ts_types/offer';
import Loader from '@components/base/button/Loader';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import CreateOfferFeature from '@features/createOffer/Feature';
import Box from '@components/base/box/Box';

const OfferList = () => {
  const { offers, setOffers } = useOffers();
  const { loading, error } = useApolloQuery<{ getUserOffers: Offer.Type[] }>(
    GET_USER_OFFERS,
    {
      onCompleted: (data) => {
        setOffers({
          type: 'SET_OFFERS',
          payload: { offers: data.getUserOffers },
        });
      },
    }
  );

  if (loading) {
    return (
      <Flex justifyContent={'center'}>
        <Loader
          visible={true}
          width={'24px'}
          color={'indigo-60'}
        />
      </Flex>
    );
  }

  if (error) {
    <Container maxWidth={'480px'}>
      <Iconify
        p={8}
        width={'48px'}
        rounded={'full'}
        color={'orange-60'}
        backgroundColor={'orange-100'}
        icon={'material-symbols-light:warning-rounded'}
      />
      <Heading
        mt={12}
        fontSize={21}
        textAlign={'center'}
      >
        Request failed
      </Heading>
      <Text
        mt={12}
        as={'p'}
        fontSize={16}
        lineHeight={'md'}
        textAlign={'center'}
      >
        {error?.message}
      </Text>
    </Container>;
  }

  if (offers.length === 0) {
    return (
      <Container maxWidth={'480px'}>
        <Flex
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Iconify
            p={8}
            width={'48px'}
            rounded={'full'}
            color={'orange-60'}
            backgroundColor={'orange-100'}
            icon={'material-symbols-light:warning-rounded'}
          />
          <Heading
            mt={24}
            fontSize={21}
            textAlign={'center'}
          >
            No offers found
          </Heading>
          <Text
            mt={12}
            as={'p'}
            fontSize={16}
            lineHeight={'md'}
            textAlign={'center'}
          >
            We searched high and low, but no offers were found. Try posting new
            offers right now.
          </Text>

          <Overlay>
            <Overlay.Trigger
              mt={16}
              py={10}
            >
              Post Offer
            </Overlay.Trigger>
            <CreateOfferFeature />
          </Overlay>
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      {offers.map((offer) => {
        return (
          <Flex
            py={8}
            key={offer._id}
            justifyContent={'between'}
          >
            <Box>
              <Heading
                fontSize={16}
                fontWeight={'regular'}
                textTransform={'capitalize'}
              >
                {`${offer.type}ing ${offer.amount} ${offer.coinId}`}
              </Heading>

              <Text
                mt={8}
                as={'p'}
                fontSize={13}
              >
                {`Margin: ${offer.priceMargin}, Limit: ${offer.minLimit} - ${
                  offer.maxLimit
                } ${offer.fiat.toUpperCase()}`}
              </Text>
            </Box>

            <Overlay>
              <Overlay.Trigger
                py={6}
                fontSize={13}
              >
                Edit
              </Overlay.Trigger>
              <CreateOfferFeature offerId={offer._id} />
            </Overlay>
          </Flex>
        );
      })}
    </Container>
  );
};

export default OfferList;
