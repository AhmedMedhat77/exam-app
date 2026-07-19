import { Button } from '@/shared/ui/button';
import CustomInput from '@/shared/ui/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { type LoginInput, loginSchema } from '../validation/login.schema';
export default function LoginForm() {
  const {
    register,
    formState: { errors, isValid, isSubmitted, isSubmitting },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-4 w-[90%] mx-auto" onSubmit={onSubmit}>
      <CustomInput
        label="Username"
        placeholder="User 123"
        {...register('username')}
        error={errors.username?.message}
      />
      <CustomInput
        label="Password"
        type="password"
        placeholder="Password"
        {...register('password')}
        error={errors.password?.message}
      />

      {/* Forget Password Link */}
      <Link to="/" className="text-blue-500 text-sm text-end">
        Forgot your password?
      </Link>

      <Button
        type="submit"
        disabled={(isSubmitted && !isValid) || isSubmitting}
      >
        Login
      </Button>

      {/* Sign Up Link */}
      <span className="text-gray-500 text-center text-sm">
        Don't have an account?{' '}
        <span className="text-blue-500 cursor-pointer">
          <Link to="/">Sign Up</Link>
        </span>
      </span>
    </form>
  );
}
