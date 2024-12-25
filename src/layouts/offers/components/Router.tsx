import Box from '@components/base/box/Box';
import { Route, Routes } from 'react-router-dom';
import Container from '@components/base/container/Container';
import OfferFeature from '@features/offer/Feature';

const routes = [
  { path: '/', exact: false, main: 'hello' },
  { path: '/offers/:offerId', exact: false, main: <OfferFeature /> },
];

const Router = () => {
  return (
    <Box
      width={'auto'}
      ms={{ initial: 0, sm: '400px' }}
    >
      <Container
        px={0}
        width={'auto'}
        maxWidth={'400px'}
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
    </Box>
  );
};

export default Router;
