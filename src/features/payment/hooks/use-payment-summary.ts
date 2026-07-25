import { PAYMENT_QUERY_KEYS } from '@/features/payment/constants/payment-keys';
import PaymentService from '@/features/payment/services/payment.service';
import type { PaymentFilters } from '@/features/payment/types/payment.d';
import { useQuery } from '@tanstack/react-query';

export function usePaymentSummary(filters: PaymentFilters) {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.summary(filters),
    queryFn: () => PaymentService.getSummary(filters),
  });
}
