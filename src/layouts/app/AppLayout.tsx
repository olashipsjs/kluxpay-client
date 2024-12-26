import BottomBar from './components/BottomBar';
import AuthProvider from 'src/providers/AuthProvider';
import UserProvider from 'src/providers/UserProvider';
import OffersProvider from 'src/providers/OffersProvider';
import PaymentsProvider from 'src/providers/PaymentsProvider';
import Body from './components/Body';
import WalletProvider from 'src/providers/WalletProvider';
import SideBar from './components/SideBar';
import Banner from './components/Banner';
import VerificationBanner from './components/VerificationBanner';
import Header from './components/Header';
import TradesProvider from 'src/providers/TradesProvider';
import { Helmet } from 'react-helmet-async';
import React from 'react';

const AppLayout = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Kluxpay - app</title>
      </Helmet>

      <AuthProvider>
        <UserProvider>
          <WalletProvider>
            <OffersProvider>
              <TradesProvider>
                <PaymentsProvider>
                  <Banner />
                  <VerificationBanner />
                  <Header />
                  <SideBar />
                  <Body />
                  <BottomBar />
                </PaymentsProvider>
              </TradesProvider>
            </OffersProvider>
          </WalletProvider>
        </UserProvider>
      </AuthProvider>
    </React.Fragment>
  );
};

export default AppLayout;
