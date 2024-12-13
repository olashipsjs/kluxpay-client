import RootLayout from './layouts/root/RootLayout';
import AuthLayout from './layouts/auth/AuthLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import AppLayout from '@layouts/app/AppLayout';
import SettingsLayout from '@layouts/settings/SettingsLayout';
import ProfileSettingsPage from '@pages/ProfileSettingsPage';
import MyOffersPage from '@pages/MyOffersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: 'reset-password', element: <ResetPasswordPage /> },
        ],
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          { path: 'my-offers', element: <MyOffersPage /> },
          {
            path: 'settings',
            element: <SettingsLayout />,
            children: [{ path: 'profile', element: <ProfileSettingsPage /> }],
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
