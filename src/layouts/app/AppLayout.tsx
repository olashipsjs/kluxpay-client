import UserProvider from 'src/providers/UserProvider';
import SideBar from './components/SideBar';
import BottomBar from './components/BottomBar';
import Section from '@components/base/section/Section';
import Body from './components/Body';
import OffersProvider from 'src/providers/OffersProvider';
import PaymentsProvider from 'src/providers/PaymentsProvider';

const AppLayout = () => {
  return (
    <UserProvider>
      <OffersProvider>
        <PaymentsProvider>
          <Section>
            <SideBar />
            <Body />
            <BottomBar />
          </Section>
        </PaymentsProvider>
      </OffersProvider>
    </UserProvider>
  );
};

export default AppLayout;
