import { cn } from '@/shared/lib/utils';
import { CircleX } from 'lucide-react';
import React from 'react';

export interface CustomErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | null;
  error?: any;
}

export function CustomError({
  message,
  error,
  className,
  children,
  ...props
}: CustomErrorProps) {
  const errorMessage =
    message ||
    (typeof error === 'string'
      ? error
      : error?.response?.data?.message || error?.message) ||
    children ||
    'Something went wrong';

  if (!error && !message && !children) {
    return null;
  }

  return (
    <div
      role="alert"
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-1 border border-red-300 bg-red-50/80 px-4 py-2.5 text-center text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400',
        className
      )}
      {...props}
    >
      <CircleX className="absolute -top-2.5 left-1/2 z-10 size-5 shrink-0 translate-x-1/2 bg-white text-red-500" />
      <span>{errorMessage}</span>
    </div>
  );
}

export default CustomError;
