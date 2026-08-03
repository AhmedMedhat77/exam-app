export default function AdminDiplomaDetailSkeleton() {
  return (
    <div className="max-w-full animate-pulse space-y-6">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 rounded bg-gray-200" />

      {/* Header Title & Actions Row Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title Skeleton */}
        <div className="h-8 w-64 rounded bg-gray-200" />

        {/* Buttons Group Skeleton */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-28 rounded bg-gray-200" />
          <div className="h-9 w-20 rounded bg-gray-200" />
          <div className="h-9 w-24 rounded bg-gray-200" />
        </div>
      </div>

      {/* Main Details Card Skeleton */}
      <div className="space-y-6 rounded-lg border border-gray-100 bg-white p-6 shadow-2xs sm:p-8">
        {/* Image Section Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="aspect-4/3 w-full max-w-xs rounded-md bg-gray-200 sm:max-w-sm" />
        </div>

        {/* Title Section Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-10 rounded bg-gray-200" />
          <div className="h-5 w-48 rounded bg-gray-200" />
        </div>

        {/* Description Section Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="space-y-2 pt-1">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
