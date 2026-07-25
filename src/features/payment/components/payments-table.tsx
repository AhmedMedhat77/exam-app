import { ROUTES } from '@/app/routes';
import PaymentStatusBadge from '@/features/payment/components/payment-status-badge';
import type { Payment, PaymentsPage } from '@/features/payment/types/payment.d';
import {
  formatMoney,
  formatPaymentDate,
} from '@/features/payment/utils/payment-formatters';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router';

function PaymentRow({ payment }: { payment: Payment }) {
  const location = useLocation();
  const detailPath = ROUTES.PAYMENT_DETAIL.replace(':paymentId', payment.id);

  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50/70">
      <td className="px-5 py-4">
        <p className="font-medium text-gray-900">{payment.customer.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {payment.customer.email ?? 'No email'}
        </p>
      </td>
      <td className="px-5 py-4 font-semibold text-gray-900">
        {formatMoney(payment.netAmount, payment.currency)}
        {payment.refundedAmount > 0 && (
          <p className="mt-0.5 text-xs font-normal text-blue-600">
            {formatMoney(payment.refundedAmount, payment.currency)} refunded
          </p>
        )}
      </td>
      <td className="px-5 py-4">
        <PaymentStatusBadge status={payment.status} />
      </td>
      <td className="px-5 py-4 text-gray-600">
        {payment.item?.name ?? 'Not available'}
      </td>
      <td className="px-5 py-4 text-gray-600">
        {payment.paymentMethod ?? 'Not available'}
      </td>
      <td className="px-5 py-4 text-gray-600">
        {formatPaymentDate(payment.paidAt ?? payment.createdAt)}
      </td>
      <td className="px-5 py-4 text-right">
        <Link
          to={detailPath}
          state={{ from: `${location.pathname}${location.search}` }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
        >
          Details
          <ExternalLink className="size-3.5" />
        </Link>
      </td>
    </tr>
  );
}

export default function PaymentsTable({
  page,
  isLoading,
  isError,
  error,
  onPageChange,
  onRetry,
}: {
  page?: PaymentsPage;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}) {
  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-xl border bg-white" />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-700">
          Payments could not be loaded
        </p>
        <p className="mt-1 text-sm text-red-600">
          {error?.message ?? 'Please try again.'}
        </p>
        <Button className="mx-auto mt-4 w-auto" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (!page?.data.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <p className="font-semibold text-gray-900">No payments found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try changing the reporting period or filters.
        </p>
      </div>
    );
  }

  const { metadata } = page;

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="font-semibold text-gray-950">Payment transactions</h2>
        <p className="mt-1 text-xs text-gray-500">
          {metadata.total.toLocaleString()} records match the active filters
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Net amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Purchase</th>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {page.data.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
        <p className="text-sm text-gray-500">
          Page {metadata.page} of {metadata.totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous page"
            disabled={metadata.page <= 1}
            onClick={() => onPageChange(metadata.page - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next page"
            disabled={metadata.page >= metadata.totalPages}
            onClick={() => onPageChange(metadata.page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
