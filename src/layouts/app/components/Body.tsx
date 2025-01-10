import Container from '@components/base/container/Container';
import useUser from '@hooks/useUser';
import { Route, Routes } from 'react-router-dom';
import Flex from '@components/base/flex/Flex';
import Loader from '@components/loader/Loader';
import useAuth from '@hooks/useAuth';
import Section from '@components/base/section/Section';
import SettingsLayout from '@layouts/settings/SettingsLayout';
import WalletsLayout from '@layouts/wallets/WalletsLayout';
import MarketLayout from '@layouts/offers/MarketLayout';
import TradesLayout from '@layouts/trades/TradesLayout';
import MyOffersFeature from '@features/my-offers/Feature';
import DashboardFeature from '@features/dashboard/Feature';
import SupportFeature from '@features/support/Feature';
import ReferralFeature from '@features/referral/Feature';
import ReferralsProvider from 'src/providers/ReferralsProvider';
import VerificationBanner from './VerificationBanner';
import Box from '@components/base/box/Box';
import WalletsProvider from 'src/providers/WalletsProvider';

const Loading = () => {
  return (
    <Flex
      minHeight={'screen'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Loader
        visible
        width={'20px'}
        color={'gray-10'}
      />
    </Flex>
  );
};

const routes = [
  {
    exact: false,
    path: '/*',
    main: <DashboardFeature />,
  },
  {
    exact: false,
    path: 'support',
    main: <SupportFeature />,
  },
  {
    exact: false,
    path: 'referral',
    main: (
      <ReferralsProvider>
        <ReferralFeature />
      </ReferralsProvider>
    ),
  },
  {
    exact: false,
    path: 'market/*',
    main: <MarketLayout />,
  },
  {
    exact: false,
    path: 'trades/*',
    main: <TradesLayout />,
  },
  {
    exact: false,
    path: 'my-offers',
    main: <MyOffersFeature />,
  },
  {
    exact: false,
    path: 'wallets/*',
    main: <WalletsLayout />,
  },
  {
    exact: false,
    path: 'settings/*',
    main: <SettingsLayout />,
  },
];

const Body = () => {
  const { user } = useUser();
  const { auth } = useAuth();

  if (auth.accessToken === undefined && user === undefined) {
    return <Loading />;
  }

  if (user && auth.accessToken) {
    return (
      <Section
        width={'auto'}
        ms={{ initial: '0px', md: '240px' }}
      >
        <Container
          maxWidth={'1024px'}
          minHeight={'screen'}
          notLastChild={{ mb: 24 }}
          px={{ initial: 12, sm: 24 }}
          pb={{ initial: 80, sm: 'auto' }}
        >
          <WalletsProvider>
            <Box
              pt={24}
              notLastChild={{ mb: 24 }}
            >
              <VerificationBanner />
              <Routes>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.main}
                    />
                  );
                })}
              </Routes>
            </Box>
          </WalletsProvider>
        </Container>
      </Section>
    );
  }

  return null;
};

export default Body;
