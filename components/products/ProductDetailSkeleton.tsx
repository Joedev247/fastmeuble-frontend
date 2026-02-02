import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images Skeleton */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gray-100  overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            {/* Category */}
            <Skeleton className="h-4 w-24" />

            {/* Title */}
            <Skeleton className="h-10 w-3/4" />

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Price */}
            <Skeleton className="h-8 w-40" />

            {/* Stock Status */}
            <Skeleton className="h-5 w-24" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Buttons */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 flex-1" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

