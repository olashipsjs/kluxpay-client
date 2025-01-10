import React from 'react';
import Theme from '../../components/theme/Theme';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const RootLayout = () => {
  return (
    <React.Fragment>
      <ScrollRestoration
        getKey={(location) => {
          return location.key;
        }}
      />
      <Theme />
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
