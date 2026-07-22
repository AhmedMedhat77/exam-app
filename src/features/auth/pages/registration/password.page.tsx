import PasswordForm from '@/features/auth/components/forms/registration/password/password-form';
import RegistrationStepper from '@/features/auth/components/shared/registration-stepper';
import { REGISTRATION_STEP_COUNT } from '@/features/auth/constants/registration.constants';

export default function PasswordPage() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <RegistrationStepper currentStep={4} steps={REGISTRATION_STEP_COUNT} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <h2 className="text-primary text-lg font-bold">
        Create a strong password
      </h2>
      <PasswordForm />
    </div>
  );
}
