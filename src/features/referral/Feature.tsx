import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Code from './components/Code';
import Invitation from './components/Invitation';
import List from './components/List';
import Banner from './components/Banner';
import Divider from '@components/divider/Divider';

const ReferralFeature = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Earn 0.2 USDT</title>
      </Helmet>

      <Heading fontWeight={'semibold'}>Invite a Friend</Heading>

      <Box notLastChild={{ mb: 32 }}>
        <Banner />
        <Code />
        <Divider backgroundColor={'gray-90'} />
        <Invitation />
        <Divider backgroundColor={'gray-90'} />
        <List />
      </Box>
    </React.Fragment>
  );
};

export default ReferralFeature;
