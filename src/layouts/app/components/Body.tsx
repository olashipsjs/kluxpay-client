import Container from '@components/base/container/Container';
import useUser from '@hooks/useUser';
import { Route, Routes } from 'react-router-dom';
import Flex from '@components/base/flex/Flex';
import Loader from '@components/base/button/Loader';
import useAuth from '@hooks/useAuth';
import Section from '@components/base/section/Section';
import SettingsLayout from '@layouts/settings/SettingsLayout';
import WalletsLayout from '@layouts/wallets/WalletsLayout';
import OffersLayout from '@layouts/offers/OffersLayout';
import TradesLayout from '@layouts/trades/TradesLayout';
import MyOffersFeature from '@features/my-offers/Feature';

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
    main: <OffersLayout />,
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
      <Section backgroundColor={'gray-95'}>
        <Container
          px={0}
          width={'auto'}
          maxWidth={'full'}
          minHeight={'screen'}
          ms={{ initial: '0px', md: '280px' }}
          pb={{ initial: 64, sm: 32 }}
        >
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
        </Container>
      </Section>
    );
  }

  return null;
};

export default Body;
