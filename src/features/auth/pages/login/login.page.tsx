import LoginForm from '@/features/auth/components/forms/login/login-form';

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="mb-8 text-start text-2xl font-medium text-gray-800">
        Login
      </h1>

      <LoginForm />
    </div>
  );
}
