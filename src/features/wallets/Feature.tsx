import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Actions from './components/Actions';
import Assets from './components/Assets';
import Container from '@components/base/container/Container';
import Box from '@components/base/box/Box';
import Divider from '@components/divider/Divider';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const WalletsFeature = () => {
  const [searchParams] = useSearchParams();

  const WALLET_NAME = `Wallets - ${searchParams.get('name')}` || 'Wallets';

  return (
    <React.Fragment>
      <Helmet>
        <title>{WALLET_NAME}</title>
      </Helmet>

      <Container
        px={0}
        maxWidth={'480px'}
      >
        <Header />
        <Divider
          my={12}
          backgroundColor={'transparent'}
        />
        <Box
          px={12}
          notLastChild={{
            mb: 24,
          }}
        >
          <Portfolio />
          <Actions />
          <Assets />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default WalletsFeature;
