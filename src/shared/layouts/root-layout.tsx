import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import AuthLayout from '@/shared/layouts/auth/auth-layout';
import DashboardLayout from '@/shared/layouts/dashboard/dashboard-layout';
import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

const AuthRoutes: string[] = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.REGISTER_VERIFY_OTP,
  ROUTES.REGISTER_USER_INFO,
  ROUTES.REGISTER_PASSWORD,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.FORGOT_PASSWORD_SENT,
  ROUTES.RESET_PASSWORD,
];

export default function RootLayout() {
  const token = useUserStore((state) => state.token);
  const isAuth = !!token;
  const { pathname } = useLocation();

  if (isAuth && AuthRoutes.includes(pathname)) {
    return <Navigate to={ROUTES.DIPLOMAS} replace />;
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
