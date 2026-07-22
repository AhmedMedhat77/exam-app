import { AppProviders } from '@/app/providers';
import { ADMIN_ROUTES, AUTH_ROUTES, USER_ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import RootLayout from '@/shared/layouts/root-layout';
import { BrowserRouter, Route, Routes } from 'react-router';

export function App() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const routes = isAdmin ? ADMIN_ROUTES : USER_ROUTES;
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            {/* MAIN ROUTES */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}

            {/* AUTH ROUTES */}
            {AUTH_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
