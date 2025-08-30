// ESTRATEGIA 1: Metadatos en las columnas
export const columnsWithMetadata: ColumnDef<Task>[] = [
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      // Configuración explícita del filtro
      filter: {
        type: "faceted",
        options: [
          { label: "Backlog", value: "backlog", icon: CircleDashed },
          { label: "Todo", value: "todo", icon: Clock },
          { label: "In Progress", value: "in-progress", icon: CircleDashed },
          { label: "Done", value: "done", icon: CircleCheck },
          { label: "Canceled", value: "canceled", icon: XCircle },
        ]
      }
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <StatusBadge status={status} />
    }
  },
  {
    accessorKey: "isUrgent",
    header: "Urgent",
    meta: {
      filter: {
        type: "boolean",
        trueLabel: "Yes",
        falseLabel: "No",
        // Mapeo entre datos y visualización
        valueMap: { true: "Yes", false: "No" }
      }
    },
    cell: ({ row }) => {
      const isUrgent = row.getValue("isUrgent") as boolean
      return (
        <Badge variant={isUrgent ? "destructive" : "secondary"}>
          {isUrgent ? "Yes" : "No"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "estimate",
    header: "Estimate",
    meta: {
      filter: {
        type: "range",
        dataType: "number",
        unit: "hours",
        min: 0,
        max: 100
      }
    }
  },
  {
    accessorKey: "title",
    header: "Title",
    meta: {
      filter: {
        type: "search",
        searchable: true,
        placeholder: "Search by title..."
      }
    }
  }
]

// ESTRATEGIA 2: Esquemas de datos automáticos
export interface DataSchema {
  [key: string]: {
    type: "string" | "number" | "boolean" | "date" | "enum"
    enum?: string[]
    format?: string
    nullable?: boolean
    filter?: {
      type?: "search" | "faceted" | "range" | "boolean"
      options?: { label: string; value: string }[]
    }
  }
}

export const taskSchema: DataSchema = {
  id: { type: "string", filter: { type: "search" } },
  title: { type: "string", filter: { type: "search" } },
  status: { 
    type: "enum", 
    enum: ["backlog", "todo", "in-progress", "done", "canceled"],
    filter: { type: "faceted" }
  },
  priority: { 
    type: "enum", 
    enum: ["low", "medium", "high"],
    filter: { type: "faceted" }
  },
  estimate: { 
    type: "number", 
    filter: { type: "range" }
  },
  createdAt: { 
    type: "date", 
    format: "YYYY-MM-DD",
    filter: { type: "range" }
  },
  isUrgent: { 
    type: "boolean",
    filter: { type: "boolean" }
  }
}

// ESTRATEGIA 3: Convención por nombres
export const filterByNamingConvention = {
  // Patrones de nombres que auto-detectan tipos
  patterns: {
    boolean: /^(is|has|can|should|will|did)[A-Z]/,  // isActive, hasPermission
    date: /^(created|updated|deleted|modified)At$/i, // createdAt, updatedAt
    status: /^(status|state)$/i,                     // status, state
    priority: /^priority$/i,                         // priority
    type: /^(type|kind|category)$/i,                 // type, category
    id: /^.*[Ii]d$/,                                // userId, taskId
    search: /^(name|title|description|comment)$/i   // name, title
  }
}

// ESTRATEGIA 4: Análisis inteligente de datos
export const intelligentDataAnalysis = {
  // Detectar tipos por contenido y patrones
  analyzeColumn: (values: any[]) => {
    const nonNullValues = values.filter(v => v != null && v !== "")
    
    if (nonNullValues.length === 0) return { type: "search" }
    
    // Análisis estadístico
    const uniqueValues = new Set(nonNullValues)
    const uniqueRatio = uniqueValues.size / nonNullValues.length
    
    // Detectar booleanos por contenido
    if (uniqueValues.size <= 2) {
      const stringValues = Array.from(uniqueValues).map(v => String(v).toLowerCase())
      const booleanPatterns = [
        ["true", "false"], ["yes", "no"], ["1", "0"], 
        ["on", "off"], ["enabled", "disabled"], ["active", "inactive"]
      ]
      
      if (booleanPatterns.some(pattern => 
        pattern.every(p => stringValues.includes(p))
      )) {
        return { type: "boolean", values: Array.from(uniqueValues) }
      }
    }
    
    // Detectar números
    if (nonNullValues.every(v => !isNaN(Number(v)))) {
      return { type: "range", dataType: "number" }
    }
    
    // Detectar fechas
    if (nonNullValues.every(v => {
      const date = new Date(v)
      return !isNaN(date.getTime())
    })) {
      return { type: "range", dataType: "date" }
    }
    
    // Detectar enums (baja cardinalidad + alta repetición)
    if (uniqueValues.size <= 10 && uniqueRatio < 0.8) {
      return { 
        type: "faceted", 
        options: Array.from(uniqueValues).map(v => ({
          label: String(v),
          value: String(v)
        }))
      }
    }
    
    // Por defecto, búsqueda
    return { type: "search" }
  }
}
