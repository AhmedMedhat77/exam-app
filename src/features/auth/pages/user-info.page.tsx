import StepCounter from '@/features/auth/components/shared/step-counter';
import UserInfoForm from '@/features/auth/components/form/user-info/user-info-form';
import { useSearchParams } from 'react-router';

export default function UserInfoPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <StepCounter currentStep={3} steps={4} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <h2 className="font-bold text-primary text-lg">Tell us more about you</h2>
      <UserInfoForm email={email} />
    </div>
  );
}
