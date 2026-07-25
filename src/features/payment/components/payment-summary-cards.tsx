import type { PaymentSummary } from '@/features/payment/types/payment.d';
import {
  formatMoney,
  formatPercentage,
} from '@/features/payment/utils/payment-formatters';
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CircleCheck,
  ReceiptText,
  RotateCcw,
} from 'lucide-react';

export default function PaymentSummaryCards({
  summary,
  isLoading,
}: {
  summary?: PaymentSummary;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border bg-white"
          />
        ))}
      </div>
    );
  }

  const currency = summary?.currency ?? 'SAR';
  const change = summary?.percentageChange;
  const cards = [
    {
      label: 'Net collected',
      value: formatMoney(summary?.netCollected ?? 0, currency),
      note:
        change === undefined
          ? 'For the selected period'
          : `${formatPercentage(Math.abs(change))} vs previous period`,
      icon: Banknote,
      change,
    },
    {
      label: 'Gross collected',
      value: formatMoney(summary?.grossCollected ?? 0, currency),
      note: `${summary?.successfulPayments ?? 0} successful payments`,
      icon: CircleCheck,
    },
    {
      label: 'Refunds',
      value: formatMoney(summary?.refundedAmount ?? 0, currency),
      note: `${formatPercentage(summary?.refundRate ?? 0)} refund rate`,
      icon: RotateCcw,
    },
    {
      label: 'Average payment',
      value: formatMoney(summary?.averagePayment ?? 0, currency),
      note: `${formatPercentage(summary?.successRate ?? 0)} success rate`,
      icon: ReceiptText,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const ChangeIcon =
          card.change !== undefined && card.change < 0
            ? ArrowDownRight
            : ArrowUpRight;

        return (
          <article
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Icon className="size-4" />
              </span>
            </div>
            <p className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
              {card.value}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              {card.change !== undefined && (
                <ChangeIcon
                  className={
                    card.change < 0
                      ? 'size-3 text-red-500'
                      : 'size-3 text-emerald-600'
                  }
                />
              )}
              {card.note}
            </p>
          </article>
        );
      })}
    </div>
  );
}
