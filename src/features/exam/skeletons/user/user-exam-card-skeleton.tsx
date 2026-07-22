export default function UserExamCardSkeleton() {
  return (
    <div className="w-full bg-[#EFF6FF] dark:bg-slate-900/60 p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-pulse">
      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-blue-200/60 dark:bg-slate-800" />
      <div className="flex-1 min-w-0 space-y-3 w-full">
        <div className="flex justify-between items-center">
          <div className="h-5 w-48 bg-blue-200/60 dark:bg-slate-800 rounded" />
          <div className="h-4 w-32 bg-blue-200/60 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-3 w-full bg-blue-200/40 dark:bg-slate-800 rounded" />
        <div className="h-3 w-3/4 bg-blue-200/40 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}
