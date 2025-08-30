import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CircleCheck, CircleDashed, Clock, XCircle, Copy, Eye, Edit, Trash2 } from "lucide-react"
import type { DataTableOptions } from "@/components/dynamic-toolbar"
import { createActionsColumn, defaultActions } from "@/components/data-table"

export type Task = {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "done" | "canceled"
  priority: "low" | "medium" | "high"
  type: "bug" | "feature" | "documentation"
  estimate?: number
  createdAt?: string
  isUrgent?: boolean
}

// Cargar configuración JSON dinámicamente
async function loadConfig() {
  try {
    const response = await fetch('/datatable-config.json')
    return await response.json()
  } catch (error) {
    console.warn('Could not load config from JSON, using fallback')
    return getFallbackConfig()
  }
}

// Configuración de respaldo si no se puede cargar el JSON
function getFallbackConfig() {
  return {
    tableOptions: {
      searchKey: "title",
      searchPlaceholder: "Escriba su búsqueda...",
      defaultFilters: ["status", "priority"],
      showViewOptions: true,
      showAddFilter: true,
      className: ""
    },
    statusMap: {
      backlog: { icon: "CircleDashed", label: "Backlog" },
      todo: { icon: "CircleDashed", label: "Todo" },
      "in-progress": { icon: "Clock", label: "In Progress" },
      done: { icon: "CircleCheck", label: "Done" },
      canceled: { icon: "XCircle", label: "Canceled" },
    },
    priorityMap: {
      high: { variant: "outline", className: "bg-red-50 text-red-700 border-red-200", label: "High" },
      medium: { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", label: "Medium" },
      low: { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", label: "Low" }
    },
    ui: {
      texts: {
        selectAll: "Select all",
        selectRow: "Select row", 
        actions: "Actions",
        copyTaskId: "Copy task ID",
        viewDetails: "View details",
        editTask: "Edit task",
        deleteTask: "Delete task",
        openMenu: "Open menu",
        estimateEmpty: "-",
        dateEmpty: "-",
        urgentYes: "Yes",
        urgentNo: "No"
      }
    }
  }
}

// Configuración estática para SSR/build time
const staticConfig = getFallbackConfig()

// Mapeo de iconos
const iconMap = {
  CircleDashed,
  Clock,
  CircleCheck,
  XCircle,
}

// Función para generar columnas desde configuración
function createColumnsFromConfig(config: any): ColumnDef<Task>[] {
  const { statusMap, priorityMap, ui } = config
  const texts = ui?.texts || config.ui?.texts || staticConfig.ui.texts

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={texts.selectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={texts.selectRow}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Task",
      cell: ({ row }) => <div className="font-medium">TASK-{row.getValue("id")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return (
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
        )
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusInfo = statusMap?.[status] || staticConfig.statusMap[status as keyof typeof staticConfig.statusMap]
        
        if (!statusInfo) return <span>{status}</span>
        
        const IconComponent = iconMap[statusInfo.icon as keyof typeof iconMap]
        
        return (
          <div className="flex items-center">
            {IconComponent && <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>{statusInfo.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        const priorityInfo = priorityMap?.[priority] || staticConfig.priorityMap[priority as keyof typeof staticConfig.priorityMap]
        
        if (!priorityInfo) return <span>{priority}</span>
        
        return (
          <div className="flex items-center">
            <Badge variant={priorityInfo.variant as any} className={priorityInfo.className}>
              {priorityInfo.label}
            </Badge>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "estimate",
      header: "Estimate (hrs)",
      cell: ({ row }) => {
        const estimate = row.getValue("estimate") as number
        return estimate ? <span>{estimate}h</span> : <span className="text-muted-foreground">{texts.estimateEmpty}</span>
      },
    },
    {
      accessorKey: "createdAt", 
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string
        return date ? <span>{date}</span> : <span className="text-muted-foreground">{texts.dateEmpty}</span>
      },
    },
    {
      accessorKey: "isUrgent",
      header: "Urgent", 
      cell: ({ row }) => {
        const isUrgent = row.getValue("isUrgent") as boolean
        return (
          <Badge variant={isUrgent ? "destructive" : "secondary"}>
            {isUrgent ? texts.urgentYes : texts.urgentNo}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        if (!value || (typeof value === "object" && !value.true && !value.false)) {
          return true
        }
        
        const cellValue = row.getValue(id) as boolean
        
        if (typeof value === "object" && (value.true !== undefined || value.false !== undefined)) {
          const shouldShowTrue = value.true === true
          const shouldShowFalse = value.false === true
          
          if (shouldShowTrue && shouldShowFalse) {
            return true
          } else if (shouldShowTrue) {
            return cellValue === true
          } else if (shouldShowFalse) {
            return cellValue === false
          }
          return false
        }
        
        return cellValue === value
      },
    },
    // Columna de acciones estándar
    createActionsColumn<Task>({
      actions: [
        defaultActions.view((task) => {
          console.log('Ver detalles de:', task)
          // Aquí se puede implementar la lógica de visualización
        }),
        defaultActions.copy((task) => {
          navigator.clipboard.writeText(task.id)
          console.log('ID copiado:', task.id)
        }),
        defaultActions.edit((task) => {
          console.log('Editar task:', task)
          // Aquí se puede implementar la lógica de edición
        }),
        defaultActions.delete((task) => {
          console.log('Eliminar task:', task)
          // Aquí se puede implementar la lógica de eliminación
        }),
      ],
      menuLabel: texts.actions
    }),
  ]
}

// Columnas por defecto usando configuración estática
export const columns: ColumnDef<Task>[] = createColumnsFromConfig(staticConfig)

// Función para obtener las opciones del DataTable desde configuración 
export function getTableOptionsFromConfig(): DataTableOptions {
  return staticConfig.tableOptions as DataTableOptions
}

// Función para cargar configuración y regenerar columnas dinámicamente
export async function getConfigFromJSON() {
  const config = await loadConfig()
  return {
    columns: createColumnsFromConfig(config),
    options: config.tableOptions as DataTableOptions,
    config
  }
}
