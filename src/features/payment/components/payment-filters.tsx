import type {
  PaymentFilters,
  PaymentStatus,
} from '@/features/payment/types/payment.d';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { RotateCcw, Search } from 'lucide-react';

const selectClassName =
  'h-12 rounded-xs border border-input bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-primary';

export default function PaymentFiltersPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: PaymentFilters;
  onChange: (changes: Partial<PaymentFilters>) => void;
  onReset: () => void;
}) {
  return (
    <section
      aria-label="Payment filters"
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <Input
          aria-label="Search payments"
          value={filters.search ?? ''}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Search customer, email, or reference"
          leftIcon={<Search className="size-4 text-gray-400" />}
          className="pl-8"
        />
        <Input
          aria-label="Start date"
          type="date"
          value={filters.dateFrom ?? ''}
          onChange={(event) => onChange({ dateFrom: event.target.value })}
        />
        <Input
          aria-label="End date"
          type="date"
          value={filters.dateTo ?? ''}
          onChange={(event) => onChange({ dateTo: event.target.value })}
        />
        <select
          aria-label="Payment status"
          className={selectClassName}
          value={filters.status ?? ''}
          onChange={(event) =>
            onChange({ status: event.target.value as PaymentStatus | '' })
          }
        >
          <option value="">All statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
          <option value="partially_refunded">Partially refunded</option>
        </select>
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="w-full xl:w-auto"
          onClick={onReset}
        >
          <RotateCcw />
          Reset
        </Button>
      </div>
    </section>
  );
}
