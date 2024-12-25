import RootLayout from './layouts/root/RootLayout';
import AuthLayout from './layouts/auth/AuthLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import AppLayout from '@layouts/app/AppLayout';
import HomePage from '@pages/HomePage';
import NotFoundPage from '@pages/NotFoundPage';

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
        path: 'app/*',
        element: <AppLayout />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
