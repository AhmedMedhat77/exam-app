import AuthLayout from './auth-layout';
import DashboardLayout from './dashboard-layout';
import { ROUTES } from '../routes';
import { Navigate, Outlet, useLocation } from 'react-router';
import * as React from 'react';

const AuthRoutes: string[] = [
  ROUTES.LOGIN,
  ROUTES.CREATE_ACCOUNT,
  ROUTES.VERIFY_OTP,
  ROUTES.FORGOT_PASSWORD,
];

export default function RootLayout() {
  const isAuth = false;
  const { pathname } = useLocation();

  if (isAuth && AuthRoutes.includes(pathname)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (!isAuth && !AuthRoutes.includes(pathname)) {
    return <Navigate to={ROUTES.LOGIN} replace />;
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
