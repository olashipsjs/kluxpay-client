import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Actions from './components/Actions';
import Assets from './components/Assets';
import Container from '@components/base/container/Container';
import Box from '@components/base/box/Box';
import Divider from '@components/divider/Divider';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useWallets from '@hooks/useWallets';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_WALLET } from '@graphql/wallet';

const WalletsFeature = () => {
  const { wallet, setWallets } = useWallets();
  const { id } = useParams<{ id: string }>();
  const { loading, error } = useApolloQuery<any>(GET_WALLET, {
    variables: { id },
    onCompleted: (data) => {
      if (data && data?.getWallet) {
        setWallets({
          type: 'SET_CURRENT_WALLET',
          payload: { wallet: data.getWallet },
        });
      }
    },
  });

  if (loading || error) {
  }

  if (wallet) {
    return (
      <React.Fragment>
        <Helmet>
          <title>{wallet?.name || 'Wallets'}</title>
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
  }
};

export default WalletsFeature;
