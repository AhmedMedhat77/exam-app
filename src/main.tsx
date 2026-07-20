import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import RootLayout from './routes/root-layout';

// Pages
import LoginPage from '@/features/auth/login/page/login-page';
import CreateAccountPage from '@/features/auth/create-account/page/create-account-page';
import VerifyOtpPage from '@/features/auth/verify-otp/page/verify-otp-page';
import DashboardHome from './routes/dashboard-home';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            {/* App routes */}
            <Route index element={<DashboardHome />} />
            {/* Auth routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="create-account" element={<CreateAccountPage />} />
            <Route path="verify-otp" element={<VerifyOtpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
