import { cn } from '@/shared/lib/utils';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

function Input({ className, type, rightIcon, leftIcon, ...props }: InputProps) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="relative w-full">
      <InputPrimitive
        type={
          type === 'password' ? (passwordVisible ? 'text' : 'password') : type
        }
        data-slot="input"
        className={cn(
          'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring hover:border-ring disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 read-only:ring-none read-only:bg-input/50 dark:read-only:bg-input/80 h-10.5 min-h-12 w-full min-w-0 rounded-xs border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-mono read-only:pointer-events-none read-only:cursor-not-allowed read-only:opacity-50 focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 md:text-sm',
          className
        )}
        {...props}
      />
      {leftIcon && (
        <span className="absolute top-1/2 left-2 -translate-y-1/2">
          {leftIcon}
        </span>
      )}
      {rightIcon && (
        <span className="absolute top-1/2 right-2 -translate-y-1/2">
          {rightIcon}
        </span>
      )}
      {type === 'password' && (
        <button
          onClick={handlePasswordVisibility}
          disabled={props.disabled || props.readOnly}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-transparent text-gray-400 transition-colors duration-200 hover:text-gray-600 disabled:pointer-events-none disabled:opacity-50"
          type="button"
          aria-label={passwordVisible ? 'Hide password' : 'Show password'}
        >
          {passwordVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </button>
      )}
    </div>
  );
}

export { Input };
