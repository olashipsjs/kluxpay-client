import BottomBar from './components/BottomBar';
import AuthProvider from 'src/providers/AuthProvider';
import UserProvider from 'src/providers/UserProvider';
import OffersProvider from 'src/providers/OffersProvider';
import PaymentsProvider from 'src/providers/PaymentsProvider';
import Body from './components/Body';
import WalletsProvider from 'src/providers/WalletsProvider';
import SideBar from './components/SideBar';
import Banner from './components/Banner';
import TradesProvider from 'src/providers/TradesProvider';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import Container from '@components/base/container/Container';
import Header from './components/Header';

const AppLayout = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Kluxpay - app</title>
      </Helmet>

      <UserProvider>
        <AuthProvider>
          <WalletsProvider>
            <OffersProvider>
              <TradesProvider>
                <PaymentsProvider>
                  <Banner />
                  <Header />
                  <Container
                    p={0}
                    maxWidth={'1280px'}
                  >
                    <SideBar />
                    <Body />
                    <BottomBar />
                  </Container>
                </PaymentsProvider>
              </TradesProvider>
            </OffersProvider>
          </WalletsProvider>
        </AuthProvider>
      </UserProvider>
    </React.Fragment>
  );
};

export default AppLayout;
