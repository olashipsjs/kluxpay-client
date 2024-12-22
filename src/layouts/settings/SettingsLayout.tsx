import React from 'react';
import Sidebar from './components/Sidebar';
import Router from './components/Router';

const SettingsLayout = () => {
  return (
    <React.Fragment>
      <Sidebar />
      <Router />
    </React.Fragment>
  );
};

export default SettingsLayout;
