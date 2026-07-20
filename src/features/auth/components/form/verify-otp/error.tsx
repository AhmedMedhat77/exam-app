import { useFormContext } from 'react-hook-form';

interface IErrorProps {
  error: Error | null;
  isError?: boolean;
}

export default function Error({ error, isError }: IErrorProps) {
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
      <div className="text-center bg-destructive/20 p-3 border-2 border-destructive">
        <span className="text-destructive">
          {codeError || error?.message || 'Something went wrong'}
        </span>
      </div>
    )
  );
}
