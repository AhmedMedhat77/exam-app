import { Button } from '@/shared/ui/button';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface ISubmitButtonProps {
  isPending: boolean;
  otpLength: number;
}

export default memo(function SubmitButton({
  isPending,
  otpLength,
}: ISubmitButtonProps) {
  const { control } = useFormContext();

  const code =
    useWatch({
      control,
      name: 'code',
      defaultValue: Array(otpLength).fill(''),
    }) || [];

  const isComplete =
    code.length === otpLength &&
    code.every((val: unknown) => typeof val === 'number' && !isNaN(val));

  return (
    <Button
      type="submit"
      className="min-h-12"
      disabled={!isComplete || isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : 'Verify Code'}
    </Button>
  );
});
