import { useSearch } from '@tanstack/react-router';
import VerifyOtpForm from '../components/verify-otp-form';

export default function VerifyOtpPage() {
  const { email } = useSearch({ from: '/(Auth)/verify-otp/' });

  return (
    <>
      <VerifyOtpForm email={email} />
    </>
  );
}
