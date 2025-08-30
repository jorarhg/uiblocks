import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { FieldSchema, DynamicRecord } from '@/types/schema'
import { getCellRenderer } from './cell-renderers'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Eye, Edit, Copy, Trash2 } from 'lucide-react'
import { createActionsColumn, ActionItem } from '@/components/data-table'

export class ColumnBuilder {
  /**
   * Construye columnas dinámicamente basado en esquema de campos
   */
  buildColumns(fields: FieldSchema[]): ColumnDef<DynamicRecord>[] {
    return fields.map(field => this.buildColumn(field))
  }

  /**
   * Construye una columna individual
   */
  private buildColumn(field: FieldSchema): ColumnDef<DynamicRecord> {
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
      filterFn: this.getFilterFunction(field) as any
    }

    return column
  }

  /**
   * Obtiene la función de filtrado apropiada para el tipo de campo
   */
  private getFilterFunction(field: FieldSchema) {
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

  /**
   * Construye columnas con configuración avanzada
   */
  buildAdvancedColumns(
    fields: FieldSchema[], 
    options: {
      enableActions?: boolean
      actionColumn?: ColumnDef<DynamicRecord>
      customColumns?: Record<string, ColumnDef<DynamicRecord>>
    } = {}
  ): ColumnDef<DynamicRecord>[] {
    const baseColumns = this.buildColumns(fields)
    
    // Agregar columnas personalizadas
    if (options.customColumns) {
      Object.entries(options.customColumns).forEach(([key, customColumn]) => {
        const existingIndex = baseColumns.findIndex(col => (col as any).accessorKey === key)
        if (existingIndex !== -1) {
          baseColumns[existingIndex] = { ...baseColumns[existingIndex], ...customColumn }
        } else {
          baseColumns.push(customColumn)
        }
      })
    }

    // Agregar columna de acciones si está habilitada
    if (options.enableActions && options.actionColumn) {
      baseColumns.push(options.actionColumn)
    }

    return baseColumns
  }

  /**
   * Construye una columna de acciones usando el sistema estándar
   */
  buildActionsColumn(actions: ActionItem[]): ColumnDef<DynamicRecord> {
    return createActionsColumn<DynamicRecord>({
      actions,
      menuLabel: 'Acciones'
    })
  }

  /**
   * Método auxiliar para crear acciones comunes
   */
  createCommonActions(
    handlers: {
      onView?: (record: DynamicRecord) => void
      onEdit?: (record: DynamicRecord) => void
      onDelete?: (record: DynamicRecord) => void
      onCopy?: (record: DynamicRecord) => void
    }
  ): ActionItem[] {
    const actions: ActionItem[] = []
    
    if (handlers.onView) {
      actions.push({
        id: 'view',
        label: 'Ver detalles',
        icon: Eye,
        onClick: handlers.onView
      })
    }

    if (handlers.onEdit) {
      actions.push({
        id: 'edit',
        label: 'Editar',
        icon: Edit,
        onClick: handlers.onEdit
      })
    }

    if (handlers.onCopy) {
      actions.push({
        id: 'copy',
        label: 'Duplicar',
        icon: Copy,
        onClick: handlers.onCopy
      })
    }

    if (handlers.onDelete) {
      actions.push({
        id: 'delete',
        label: 'Eliminar',
        icon: Trash2,
        onClick: handlers.onDelete,
        variant: 'destructive' as const
      })
    }

    return actions
  }
}

// Instancia singleton
export const columnBuilder = new ColumnBuilder()
