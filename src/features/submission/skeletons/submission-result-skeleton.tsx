export default function SubmissionResultSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-6 py-4">
      {/* Header Skeleton */}
      <div className="h-16 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />

      {/* Progress & Subheader */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Title */}
      <div className="h-6 w-24 rounded bg-slate-200 dark:bg-slate-800" />

      {/* Main Container */}
      <div className="flex flex-col gap-6 rounded-lg border border-blue-100 bg-white p-6 md:flex-row dark:bg-slate-900">
        {/* Left Column Skeleton */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-blue-100/60 bg-blue-50/40 p-6 md:w-80 dark:bg-slate-800/40">
          <div className="size-48 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="w-full space-y-3">
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex-1 space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2">
                <div className="h-12 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-12 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
                <div className="h-12 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
