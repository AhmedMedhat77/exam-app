import PasswordForm from '@/features/auth/components/forms/registration/password/password-form';
import { REGISTRATION_STEP_COUNT } from '@/features/auth/constants/registration.constants';
import FormStepper from '@/shared/ui/form-stepper';

export default function PasswordPage() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <FormStepper currentStep={4} steps={REGISTRATION_STEP_COUNT} />
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
