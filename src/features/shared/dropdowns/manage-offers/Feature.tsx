import Dropdown from '@components/dropdown/Dropdown';
import Activate from './components/Activate';
// import Edit from './components/Edit';
import Delete from './components/Delete';
import useOffers from '@hooks/useOffers';
import Text from '@components/base/text/Text';
import React from 'react';

const ManageOfferFeature = () => {
  const { offer } = useOffers();

  return (
    <Dropdown.Content
      p={4}
      rounded={12}
    >
      {offer ? (
        <React.Fragment>
          <Activate />
          {/* <Edit /> */}
          <Delete />
        </React.Fragment>
      ) : (
        <Text fontSize={14}>No offer selected</Text>
      )}
    </Dropdown.Content>
  );
};

export default ManageOfferFeature;
