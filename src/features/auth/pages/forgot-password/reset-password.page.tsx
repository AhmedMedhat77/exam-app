import { ROUTES } from '@/app/routes';
import ResetPasswordForm from '@/features/auth/components/forms/forgot-password/reset-password-form';
import Heading from '@/features/auth/shared/components/heading';
import { Navigate, useSearchParams } from 'react-router';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="space-y-2">
        <Heading>Create a New Password</Heading>
        <p className="text-sm text-gray-500">
          Create a new strong password for your account.
        </p>
      </div>

      <ResetPasswordForm token={token} />
    </div>
  );
}
