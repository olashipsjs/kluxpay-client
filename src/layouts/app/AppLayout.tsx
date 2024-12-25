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

const AppLayout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <WalletProvider>
          <OffersProvider>
            <PaymentsProvider>
              <Banner />
              <VerificationBanner />
              <Header />
              <SideBar />
              <Body />
              <BottomBar />
            </PaymentsProvider>
          </OffersProvider>
        </WalletProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppLayout;
