import React from 'react';
import Theme from '../../components/theme/Theme';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <React.Fragment>
      <Theme />
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
