"use client"

import { ListFilterPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { FilterableColumn } from "../hooks/use-dynamic-filters"

interface AddFilterDropdownProps {
  availableColumns: FilterableColumn[]
  onAddFilter: (columnId: string) => void
}

export function AddFilterDropdown({ availableColumns, onAddFilter }: AddFilterDropdownProps) {
  if (availableColumns.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed focus:outline-none focus:ring-0 focus:ring-offset-0">
          <ListFilterPlus className="mr-2 h-4 w-4" />
          Agregar Filtro
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter by column</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableColumns.map((column) => (
          <DropdownMenuItem
            key={column.id}
            onClick={() => onAddFilter(column.id)}
            className="flex items-center justify-between"
          >
            <span>{column.title}</span>
            <span className="text-xs text-muted-foreground capitalize">
              {column.type === "faceted" ? "Multi-select" : column.type}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
