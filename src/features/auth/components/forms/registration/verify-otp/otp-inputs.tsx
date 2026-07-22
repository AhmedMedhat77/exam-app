import {
  memo,
  useCallback,
  useMemo,
  type ClipboardEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface IOtpInputsProps {
  otpLength: number;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  OTP_LENGTH: number;
}

interface IOtpDigitInputProps {
  index: number;
  onSetRef: (index: number, el: HTMLInputElement | null) => void;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
}

const OtpDigitInput = memo(function OtpDigitInput({
  index,
  onSetRef,
  onChange,
  onKeyDown,
  onPaste,
}: IOtpDigitInputProps) {
  const { control } = useFormContext();
  const val = useWatch({
    control,
    name: `code.${index}`,
  });

  const displayVal =
    val === undefined || val === null || Number.isNaN(val) ? '' : String(val);

  const handleRef = useCallback(
    (el: HTMLInputElement | null) => {
      onSetRef(index, el);
    },
    [index, onSetRef]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index, e.target.value);
    },
    [index, onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown(index, e);
    },
    [index, onKeyDown]
  );

  return (
    <input
      ref={handleRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={displayVal}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={index === 0 ? onPaste : undefined}
      className="focus:border-primary focus:ring-primary/20 h-12 w-11 rounded-md border border-gray-300 text-center text-lg font-medium text-gray-800 transition-all outline-none focus:ring-1"
      aria-label={`Digit ${index + 1}`}
    />
  );
});

export default function OtpInputs({
  otpLength,
  inputRefs,
  OTP_LENGTH,
}: IOtpInputsProps) {
  const { setValue, getValues } = useFormContext();

  // Create an array of digit indices based on otpLength
  const digits = useMemo(
    () => Array.from({ length: otpLength }, (_, i) => i),
    [otpLength]
  );

  const handleSetRef = useCallback(
    (index: number, el: HTMLInputElement | null) => {
      const refs = inputRefs.current;
      if (refs) {
        Reflect.set(refs, index, el);
      }
    },
    [inputRefs]
  );

  // ======================== HANDLERS ========================
  const handleChange = useCallback(
    (index: number, value: string) => {
      if (value && !/^\d$/.test(value)) return;

      const currentCode = getValues('code') || [];
      const newCode = [...currentCode];
      newCode[index] = value ? Number(value) : NaN;
      setValue('code', newCode, { shouldValidate: true });

      const refs = inputRefs.current;
      if (value && index < OTP_LENGTH - 1 && refs) {
        refs[index + 1]?.focus();
      }
    },
    [getValues, setValue, OTP_LENGTH, inputRefs]
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      const currentCode = getValues('code') || [];
      const refs = inputRefs.current;
      if (
        e.key === 'Backspace' &&
        (currentCode[index] === undefined || isNaN(currentCode[index])) &&
        index > 0 &&
        refs
      ) {
        refs[index - 1]?.focus();
      }
    },
    [getValues, inputRefs]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
      if (!pastedData) return;

      const newCode = Array(OTP_LENGTH).fill(NaN);
      for (let i = 0; i < Math.min(pastedData.length, OTP_LENGTH); i++) {
        newCode[i] = Number(pastedData[i]);
      }
      setValue('code', newCode, { shouldValidate: true });

      const focusIndex = Math.min(pastedData.length, OTP_LENGTH) - 1;
      const refs = inputRefs.current;
      if (refs) {
        refs[focusIndex]?.focus();
      }
    },
    [setValue, OTP_LENGTH, inputRefs]
  );

  return (
    <div className="flex items-center justify-center gap-2">
      {digits.map((index) => (
        <OtpDigitInput
          key={`otp-digit-${index}`}
          index={index}
          onSetRef={handleSetRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
