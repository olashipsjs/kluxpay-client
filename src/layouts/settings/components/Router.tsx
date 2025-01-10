import Main from './Main';
import { Route, Routes } from 'react-router-dom';
import GeneralSettingsFeature from '@features/settings/general/Feature';
import ProfileSettingsFeature from '@features/settings/profile/Feature';
import SecuritySettingsFeature from '@features/settings/security/Feature';
import AuthenticationSettingsFeature from '@features/settings/authentication/Feature';
import PaymentSettingsFeature from '@features/settings/payment/Feature';
import React from 'react';
import TicketsFeature from '@features/tickets/Feature';

const Router = () => {
  const routes = [
    { path: 'payments', main: <PaymentSettingsFeature /> },
    { path: 'profile', main: <ProfileSettingsFeature /> },
    { path: 'security', main: <SecuritySettingsFeature /> },
    { path: 'tickets', main: <TicketsFeature /> },
    { path: 'general', exact: true, main: <GeneralSettingsFeature /> },
    { path: 'authentication', main: <AuthenticationSettingsFeature /> },
  ];

  return (
    <React.Fragment>
      <Routes>
        <Route
          path={'/'}
          element={<Main />}
        />
      </Routes>

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
    </React.Fragment>
  );
};

export default Router;
