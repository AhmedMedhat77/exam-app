import PaymentFiltersPanel from '@/features/payment/components/payment-filters';
import PaymentInsights from '@/features/payment/components/payment-insights';
import PaymentSummaryCards from '@/features/payment/components/payment-summary-cards';
import PaymentsTable from '@/features/payment/components/payments-table';
import ReportReconciliation from '@/features/payment/components/report-reconciliation';
import { usePaymentSummary } from '@/features/payment/hooks/use-payment-summary';
import { usePayments } from '@/features/payment/hooks/use-payments';
import type {
  PaymentFilters,
  PaymentStatus,
} from '@/features/payment/types/payment.d';
import { getDefaultPaymentDateRange } from '@/features/payment/utils/payment-formatters';
import { AlertCircle, Download } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

const defaultDates = getDefaultPaymentDateRange();

function numberParam(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default function PaymentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo<PaymentFilters>(
    () => ({
      page: numberParam(searchParams.get('page'), 1),
      limit: numberParam(searchParams.get('limit'), 10),
      search: searchParams.get('search') ?? '',
      dateFrom: searchParams.get('dateFrom') ?? defaultDates.dateFrom,
      dateTo: searchParams.get('dateTo') ?? defaultDates.dateTo,
      status: (searchParams.get('status') as PaymentStatus | null) ?? '',
      method: searchParams.get('method') ?? '',
      productId: searchParams.get('productId') ?? '',
      sortOrder:
        searchParams.get('sortOrder') === 'asc' ? 'asc' : ('desc' as const),
      orderBy: searchParams.get('orderBy') ?? 'paidAt',
    }),
    [searchParams]
  );

  const updateFilters = (changes: Partial<PaymentFilters>) => {
    const next = new URLSearchParams(searchParams);
    const withFirstPage = 'page' in changes ? changes : { ...changes, page: 1 };

    Object.entries(withFirstPage).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });
    setSearchParams(next, { replace: true });
  };

  const listQuery = usePayments(filters);
  const summaryQuery = usePaymentSummary(filters);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 pb-10">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Financial reporting
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-950">
            Payments
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            See collected revenue and every transaction that contributes to it.
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Requires a backend export endpoint"
          className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-400"
        >
          <Download className="size-4" />
          Export report
        </button>
      </header>

      <PaymentFiltersPanel
        filters={filters}
        onChange={updateFilters}
        onReset={() =>
          setSearchParams(
            {
              dateFrom: defaultDates.dateFrom,
              dateTo: defaultDates.dateTo,
            },
            { replace: true }
          )
        }
      />

      {summaryQuery.isError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-semibold">Summary is unavailable</p>
            <p className="mt-0.5">
              {summaryQuery.error.message}. Transaction results may still be
              available below.
            </p>
          </div>
        </div>
      )}

      <PaymentSummaryCards
        summary={summaryQuery.data}
        isLoading={summaryQuery.isLoading}
      />

      {summaryQuery.data && (
        <>
          <PaymentInsights summary={summaryQuery.data} />
          <ReportReconciliation summary={summaryQuery.data} />
        </>
      )}

      <PaymentsTable
        page={listQuery.data}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        error={listQuery.error}
        onRetry={() => void listQuery.refetch()}
        onPageChange={(page) => updateFilters({ page })}
      />
    </div>
  );
}
