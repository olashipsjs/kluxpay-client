import TokenFeature from '@features/token/Feature';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';

const routes = [
  { path: '/', exact: true, main: <Main /> },
  {
    path: '/:id',
    exact: false,
    main: <TokenFeature />,
  },
];

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
