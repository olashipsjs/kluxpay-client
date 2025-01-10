import { Route, Routes } from 'react-router-dom';
import MarketFeature from '@features/market/Feature';

const routes = [{ path: '/', exact: false, main: <MarketFeature /> }];

const Router = () => {
  return (
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
  );
};

export default Router;
