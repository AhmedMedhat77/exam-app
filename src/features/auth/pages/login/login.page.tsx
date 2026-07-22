import LoginForm from '@/features/auth/components/forms/login/login-form';
import Heading from '@/features/auth/shared/components/heading';

export default function LoginPage() {
  return (
    <section className="flex w-full flex-col gap-2">
      <Heading>Login</Heading>
      <LoginForm />
    </section>
  );
}
