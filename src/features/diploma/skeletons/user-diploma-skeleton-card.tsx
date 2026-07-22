export default function UserDiplomaSkeletonCard() {
  return (
    <div className="border-primary/40 relative flex h-95 animate-pulse flex-col justify-end overflow-hidden rounded-none border bg-slate-200 dark:bg-slate-800">
      {/* Top-Right Badge Skeleton */}
      <div className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full border-2 border-white/50 bg-slate-300 dark:bg-slate-700" />

      {/* Blue Bottom Overlay Box Skeleton */}
      <div className="bg-primary/80 relative z-10 flex w-full flex-col gap-2.5 p-4 font-mono">
        <div className="h-5 w-2/3 rounded-sm bg-white/40" />
        <div className="h-3 w-full rounded-sm bg-white/25" />
        <div className="h-3 w-4/5 rounded-sm bg-white/25" />
      </div>
    </div>
  );
}
