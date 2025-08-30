"use client"

import { useState } from "react"
import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { createFormattedColumns } from "@/lib/formatters-integration"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Layout, LayoutGrid } from "lucide-react"

// Datos de ejemplo para demostrar los layouts
const sampleData = [
  {
    id: "1",
    title: "Implementar autenticación",
    status: "in-progress",
    priority: "high",
    assignedTo: "Juan Pérez",
    estimate: 8,
    category: "feature",
    tags: "backend,security"
  },
  {
    id: "2",
    title: "Corregir error en el login",
    status: "todo",
    priority: "high",
    assignedTo: "María García",
    estimate: 4,
    category: "bug",
    tags: "frontend,urgent"
  },
  {
    id: "3",
    title: "Actualizar documentación",
    status: "done",
    priority: "low",
    assignedTo: "Carlos López",
    estimate: 2,
    category: "documentation",
    tags: "docs,content"
  },
  {
    id: "4",
    title: "Optimizar base de datos",
    status: "backlog",
    priority: "medium",
    assignedTo: "Ana Martín",
    estimate: 12,
    category: "improvement",
    tags: "database,performance"
  },
  {
    id: "5",
    title: "Diseñar nueva interfaz",
    status: "in-progress",
    priority: "medium",
    assignedTo: "David Silva",
    estimate: 16,
    category: "design",
    tags: "ui,ux"
  }
]

// Configuración de columnas con formatters
const columnsConfig = [
  { key: "id", label: "ID" },
  { key: "title", label: "Título" },
  { 
    key: "status", 
    label: "Estado",
    formatter: {
      type: "badge" as const,
      options: {
        valueMap: {
          "todo": { label: "Por hacer", className: "bg-gray-100 text-gray-800" },
          "in-progress": { label: "En progreso", className: "bg-blue-100 text-blue-800" },
          "done": { label: "Completado", className: "bg-green-100 text-green-800" },
          "backlog": { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" }
        }
      }
    }
  },
  { 
    key: "priority", 
    label: "Prioridad",
    formatter: {
      type: "badge" as const,
      options: {
        valueMap: {
          "low": { label: "Baja", className: "bg-green-100 text-green-700" },
          "medium": { label: "Media", className: "bg-yellow-100 text-yellow-700" },
          "high": { label: "Alta", className: "bg-red-100 text-red-700" }
        }
      }
    }
  },
  { key: "assignedTo", label: "Asignado a" },
  { key: "estimate", label: "Estimación (hrs)" },
  { 
    key: "category", 
    label: "Categoría",
    formatter: {
      type: "badge" as const,
      options: {
        valueMap: {
          "feature": { label: "Feature", className: "bg-blue-100 text-blue-800" },
          "bug": { label: "Bug", className: "bg-red-100 text-red-800" },
          "documentation": { label: "Docs", className: "bg-purple-100 text-purple-800" },
          "improvement": { label: "Mejora", className: "bg-green-100 text-green-800" },
          "design": { label: "Diseño", className: "bg-pink-100 text-pink-800" }
        }
      }
    }
  }
]

export default function FiltersLayoutDemo() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Crear columnas con formatters
  const formattedColumns = createFormattedColumns(columnsConfig)

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Layout className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Demo de Layout de Filtros Configurables</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comparación entre el layout de filtros en línea (inline) vs en nueva línea (newline).
          Agregue filtros y observe cómo se comportan según la configuración.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            ⚙️ Layout Configurable
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            📱 Responsive
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            🎨 Filtros Dinámicos
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="newline" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="newline" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Nueva Línea
            </TabsTrigger>
            <TabsTrigger value="inline" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              En Línea
            </TabsTrigger>
          </TabsList>
          
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refrescar
          </Button>
        </div>

        <TabsContent value="newline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5" />
                Layout: Nueva Línea (por defecto)
              </CardTitle>
              <CardDescription>
                Los filtros activos se muestran en una nueva línea debajo de la barra de herramientas principal.
                Esta es la configuración por defecto y proporciona más espacio para los filtros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableWithDynamicToolbar
                key={`newline-${refreshKey}`}
                columns={formattedColumns}
                data={sampleData}
                options={{
                  searchKey: "title",
                  searchPlaceholder: "Buscar tareas...",
                  defaultFilters: ["status", "priority"],
                  showViewOptions: true,
                  showAddFilter: true,
                  filtersLayout: "newline"  // Layout en nueva línea
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Layout: En Línea
              </CardTitle>
              <CardDescription>
                Los filtros activos se muestran en la misma línea que la barra de herramientas,
                maximizando el espacio vertical disponible. Ideal para interfaces compactas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableWithDynamicToolbar
                key={`inline-${refreshKey}`}
                columns={formattedColumns}
                data={sampleData}
                options={{
                  searchKey: "title",
                  searchPlaceholder: "Buscar tareas...",
                  defaultFilters: ["status", "priority"],
                  showViewOptions: true,
                  showAddFilter: true,
                  filtersLayout: "inline"  // Layout en línea
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🔧 Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Layout Nueva Línea:</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`options={{
  filtersLayout: "newline"
}}`}
              </pre>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Layout En Línea:</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`options={{
  filtersLayout: "inline"
}}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💡 Recomendaciones de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <h4 className="font-semibold text-green-700">Nueva Línea (recomendado):</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Muchos filtros activos</li>
                <li>• Nombres de filtro largos</li>
                <li>• Mejor legibilidad</li>
                <li>• Tablets y desktop</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-blue-700">En Línea:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pocos filtros (1-3)</li>
                <li>• Espacio vertical limitado</li>
                <li>• Interfaces compactas</li>
                <li>• Dashboards densas</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📝 Instrucciones</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Seleccione una pestaña para ver el layout correspondiente</li>
            <li>Use el botón <strong>"Add Filter"</strong> para agregar más filtros</li>
            <li>Configure valores en los filtros para ver cómo se muestran</li>
            <li>Compare la diferencia de espacio y organización entre ambos layouts</li>
            <li>Note cómo los filtros inline se muestran en la misma línea que los controles</li>
            <li>Los filtros de nueva línea aparecen debajo con más espacio</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
