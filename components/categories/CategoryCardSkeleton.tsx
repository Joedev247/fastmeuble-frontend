import { Skeleton } from '@/components/ui/skeleton';

export function CategoryCardSkeleton() {
  return (
    <div className="item-product-cat-content bg-gray-100 overflow-hidden h-full flex flex-col">
      {/* Category Image Skeleton */}
      <div className="item-image relative w-full h-48 md:h-56 bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Category Title Skeleton */}
      <div className="p-4 text-center">
        <Skeleton className="h-6 w-32 mx-auto" />
      </div>
    </div>
  );
}

export function CategoryGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* First card is text content, skip it */}
      <div className="hidden lg:block"></div>
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}

