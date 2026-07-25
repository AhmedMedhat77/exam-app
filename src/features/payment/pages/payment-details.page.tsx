import { ROUTES } from '@/app/routes';
import PaymentStatusBadge from '@/features/payment/components/payment-status-badge';
import { usePayment } from '@/features/payment/hooks/use-payment';
import {
  formatMoney,
  formatPaymentDate,
} from '@/features/payment/utils/payment-formatters';
import { Button } from '@/shared/ui/button';
import {
  ArrowLeft,
  CalendarClock,
  Copy,
  CreditCard,
  Package,
  ReceiptText,
  UserRound,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router';

function DetailCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 font-semibold text-gray-950">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DetailRow({
  label,
  value,
  copy,
}: {
  label: string;
  value?: string;
  copy?: boolean;
}) {
  const displayValue = value || 'Not available';
  return (
    <div className="flex items-start justify-between gap-6 border-b border-gray-100 py-3 first:pt-0 last:border-0 last:pb-0">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="flex max-w-[65%] items-center gap-2 text-right text-sm font-medium break-all text-gray-900">
        {displayValue}
        {copy && value && (
          <button
            type="button"
            className="text-gray-400 transition-colors hover:text-blue-600"
            aria-label={`Copy ${label}`}
            onClick={() => void navigator.clipboard.writeText(value)}
          >
            <Copy className="size-3.5" />
          </button>
        )}
      </dd>
    </div>
  );
}

export default function PaymentDetailsPage() {
  const { paymentId = '' } = useParams();
  const location = useLocation();
  const paymentQuery = usePayment(paymentId);
  const state = location.state as { from?: string } | null;
  const backTo = state?.from ?? ROUTES.PAYMENTS;

  if (paymentQuery.isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-xl border bg-white" />
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl border bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (paymentQuery.isError || !paymentQuery.data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
        <h1 className="font-semibold text-red-700">
          Payment could not be loaded
        </h1>
        <p className="mt-1 text-sm text-red-600">
          {paymentQuery.error?.message ?? 'The payment does not exist.'}
        </p>
        <Link to={backTo}>
          <Button className="mx-auto mt-5 w-auto">Back to payments</Button>
        </Link>
      </div>
    );
  }

  const payment = paymentQuery.data;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600"
      >
        <ArrowLeft className="size-4" />
        Back to payments
      </Link>

      <header className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-950">
                {formatMoney(payment.netAmount, payment.currency)}
              </h1>
              <PaymentStatusBadge status={payment.status} />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Payment {payment.transactionReference ?? payment.id}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Payment date
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {formatPaymentDate(payment.paidAt ?? payment.createdAt)}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailCard title="Customer" icon={<UserRound className="size-4" />}>
          <dl>
            <DetailRow label="Name" value={payment.customer.name} />
            <DetailRow label="Email" value={payment.customer.email} />
            <DetailRow label="Phone" value={payment.customer.phone} />
            <DetailRow label="Customer ID" value={payment.customer.id} copy />
          </dl>
        </DetailCard>

        <DetailCard title="Purchase" icon={<Package className="size-4" />}>
          <dl>
            <DetailRow label="Item" value={payment.item?.name} />
            <DetailRow label="Type" value={payment.item?.type} />
            <DetailRow label="Item ID" value={payment.item?.id} copy />
          </dl>
        </DetailCard>

        <DetailCard
          title="Money breakdown"
          icon={<ReceiptText className="size-4" />}
        >
          <dl>
            <DetailRow
              label="Gross amount"
              value={formatMoney(payment.amount, payment.currency)}
            />
            <DetailRow
              label="Refunded"
              value={formatMoney(payment.refundedAmount, payment.currency)}
            />
            <DetailRow
              label="Provider fees"
              value={formatMoney(payment.feeAmount, payment.currency)}
            />
            <DetailRow
              label="Net amount"
              value={formatMoney(payment.netAmount, payment.currency)}
            />
          </dl>
        </DetailCard>

        <DetailCard
          title="Payment method"
          icon={<CreditCard className="size-4" />}
        >
          <dl>
            <DetailRow label="Method" value={payment.paymentMethod} />
            <DetailRow label="Provider" value={payment.provider} />
            <DetailRow
              label="Transaction reference"
              value={payment.transactionReference}
              copy
            />
            <DetailRow
              label="Provider reference"
              value={payment.providerReference}
              copy
            />
          </dl>
        </DetailCard>
      </div>

      <DetailCard title="Timeline" icon={<CalendarClock className="size-4" />}>
        {payment.events.length === 0 ? (
          <p className="text-sm text-gray-500">
            No payment events were provided by the API.
          </p>
        ) : (
          <ol className="space-y-5">
            {payment.events.map((event, index) => (
              <li
                key={event.id ?? `${event.type}-${index}`}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <span className="mt-1 size-2.5 rounded-full bg-blue-600" />
                  {index < payment.events.length - 1 && (
                    <span className="mt-1 h-full w-px bg-gray-200" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {event.type.replaceAll('_', ' ')}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {formatPaymentDate(event.occurredAt)}
                  </p>
                  {event.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {event.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </DetailCard>

      {(payment.failureReason || payment.refundReason) && (
        <DetailCard title="Notes" icon={<ReceiptText className="size-4" />}>
          <dl>
            <DetailRow label="Failure reason" value={payment.failureReason} />
            <DetailRow label="Refund reason" value={payment.refundReason} />
          </dl>
        </DetailCard>
      )}
    </div>
  );
}
