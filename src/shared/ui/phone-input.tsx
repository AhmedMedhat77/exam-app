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

function InputComponent(
  props: DefaultInputComponentProps & {
    country?: string;
    [key: string]: any;
  }
) {
  return (
    <input
      className="h-10 border px-4 py-1 border-input hover:border-primary focus:border-primary invalid:border-danger"
      {...props}
    />
  );
}

function Flag({ country, ...props }: { country?: string; [key: string]: any }) {
  return (
    <div className="" {...props}>
      <img
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
        alt=""
      />
    </div>
  );
}
