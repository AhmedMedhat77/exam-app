import { ROUTES } from '@/app/routes';
import Heading from '@/features/auth/shared/components/heading';
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
        className="hover:border-primary hover:text-primary flex size-9 items-center justify-center rounded-sm border border-gray-200 text-gray-700 transition-colors"
      >
        <ArrowLeft className="size-4" />
      </Link>

      <div className="space-y-3">
        <Heading>Password Reset Sent</Heading>
        <p className="text-sm leading-6 text-gray-600">
          We have sent a password reset link to{' '}
          <strong className="text-primary font-medium">{email}</strong>.
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
