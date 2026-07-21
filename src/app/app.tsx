import { AppProviders } from '@/app/providers';
import { ADMIN_ROUTES, ROUTES, USER_ROUTES } from '@/app/routes';
import ForgotPasswordPage from '@/features/auth/pages/forgot-password/forgot-password.page';
import ResetLinkSentPage from '@/features/auth/pages/forgot-password/reset-link-sent.page';
import ResetPasswordPage from '@/features/auth/pages/forgot-password/reset-password.page';
import LoginPage from '@/features/auth/pages/login/login.page';
import EmailPage from '@/features/auth/pages/registration/email.page';
import PasswordPage from '@/features/auth/pages/registration/password.page';
import UserInfoPage from '@/features/auth/pages/registration/user-info.page';
import VerifyOtpPage from '@/features/auth/pages/registration/verify-otp.page';
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
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}

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
