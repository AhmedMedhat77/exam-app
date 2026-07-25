import type {
  PaymentBreakdown,
  PaymentSummary,
} from '@/features/payment/types/payment.d';
import { formatMoney } from '@/features/payment/utils/payment-formatters';

function BreakdownList({
  title,
  data,
  currency,
}: {
  title: string;
  data: PaymentBreakdown[];
  currency: string;
}) {
  const max = Math.max(...data.map((item) => item.amount), 1);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-gray-950">{title}</h2>
      {data.length === 0 ? (
        <p className="mt-8 text-center text-sm text-gray-400">
          No breakdown data available
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {data.slice(0, 5).map((item) => (
            <div key={item.label}>
              <div className="mb-1.5 flex justify-between gap-4 text-sm">
                <span className="truncate text-gray-600 capitalize">
                  {item.label.replaceAll('_', ' ')}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatMoney(item.amount, currency)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${Math.max(4, (item.amount / max) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function PaymentInsights({
  summary,
}: {
  summary: PaymentSummary;
}) {
  const maxTrend = Math.max(...summary.trend.map((item) => item.amount), 1);

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-semibold text-gray-950">Revenue trend</h2>
            <p className="mt-1 text-xs text-gray-500">
              Net collected over the selected period
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-900">
            {formatMoney(summary.netCollected, summary.currency)}
          </p>
        </div>
        {summary.trend.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-gray-400">
            No trend data available
          </div>
        ) : (
          <div
            className="mt-6 flex h-56 items-end gap-2"
            aria-label="Revenue trend"
          >
            {summary.trend.map((point) => (
              <div
                key={point.label}
                className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
                title={`${point.label}: ${formatMoney(point.amount, summary.currency)}`}
              >
                <div
                  className="min-h-1 w-full rounded-t bg-blue-500 transition-colors group-hover:bg-blue-700"
                  style={{
                    height: `${Math.max(2, (point.amount / maxTrend) * 100)}%`,
                  }}
                />
                <span className="w-full truncate text-center text-[10px] text-gray-400">
                  {point.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </article>
      <BreakdownList
        title="By payment method"
        data={summary.methodBreakdown}
        currency={summary.currency}
      />
    </div>
  );
}
