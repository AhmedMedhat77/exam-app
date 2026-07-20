import DashboardLayout from '@/features/app/layout/dashboard-layout';
import AuthLayout from '@/features/auth/layout/auth-layout';
import { Navigate, Outlet, useLocation } from 'react-router';
import * as React from 'react';

const AuthRoutes = [
  '/login',
  '/create-account',
  '/verify-otp',
  '/forgot-password',
];

export default function RootLayout() {
  const isAuth = false;
  const { pathname } = useLocation();

  if (isAuth && AuthRoutes.includes(pathname)) {
    return <Navigate to="/" replace />;
  }

  if (!isAuth && !AuthRoutes.includes(pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <React.Fragment>
      {!isAuth ? (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      ) : (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      )}
    </React.Fragment>
  );
}
