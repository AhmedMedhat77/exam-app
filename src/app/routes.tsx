import AuditLogsPage from '@/features/audit/pages/audit.page';
import ForgotPasswordPage from '@/features/auth/pages/forgot-password/forgot-password.page';
import ResetLinkSentPage from '@/features/auth/pages/forgot-password/reset-link-sent.page';
import ResetPasswordPage from '@/features/auth/pages/forgot-password/reset-password.page';
import LoginPage from '@/features/auth/pages/login/login.page';
import EmailPage from '@/features/auth/pages/registration/email.page';
import PasswordPage from '@/features/auth/pages/registration/password.page';
import UserInfoPage from '@/features/auth/pages/registration/user-info.page';
import VerifyOtpPage from '@/features/auth/pages/registration/verify-otp.page';
import AdminDiplomaDetailsPage from '@/features/diploma/pages/admin-diploma-details.page';
import AdminDiplomaFormPage from '@/features/diploma/pages/admin-diploma-form.page';
import AdminDiplomaListPage from '@/features/diploma/pages/admin-diploma-list.page';
import UserDiplomaListPage from '@/features/diploma/pages/user-diploma-list.page';
import AdminExamDetailsPage from '@/features/exam/pages/admin/admin-exam-details.page';
import AdminExamFormPage from '@/features/exam/pages/admin/admin-exam-form.page';
import AdminExamListPage from '@/features/exam/pages/admin/admin-exam-list.page';
import UserExamDetailsPage from '@/features/exam/pages/user/user-exam-details.page';
import UserExamListPage from '@/features/exam/pages/user/user-exam-list.page';
import UserProfileLayout from '@/features/profile/layout/profile-layout';
import AdminQuestionDetailsPage from '@/features/question/pages/admin/admin-question-details.page';
import AdminQuestionFormPage from '@/features/question/pages/admin/admin-question-form.page';
import UserSubmissionResultPage from '@/features/submission/pages/user-submission-result.page';
import { BookOpenCheck, GraduationCap, Logs, UserRound } from 'lucide-react';

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
  EXAM_CREATE: '/exams/manage',
  EXAM_MANAGE: '/exams/:id?/manage',
  EXAM_RESULT: '/submissions/:id',
  LOGS: '/logs',
  PAYMENTS: '/payments',
  PAYMENT_DETAIL: '/payments/:paymentId',

  DIPLOMA_CREATE: '/diplomas/manage',
  DIPLOMA_MANAGE: '/diplomas/:id?/manage',

  // Questions
  QUESTIONS: '/questions',
  QUESTION_DETAIL: '/questions/:id',
  QUESTION_CREATE: '/questions/manage',
  QUESTION_MANAGE: '/questions/:id?/manage',
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
    element: UserDiplomaListPage,
  },
  {
    title: 'Diploma Detail',
    path: ROUTES.DIPLOMA_DETAIL,
    element: AdminDiplomaDetailsPage,
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
    element: UserExamListPage,
    hidden: true,
  },
  {
    title: 'Exam Detail',
    path: ROUTES.EXAM_DETAIL,
    element: UserExamDetailsPage,
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
    element: AdminDiplomaListPage,
  },
  {
    title: 'Diploma Detail',
    path: ROUTES.DIPLOMA_DETAIL,
    element: AdminDiplomaDetailsPage,
    hidden: true,
  },
  {
    title: 'Diploma Manage',
    path: ROUTES.DIPLOMA_MANAGE,
    element: AdminDiplomaFormPage,
    hidden: true,
  },

  {
    title: 'Exams',
    path: ROUTES.EXAMS,
    icon: <BookOpenCheck />,
    element: AdminExamListPage,
  },
  {
    title: 'Exam Detail',
    path: ROUTES.EXAM_DETAIL,
    element: AdminExamDetailsPage,
    hidden: true,
  },
  {
    title: 'Exam Manage',
    path: ROUTES.EXAM_MANAGE,
    element: AdminExamFormPage,
    hidden: true,
  },

  {
    title: 'Question Detail',
    path: ROUTES.QUESTION_DETAIL,
    element: AdminQuestionDetailsPage,
    hidden: true,
  },
  {
    title: 'Question Manage',
    path: ROUTES.QUESTION_MANAGE,
    element: AdminQuestionFormPage,
    hidden: true,
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

export const ALL_ROUTES: route[] = [
  ...ADMIN_ROUTES,
  ...USER_ROUTES.filter(
    (ur) => !ADMIN_ROUTES.some((ar) => ar.path === ur.path)
  ),
];
