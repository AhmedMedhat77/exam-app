import { ROUTES } from '@/app/routes';
import ResetPasswordForm from '@/features/auth/components/forms/forgot-password/reset-password-form';
import { Navigate, useSearchParams } from 'react-router';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create a New Password
        </h1>
        <p className="text-sm text-gray-500">
          Create a new strong password for your account.
        </p>
      </div>

      <ResetPasswordForm email={email} token={token} />
    </div>
  );
}
