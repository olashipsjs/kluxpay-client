import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import TradeFeature from '@features/trade/Feature';
import { Route, Routes, useLocation } from 'react-router-dom';
import EmptyState from './EmptyState';

const routes = [
  { path: '/', exact: false, main: <EmptyState /> },
  { path: '/:id', exact: false, main: <TradeFeature /> },
];

const Router = () => {
  const location = useLocation();

  const CURRENT_PATH = location.pathname;
  const isParentRoute = CURRENT_PATH === '/app/trades/';

  return (
    <Box
      width={'auto'}
      ms={{ initial: 0, md: '360px' }}
      display={{ initial: isParentRoute ? 'hidden' : 'block', md: 'block' }}
    >
      <Container
        p={0}
        maxWidth={'full'}
      >
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
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
