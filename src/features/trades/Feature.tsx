import React from 'react';
import List from './components/List';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';

const TradesFeature = () => {
  return (
    <React.Fragment>
      <Container
        mt={20}
        px={20}
      >
        <Heading>Recent Trades</Heading>
      </Container>
      <Divider
        mt={16}
        backgroundColor={'gray-90'}
      />
      <List />
    </React.Fragment>
  );
};

export default TradesFeature;
