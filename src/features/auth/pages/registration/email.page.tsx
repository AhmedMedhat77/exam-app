import EmailForm from '@/features/auth/components/forms/registration/email/email-form';
import RegistrationStepper from '@/features/auth/components/shared/registration-stepper';
import { REGISTRATION_STEP_COUNT } from '@/features/auth/constants/registration.constants';
import { useSearchParams } from 'react-router';

export default function EmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <RegistrationStepper currentStep={1} steps={REGISTRATION_STEP_COUNT} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <EmailForm email={email} />
    </div>
  );
}
