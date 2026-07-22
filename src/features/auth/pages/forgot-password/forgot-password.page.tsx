import ForgotPasswordForm from '@/features/auth/components/forms/forgot-password/forgot-password-form';
import { useSearchParams } from 'react-router';

export default function ForgotPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-inter font-semibold text-gray-800">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500">
          Don&apos;t worry, we will help you recover your account.
        </p>
      </div>

      <ForgotPasswordForm email={email} />
    </div>
  );
}
