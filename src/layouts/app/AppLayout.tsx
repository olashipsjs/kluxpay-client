import BottomBar from './components/BottomBar';
import AuthProvider from 'src/providers/AuthProvider';
import UserProvider from 'src/providers/UserProvider';
import OffersProvider from 'src/providers/OffersProvider';
import PaymentsProvider from 'src/providers/PaymentsProvider';
import Body from './components/Body';
import WalletProvider from 'src/providers/WalletProvider';

const AppLayout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <WalletProvider>
          <OffersProvider>
            <PaymentsProvider>
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
