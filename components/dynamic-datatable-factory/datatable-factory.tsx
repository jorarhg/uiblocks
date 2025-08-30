'use client'

import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { TableSchema, DynamicRecord, FieldSchema } from '@/types/schema'
import { schemaManager } from './schema-manager'
import { getCellRenderer } from './cell-renderers'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { DataTableWithDynamicToolbar } from '@/components/dynamic-toolbar/data-table-with-dynamic-toolbar'
import { DataTableOptions } from '@/components/dynamic-toolbar'
import { createActionsColumn, ActionItem } from '@/components/data-table'

// Helper functions para construcción de columnas
function buildColumn(field: FieldSchema): ColumnDef<DynamicRecord> {
  const renderer = getCellRenderer(field)
  
  const column: ColumnDef<DynamicRecord> = {
    accessorKey: field.key,
    header: field.sortable 
      ? ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-auto p-0 hover:bg-transparent"
            >
              {field.label}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        }
      : field.label,
    cell: ({ row }) => {
      const value = row.getValue(field.key)
      return renderer({
        value,
        field,
        record: row.original
      })
    },
    enableSorting: field.sortable !== false,
    enableHiding: true,
    filterFn: getFilterFunction(field) as any
  }

  return column
}

function getFilterFunction(field: FieldSchema) {
  switch (field.type) {
    case 'string':
      return 'includesString'
    case 'number':
      return 'inNumberRange'
    case 'date':
      return 'dateBetween'
    case 'boolean':
      return 'equals'
    case 'select':
    case 'badge':
    case 'icon':
      return 'equals'
    default:
      return 'includesString'
  }
}

function buildActionsColumn(actions: ActionItem[]): ColumnDef<DynamicRecord> {
  return createActionsColumn<DynamicRecord>({
    actions,
    menuLabel: 'Acciones'
  })
}

interface DynamicDataTableProps {
  // Esquema a usar
  schemaName: string
  
  // Datos
  data: DynamicRecord[]
  
  // Opciones de override
  optionsOverride?: Partial<DataTableOptions>
  
  // Columnas personalizadas
  customColumns?: Record<string, ColumnDef<DynamicRecord>>
  
  // Acciones
  enableActions?: boolean
  actions?: ActionItem[]
  
  // Estados de carga
  loading?: boolean
  
  // Callbacks
  onSchemaLoaded?: (schema: TableSchema) => void
  onError?: (error: Error) => void
}

// Interfaz para usar un esquema directamente (para casos de runtime)
interface DynamicDataTableFromSchemaProps {
  // Esquema directo
  schemaConfig: TableSchema
  
  // Datos
  data: DynamicRecord[]
  
  // Opciones de override
  optionsOverride?: Partial<DataTableOptions>
  
  // Columnas personalizadas
  customColumns?: Record<string, ColumnDef<DynamicRecord>>
  
  // Acciones
  enableActions?: boolean
  actions?: ActionItem[]
  
  // Estados de carga
  loading?: boolean
}

export function DynamicDataTable({
  schemaName,
  data,
  optionsOverride = {},
  customColumns = {},
  enableActions = false,
  actions = [],
  loading = false,
  onSchemaLoaded,
  onError
}: DynamicDataTableProps) {
  const [error, setError] = useState<Error | null>(null)

  // Obtener esquema síncronamente
  const schema = useMemo(() => {
    try {
      const targetSchema = schemaManager.getSchema(schemaName)
      
      if (!targetSchema) {
        throw new Error(`Schema not found: ${schemaName}`)
      }
      
      onSchemaLoaded?.(targetSchema)
      return targetSchema
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      onError?.(error)
      return null
    }
  }, [schemaName, onSchemaLoaded, onError])

  // Construir columnas dinámicamente
  const columns = useMemo(() => {
    if (!schema) return []

    // Construir columnas base
    const baseColumns = schema.fields.map(field => buildColumn(field))
    
    // Agregar columnas personalizadas
    if (customColumns) {
      Object.entries(customColumns).forEach(([key, customColumn]) => {
        const existingIndex = baseColumns.findIndex(col => (col as any).accessorKey === key)
        if (existingIndex !== -1) {
          baseColumns[existingIndex] = { ...baseColumns[existingIndex], ...customColumn }
        } else {
          baseColumns.push(customColumn)
        }
      })
    }

    // Agregar columna de acciones si está habilitada
    if (enableActions && actions.length > 0) {
      baseColumns.push(buildActionsColumn(actions))
    }

    return baseColumns
  }, [schema, customColumns, enableActions, actions])

  // Construir opciones de tabla
  const tableOptions = useMemo(() => {
    if (!schema) return {}

    const baseOptions: DataTableOptions = {
      searchKey: schema.tableOptions?.searchKey,
      searchPlaceholder: schema.tableOptions?.searchPlaceholder || 'Buscar...',
      defaultFilters: schema.tableOptions?.defaultFilters || [],
      enableSorting: schema.tableOptions?.enableSorting !== false,
      enableFiltering: schema.tableOptions?.enableFiltering !== false,
      enableSearch: schema.tableOptions?.enableSearch !== false,
      pageSize: schema.tableOptions?.pageSize || 10,
      showToolbar: schema.tableOptions?.showToolbar !== false
    }

    return { ...baseOptions, ...optionsOverride }
  }, [schema, optionsOverride])

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-red-600">Error: {error.message}</div>
      </div>
    )
  }

  if (!schema) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-muted-foreground">Esquema no encontrado</div>
      </div>
    )
  }

  return (
    <DataTableWithDynamicToolbar
      columns={columns}
      data={data}
      options={tableOptions}
      loading={loading}
    />
  )
}

// Componente que acepta un esquema directamente
export function DynamicDataTableFromSchema({
  schemaConfig,
  data,
  optionsOverride = {},
  customColumns = {},
  enableActions = false,
  actions = [],
  loading = false
}: DynamicDataTableFromSchemaProps) {
  // Construir columnas dinámicamente
  const columns = useMemo(() => {
    if (!schemaConfig) return []

    // Construir columnas base
    const baseColumns = schemaConfig.fields.map(field => buildColumn(field))
    
    // Agregar columnas personalizadas
    if (customColumns) {
      Object.entries(customColumns).forEach(([key, customColumn]) => {
        const existingIndex = baseColumns.findIndex(col => (col as any).accessorKey === key)
        if (existingIndex !== -1) {
          baseColumns[existingIndex] = { ...baseColumns[existingIndex], ...customColumn }
        } else {
          baseColumns.push(customColumn)
        }
      })
    }

    // Agregar columna de acciones si está habilitada
    if (enableActions && actions.length > 0) {
      baseColumns.push(buildActionsColumn(actions))
    }

    return baseColumns
  }, [schemaConfig, customColumns, enableActions, actions])

  // Construir opciones de tabla
  const tableOptions = useMemo(() => {
    if (!schemaConfig) return {}

    const baseOptions: DataTableOptions = {
      searchKey: schemaConfig.tableOptions?.searchKey,
      searchPlaceholder: schemaConfig.tableOptions?.searchPlaceholder || 'Buscar...',
      defaultFilters: schemaConfig.tableOptions?.defaultFilters || [],
      enableSorting: schemaConfig.tableOptions?.enableSorting !== false,
      enableFiltering: schemaConfig.tableOptions?.enableFiltering !== false,
      enableSearch: schemaConfig.tableOptions?.enableSearch !== false,
      pageSize: schemaConfig.tableOptions?.pageSize || 10,
      showToolbar: schemaConfig.tableOptions?.showToolbar !== false
    }

    return { ...baseOptions, ...optionsOverride }
  }, [schemaConfig, optionsOverride])

  if (!schemaConfig) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-muted-foreground">Esquema no proporcionado</div>
      </div>
    )
  }

  return (
    <DataTableWithDynamicToolbar
      columns={columns}
      data={data}
      options={tableOptions}
      loading={loading}
    />
  )
}

// Hook para crear esquemas dinámicos en tiempo de ejecución
export function useDynamicSchema(
  name: string,
  fields: Array<{
    key: string
    label: string
    type: string
    options?: any[]
  }>,
  options: any = {}
) {
  const [schema, setSchema] = useState<TableSchema | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoizar fields y options para evitar re-renders infinitos
  const fieldsKey = useMemo(() => JSON.stringify(fields), [fields])
  const optionsKey = useMemo(() => JSON.stringify(options), [options])

  useEffect(() => {
    if (!mounted) return
    
    try {
      const dynamicSchema = schemaManager.createDynamicSchema(name, fields, options)
      setSchema(dynamicSchema)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setSchema(null)
    }
  }, [mounted, name, fieldsKey, optionsKey, fields, options])

  return { schema, error }
}
