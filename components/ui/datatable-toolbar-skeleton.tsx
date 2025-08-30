"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface DataTableToolbarSkeletonProps {
  showFilters?: boolean
  showSearch?: boolean
  showViewOptions?: boolean
}

export function DataTableToolbarSkeleton({ 
  showFilters = true, 
  showSearch = true, 
  showViewOptions = true 
}: DataTableToolbarSkeletonProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {showSearch && (
          <Skeleton className="h-8 w-[250px]" />
        )}
        {showFilters && (
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {showViewOptions && (
          <Skeleton className="h-8 w-[70px]" />
        )}
      </div>
    </div>
  )
}
