export default function UserExamCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-start gap-4 bg-blue-50 p-4 sm:flex-row sm:items-center md:p-5 dark:bg-slate-900/60">
      <div className="h-20 w-20 shrink-0 bg-blue-200/60 md:h-24 md:w-24 dark:bg-slate-800" />
      <div className="w-full min-w-0 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 rounded bg-blue-200/60 dark:bg-slate-800" />
          <div className="h-4 w-32 rounded bg-blue-200/60 dark:bg-slate-800" />
        </div>
        <div className="h-3 w-full rounded bg-blue-200/40 dark:bg-slate-800" />
        <div className="h-3 w-3/4 rounded bg-blue-200/40 dark:bg-slate-800" />
      </div>
    </div>
  );
}
