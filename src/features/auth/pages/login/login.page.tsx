import LoginForm from '@/features/auth/components/forms/login/login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-start text-2xl mb-8 font-medium text-gray-800">
        Login
      </h1>

      <LoginForm />
    </div>
  );
}
