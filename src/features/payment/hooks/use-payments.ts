import { PAYMENT_QUERY_KEYS } from '@/features/payment/constants/payment-keys';
import PaymentService from '@/features/payment/services/payment.service';
import type { PaymentFilters } from '@/features/payment/types/payment.d';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function usePayments(filters: PaymentFilters) {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.list(filters),
    queryFn: () => PaymentService.getPayments(filters),
    placeholderData: keepPreviousData,
  });
}
