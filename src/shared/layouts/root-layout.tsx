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

  const isAuthRoute = AuthRoutes.includes(pathname);

  // Redirect to login if not authenticated and accessing a protected route (e.g. /diplomas/123123)
  if (!isAuth && !isAuthRoute) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Redirect to home/diplomas if authenticated and accessing an auth route (e.g. /login)
  if (isAuth && isAuthRoute) {
    return <Navigate to={ROUTES.DIPLOMAS} replace />;
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
