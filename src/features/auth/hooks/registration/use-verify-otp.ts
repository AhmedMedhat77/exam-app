import { useMutation } from '@tanstack/react-query';
import type { VerifyOtpFormValues } from '@/features/auth/schemas/registration/verify-otp.schema';
import { VerifyOtpService } from '@/features/auth/services/registration/verify-otp.service';

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: VerifyOtpFormValues) =>
      VerifyOtpService.verifyOtpApi(data),
  });
}
