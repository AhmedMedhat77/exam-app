import { AppProviders } from '@/app/providers';
import { ADMIN_ROUTES, AUTH_ROUTES, ROUTES, USER_ROUTES } from '@/app/routes';
import UserProfileLayout from '@/features/profile/layout/profile-layout';
import UserChangePasswordPage from '@/features/profile/pages/change-password.page';
import UserProfilePage from '@/features/profile/pages/profile.page';
import { useUserStore } from '@/features/user/store/user.store';
import RootLayout from '@/shared/layouts/root-layout';
import NotFoundPage from '@/shared/pages/not-found.page';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

export function App() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  const routes = isAdmin ? ADMIN_ROUTES : USER_ROUTES;

  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            {/* ACCOUNT SETTINGS NESTED ROUTES */}
            <Route
              path={ROUTES.ACCOUNT_SETTINGS}
              element={<UserProfileLayout />}
            >
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route
                path="change-password"
                element={<UserChangePasswordPage />}
              />
            </Route>

            {/* OTHER MAIN ROUTES */}
            {routes.map((route) => {
              if (route.path === ROUTES.ACCOUNT_SETTINGS) return null;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              );
            })}

            {/* AUTH ROUTES */}
            {AUTH_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}

            {/* FALLBACK CATCH-ALL */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
