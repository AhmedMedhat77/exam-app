import { AppProviders } from '@/app/providers';
import { ROUTES } from '@/app/routes';
import ForgotPasswordPage from '@/features/auth/pages/forgot-password/forgot-password.page';
import ResetLinkSentPage from '@/features/auth/pages/forgot-password/reset-link-sent.page';
import ResetPasswordPage from '@/features/auth/pages/forgot-password/reset-password.page';
import LoginPage from '@/features/auth/pages/login/login.page';
import EmailPage from '@/features/auth/pages/registration/email.page';
import PasswordPage from '@/features/auth/pages/registration/password.page';
import UserInfoPage from '@/features/auth/pages/registration/user-info.page';
import VerifyOtpPage from '@/features/auth/pages/registration/verify-otp.page';
import DashboardPage from '@/features/dashboard/pages/index.page';
import RootLayout from '@/shared/layouts/root-layout';
import { BrowserRouter, Route, Routes } from 'react-router';

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={ROUTES.DIPLOMAS} element={<DashboardPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={ROUTES.FORGOT_PASSWORD_SENT}
              element={<ResetLinkSentPage />}
            />
            <Route
              path={ROUTES.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />
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
