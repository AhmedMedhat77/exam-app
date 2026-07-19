import { Button } from '@/shared/ui/button';
import { Link, useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react';
import { useResendOtp } from '../hooks/resend-otp';
import { useVerifyOtp } from '../hooks/verify-otp';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

interface VerifyOtpFormProps {
  email: string;
}

export default function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verifyOtp, isPending, error, isError } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow digits
      if (value && !/^\d$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!pastedData) return;

    const newOtp = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < Math.min(pastedData.length, OTP_LENGTH); i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or the next empty one
    const focusIndex = Math.min(pastedData.length, OTP_LENGTH) - 1;
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const otpCode = otp.join('');
  const isComplete = otpCode.length === OTP_LENGTH;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    verifyOtp(
      { email, code: otpCode },
      {
        onSuccess: () => {
          navigate({ to: '/login' });
        },
      }
    );
  };

  const handleResend = () => {
    if (countdown > 0 || isResending) return;

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setCountdown(RESEND_COOLDOWN);
          setOtp(Array(OTP_LENGTH).fill(''));
          inputRefs.current[0]?.focus();
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-[90%] gap-2">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-0 mb-6">
        {/* Step 1 — completed */}
        <div className="size-3 rounded-full bg-primary" />
        <div className="w-20 h-0.5 bg-primary" />
        {/* Step 2 — active */}
        <div className="size-3 rounded-full bg-primary" />
        <div className="w-20 h-0.5 bg-gray-300" />
        {/* Step 3 — upcoming */}
        <div className="size-3 rounded-full bg-gray-300" />
      </div>

      <h1 className="text-start text-2xl font-medium text-gray-800">
        Create Account
      </h1>

      <h2 className="text-primary font-medium text-lg">Verify OTP</h2>

      <p className="text-sm text-gray-500">
        Please enter the 6-digit code we have sent to:
        <br />
        <span className="text-gray-700">{email}</span>.{' '}
        <Link
          to="/create-account"
          className="text-primary font-medium hover:underline"
        >
          Edit
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
        {/* OTP Inputs */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-11 h-12 text-center text-lg font-medium border border-gray-300 rounded-md outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/20
                text-gray-800"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Resend Timer */}
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

        {/* Error */}
        {isError && (
          <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
            <span className="text-destructive">{error?.message}</span>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="min-h-12"
          disabled={!isComplete || isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Verify Code'}
        </Button>
      </form>
    </div>
  );
}
