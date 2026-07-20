import { ROUTES } from '@/app/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import type { z } from 'zod';
import StepCounter from '@/features/auth/components/shared/step-counter';
import { useVerifyOtp } from '@/features/auth/hooks/use-verify-otp';
import { verifyOtpSchema } from '@/features/auth/schemas/verify-otp.schema';
import Error from './error';
import OtpInputs from './otp-inputs';
import ResendTimer from './resend-timer';
import SubmitButton from './submit-button';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function VerifyOtpForm() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';

  // =============== MUTATION ===============
  const { mutate: verifyOtp, isPending, error, isError } = useVerifyOtp();
  // =============== ROUTE ===============
  const navigate = useNavigate();
  // =============== REFs ===============
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ================== FORM STATE ==================
  const form = useForm<
    z.input<typeof verifyOtpSchema>,
    any,
    z.output<typeof verifyOtpSchema>
  >({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      code: Array(OTP_LENGTH).fill(NaN),
    },
  });

  const { handleSubmit } = form;

  // ================== SUBMIT  ==================

  const onSubmit = handleSubmit((data) => {
    verifyOtp(data, {
      onSuccess: () => {
        navigate(ROUTES.LOGIN);
      },
    });
  });

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!email) navigate(ROUTES.CREATE_ACCOUNT);
  }, [email, navigate]);

  return (
    <div className="flex flex-col w-[90%] gap-2">
      {/* Stepper */}
      <StepCounter currentStep={2} steps={4} />

      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>

      <h2 className="text-primary font-medium text-lg">Verify OTP</h2>

      <p className="text-sm text-gray-500">
        Please enter the 6-digit code we have sent to:
        <br />
        <span className="text-gray-800">{email}</span>.{' '}
        <Link
          to={`${ROUTES.CREATE_ACCOUNT}?email=${email}`}
          className="text-primary font-normal underline"
        >
          Edit
        </Link>
      </p>

      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 mt-4">
          {/* OTP Inputs Component with useFieldArray */}
          <OtpInputs
            inputRefs={inputRefs}
            otpLength={OTP_LENGTH}
            OTP_LENGTH={OTP_LENGTH}
          />

          {/* Resend Timer Component */}
          <ResendTimer
            otpLength={OTP_LENGTH}
            resendCooldown={RESEND_COOLDOWN}
            email={email}
            inputRefs={inputRefs}
          />

          <Error error={error} isError={isError} />
          {/* Submit Button */}
          <SubmitButton isPending={isPending} otpLength={OTP_LENGTH} />
        </form>
      </FormProvider>
    </div>
  );
}
