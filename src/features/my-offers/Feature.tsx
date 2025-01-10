import React from 'react';
import useOffers from '@hooks/useOffers';
import Flex from '@components/base/flex/Flex';
import OfferList from './components/OfferList';
import Overlay from '@components/overlay/Overlay';
import Divider from '@components/divider/Divider';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import CreateOfferFeature from '@features/shared/modals/create-offer/Feature';

const MyOffersFeature = () => {
  const { setOffers } = useOffers();

  return (
    <React.Fragment>
      <Flex justifyContent={'between'}>
        <Heading
          fontSize={21}
          fontWeight={'semibold'}
        >
          Manage Offers
        </Heading>

        <Overlay>
          <Overlay.Trigger
            p={4}
            size={'fit'}
            fontSize={13}
            rounded={'full'}
            color={'white'}
            fontWeight={'semibold'}
            borderColor={'transparent'}
            backgroundColor={'indigo-60'}
            onClick={() => setOffers({ type: 'UNSET_CURRENT_OFFER' })}
          >
            <Iconify
              width={20}
              icon={'fluent:add-24-filled'}
            />
          </Overlay.Trigger>
          <CreateOfferFeature />
        </Overlay>
      </Flex>

      <Divider
        my={12}
        backgroundColor={'transparent'}
      />

      <OfferList />
    </React.Fragment>
  );
};

export default MyOffersFeature;
