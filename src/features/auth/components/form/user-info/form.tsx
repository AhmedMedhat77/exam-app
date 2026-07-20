import { ROUTES } from '@/app/routes';
import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/custom-input';
import CustomPhoneInput from '@/shared/ui/phone-input';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface IUserInfoFormProps {
  email?: string;
}

export default function UserInfoForm({ email }: IUserInfoFormProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate(ROUTES.CREATE_ACCOUNT);
  }, [email, navigate]);

  return (
    <form className="flex flex-col gap-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput label="First Name" placeholder="First Name" required />
        <CustomInput label="Last Name" placeholder="Last Name" required />
      </div>
      <CustomInput label="Username" placeholder="user123" required />
      <CustomPhoneInput
        international
        country="EG"
        defaultCountry="EG"
        label='Phone'
        onChange={(value?: string) => console.log(value)}
      />
      <Button variant="primary-foreground">Next</Button>
    </form>
  );
}
