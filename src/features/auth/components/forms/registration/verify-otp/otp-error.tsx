import { useFormContext } from 'react-hook-form';

interface OtpErrorAlertProps {
  error: Error | null;
  isError?: boolean;
}

export default function OtpErrorAlert({ error, isError }: OtpErrorAlertProps) {
  const {
    formState: { errors, isSubmitted },
  } = useFormContext();

  const rawMessage = errors.code?.message;

  const codeError =
    errors.code && isSubmitted
      ? typeof rawMessage === 'string'
        ? rawMessage
        : 'OTP must be 6 digits'
      : undefined;

  return (
    (isError || codeError) && (
      <div className="bg-destructive/20 border-destructive border-2 p-3 text-center">
        <span className="text-destructive">
          {codeError || error?.message || 'Something went wrong'}
        </span>
      </div>
    )
  );
}
