import LoginPage from '@/features/auth/pages/login.page';
import EmailPage from '@/features/auth/pages/registration/email.page';
import VerifyOtpPage from '@/features/auth/pages/registration/verify-otp.page';
import UserInfoPage from '@/features/auth/pages/registration/user-info.page';
import PasswordPage from '@/features/auth/pages/registration/password.page';
import { BrowserRouter, Route, Routes } from 'react-router';
import RootLayout from '@/app/layouts/root-layout';
import DashboardHomePage from '@/app/pages/dashboard-home-page';
import { AppProviders } from '@/app/providers';
import { ROUTES } from '@/app/routes';

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={ROUTES.HOME} element={<DashboardHomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<EmailPage />} />
            <Route
              path={ROUTES.REGISTER_VERIFY_OTP}
              element={<VerifyOtpPage />}
            />
            <Route
              path={ROUTES.REGISTER_USER_INFO}
              element={<UserInfoPage />}
            />
            <Route path={ROUTES.REGISTER_PASSWORD} element={<PasswordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
