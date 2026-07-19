import { useMutation } from '@tanstack/react-query';
import { VerifyOtpService } from '../services/verify-otp.service';
import type { VerifyOtpInput } from '../types/verify-otp.types';

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: VerifyOtpInput) => VerifyOtpService.verifyOtp(data),
  });
}
