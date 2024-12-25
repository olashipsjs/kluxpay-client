import React from 'react';
import SideBar from './components/SideBar';
import Router from './components/Router';

const WalletsLayout = () => {
  return (
    <React.Fragment>
      <SideBar />
      <Router />
    </React.Fragment>
  );
};

export default WalletsLayout;
