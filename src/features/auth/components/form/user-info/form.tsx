import { ROUTES } from '@/app/routes';
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

  return <form></form>;
}
