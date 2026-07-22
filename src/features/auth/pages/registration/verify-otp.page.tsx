import { ROUTES } from '@/app/routes';
import VerifyOtpForm from '@/features/auth/components/forms/registration/verify-otp/verify-otp-form';
import RegistrationStepper from '@/features/auth/components/shared/registration-stepper';
import { REGISTRATION_STEP_COUNT } from '@/features/auth/constants/registration.constants';
import { Link, useSearchParams } from 'react-router';

export default function VerifyOtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  return (
    <div className="flex w-full flex-col items-start gap-4">
      {/* Stepper */}
      <RegistrationStepper currentStep={2} steps={REGISTRATION_STEP_COUNT} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <h2 className="text-primary text-lg font-medium">Verify OTP</h2>
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
