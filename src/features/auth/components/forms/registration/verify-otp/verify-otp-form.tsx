import { ROUTES } from '@/app/routes';
import { useVerifyOtp } from '@/features/auth/hooks/registration/use-verify-otp';
import { verifyOtpSchema } from '@/features/auth/schemas/registration/verify-otp.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { z } from 'zod';
import Error from './otp-error';
import OtpInputs from './otp-inputs';
import ResendTimer from './otp-resend-timer';
import SubmitButton from './otp-submit-button';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

interface VerifyOtpFormProps {
  email?: string;
}
export default function VerifyOtpForm({ email }: VerifyOtpFormProps) {
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
        navigate(
          `${ROUTES.REGISTER_USER_INFO}?email=${encodeURIComponent(email || '')}`
        );
      },
    });
  });

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (!email) navigate(ROUTES.REGISTER);
  }, [email, navigate]);

  return (
    <div className="flex w-[90%] flex-col gap-2">
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-6">
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
