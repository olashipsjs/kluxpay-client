import { Route, Routes, useLocation } from 'react-router-dom';
import Section from '@components/base/section/Section';
import Container from '@components/base/container/Container';
import GeneralSettingsFeature from '@features/settings/general/Feature';
import ProfileSettingsFeature from '@features/settings/profile/Feature';
import SecuritySettingsFeature from '@features/settings/security/Feature';
import AuthenticationSettingsFeature from '@features/settings/authentication/Feature';

const Router = () => {
  const location = useLocation();

  const routes = [
    { path: '/', exact: true, main: null },
    { path: 'payments', main: 'payments' },
    { path: 'profile', main: <ProfileSettingsFeature /> },
    { path: 'security', main: <SecuritySettingsFeature /> },
    { path: 'general', exact: true, main: <GeneralSettingsFeature /> },
    { path: 'authentication', main: <AuthenticationSettingsFeature /> },
  ];

  const isIndex = location.pathname === `/app/settings/`;

  return (
    <Section
      width={'auto'}
      ms={{ initial: 0, sm: '240px' }}
      display={{ initial: isIndex ? 'hidden' : 'block', sm: 'block' }}
    >
      <Container
        py={24}
        mx={0}
        maxWidth={'400px'}
        px={{ initial: 12, sm: 24 }}
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
      </Container>
    </Section>
  );
};

export default Router;
