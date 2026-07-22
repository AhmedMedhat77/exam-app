export default function UserDiplomaSkeletonCard() {
  return (
    <div className="relative h-95 rounded-none border border-primary/40 overflow-hidden flex flex-col justify-end bg-slate-200 dark:bg-slate-800 animate-pulse">
      {/* Top-Right Badge Skeleton */}
      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white/50" />

      {/* Blue Bottom Overlay Box Skeleton */}
      <div className="relative z-10 w-full bg-primary/80 p-4 font-mono flex flex-col gap-2.5">
        <div className="h-5 w-2/3 bg-white/40 rounded-sm" />
        <div className="h-3 w-full bg-white/25 rounded-sm" />
        <div className="h-3 w-4/5 bg-white/25 rounded-sm" />
      </div>
    </div>
  );
}
