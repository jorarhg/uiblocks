"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { DynamicFilter } from "../hooks/use-dynamic-filters"

interface ActiveFiltersDisplayProps {
  activeFilters: DynamicFilter[]
  onRemoveFilter: (filterId: string) => void
  onClearAll: () => void
  hasActiveFilters: boolean
  layout?: 'inline' | 'newline'  // NUEVA: configuración de layout
}

export function ActiveFiltersDisplay({ 
  activeFilters, 
  onRemoveFilter, 
  onClearAll, 
  hasActiveFilters,
  layout = 'newline'  // NUEVA: prop con valor por defecto
}: ActiveFiltersDisplayProps) {
  if (!hasActiveFilters) {
    return null
  }

  const filtersWithValues = activeFilters.filter(filter => {
    const value = filter.value
    if (value === undefined || value === null || value === "") return false
    if (Array.isArray(value)) return value.length > 0
    return true
  })

  if (filtersWithValues.length === 0) {
    return null
  }

  const formatFilterValue = (filter: DynamicFilter) => {
    const { value, type, options } = filter
    
    if (type === "faceted" && Array.isArray(value) && options) {
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0])
        return option?.label || value[0]
      }
      return `${value.length} selected`
    }
    
    if (type === "search" && typeof value === "string") {
      return value.length > 20 ? `${value.substring(0, 20)}...` : value
    }
    
    return String(value)
  }

  return (
    <div className={layout === 'inline' 
      ? "flex flex-wrap items-center gap-2" 
      : "flex flex-wrap items-center gap-2"
    }>
      {layout === 'newline' && (
        <span className="text-sm text-muted-foreground">Active filters:</span>
      )}
      {filtersWithValues.map((filter) => (
        <Badge
          key={filter.id}
          variant="secondary"
          className="flex items-center gap-1 pr-1 group"
        >
          <span className="font-medium">{filter.title}:</span>
          <span>{formatFilterValue(filter)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground opacity-60 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemoveFilter(filter.id)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove filter</span>
          </Button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-6 px-2 text-xs"
      >
        Clear all
      </Button>
    </div>
  )
}
