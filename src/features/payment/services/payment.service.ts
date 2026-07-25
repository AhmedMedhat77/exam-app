import type {
  Payment,
  PaymentFilters,
  PaymentSummary,
  PaymentsPage,
} from '@/features/payment/types/payment.d';
import {
  normalizePayment,
  normalizePaymentSummary,
} from '@/features/payment/utils/normalize-payment';
import { axiosInstance } from '@/shared/lib/axios';
import type { IPaginatedMetaData } from '@/shared/types/api';

const BASE_URL = '/api/payments';

function getPayload(value: unknown): unknown {
  if (!value || typeof value !== 'object') return value;
  const source = value as Record<string, unknown>;
  return source.payload ?? source.data ?? value;
}

export default class PaymentService {
  static async getPayments(filters: PaymentFilters): Promise<PaymentsPage> {
    const response = await axiosInstance.get(BASE_URL, { params: filters });
    const payload = getPayload(response.data) as Record<string, unknown>;
    const rawData = Array.isArray(payload)
      ? payload
      : Array.isArray(payload.data)
        ? payload.data
        : [];
    const metadata = (
      payload.metadata && typeof payload.metadata === 'object'
        ? payload.metadata
        : {}
    ) as Partial<IPaginatedMetaData>;

    return {
      data: rawData.map(normalizePayment),
      metadata: {
        page: metadata.page ?? filters.page ?? 1,
        limit: metadata.limit ?? filters.limit ?? 10,
        total: metadata.total ?? rawData.length,
        totalPages: metadata.totalPages ?? 1,
      },
    };
  }

  static async getSummary(filters: PaymentFilters): Promise<PaymentSummary> {
    const { page: _page, limit: _limit, ...summaryFilters } = filters;
    const response = await axiosInstance.get(`${BASE_URL}/summary`, {
      params: summaryFilters,
    });
    return normalizePaymentSummary(getPayload(response.data));
  }

  static async getPayment(paymentId: string): Promise<Payment> {
    const response = await axiosInstance.get(`${BASE_URL}/${paymentId}`);
    return normalizePayment(getPayload(response.data));
  }
}
