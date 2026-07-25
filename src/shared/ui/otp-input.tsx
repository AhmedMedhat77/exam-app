import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/shared/lib/utils';

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  error,
  className,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, digitValue: string) => {
    if (digitValue && !/^\d$/.test(digitValue)) return;

    const newOtp = [...value];
    newOtp[index] = digitValue;
    onChange(newOtp);

    if (digitValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!pastedData) return;

    const newOtp = Array(length).fill('');
    for (let i = 0; i < Math.min(pastedData.length, length); i++) {
      newOtp[i] = pastedData[i];
    }
    onChange(newOtp);

    const focusIndex = Math.min(pastedData.length, length) - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-center gap-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={`otp-digit-${index}`}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="focus:border-primary focus:ring-primary/20 h-11 w-10 rounded-md border border-gray-300 text-center text-base font-semibold text-gray-800 transition-all outline-none focus:ring-1"
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="text-center font-mono text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
