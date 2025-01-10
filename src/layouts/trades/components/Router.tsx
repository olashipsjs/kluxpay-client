import Box from '@components/base/box/Box';
import { Route, Routes } from 'react-router-dom';
import TradeFeature from '@features/trade/Feature';
import TradeChatFeature from '@features/trade-chat/Feature';

const routes = [
  { path: '/', exact: false, main: <TradeFeature /> },
  { path: '/:id', exact: false, main: <TradeChatFeature /> },
];

const Router = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default Router;
