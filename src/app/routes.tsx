import AuditLogsPage from '@/features/audit/pages/audit.page';
import ForgotPasswordPage from '@/features/auth/pages/forgot-password/forgot-password.page';
import ResetLinkSentPage from '@/features/auth/pages/forgot-password/reset-link-sent.page';
import ResetPasswordPage from '@/features/auth/pages/forgot-password/reset-password.page';
import LoginPage from '@/features/auth/pages/login/login.page';
import EmailPage from '@/features/auth/pages/registration/email.page';
import PasswordPage from '@/features/auth/pages/registration/password.page';
import UserInfoPage from '@/features/auth/pages/registration/user-info.page';
import VerifyOtpPage from '@/features/auth/pages/registration/verify-otp.page';
import AdminDiplomaDetailPage from '@/features/diploma/pages/admin-diploma-detail.page';
import AdminDiplomaPage from '@/features/diploma/pages/admin-diploma.page';
import UserDiplomaPage from '@/features/diploma/pages/user-diploma.page';
import UserExamDetailPage from '@/features/exam/pages/user/user-exam-detail.page';
import ExamsPage from '@/features/exam/pages/user/user-exams.page';
import UserSubmissionResultPage from '@/features/submission/pages/user-submission-result.page';

import AdminExamsPage from '@/features/exam/pages/admin/admin-exams.page';
import UserProfileLayout from '@/features/profile/layout/profile-layout';
import { BookOpenCheck, GraduationCap, Logs, UserRound } from 'lucide-react';
import AdminDiplomaManagePage from '@/features/diploma/pages/admin-diploma-manage.page';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_VERIFY_OTP: '/register/verify-otp',
  REGISTER_USER_INFO: '/register/user-info',
  REGISTER_PASSWORD: '/register/password',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_SENT: '/forgot-password/sent',
  RESET_PASSWORD: '/reset-password',
  HOME: '/',
  DIPLOMAS: '/',
  DIPLOMA_DETAIL: '/diplomas/:id',
  ACCOUNT_SETTINGS: '/account-settings',
  ACCOUNT_DETAIL: '/account/:id',
  // Exams
  EXAMS: '/exams',
  EXAM_DETAIL: '/exams/:id',
  EXAM_RESULT: '/submissions/:id',
  LOGS: '/logs',
  PAYMENTS: '/payments',
  PAYMENT_DETAIL: '/payments/:paymentId',
  
  DIPLOMA_MANAGE: '/diplomas/:id/manage',
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
    title: 'Diploma Detail',
    path: ROUTES.DIPLOMA_DETAIL,
    element: AdminDiplomaDetailPage,
    hidden: true,
  },
  {
    title: 'Account Settings',
    path: ROUTES.ACCOUNT_SETTINGS,
    icon: <UserRound />,
    element: UserProfileLayout,
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
  {
    title: 'Exam Result',
    path: ROUTES.EXAM_RESULT,
    element: UserSubmissionResultPage,
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
    title: 'Diploma Detail',
    path: ROUTES.DIPLOMA_DETAIL,
    element: AdminDiplomaDetailPage,
    hidden: true,
  },
  {
    title: 'Diploma Manage',
    path: ROUTES.DIPLOMA_MANAGE,
    element: AdminDiplomaManagePage,
    hidden: true,
  },

  {
    title: 'Exams',
    path: ROUTES.EXAMS,
    icon: <BookOpenCheck />,
    element: AdminExamsPage,
  },

  {
    title: 'Account Settings',
    path: ROUTES.ACCOUNT_SETTINGS,
    icon: <UserRound />,
    element: UserProfileLayout,
  },
  {
    title: 'Audit Log',
    path: ROUTES.LOGS,
    icon: <Logs />,
    element: AuditLogsPage,
  },
];

export const AUTH_ROUTES: route[] = [
  {
    title: 'Login',
    path: ROUTES.LOGIN,
    element: LoginPage,
  },
  {
    title: 'Register',
    path: ROUTES.REGISTER,
    element: EmailPage,
  },
  {
    title: 'Register Verify OTP',
    path: ROUTES.REGISTER_VERIFY_OTP,
    element: VerifyOtpPage,
  },
  {
    title: 'Register User Info',
    path: ROUTES.REGISTER_USER_INFO,
    element: UserInfoPage,
  },
  {
    title: 'Register Password',
    path: ROUTES.REGISTER_PASSWORD,
    element: PasswordPage,
  },
  {
    title: 'Forgot Password',
    path: ROUTES.FORGOT_PASSWORD,
    element: ForgotPasswordPage,
  },
  {
    title: 'Forgot Password Sent',
    path: ROUTES.FORGOT_PASSWORD_SENT,
    element: ResetLinkSentPage,
  },
  {
    title: 'Reset Password',
    path: ROUTES.RESET_PASSWORD,
    element: ResetPasswordPage,
  },
];
