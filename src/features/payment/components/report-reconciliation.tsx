import type { PaymentSummary } from '@/features/payment/types/payment.d';
import { formatMoney } from '@/features/payment/utils/payment-formatters';
import { Equal, Minus } from 'lucide-react';

export default function ReportReconciliation({
  summary,
}: {
  summary: PaymentSummary;
}) {
  const values = [
    {
      label: 'Gross successful payments',
      value: summary.grossCollected,
    },
    { label: 'Refunded to customers', value: summary.refundedAmount },
    { label: 'Net collected', value: summary.netCollected },
  ];

  return (
    <section className="rounded-xl border border-blue-100 bg-blue-50/70 p-5">
      <div>
        <h2 className="font-semibold text-gray-950">
          How this total is formed
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          Report-wide totals for the active filters, not only the current table
          page.
        </p>
      </div>
      <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {values.map((item, index) => (
          <>
            {index > 0 &&
              (index === values.length - 1 ? (
                <Equal
                  key={`${item.label}-operator`}
                  className="mx-auto size-4 text-blue-600"
                />
              ) : (
                <Minus
                  key={`${item.label}-operator`}
                  className="mx-auto size-4 text-blue-600"
                />
              ))}
            <div key={item.label} className="rounded-lg bg-white p-4">
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="mt-1 font-bold text-gray-950">
                {formatMoney(item.value, summary.currency)}
              </p>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
