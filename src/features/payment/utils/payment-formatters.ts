export function formatMoney(amount: number, currency = 'SAR') {
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export function formatPaymentDate(value?: string) {
  if (!value) return 'Not available';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';

  return new Intl.DateTimeFormat('en-SA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Riyadh',
  }).format(date);
}

export function formatPercentage(value: number) {
  return new Intl.NumberFormat('en-SA', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function getDefaultPaymentDateRange() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const toInputDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60_000)
      .toISOString()
      .slice(0, 10);
  };

  return {
    dateFrom: toInputDate(start),
    dateTo: toInputDate(today),
  };
}
