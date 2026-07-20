import { BrowserRouter, Route, Routes } from 'react-router';
import { AppProviders } from './providers';
import { ROUTES } from './routes';
import RootLayout from './layouts/root-layout';
import DashboardHomePage from './pages/dashboard-home-page';
import LoginPage from '@/features/auth/pages/login-page';
import CreateAccountPage from '@/features/auth/pages/create-account-page';
import VerifyOtpPage from '@/features/auth/pages/verify-otp-page';

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={ROUTES.HOME} element={<DashboardHomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.CREATE_ACCOUNT}
              element={<CreateAccountPage />}
            />
            <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
