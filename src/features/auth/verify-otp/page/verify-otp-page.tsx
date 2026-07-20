import { useSearchParams } from 'react-router';
import VerifyOtpForm from '../components/verify-otp-form';

export default function VerifyOtpPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';

  return (
    <>
      <VerifyOtpForm email={email} />
    </>
  );
}
