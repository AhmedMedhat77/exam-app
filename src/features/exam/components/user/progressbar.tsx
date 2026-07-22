import { cn } from '@/shared/lib/utils';

interface IProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  className,
}: IProgressBarProps) {
  const percentage =
    totalSteps > 0
      ? Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100)
      : 0;

  return (
    <div
      className={cn(
        'bg-primary/10 relative h-3 w-full overflow-hidden',
        className
      )}
    >
      <div
        className="bg-primary h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
