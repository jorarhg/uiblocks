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

import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "./data-table-pagination"

// Configuración simplificada de columnas
export interface SimpleColumnConfig<TData> {
  /** clave (puede usar dot notation) */
  key: string
  /** etiqueta de cabecera */
  label: string
  /** habilita ordenamiento (alias sortable) */
  sortable?: boolean
  enableSorting?: boolean
  /** habilita filtrado básico (usa filterFn includes) */
  filterable?: boolean
  /** permitir ocultar; por defecto true */
  hideable?: boolean
  /** función para derivar el valor (override de key) */
  accessor?: (row: TData) => any
  /** render personalizado de la celda */
  render?: (value: any, row: TData) => React.ReactNode
  /** ancho fijo (ej: 120, '10%') */
  width?: number | string
  /** alineación del texto */
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<TData, TValue> {
  /** ColumnDef avanzadas (tiene prioridad sobre simpleColumns) */
  columns?: ColumnDef<TData, TValue>[]
  /** Configuración simple para generar columnas básicas */
  simpleColumns?: SimpleColumnConfig<TData>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  filters?: {
    columnId: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
      count?: number
    }[]
  }[]
}

export function DataTable<TData, TValue>({
  columns,
  simpleColumns,
  data,
  searchKey,
  searchPlaceholder,
  filters,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Generar columnas si se usa configuración simple y no se pasaron columnas avanzadas
  const generatedColumns = React.useMemo<ColumnDef<TData, any>[] | undefined>(() => {
    if (columns || !simpleColumns) return undefined
    return simpleColumns.map(cfg => {
      const enableSorting = cfg.sortable ?? cfg.enableSorting ?? false
      const col: ColumnDef<TData, any> = {
        accessorKey: cfg.accessor ? undefined : cfg.key,
        id: cfg.key,
        header: cfg.label,
        enableSorting,
        enableHiding: cfg.hideable !== false,
        meta: {
          align: cfg.align,
          width: cfg.width,
        },
      }
      if (cfg.accessor) {
        ;(col as any).accessorFn = (row: TData) => cfg.accessor!(row)
      }
      if (cfg.render) {
        col.cell = ({ row, getValue }) => {
          const rowData = row.original as TData
            // valor: si hay accessor se llamará accessorFn; si no, getValue
          const value = cfg.accessor ? cfg.accessor(rowData) : getValue()
          return cfg.render!(value, rowData)
        }
      }
      if (cfg.filterable) {
        col.filterFn = (row, id, value) => {
          const cell = row.getValue(id)
          if (value == null || value === '') return true
          return String(cell).toLowerCase().includes(String(value).toLowerCase())
        }
      }
      return col
    })
  }, [columns, simpleColumns])

  const finalColumns = (columns || generatedColumns) as ColumnDef<TData, TValue>[]
  const effectiveSearchKey = searchKey || (simpleColumns?.[0]?.key) || 'title'

  const table = useReactTable({
    data,
    columns: finalColumns,
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
  <DataTableToolbar table={table} searchKey={effectiveSearchKey} searchPlaceholder={searchPlaceholder} filters={filters} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta: any = header.column.columnDef.meta || {}
                  const style: React.CSSProperties = {}
                  if (meta.width) style.width = typeof meta.width === 'number' ? meta.width : meta.width
                  const alignClass = meta.align === 'center' ? 'text-center' : meta.align === 'right' ? 'text-right' : 'text-left'
                  return (
                    <TableHead key={header.id} style={style} className={alignClass}>
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
                  {row.getVisibleCells().map((cell) => {
                    const meta: any = cell.column.columnDef.meta || {}
                    const style: React.CSSProperties = {}
                    if (meta.width) style.width = typeof meta.width === 'number' ? meta.width : meta.width
                    const alignClass = meta.align === 'center' ? 'text-center' : meta.align === 'right' ? 'text-right' : 'text-left'
                    return (
                      <TableCell key={cell.id} style={style} className={alignClass}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={finalColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
