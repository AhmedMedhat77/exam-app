import { Input as InputPrimitive } from '@base-ui/react/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';

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
          'h-10.5 w-full min-w-0 rounded-xs min-h-12 border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-0 hover:border-ring  disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className
        )}
        {...props}
      />
      {leftIcon && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2">
          {leftIcon}
        </span>
      )}
      {rightIcon && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          {rightIcon}
        </span>
      )}
      {type === 'password' && (
        <button
          onClick={handlePasswordVisibility}
          disabled={props.disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 transition-colors duration-200 rounded-full bg-transparent text-gray-400 hover:text-gray-600 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
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
