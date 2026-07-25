import { useRequestEmailChange } from '@/features/profile/hooks/use-request-email-change';
import { Button } from '@/shared/ui/button';
import { Field, FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EnterEmailFormValues {
  email: string;
}

interface EditEmailStep1Props {
  initialEmail?: string;
  onNext: (email: string) => void;
}

export function EditEmailStep1({
  initialEmail = '',
  onNext,
}: EditEmailStep1Props) {
  const {
    mutate: requestEmailChange,
    isPending,
    error,
  } = useRequestEmailChange();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterEmailFormValues>({
    defaultValues: {
      email: initialEmail,
    },
  });

  const onSubmit = handleSubmit((data) => {
    requestEmailChange(
      { newEmail: data.email },
      {
        onSuccess: () => {
          onNext(data.email);
        },
      }
    );
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <p className="font-mono text-xs text-red-500">
          {(error as any)?.response?.data?.message ||
            'Failed to send verification code'}
        </p>
      )}

      <Field>
        <Label htmlFor="modal-email" className="font-mono text-sm">
          Email
        </Label>
        <Input
          id="modal-email"
          type="email"
          placeholder="user@example.com"
          {...register('email', {
            required: 'Please enter an email address',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email?.message && (
          <FieldError>{errors.email.message}</FieldError>
        )}
      </Field>

      <Button
        type="submit"
        size="xl"
        disabled={isPending}
        className="w-full justify-center gap-1 text-sm font-medium disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Next'} <ChevronRight className="size-4" />
      </Button>
    </form>
  );
}
