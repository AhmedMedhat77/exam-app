import { ROUTES } from '@/app/routes';
import VerifyOtpForm from '@/features/auth/components/form/verify-otp/verify-otp-form';
import StepCounter from '@/features/auth/components/shared/step-counter';
import { FORM_STEPS } from '@/features/auth/constants/form-steps';
import { Link, useSearchParams } from 'react-router';

export default function VerifyOtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      {/* Stepper */}
      <StepCounter currentStep={2} steps={FORM_STEPS} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <h2 className="text-primary font-medium text-lg">Verify OTP</h2>
      <p className="text-sm text-gray-500">
        Please enter the 6-digit code we have sent to:
        <br />
        <span className="text-gray-800">{email}</span>.{' '}
        <Link
          to={`${ROUTES.REGISTER}?email=${email}`}
          className="text-primary font-normal underline"
        >
          Edit
        </Link>
      </p>
      <VerifyOtpForm email={email} />
    </div>
  );
}
