"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTablePagination } from "../data-table/data-table-pagination"
import { DynamicDataTableToolbar } from "./dynamic-data-table-toolbar"
import { TableSkeleton } from "../ui/table-skeleton"
import { DataTableToolbarSkeleton } from "../ui/datatable-toolbar-skeleton"
import type { GlobalFilterConfig } from "./types/filter-config"
import type { DynamicFiltersConfig } from "./hooks/use-dynamic-filters"

// Nueva interfaz consolidada para opciones
export interface DataTableOptions {
  // Configuración de búsqueda
  searchKey?: string
  searchPlaceholder?: string
  
  // Configuración de filtros
  defaultFilters?: string[]
  globalConfig?: Partial<GlobalFilterConfig>
  filterConfig?: DynamicFiltersConfig
  
  // Configuración de UI
  className?: string
  showViewOptions?: boolean
  showAddFilter?: boolean
  
  // NUEVA: Configuración de layout de filtros
  filtersLayout?: 'inline' | 'newline'
  
  // Configuración de tabla extendida para sistema dinámico
  enableSorting?: boolean
  enableFiltering?: boolean
  enableSearch?: boolean
  pageSize?: number
  showToolbar?: boolean
}

// Interfaz simplificada con solo 3 props
interface DataTableWithDynamicToolbarProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  options?: DataTableOptions
  loading?: boolean  // ← Nueva prop opcional
}

export function DataTableWithDynamicToolbar<TData, TValue>({
  columns,
  data,
  options = {},
  loading = false,
}: DataTableWithDynamicToolbarProps<TData, TValue>) {
  // Si está cargando, mostrar skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        <DataTableToolbarSkeleton />
        <TableSkeleton rows={options?.pageSize || 10} />
      </div>
    )
  }

  // Extraer configuraciones del objeto options con valores por defecto
  const {
    searchKey,
    searchPlaceholder = "Search...",
    defaultFilters,
    globalConfig,
    filterConfig,
    className,
    showViewOptions = true,
    showAddFilter = true,
    filtersLayout = 'inline', // Por defecto, filtros en línea
  } = options

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      {/* Toolbar dinámico reutilizable */}
      <DynamicDataTableToolbar
        table={table}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        showViewOptions={showViewOptions}
        showAddFilter={showAddFilter}
        defaultFilters={defaultFilters}
        globalConfig={globalConfig}
        filterConfig={filterConfig}
        filtersLayout={filtersLayout}
      />
      
      {/* Tabla */}
      <div className="rounded-md border">
        <Table className={className}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Paginación */}
      <DataTablePagination table={table} />
    </div>
  )
}
