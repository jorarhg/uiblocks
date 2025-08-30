
import React from 'react'
import type { ColumnDef } from "@tanstack/react-table"
import { formatCell } from '@/lib/formatters'
import { ExtendedColumnConfig, FormatterContext } from '@/types/formatters'

/**
 * Crea una columna de TanStack Table con soporte para formatters configurables
 */
export function createFormattedColumn<TData = any>(
  config: ExtendedColumnConfig
): ColumnDef<TData> {
  return {
    accessorKey: config.key,
    header: config.label,
    cell: ({ row, column }) => {
      const value = row.getValue(config.key)
      
      // Crear contexto para el formatter
      const context: FormatterContext = {
        value,
        record: row.original,
        field: config,
        rowIndex: row.index,
        columnIndex: column.getIndex()
      }
      
      // Aplicar formatter
      const result = formatCell(context)
      
      // Combinar clases CSS de la configuración
      const combinedClassName = [
        config.cellClassName,
        result.className
      ].filter(Boolean).join(' ')
      
      return (
        <div 
          className={combinedClassName}
          style={result.style}
        >
          {result.content}
        </div>
      )
    },
    enableSorting: config.sortable !== false,
    enableHiding: true,
    meta: {
      headerClassName: config.headerClassName,
      columnClassName: config.columnClassName
    }
  }
}

/**
 * Crea múltiples columnas desde una configuración
 */
export function createFormattedColumns<TData = any>(
  configs: ExtendedColumnConfig[]
): ColumnDef<TData>[] {
  return configs.map(config => createFormattedColumn<TData>(config))
}

/**
 * Integra formatters con el sistema de columnas dinámicas existente
 */
export function enhanceColumnWithFormatter<TData = any>(
  baseColumn: ColumnDef<TData>,
  formatterConfig: ExtendedColumnConfig
): ColumnDef<TData> {
  return {
    ...baseColumn,
    cell: ({ row, column }) => {
      const value = row.getValue(formatterConfig.key)
      
      const context: FormatterContext = {
        value,
        record: row.original,
        field: formatterConfig,
        rowIndex: row.index,
        columnIndex: column.getIndex()
      }
      
      const result = formatCell(context)
      
      const combinedClassName = [
        formatterConfig.cellClassName,
        result.className
      ].filter(Boolean).join(' ')
      
      return (
        <div 
          className={combinedClassName}
          style={result.style}
        >
          {result.content}
        </div>
      )
    }
  }
}
