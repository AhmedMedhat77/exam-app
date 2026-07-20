import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useResendOtp } from '../hooks/use-resend-otp';
import { useVerifyOtp } from '../hooks/use-verify-otp';
import { verifyOtpSchema } from '../schemas/verify-otp.schema';
import { ROUTES } from '@/app/routes';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

interface VerifyOtpFormProps {
  email: string;
}

export default function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<
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

  const code = watch('code') || [];

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
      if (value && !/^\d$/.test(value)) return;

      const currentCode = getValues('code') || [];
      const newCode = [...currentCode];
      newCode[index] = value ? Number(value) : NaN;
      setValue('code', newCode, { shouldValidate: true });

      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [getValues, setValue]
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      const currentCode = getValues('code') || [];
      if (
        e.key === 'Backspace' &&
        (currentCode[index] === undefined || isNaN(currentCode[index])) &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [getValues]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
      if (!pastedData) return;

      const newCode = Array(OTP_LENGTH).fill(NaN);
      for (let i = 0; i < Math.min(pastedData.length, OTP_LENGTH); i++) {
        newCode[i] = Number(pastedData[i]);
      }
      setValue('code', newCode, { shouldValidate: true });

      const focusIndex = Math.min(pastedData.length, OTP_LENGTH) - 1;
      inputRefs.current[focusIndex]?.focus();
    },
    [setValue]
  );

  const isComplete =
    code.length === OTP_LENGTH &&
    code.every((val) => typeof val === 'number' && !isNaN(val));

  const onSubmit = handleSubmit((data) => {
    verifyOtp(data, {
      onSuccess: () => {
        navigate(ROUTES.LOGIN);
      },
    });
  });

  const handleResend = () => {
    if (countdown > 0 || isResending) return;

    resendOtp(
      { email },
      {
        onSuccess: () => {
          setCountdown(RESEND_COOLDOWN);
          setValue('code', Array(OTP_LENGTH).fill(NaN), {
            shouldValidate: true,
          });
          inputRefs.current[0]?.focus();
        },
      }
    );
  };

  const codeError = errors.code
    ? errors.code.message || 'OTP must be 6 digits'
    : undefined;

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
          to={`${ROUTES.CREATE_ACCOUNT}?email=${email}`}
          className="text-primary font-medium hover:underline"
        >
          Edit
        </Link>
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-6 mt-4">
        {/* OTP Inputs */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const val = code[index];
            const displayVal =
              val === undefined || val === null || isNaN(val)
                ? ''
                : String(val);
            return (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={displayVal}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-11 h-12 text-center text-lg font-medium border border-gray-300 rounded-md outline-none transition-all
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  text-gray-800"
                aria-label={`Digit ${index + 1}`}
              />
            );
          })}
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
        {(isError || codeError) && (
          <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
            <span className="text-destructive">
              {codeError || error?.message}
            </span>
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
