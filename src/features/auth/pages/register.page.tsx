import SendEmailForm from '@/features/auth/components/form/send-email/send-email-form';
import StepCounter from '@/features/auth/components/shared/step-counter';
import { FORM_STEPS } from '@/features/auth/constants/form-steps';
import { useSearchParams } from 'react-router';

export default function CreateAccountPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <StepCounter currentStep={1} steps={FORM_STEPS} />
      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>
      <SendEmailForm email={email} />
    </div>
  );
}
