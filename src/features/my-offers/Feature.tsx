import React from 'react';
import Flex from '@components/base/flex/Flex';
import OfferList from './components/OfferList';
import Overlay from '@components/overlay/Overlay';
import Heading from '@components/base/heading/Heading';
import Container from '@components/base/container/Container';
import CreateOfferFeature from '@features/shared/modals/create-offer/Feature';
import Iconify from '@components/base/iconify/Iconify';

const MyOffersFeature = () => {
  return (
    <React.Fragment>
      <Container
        px={0}
        mt={20}
        mb={16}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading>Manage Offers</Heading>

          <Overlay>
            <Overlay.Trigger
              py={8}
              gap={6}
              fontSize={14}
              color={'gray-60'}
              fontWeight={'medium'}
              borderColor={'gray-90'}
              backgroundColor={'white'}
              _hover={{
                color: 'gray-10',
                backgroundColor: 'gray-100',
              }}
            >
              Post
              <Iconify
                width={'20px'}
                icon={'ph:pencil-circle-fill'}
              />
            </Overlay.Trigger>
            <CreateOfferFeature />
          </Overlay>
        </Flex>
      </Container>

      <OfferList />
    </React.Fragment>
  );
};

export default MyOffersFeature;