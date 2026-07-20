import { useResendOtp } from '@/features/auth/hooks/registration/use-resend-otp';
import { memo, useCallback, useEffect, useState, type RefObject } from 'react';
import { useFormContext } from 'react-hook-form';

interface ResendTimerProps {
  email?: string;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  resendCooldown?: number;
  otpLength?: number;
}

export default memo(function ResendTimer({
  email,
  inputRefs,
  resendCooldown = 60,
  otpLength = 6,
}: ResendTimerProps) {
  // Start countdown at resendCooldown (60 seconds) by default
  const [countdown, setCountdown] = useState(resendCooldown);
  const { setValue } = useFormContext();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const handleResend = useCallback(() => {
    if (countdown > 0 || isResending || !email) return;

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setCountdown(resendCooldown);
          setValue('code', Array(otpLength).fill(Number.NaN), {
            shouldValidate: true,
          });
          inputRefs.current?.[0]?.focus();
        },
      }
    );
  }, [
    countdown,
    email,
    inputRefs,
    isResending,
    otpLength,
    resendCooldown,
    resendOtp,
    setValue,
  ]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <p className="text-center text-sm text-gray-500">
      {countdown > 0 ? (
        <>You can request another code in: {countdown}s</>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-primary font-medium hover:underline cursor-pointer disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend Code'}
        </button>
      )}
    </p>
  );
});
