import type { IPaginatedMetaData, IPaginatedParams } from '@/shared/types/api';

export type PaymentStatus =
  | 'paid'
  | 'pending'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

export interface PaymentCustomer {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface PaymentItem {
  id?: string;
  name: string;
  type?: string;
}

export interface PaymentEvent {
  id?: string;
  type: string;
  occurredAt: string;
  description?: string;
}

export interface Payment {
  id: string;
  amount: number;
  refundedAmount: number;
  feeAmount: number;
  netAmount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  paidAt?: string;
  paymentMethod?: string;
  provider?: string;
  transactionReference?: string;
  providerReference?: string;
  failureReason?: string;
  refundReason?: string;
  customer: PaymentCustomer;
  item?: PaymentItem;
  events: PaymentEvent[];
}

export interface PaymentSummary {
  grossCollected: number;
  refundedAmount: number;
  netCollected: number;
  successfulPayments: number;
  totalPayments: number;
  averagePayment: number;
  successRate: number;
  refundRate: number;
  percentageChange?: number;
  currency: string;
  trend: PaymentTrendPoint[];
  statusBreakdown: PaymentBreakdown[];
  methodBreakdown: PaymentBreakdown[];
  productBreakdown: PaymentBreakdown[];
}

export interface PaymentTrendPoint {
  label: string;
  amount: number;
}

export interface PaymentBreakdown {
  label: string;
  amount: number;
  count?: number;
}

export interface PaymentFilters extends IPaginatedParams {
  dateFrom?: string;
  dateTo?: string;
  status?: PaymentStatus | '';
  method?: string;
  productId?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaymentsPage {
  data: Payment[];
  metadata: IPaginatedMetaData;
}
