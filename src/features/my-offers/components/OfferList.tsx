import useOffers from '@hooks/useOffers';
import Loader from '@components/base/button/Loader';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Box from '@components/base/box/Box';
import Item from './Item';
import Grid from '@components/base/grid/Grid';

const EmptyState = () => {
  const { offers } = useOffers();

  return (
    <Box
      p={20}
      rounded={12}
      backgroundColor={'white'}
    >
      <Iconify
        width={'32px'}
        color={'orange-60'}
        icon={'emojione-v1:empty-note-pad'}
      />

      <Heading mt={12}>Found {offers?.length} offers</Heading>
      <Text
        mt={6}
        as={'p'}
        fontSize={16}
      >
        No offers available right now — Click on the top-right corner to post
        new offers.
      </Text>
    </Box>
  );
};

const OfferList = () => {
  const { offers } = useOffers();

  if (offers === undefined) {
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

  if (offers === null) {
    return (
      <Flex
        py={12}
        px={12}
        gap={12}
        rounded={12}
        alignItems={'center'}
        backgroundColor={'white'}
      >
        <Iconify
          p={4}
          width={'32px'}
          rounded={'full'}
          color={'orange-60'}
          backgroundColor={'orange-100'}
          icon={'material-symbols-light:warning-rounded'}
        />

        <Text
          as={'p'}
          fontSize={16}
          lineHeight={'md'}
        >
          Unable to fetch your offers. Try again later.
        </Text>
      </Flex>
    );
  }

  if (offers?.length === 0) return <EmptyState />;

  return (
    <Container px={0}>
      <Grid
        gap={6}
        gridTemplateColumns={{
          initial: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
        }}
      >
        {offers?.map((offer) => {
          return (
            <Item
              offer={offer}
              key={offer._id}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default OfferList;
