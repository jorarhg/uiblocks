
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { createFormattedColumns } from '@/lib/formatters-integration'
import { ExtendedColumnConfig } from '@/types/formatters'
import { createActionsColumn, defaultActions } from "@/components/data-table"
import type { DataTableOptions } from "@/components/dynamic-toolbar"

export type TaskWithFormatters = {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "done" | "canceled"
  priority: "low" | "medium" | "high"
  type: "bug" | "feature" | "documentation"
  estimate?: number
  createdAt?: string
  dueDate?: string
  assignedTo?: string
  progress?: number
  budget?: number
  isUrgent?: boolean
}

/**
 * Configuración de columnas con formatters para el sistema de tareas
 */
const TASK_COLUMNS_CONFIG: ExtendedColumnConfig[] = [
  {
    key: "id",
    label: "Task ID",
    formatter: {
      type: "custom",
      options: {
        template: "TASK-{value}",
        className: "font-mono text-sm bg-gray-100 px-2 py-1 rounded"
      }
    }
  },
  {
    key: "title",
    label: "Título",
    formatter: {
      type: "default",
      options: {
        className: "font-medium"
      }
    }
  },
  {
    key: "status",
    label: "Estado",
    formatter: {
      type: "badge",
      options: {
        variant: "outline",
        valueMap: {
          "backlog": {
            label: "Pendiente",
            icon: "circle-dashed",
            className: "bg-gray-50 text-gray-700 border-gray-200"
          },
          "todo": {
            label: "Por Hacer",
            icon: "circle",
            className: "bg-blue-50 text-blue-700 border-blue-200"
          },
          "in-progress": {
            label: "En Progreso",
            icon: "clock",
            className: "bg-yellow-50 text-yellow-700 border-yellow-200"
          },
          "done": {
            label: "Completado",
            icon: "check-circle",
            className: "bg-green-50 text-green-700 border-green-200"
          },
          "canceled": {
            label: "Cancelado",
            icon: "x-circle",
            className: "bg-red-50 text-red-700 border-red-200"
          }
        }
      }
    }
  },
  {
    key: "priority",
    label: "Prioridad",
    formatter: {
      type: "badge",
      options: {
        valueMap: {
          "high": {
            label: "Alta",
            variant: "destructive",
            className: "font-semibold"
          },
          "medium": {
            label: "Media",
            variant: "outline",
            className: "bg-yellow-50 text-yellow-700 border-yellow-200"
          },
          "low": {
            label: "Baja",
            variant: "secondary"
          }
        }
      }
    }
  },
  {
    key: "type",
    label: "Tipo",
    formatter: {
      type: "icon-text",
      options: {
        iconPosition: "left",
        valueMap: {
          "bug": {
            icon: "alert-circle",
            className: "text-red-600",
            label: "Bug"
          },
          "feature": {
            icon: "star", 
            className: "text-blue-600",
            label: "Feature"
          },
          "documentation": {
            icon: "file-text",
            className: "text-green-600",
            label: "Docs"
          }
        }
      }
    }
  },
  {
    key: "progress",
    label: "Progreso",
    formatter: {
      type: "percentage",
      options: {
        decimals: 0,
        className: "font-medium",
        conditionalFormatting: [
          {
            condition: "value >= 0.8",
            className: "text-green-600 bg-green-50 px-2 py-1 rounded"
          },
          {
            condition: "value >= 0.5",
            className: "text-yellow-600 bg-yellow-50 px-2 py-1 rounded"
          },
          {
            condition: "value < 0.5",
            className: "text-red-600 bg-red-50 px-2 py-1 rounded"
          }
        ]
      }
    }
  },
  {
    key: "budget",
    label: "Presupuesto",
    formatter: {
      type: "currency",
      options: {
        currency: "EUR",
        decimals: 2,
        className: "font-semibold text-green-600"
      }
    }
  },
  {
    key: "estimate",
    label: "Estimación",
    formatter: {
      type: "custom",
      options: {
        template: "{value}h",
        className: "font-medium",
        conditionalFormatting: [
          {
            condition: "value > 20",
            className: "text-red-600 font-bold bg-red-50 px-2 py-1 rounded"
          },
          {
            condition: "value <= 4",
            className: "text-green-600 bg-green-50 px-2 py-1 rounded"
          }
        ]
      }
    }
  },
  {
    key: "createdAt",
    label: "Fecha de Creación",
    formatter: {
      type: "date",
      options: {
        format: "medium",
        locale: "es-ES",
        className: "text-muted-foreground text-sm"
      }
    }
  },
  {
    key: "dueDate",
    label: "Fecha Límite",
    formatter: {
      type: "date",
      options: {
        format: "relative",
        locale: "es-ES",
        className: "text-sm",
        conditionalFormatting: [
          {
            condition: "(new Date(value) - new Date()) < 7*24*60*60*1000 && (new Date(value) - new Date()) > 0",
            className: "text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded"
          },
          {
            condition: "(new Date(value) - new Date()) < 0",
            className: "text-red-600 font-bold bg-red-50 px-2 py-1 rounded"
          }
        ]
      }
    }
  },
  {
    key: "assignedTo",
    label: "Asignado a",
    formatter: {
      type: "icon-text",
      options: {
        icon: "user",
        iconPosition: "left",
        className: "text-blue-600"
      }
    }
  },
  {
    key: "isUrgent",
    label: "Urgente",
    formatter: {
      type: "badge",
      options: {
        valueMap: {
          "true": {
            label: "Urgente",
            variant: "destructive",
            icon: "zap"
          },
          "false": {
            label: "Normal",
            variant: "secondary"
          }
        }
      }
    }
  }
]

/**
 * Crea las columnas completas incluyendo select y acciones
 */
export function createTaskColumnsWithFormatters(): ColumnDef<TaskWithFormatters>[] {
  // Crear columnas con formatters
  const formattedColumns = createFormattedColumns<TaskWithFormatters>(TASK_COLUMNS_CONFIG)
  
  // Columna de selección
  const selectColumn: ColumnDef<TaskWithFormatters> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }

  // Columna de acciones
  const actionsColumn = createActionsColumn<TaskWithFormatters>({
    actions: [
      defaultActions.view((task) => {
        console.log('Ver detalles de:', task)
      }),
      defaultActions.copy((task) => {
        navigator.clipboard.writeText(task.id)
        console.log('ID copiado:', task.id)
      }),
      defaultActions.edit((task) => {
        console.log('Editar task:', task)
      }),
      defaultActions.delete((task) => {
        console.log('Eliminar task:', task)
      }),
    ],
    menuLabel: "Acciones"
  })

  return [
    selectColumn,
    ...formattedColumns,
    actionsColumn
  ]
}

/**
 * Opciones por defecto para el DataTable con formatters
 */
export function getTaskTableOptions(): DataTableOptions {
  return {
    searchKey: "title",
    searchPlaceholder: "Buscar tareas...",
    defaultFilters: ["status", "priority", "type"],
    showViewOptions: true,
    showAddFilter: true,
    className: ""
  }
}

/**
 * Configuración desde JSON - ejemplo de cómo cargar desde archivo
 */
export async function loadTaskColumnsFromJSON(): Promise<{
  columns: ColumnDef<TaskWithFormatters>[]
  options: DataTableOptions
}> {
  try {
    // En un caso real, esto vendría de una API o archivo JSON
    const config = {
      columns: TASK_COLUMNS_CONFIG,
      options: getTaskTableOptions()
    }
    
    const formattedColumns = createFormattedColumns<TaskWithFormatters>(config.columns)
    
    // Agregar columnas especiales
    const selectColumn: ColumnDef<TaskWithFormatters> = {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }

    const actionsColumn = createActionsColumn<TaskWithFormatters>({
      actions: [
        defaultActions.view((task) => console.log('Ver:', task)),
        defaultActions.copy((task) => navigator.clipboard.writeText(task.id)),
        defaultActions.edit((task) => console.log('Editar:', task)),
        defaultActions.delete((task) => console.log('Eliminar:', task)),
      ],
      menuLabel: "Acciones"
    })

    return {
      columns: [selectColumn, ...formattedColumns, actionsColumn],
      options: config.options
    }
  } catch (error) {
    console.error('Error loading columns from JSON:', error)
    // Fallback a columnas por defecto
    return {
      columns: createTaskColumnsWithFormatters(),
      options: getTaskTableOptions()
    }
  }
}

// Exportar la configuración para uso directo
export { TASK_COLUMNS_CONFIG }
