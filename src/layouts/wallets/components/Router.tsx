import Box from '@components/base/box/Box';
import TokenFeature from '@features/token/Feature';
import WalletsFeature from '@features/wallets/Feature';
import { Route, Routes } from 'react-router-dom';
import EmptyState from './EmptyState';

const routes = [
  { path: '/', exact: false, main: <EmptyState /> },
  { path: '/:id', exact: false, main: <WalletsFeature /> },
  { path: '/:id/:token', exact: false, main: <TokenFeature /> },
];

const Router = () => {
  return (
    <Box
      width={'auto'}
      ms={{ initial: 0, md: '400px' }}
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
    </Box>
  );
};

export default Router;
