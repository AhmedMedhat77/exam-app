import type { PaymentFilters } from '@/features/payment/types/payment.d';

export const PAYMENT_QUERY_KEYS = {
  all: ['payments'] as const,
  list: (filters: PaymentFilters) =>
    [...PAYMENT_QUERY_KEYS.all, 'list', filters] as const,
  summary: (filters: PaymentFilters) =>
    [...PAYMENT_QUERY_KEYS.all, 'summary', filters] as const,
  detail: (paymentId: string) =>
    [...PAYMENT_QUERY_KEYS.all, 'detail', paymentId] as const,
};
