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
      className="border-input hover:border-primary focus:border-primary invalid:border-danger h-10 border px-4 py-1"
      flagComponent={Flag}
      onChange={onChange}
      inputComponent={InputComponent}
    />
  );
}

function InputComponent(props: DefaultInputComponentProps) {
  return (
    <input
      className="border-input hover:border-primary focus:border-primary invalid:border-danger h-10 border px-4 py-1"
      {...props}
    />
  );
}

function Flag({
  country,
  countryName,
  ...props
}: {
  country?: string;
  countryName?: string;
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
