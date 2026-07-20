import 'react-phone-number-input/style.css';

import type { DefaultInputComponentProps } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input';

export default function CustomPhoneInput({
  onChange,
  ...props
}: DefaultInputComponentProps) {
  return (
    <PhoneInput
      {...props}
      className="h-10 border px-4 py-1 border-input hover:border-primary focus:border-primary invalid:border-danger"
      flagComponent={Flag}
      onChange={onChange}
      inputComponent={InputComponent}
    />
  );
}

function InputComponent({
  country,
  countryName,
  metadata,
  ...props
}: DefaultInputComponentProps & {
  country?: string;
  countryName?: string;
  metadata?: any;
  [key: string]: any;
}) {
  return (
    <input
      className="h-10 border px-4 py-1 border-input hover:border-primary focus:border-primary invalid:border-danger"
      {...props}
    />
  );
}

function Flag({
  country,
  countryName,
  flags,
  flagUrl,
  ...props
}: {
  country?: string;
  countryName?: string;
  flags?: any;
  flagUrl?: string;
  [key: string]: any;
}) {
  return (
    <div className="" {...props}>
      {country && (
        <img
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
          alt={countryName || ''}
        />
      )}
    </div>
  );
}
