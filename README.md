# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Payments Report Plan

### Implementation status

The frontend report is implemented with:

- Admin-only `/payments` and `/payments/:paymentId` routes.
- URL-backed date, search, and status filters.
- Separate report summary, paginated list, and payment detail queries.
- Summary cards, revenue trend, method breakdown, reconciliation panel, and
  transaction table.
- A dedicated payment audit screen with customer, purchase, money, provider,
  timeline, and reason sections.
- A normalization adapter that accepts common backend field variations while
  keeping one stable UI model.

The frontend currently calls:

```text
GET /api/payments
GET /api/payments/summary
GET /api/payments/:paymentId
```

These paths and the response mapping in
`src/features/payment/services/payment.service.ts` and
`src/features/payment/utils/normalize-payment.ts` must be aligned with the real
backend contract before production release. The export button is intentionally
disabled until a complete server-side export endpoint is available.

### Repository findings

Payments are not implemented in this repository yet. There is currently no
payment schema, payment service, payment query hook, or `/payments` route in
`src`.

The existing application works as follows:

- Route constants and role-specific route lists live in `src/app/routes.tsx`.
- `src/app/app.tsx` registers either `ADMIN_ROUTES` or `USER_ROUTES`, depending
  on `useUserStore().isAdmin`.
- The dashboard sidebar renders the same role-specific route list, so adding a
  visible admin route also adds its navigation item.
- API requests use the shared Axios instance in `src/shared/lib/axios.ts`.
- Server data is fetched and cached with TanStack React Query.
- Paginated endpoints use `IPaginatedAPIResponse<T>` from
  `src/shared/types/api.d.ts`.

The payment API contract is not stored in this frontend repository. Do not
implement the UI against guessed field names. Before starting the payment
feature, inspect the backend payment entity/DTO, controller routes, Swagger or
OpenAPI document, and representative API responses.

### Product goal

`/payments` will be an admin-only financial report. It must answer two questions
clearly:

1. How much money was collected for the selected period?
2. Which individual payments make up that amount?

For example, if the page displays a total of `SAR 5,000`, the administrator
must be able to see the contributing records, such as `SAR 200`, `SAR 300`,
`SAR 800`, and the remaining payments, together with the customer and purchase
behind every amount.

### Phase 1: confirm the backend schema and routes

Document the real backend contract before creating frontend types:

- Payment identifier and transaction/provider reference.
- Amount representation: major units or minor units such as halalas.
- Currency.
- Status values and their exact meanings.
- Creation, payment, failure, cancellation, and refund timestamps.
- Customer relationship and available customer fields.
- Purchased diploma, exam, order, or subscription relationship.
- Payment method and provider.
- Refund amount and refund relationship, if supported.
- Whether unsuccessful, pending, and refunded payments count toward revenue.
- Server timezone and the timezone used by date filters.

Confirm or request endpoints that support:

- A paginated payment list with search, filtering, and sorting.
- Aggregates calculated across the complete filtered result, not only the
  current page.
- One payment by ID for the details screen.
- Optional time-series and grouped breakdowns for insights.

A suitable contract would be:

```text
GET /api/payments
GET /api/payments/summary
GET /api/payments/:id
```

The exact paths and query parameter names must follow the backend. If the
backend returns list data and aggregates from one endpoint, keep them in one
response so they share the same filter scope.

### Phase 2: define the reporting rules

Use explicit financial rules rather than summing every row:

- `grossCollected` is the sum of successful captured payments.
- `refundedAmount` is the amount returned to customers.
- `netCollected = grossCollected - refundedAmount`.
- Pending, failed, and cancelled payments do not count as collected revenue.
- A partially refunded payment contributes only its unrefunded amount to net
  revenue.
- All calculations use integer minor units and are formatted only at the UI
  boundary.
- The server is the source of truth for report totals.
- The summary and transaction list always receive the same date, status,
  method, product, and search filters.

Do not calculate the headline total from the visible table page. With server
pagination, that would only total the current page. The API should return an
aggregate for the full filtered dataset.

The API response should include enough reconciliation information to show:

```text
Gross collected - refunds = net collected
```

It should also expose the filtered transaction count and, when practical, the
sum represented by the current table page.

### Phase 3: add routes and feature structure

Add these admin-only routes:

```text
/payments
/payments/:paymentId
```

`/payments` is visible in the admin sidebar. `/payments/:paymentId` is hidden
from the sidebar and opened from a transaction row. Add route constants and
entries to `ADMIN_ROUTES`; do not add them to `USER_ROUTES`.

Create the feature using the repository's existing service/hook organization:

```text
src/features/payment/
├── components/
│   ├── payment-filters.tsx
│   ├── payment-insights.tsx
│   ├── payment-status-badge.tsx
│   ├── payment-summary-cards.tsx
│   ├── payment-trend.tsx
│   ├── payments-table.tsx
│   └── report-reconciliation.tsx
├── constants/payment-keys.ts
├── hooks/
│   ├── use-payment.ts
│   ├── use-payment-summary.ts
│   └── use-payments.ts
├── pages/
│   ├── payment-details.page.tsx
│   └── payments.page.tsx
├── services/payment.service.ts
├── types/payment.d.ts
└── utils/
    ├── normalize-payment.ts
    └── payment-formatters.ts
```

Keep backend DTO types separate from the normalized UI model when the API uses
different names or nested structures. Perform that conversion in
`normalize-payment.ts`, not inside presentation components.

### Phase 4: build the `/payments` report

The page is ordered from high-level information to evidence:

1. Header with title, active reporting period, and an export action if the API
   supports complete CSV export.
2. Summary cards for net collected, gross collected, refunds, successful
   payment count, and average successful payment.
3. A revenue trend showing net or gross revenue over time with a clear legend.
4. Useful breakdowns by payment status, payment method, and purchased product.
5. A reconciliation panel explaining how the displayed total is formed.
6. The complete, filterable transaction table.

Filters include:

- Date range, defaulting to the current month.
- Customer name, email, or transaction reference.
- Status.
- Payment method.
- Purchased product.
- Minimum and maximum amount.
- Sort by paid date or amount.

Store filters, page, and sort state in URL search parameters. This makes the
report refresh-safe and shareable. Changing a filter resets the table to page
one and updates both the summary and list queries.

The transaction table includes:

- Customer name and email.
- Gross amount, refunded amount, and net amount when refunds apply.
- Currency.
- Status.
- Payment date.
- Payment method.
- Purchased item.
- Transaction reference.
- A link to the payment details route.

Use server-side pagination. Provide loading skeletons, an empty filtered state,
an API-error state with retry, and horizontal scrolling on small screens.

### Phase 5: build the payment details screen

`/payments/:paymentId` is a dedicated, read-only audit screen. It should not
depend on the payment still being present in the report query cache; load the
record by ID.

The screen contains:

- A back link that preserves the report's previous query parameters.
- Payment status, amount, currency, and transaction reference at the top.
- Customer name, email, phone, and customer ID when provided by the API.
- Purchased diploma/exam/order with links to existing admin screens when those
  routes exist.
- Payment method and safe provider metadata. Never display full card details or
  secrets.
- A timeline for created, authorized, paid, failed, cancelled, and refunded
  events supported by the backend.
- Gross, refunded, fees, and net amounts in a clear money breakdown.
- Provider and internal identifiers with copy actions.
- Failure or refund reason when available.

Unknown or missing optional fields should display `Not available`; the page
must not infer financial facts that are absent from the API.

### Phase 6: insights that remain financially meaningful

Only show insights supported by the selected period and backend data:

- Revenue change compared with the immediately preceding equal-length period.
- Successful-payment rate.
- Average successful payment.
- Refund rate and refunded amount.
- Top purchased diploma or exam by net revenue.
- Largest successful payments.

Every percentage must include its comparison period or denominator in a tooltip
or label. Avoid presenting pending payments as revenue and avoid comparing an
incomplete current month with a full previous month without making that clear.

### Phase 7: query and state behavior

- Include normalized filters in every React Query key.
- Fetch summary and list requests in parallel.
- Keep previous table data visible while moving between pages when appropriate.
- Cancel or supersede stale searches.
- Use the shared Axios instance so authentication behavior stays consistent.
- Treat an unauthorized response as an access problem, not an empty report.
- Use `Intl.NumberFormat` with the API currency and
  `Intl.DateTimeFormat` with the agreed reporting timezone.

### Phase 8: verification and acceptance criteria

Add tests for:

- Backend DTO normalization.
- Minor-unit currency formatting.
- Status-to-revenue inclusion rules.
- Full and partial refund calculations.
- URL filter parsing and serialization.
- Summary and list queries receiving identical filters.
- Pagination not changing the report-wide total.
- Loading, empty, unauthorized, and error states.
- Details navigation and restoration of previous report filters.
- Admin-only route registration and sidebar visibility.

Run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

The feature is complete when:

- An admin can open `/payments` from the sidebar.
- The report total is calculated by the backend for the complete filtered
  dataset.
- The administrator can identify every transaction contributing to the total.
- Pagination does not alter the headline total.
- Refunds and unsuccessful payments follow the documented reporting rules.
- Selecting a transaction opens a complete, auditable details screen.
- Refreshing or sharing the filtered URL preserves the same report.
