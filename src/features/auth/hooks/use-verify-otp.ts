import { useMutation } from '@tanstack/react-query';
import type { VerifyOtpInput } from '@/features/auth/schemas/verify-otp.schema';
import { VerifyOtpService } from '@/features/auth/services/verify-otp.service';

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: VerifyOtpInput) => VerifyOtpService.verifyOtp(data),
  });
}
