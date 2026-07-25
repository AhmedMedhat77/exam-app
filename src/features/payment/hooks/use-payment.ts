import { PAYMENT_QUERY_KEYS } from '@/features/payment/constants/payment-keys';
import PaymentService from '@/features/payment/services/payment.service';
import { useQuery } from '@tanstack/react-query';

export function usePayment(paymentId: string) {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.detail(paymentId),
    queryFn: () => PaymentService.getPayment(paymentId),
    enabled: Boolean(paymentId),
  });
}
