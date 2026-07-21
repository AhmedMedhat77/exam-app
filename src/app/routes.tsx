import AuditLogsPage from '@/features/audit/pages/audit.page';
import AdminDiplomaPage from '@/features/diploma/pages/admin-diploma.page';
import UserDiplomaPage from '@/features/diploma/pages/user-diploma.page';
import UserSettingsPage from '@/features/user/pages/user-settings.page';
import { GraduationCap, Logs, UserRound } from 'lucide-react';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_VERIFY_OTP: '/register/verify-otp',
  REGISTER_USER_INFO: '/register/user-info',
  REGISTER_PASSWORD: '/register/password',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_SENT: '/forgot-password/sent',
  RESET_PASSWORD: '/reset-password',
  DIPLOMAS: '/',
  ACCOUNT_SETTINGS: '/account-settings',
  ACCOUNT_DETAIL: '/account/:id',
  LOGS: '/logs',
} as const;

export const USER_ROUTES = [
  {
    title: 'Diplomas',
    path: ROUTES.DIPLOMAS,
    icon: <GraduationCap />,
    element: UserDiplomaPage,
  },
  {
    title: 'Account Settings',
    path: ROUTES.ACCOUNT_SETTINGS,
    icon: <UserRound />,
    element: UserSettingsPage,
  },
];

// Todo: Will be Separate components For Admin
export const ADMIN_ROUTES = [
  {
    title: 'Diplomas',
    path: ROUTES.DIPLOMAS,
    icon: <GraduationCap />,
    element: AdminDiplomaPage,
  },
  {
    title: 'Account Settings',
    path: ROUTES.ACCOUNT_SETTINGS,
    icon: <UserRound />,
    element: UserSettingsPage,
  },
  {
    title: 'Audit Log',
    path: ROUTES.LOGS,
    icon: <Logs />,
    element: AuditLogsPage,
  },
];
