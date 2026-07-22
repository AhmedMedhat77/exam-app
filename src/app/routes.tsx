import AuditLogsPage from '@/features/audit/pages/audit.page';
import AdminDiplomaPage from '@/features/diploma/pages/admin-diploma.page';
import UserDiplomaPage from '@/features/diploma/pages/user-diploma.page';
import UserExamDetailPage from '@/features/exam/pages/user/user-exam-detail.page';
import ExamsPage from '@/features/exam/pages/user/user-exams.page';
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
  // Exams
  EXAMS: '/exams',
  EXAM_DETAIL: '/exams/:id',
  LOGS: '/logs',
} as const;

type route = {
  title: string;
  path: (typeof ROUTES)[keyof typeof ROUTES];
  icon?: React.ReactNode;
  element: React.ComponentType;
  hidden?: boolean;
};

export const USER_ROUTES: route[] = [
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
  {
    title: 'Exams',
    path: ROUTES.EXAMS,
    element: ExamsPage,
    hidden: true,
  },
  {
    title: 'Exam Detail',
    path: ROUTES.EXAM_DETAIL,
    element: UserExamDetailPage,
    hidden: true,
  },
];

export const ADMIN_ROUTES: route[] = [
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
