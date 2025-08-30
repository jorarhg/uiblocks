"use client"

import { Search } from "lucide-react"
import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "../data-table/data-table-view-options"
import { AddFilterDropdown } from "./components/add-filter-dropdown"
import { DynamicFilterComponent } from "./components/dynamic-filter-component"
import { useDynamicFilters, type DynamicFiltersConfig } from "./hooks/use-dynamic-filters"
import { cn } from "@/lib/utils"
import type { GlobalFilterConfig } from "./types/filter-config"

interface DynamicDataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
  className?: string
  showViewOptions?: boolean
  showAddFilter?: boolean
  defaultFilters?: string[]
  globalConfig?: Partial<GlobalFilterConfig>
  filterConfig?: DynamicFiltersConfig  // Nueva configuración para motor híbrido
  filtersLayout?: 'inline' | 'newline'  // NUEVA: configuración de layout de filtros
}

export function DynamicDataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  className,
  showViewOptions = true,
  showAddFilter = true,
  defaultFilters,
  globalConfig,
  filterConfig,  // Nueva prop
  filtersLayout = 'inline',  // NUEVA: prop con valor por defecto inline
}: DynamicDataTableToolbarProps<TData>) {
  const {
    activeFilters,
    availableColumns,
    hasActiveFilters,
    addFilter,
    removeFilter,
    updateFilterValue,
    clearAllFilters,
  } = useDynamicFilters(table, defaultFilters, globalConfig, filterConfig)  // Pasar nueva configuración

  return (
    <div className={cn(filtersLayout === 'inline' ? "space-y-0" : "space-y-4", className)}>
      {/* Barra principal con búsqueda y controles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Búsqueda global - Solo mostrar si searchKey existe como columna */}
        {searchKey && table.getColumn(searchKey) && (
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
              className="w-full pl-8"
            />
          </div>
        )}

        {/* Sección de filtros dinámicos - crece hacia la derecha */}
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {/* Botón Add Filter - SIEMPRE en la toolbar superior */}
          {showAddFilter && (
            <AddFilterDropdown
              availableColumns={availableColumns}
              onAddFilter={addFilter}
            />
          )}

          {/* Si layout es INLINE, mostrar filtros dinámicos aquí */}
          {filtersLayout === 'inline' && activeFilters.map((filter) => {
            const column = table.getColumn(filter.columnId)
            return (
              <DynamicFilterComponent
                key={filter.id}
                filter={filter}
                column={column}
                onValueChange={updateFilterValue}
                onRemove={removeFilter}
              />
            )
          })}

          {/* Botón de limpiar - solo mostrar inline si layout es inline */}
          {filtersLayout === 'inline' && hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={clearAllFilters} 
              className="h-8 px-2 lg:px-3"
            >
              Limpiar
            </Button>
          )}
        </div>

        {/* Opciones de vista siempre a la derecha */}
        {showViewOptions && (
          <div className="flex items-center">
            <DataTableViewOptions table={table} />
          </div>
        )}
      </div>

      {/* Si layout es NEWLINE, mostrar filtros en nueva línea */}
      {filtersLayout === 'newline' && hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => {
            const column = table.getColumn(filter.columnId)
            return (
              <DynamicFilterComponent
                key={filter.id}
                filter={filter}
                column={column}
                onValueChange={updateFilterValue}
                onRemove={removeFilter}
              />
            )
          })}

          {/* Botón de limpiar en nueva línea */}
          <Button 
            variant="ghost" 
            onClick={clearAllFilters} 
            className="h-8 px-2 lg:px-3"
          >
            Limpiar
          </Button>
        </div>
      )}
    </div>
  )
}
