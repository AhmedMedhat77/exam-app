import type {
  Payment,
  PaymentBreakdown,
  PaymentEvent,
  PaymentStatus,
  PaymentSummary,
  PaymentTrendPoint,
} from '@/features/payment/types/payment.d';

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord {
  return value && typeof value === 'object' ? (value as UnknownRecord) : {};
}

function text(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function number(value: unknown, fallback = 0) {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed)
    ? Math.round(parsed)
    : fallback;
}

function array(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function normalizeStatus(value: unknown): PaymentStatus {
  const status = text(value).toLowerCase().replaceAll('-', '_');
  const allowed: PaymentStatus[] = [
    'paid',
    'pending',
    'failed',
    'cancelled',
    'refunded',
    'partially_refunded',
  ];
  return allowed.includes(status as PaymentStatus)
    ? (status as PaymentStatus)
    : 'pending';
}

function normalizeEvent(value: unknown): PaymentEvent {
  const source = record(value);
  return {
    id: text(source.id) || undefined,
    type: text(source.type ?? source.status, 'Updated'),
    occurredAt: text(source.occurredAt ?? source.createdAt ?? source.timestamp),
    description: text(source.description ?? source.reason) || undefined,
  };
}

export function normalizePayment(value: unknown): Payment {
  const source = record(value);
  const customer = record(source.customer ?? source.user);
  const item = record(source.item ?? source.product ?? source.diploma);
  const amount = number(source.amount ?? source.grossAmount);
  const refundedAmount = number(source.refundedAmount ?? source.refundAmount);
  const feeAmount = number(source.feeAmount ?? source.fees);

  return {
    id: text(source.id ?? source._id),
    amount,
    refundedAmount,
    feeAmount,
    netAmount: number(
      source.netAmount,
      Math.max(0, amount - refundedAmount - feeAmount)
    ),
    currency: text(source.currency, 'SAR').toUpperCase(),
    status: normalizeStatus(source.status),
    createdAt: text(source.createdAt),
    paidAt: text(source.paidAt ?? source.completedAt) || undefined,
    paymentMethod: text(source.paymentMethod ?? source.method) || undefined,
    provider: text(source.provider) || undefined,
    transactionReference:
      text(
        source.transactionReference ?? source.transactionId ?? source.reference
      ) || undefined,
    providerReference:
      text(source.providerReference ?? source.providerId) || undefined,
    failureReason: text(source.failureReason) || undefined,
    refundReason: text(source.refundReason) || undefined,
    customer: {
      id: text(customer.id ?? customer._id) || undefined,
      name:
        text(customer.name) ||
        [text(customer.firstName), text(customer.lastName)]
          .filter(Boolean)
          .join(' ') ||
        'Unknown customer',
      email: text(customer.email) || undefined,
      phone: text(customer.phone) || undefined,
    },
    item:
      Object.keys(item).length > 0
        ? {
            id: text(item.id ?? item._id) || undefined,
            name: text(item.name ?? item.title, 'Unknown item'),
            type: text(item.type) || undefined,
          }
        : undefined,
    events: array(source.events ?? source.timeline).map(normalizeEvent),
  };
}

function normalizeTrendPoint(value: unknown): PaymentTrendPoint {
  const source = record(value);
  return {
    label: text(source.label ?? source.date ?? source.period),
    amount: number(source.amount ?? source.netCollected ?? source.total),
  };
}

function normalizeBreakdown(value: unknown): PaymentBreakdown {
  const source = record(value);
  return {
    label: text(source.label ?? source.name ?? source.status, 'Other'),
    amount: number(source.amount ?? source.total),
    count: number(source.count) || undefined,
  };
}

export function normalizePaymentSummary(value: unknown): PaymentSummary {
  const source = record(value);
  const grossCollected = number(
    source.grossCollected ?? source.totalCollected ?? source.gross
  );
  const refundedAmount = number(source.refundedAmount ?? source.refunds);
  const successfulPayments = number(
    source.successfulPayments ?? source.successfulCount
  );
  const totalPayments = number(source.totalPayments ?? source.transactionCount);

  return {
    grossCollected,
    refundedAmount,
    netCollected: number(
      source.netCollected ?? source.net,
      grossCollected - refundedAmount
    ),
    successfulPayments,
    totalPayments,
    averagePayment: number(
      source.averagePayment,
      successfulPayments > 0 ? grossCollected / successfulPayments : 0
    ),
    successRate: number(
      source.successRate,
      totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0
    ),
    refundRate: number(source.refundRate),
    percentageChange:
      source.percentageChange === undefined
        ? undefined
        : number(source.percentageChange),
    currency: text(source.currency, 'SAR').toUpperCase(),
    trend: array(source.trend ?? source.timeSeries).map(normalizeTrendPoint),
    statusBreakdown: array(source.statusBreakdown).map(normalizeBreakdown),
    methodBreakdown: array(source.methodBreakdown).map(normalizeBreakdown),
    productBreakdown: array(source.productBreakdown).map(normalizeBreakdown),
  };
}
