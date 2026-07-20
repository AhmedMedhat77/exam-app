import LoginPage from '@/features/auth/pages/login-page';
import CreateAccountPage from '@/features/auth/pages/send-email.page';
import UserInfoPage from '@/features/auth/pages/user-info.page';
import VerifyOtpPage from '@/features/auth/pages/verify-otp.page';
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
            <Route
              path={ROUTES.CREATE_ACCOUNT}
              element={<CreateAccountPage />}
            />
            <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtpPage />} />
            <Route path={ROUTES.USER_INFO} element={<UserInfoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
