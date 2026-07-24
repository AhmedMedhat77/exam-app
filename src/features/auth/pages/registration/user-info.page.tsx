import UserInfoForm from '@/features/auth/components/forms/registration/user-info/user-info-form';
import RegistrationStepper from '@/features/auth/components/shared/registration-stepper';
import { REGISTRATION_STEP_COUNT } from '@/features/auth/constants/registration.constants';
import { useSearchParams } from 'react-router';

export default function UserInfoPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <RegistrationStepper currentStep={3} steps={REGISTRATION_STEP_COUNT} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <h2 className="text-primary text-lg font-bold">Tell us more about you</h2>
      <UserInfoForm email={email} />
    </div>
  );
}
