import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200  overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square bg-gray-100">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-5 w-3/4" />

        {/* Category Skeleton */}
        <Skeleton className="h-4 w-1/2" />

        {/* Price and Rating Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

