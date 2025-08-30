"use client"

import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { columns, getTableOptionsFromConfig } from "@/lib/column-factory"
import { taskData } from "@/app/data"
import { CodeBlock } from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FiltersExamplePage() {
  const options = getTableOptionsFromConfig()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Dynamic Filters</h1>
        <p className="text-xl text-muted-foreground">
          Sistema avanzado de filtros dinámicos que se adaptan automáticamente al esquema de datos.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Demo</h2>
          <div className="rounded-lg border bg-card p-6">
            <DataTableWithDynamicToolbar
              columns={columns}
              data={taskData}
              options={options}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Código</h2>
          <Tabs defaultValue="component" className="w-full">
            <TabsList>
              <TabsTrigger value="component">Componente</TabsTrigger>
              <TabsTrigger value="options">Configuración</TabsTrigger>
              <TabsTrigger value="usage">Uso</TabsTrigger>
            </TabsList>
            
            <TabsContent value="component">
              <CodeBlock
                language="tsx"
                code={`import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { columns, getTableOptionsFromConfig } from "@/lib/column-factory"
import { taskData } from "./data"

export default function FiltersExample() {
  const options = getTableOptionsFromConfig()

  return (
    <div className="container mx-auto py-10">
      <DataTableWithDynamicToolbar
        columns={columns}
        data={taskData}
        options={options}
      />
    </div>
  )
}`}
              />
            </TabsContent>
            
            <TabsContent value="options">
              <CodeBlock
                language="tsx"
                code={`export const getTableOptionsFromConfig = (): DataTableOptions => ({
  enableGlobalFilter: true,
  enableColumnFilters: true,
  enableSorting: true,
  enableRowSelection: true,
  enablePagination: true,
  pageSize: 10,
  
  // Configuración de filtros
  filters: {
    status: {
      type: "select",
      options: ["todo", "in-progress", "done", "canceled"],
      placeholder: "Filter by status..."
    },
    priority: {
      type: "select", 
      options: ["low", "medium", "high"],
      placeholder: "Filter by priority..."
    },
    label: {
      type: "select",
      options: ["bug", "feature", "documentation"],
      placeholder: "Filter by label..."
    }
  },
  
  // Configuración de toolbar
  toolbar: {
    enableSearch: true,
    enableFilters: true,
    enableViewOptions: true,
    searchPlaceholder: "Search tasks..."
  }
})`}
              />
            </TabsContent>
            
            <TabsContent value="usage">
              <CodeBlock
                language="tsx"
                code={`// Los filtros se pueden configurar dinámicamente
// basándose en el esquema de los datos

interface FilterConfig {
  [key: string]: {
    type: "select" | "input" | "date" | "number"
    options?: string[]
    placeholder?: string
    min?: number
    max?: number
  }
}

// Configuración de filtros por columna
const filterConfig: FilterConfig = {
  status: {
    type: "select",
    options: ["todo", "in-progress", "done", "canceled"],
    placeholder: "All statuses"
  },
  priority: {
    type: "select", 
    options: ["low", "medium", "high"],
    placeholder: "All priorities"
  },
  // Filtros automáticos basados en tipo de dato
  createdAt: {
    type: "date",
    placeholder: "Select date range"
  },
  assigneeCount: {
    type: "number",
    min: 0,
    max: 100,
    placeholder: "Min assignees"
  }
}`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Características</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">🔍 Búsqueda Global</h3>
              <p className="text-sm text-muted-foreground">
                Busca en todas las columnas simultáneamente con una sola barra de búsqueda.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🎯 Filtros por Columna</h3>
              <p className="text-sm text-muted-foreground">
                Filtros específicos por cada columna con diferentes tipos de controles.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📋 Filtros Activos</h3>
              <p className="text-sm text-muted-foreground">
                Visualiza y gestiona todos los filtros activos con badges removibles.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">⚡ Auto-configuración</h3>
              <p className="text-sm text-muted-foreground">
                Los filtros se configuran automáticamente basándose en el tipo de datos.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tipos de Filtros Soportados</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Select</h3>
              <p className="text-sm text-muted-foreground">
                Dropdown con opciones predefinidas
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Input</h3>
              <p className="text-sm text-muted-foreground">
                Campo de texto libre
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Date</h3>
              <p className="text-sm text-muted-foreground">
                Selector de fechas y rangos
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Number</h3>
              <p className="text-sm text-muted-foreground">
                Rangos numéricos con min/max
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
