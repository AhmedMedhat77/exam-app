import type { PaymentStatus } from '@/features/payment/types/payment.d';
import { cn } from '@/shared/lib/utils';

const styles: Record<PaymentStatus, string> = {
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  pending: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
  failed: 'bg-red-50 text-red-700 ring-red-200',
  cancelled: 'bg-gray-100 text-gray-700 ring-gray-200',
  refunded: 'bg-blue-50 text-blue-700 ring-blue-200',
  partially_refunded: 'bg-blue-50 text-blue-700 ring-blue-200',
};

export default function PaymentStatusBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset',
        styles[status]
      )}
    >
      {status.replaceAll('_', ' ')}
    </span>
  );
}
