import { useConfirmEmailChange } from '@/features/profile/hooks/use-confirm-email-change';
import { useRequestEmailChange } from '@/features/profile/hooks/use-request-email-change';
import { Button } from '@/shared/ui/button';
import { OtpInput } from '@/shared/ui/otp-input';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface VerifyOtpFormValues {
  otp: string[];
}

interface EditEmailStep2Props {
  email: string;
  onEditEmail: () => void;
  onVerify: () => void;
  otpLength?: number;
}

export function EditEmailStep2({
  email,
  onEditEmail,
  onVerify,
  otpLength = 6,
}: EditEmailStep2Props) {
  const [timer, setTimer] = useState(50);
  const {
    mutate: confirmEmailChange,
    isPending,
    error: confirmError,
  } = useConfirmEmailChange();
  const { mutate: requestEmailChange } = useRequestEmailChange();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    defaultValues: {
      otp: Array(otpLength).fill(''),
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendCode = () => {
    requestEmailChange({ newEmail: email });
    setTimer(50);
    setValue('otp', Array(otpLength).fill(''));
    clearErrors('otp');
  };

  const onSubmit = handleSubmit((data) => {
    const code = data.otp.join('');
    if (code.length < otpLength) {
      setError('otp', {
        type: 'manual',
        message: 'Please enter the full 6-digit code',
      });
      return;
    }
    confirmEmailChange(
      { code },
      {
        onSuccess: () => {
          onVerify();
        },
      }
    );
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h3 className="text-primary font-mono text-sm font-semibold">
          Verify OTP
        </h3>
        <p className="text-muted-foreground mt-1 font-mono text-xs leading-relaxed">
          Please enter the 6-digits code we have sent to:{' '}
          <span className="text-foreground font-medium">
            {email || 'user@example.com'}
          </span>
          .{' '}
          <button
            type="button"
            onClick={onEditEmail}
            className="text-primary cursor-pointer font-medium underline hover:opacity-80"
          >
            Edit
          </button>
        </p>
      </div>

      {confirmError && (
        <p className="text-center font-mono text-xs text-red-500">
          {(confirmError as any)?.response?.data?.message ||
            'Verification failed. Please try again.'}
        </p>
      )}

      <div className="pt-2">
        <Controller
          name="otp"
          control={control}
          render={({ field: { value, onChange } }) => (
            <OtpInput
              length={otpLength}
              value={value}
              onChange={(newVal) => {
                onChange(newVal);
                if (errors.otp) clearErrors('otp');
              }}
              error={errors.otp?.message}
            />
          )}
        />
      </div>

      <p className="text-muted-foreground text-center font-mono text-xs">
        {timer > 0 ? (
          <>
            You can request another code in:{' '}
            <span className="text-foreground font-medium">{timer}s</span>
          </>
        ) : (
          <button
            type="button"
            onClick={handleResendCode}
            className="text-primary cursor-pointer font-medium underline hover:opacity-80"
          >
            Resend code
          </button>
        )}
      </p>

      <Button
        type="submit"
        size="xl"
        disabled={isPending}
        className="w-full justify-center text-sm font-medium disabled:opacity-50"
      >
        {isPending ? 'Verifying...' : 'Verify Code'}
      </Button>
    </form>
  );
}
