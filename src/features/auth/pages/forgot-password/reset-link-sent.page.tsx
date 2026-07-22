import { ROUTES } from '@/app/routes';
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useSearchParams } from 'react-router';

export default function ResetLinkSentPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Link
        to={`${ROUTES.FORGOT_PASSWORD}?email=${encodeURIComponent(email)}`}
        aria-label="Back to forgot password"
        className="flex size-9 items-center justify-center rounded-sm border border-gray-200 text-gray-700 transition-colors hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="size-4" />
      </Link>

      <div className="space-y-3">
        <h1 className="text-2xl font-inter font-semibold text-gray-800">
          Password Reset Sent
        </h1>
        <p className="text-sm leading-6 text-gray-600">
          We have sent a password reset link to{' '}
          <strong className="font-medium text-primary">{email}</strong>.
        </p>
        <p className="text-sm leading-6 text-gray-600">
          Please check your inbox and follow the instructions to reset your
          password.
        </p>
        <p className="text-sm leading-6 text-gray-500">
          If you don&apos;t see the email within a few minutes, check your spam
          or junk folder.
        </p>
      </div>

      <p className="text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link className="text-primary" to={ROUTES.REGISTER}>
          Create yours
        </Link>
      </p>
    </div>
  );
}
