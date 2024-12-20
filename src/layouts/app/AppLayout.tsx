import UserProvider from 'src/providers/UserProvider';
import SideBar from './components/SideBar';
import BottomBar from './components/BottomBar';
import Section from '@components/base/section/Section';
import Body from './components/Body';
import OffersProvider from 'src/providers/OffersProvider';
import PaymentsProvider from 'src/providers/PaymentsProvider';
import AuthProvider from 'src/providers/AuthProvider';

const AppLayout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <OffersProvider>
          <PaymentsProvider>
            <Section backgroundColor={'gray-95'}>
              <SideBar />
              <Body />
              <BottomBar />
            </Section>
          </PaymentsProvider>
        </OffersProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppLayout;
