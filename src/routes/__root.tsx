import DashboardLayout from '@/features/(App)/layout/dashboard-layout';
import AuthLayout from '@/features/(Auth)/layout/auth-layout';
import {
  Navigate,
  Outlet,
  createRootRoute,
  useLocation,
} from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

const AuthRoutes = ['/login', '/create-account', '/forgot-password'];

function RootComponent() {
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
