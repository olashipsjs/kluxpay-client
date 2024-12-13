import React from 'react';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import OfferList from './components/OfferList';
import Divider from '@components/divider/Divider';
import Flex from '@components/base/flex/Flex';

const MyOffersFeature = () => {
  return (
    <React.Fragment>
      <Container mt={20}>
        <Flex
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading>Manage Offers</Heading>
        </Flex>
      </Container>

      <Divider my={20} />

      <OfferList />
    </React.Fragment>
  );
};

export default MyOffersFeature;
