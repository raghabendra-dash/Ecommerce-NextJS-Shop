"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category header skeleton */}
      <div className="text-center mb-8">
        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
        <Skeleton className="h-9 w-48 mx-auto mb-2" />
        <Skeleton className="h-5 w-64 mx-auto" />
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletonCards.map((_, idx) => (
          <div key={idx} className="flex flex-col space-y-2">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
