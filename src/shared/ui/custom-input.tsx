import { useId, type InputHTMLAttributes } from 'react';
import { Field, FieldLabel } from './field';
import { Input } from './input';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function CustomInput({ label, error, ...props }: CustomInputProps) {
  const id = useId();
  const hasId = !!props.id;

  const _props = {
    ...props,
    id: hasId ? props.id : id,
  };

  return (
    <Field className="flex flex-col gap-0.5">
      {label && (
        <FieldLabel className="text-md text-gray-800" htmlFor={_props.id}>
          {label}
          {props.required && (
            <span className="text-danger ml-1 text-xs">*</span>
          )}
        </FieldLabel>
      )}
      <Input {..._props} aria-invalid={!!error} />
      {error && <span className="text-danger text-xs">{error}</span>}
    </Field>
  );
}

export default CustomInput;
