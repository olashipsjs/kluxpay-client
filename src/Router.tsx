import RootLayout from './layouts/root/RootLayout';
import AuthLayout from './layouts/auth/AuthLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import AppLayout from '@layouts/app/AppLayout';
import SettingsLayout from '@layouts/settings/SettingsLayout';
import MyOffersPage from '@pages/MyOffersPage';
import TradesPage from '@pages/TradesPage';
import HomePage from '@pages/HomePage';
import DashboardPage from '@pages/DashboardPage';
import NotFoundPage from '@pages/NotFoundPage';
import WalletsPage from '@pages/WalletsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '*', element: <NotFoundPage /> },
      { index: true, element: <HomePage /> },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { index: true, element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: 'reset-password', element: <ResetPasswordPage /> },
        ],
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'my-offers', element: <MyOffersPage /> },
          { path: 'trades', element: <TradesPage /> },
          { path: 'wallets', element: <WalletsPage /> },
          {
            path: 'settings/*',
            element: <SettingsLayout />,
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
