import MyOffersFeature from '@features/my-offers/Feature';
import useUser from '@hooks/useUser';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const MyOffersPage = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
      <Helmet>
        <title>{`${user ? user.firstName : 'Your'} offers`}</title>
      </Helmet>
      <MyOffersFeature />
    </React.Fragment>
  );
};

export default MyOffersPage;
