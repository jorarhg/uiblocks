"use client"

import { useState } from "react"
import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { createFormattedColumns } from "@/lib/formatters-integration"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Palette } from "lucide-react"

// Datos de ejemplo para demostrar los formatters
const formattersDemoData = [
  {
    id: "1",
    title: "Implementar sistema de autenticación",
    status: "in-progress",
    priority: "high",
    progress: 0.75,
    budget: 2500.50,
    createdAt: "2025-05-15T10:00:00Z",
    dueDate: "2025-06-01T23:59:59Z",
    assignedTo: "Juan Pérez",
    category: "feature",
    repository: "company/auth-system",
    avatar: "/placeholder-user.jpg",
    estimate: 16,
    tags: "<span class='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1'>Backend</span><span class='bg-green-100 text-green-800 px-2 py-1 rounded text-xs'>Security</span>"
  },
  {
    id: "2", 
    title: "Corregir error en el login",
    status: "todo",
    priority: "high",
    progress: 0,
    budget: 800,
    createdAt: "2025-05-20T14:30:00Z",
    dueDate: "2025-05-31T17:00:00Z",
    assignedTo: "María García",
    category: "bug",
    repository: "company/frontend-app",
    avatar: "/placeholder-user.jpg",
    estimate: 4,
    tags: "<span class='bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-1'>Critical</span><span class='bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs'>Frontend</span>"
  },
  {
    id: "3",
    title: "Actualizar documentación de API",
    status: "done",
    priority: "medium",
    progress: 1,
    budget: 300,
    createdAt: "2025-05-10T09:00:00Z",
    dueDate: "2025-05-25T12:00:00Z",
    assignedTo: "Carlos López",
    category: "documentation",
    repository: "company/api-docs",
    avatar: "/placeholder-user.jpg",
    estimate: 8,
    tags: "<span class='bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-1'>Docs</span><span class='bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs'>API</span>"
  },
  {
    id: "4",
    title: "Optimizar rendimiento de la base de datos",
    status: "backlog",
    priority: "low",
    progress: 0.1,
    budget: 5000,
    createdAt: "2025-05-12T16:45:00Z",
    dueDate: "2025-07-15T23:59:59Z",
    assignedTo: "Ana Martínez",
    category: "improvement",
    repository: "company/database-optimization",
    avatar: "/placeholder-user.jpg",
    estimate: 32,
    tags: "<span class='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1'>Performance</span><span class='bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs'>Database</span>"
  },
  {
    id: "5",
    title: "Diseñar nueva interfaz de usuario",
    status: "canceled",
    priority: "medium",
    progress: 0.3,
    budget: 1200,
    createdAt: "2025-04-28T11:20:00Z",
    dueDate: "2025-06-10T18:00:00Z",
    assignedTo: "Luis Rodríguez",
    category: "feature",
    repository: "company/ui-redesign",
    avatar: "/placeholder-user.jpg",
    estimate: 24,
    tags: "<span class='bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-1'>UI/UX</span><span class='bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs'>Design</span>"
  }
]

// Configuración de columnas con formatters
const formattersColumnsConfig = [
  {
    key: "id",
    label: "ID de Tarea",
    formatter: {
      type: "custom" as const,
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
      type: "default" as const,
      options: {
        className: "font-medium max-w-64 truncate"
      }
    }
  },
  {
    key: "status",
    label: "Estado",
    formatter: {
      type: "badge" as const,
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
      type: "badge" as const,
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
    key: "progress",
    label: "Progreso",
    formatter: {
      type: "percentage" as const,
      options: {
        decimals: 0,
        className: "font-semibold",
        conditionalFormatting: [
          {
            condition: "value >= 0.8",
            className: "text-green-600"
          },
          {
            condition: "value >= 0.5",
            className: "text-yellow-600"
          },
          {
            condition: "value < 0.5",
            className: "text-red-600"
          }
        ]
      }
    }
  },
  {
    key: "budget",
    label: "Presupuesto",
    formatter: {
      type: "currency" as const,
      options: {
        currency: "EUR",
        decimals: 2,
        className: "font-semibold text-green-600"
      }
    }
  },
  {
    key: "assignedTo",
    label: "Asignado a",
    formatter: {
      type: "icon-text" as const,
      options: {
        icon: "user",
        iconPosition: "left",
        className: "text-blue-600"
      }
    }
  },
  {
    key: "category",
    label: "Categoría",
    formatter: {
      type: "icon" as const,
      options: {
        valueMap: {
          "bug": {
            icon: "alert-circle",
            className: "text-red-500",
            label: "Bug"
          },
          "feature": {
            icon: "star",
            className: "text-blue-500",
            label: "Feature"
          },
          "documentation": {
            icon: "file-text",
            className: "text-green-500",
            label: "Documentación"
          },
          "improvement": {
            icon: "zap",
            className: "text-yellow-500",
            label: "Mejora"
          }
        }
      }
    }
  }
]

// Configuración simplificada para comparación
const simpleColumnsConfig = [
  { key: "id", label: "ID" },
  { key: "title", label: "Título" },
  { key: "status", label: "Estado" },
  { key: "priority", label: "Prioridad" },
  { key: "assignedTo", label: "Asignado a" }
]

export default function FormattersDemo() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Crear columnas con formatters
  const formattedColumns = createFormattedColumns(formattersColumnsConfig)
  const simpleColumns = createFormattedColumns(simpleColumnsConfig)

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Palette className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Demo de Formatters Configurables</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Demonstración completa del sistema de formateo configurable de columnas. 
          Cada columna puede tener formateo personalizado, condicional y estilos específicos.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            ✅ 11 Formatters Implementados
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            🎨 Formateo Condicional
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            ⚙️ Configuración JSON
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="formatted" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="formatted">Con Formatters</TabsTrigger>
            <TabsTrigger value="simple">Sin Formatters</TabsTrigger>
          </TabsList>
          
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refrescar
          </Button>
        </div>

        <TabsContent value="formatted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                DataTable con Formatters Configurables
              </CardTitle>
              <CardDescription>
                Cada columna utiliza formatters específicos: badges con iconos, fechas formateadas, 
                monedas, porcentajes con colores condicionales, y mucho más.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableWithDynamicToolbar
                key={`formatted-${refreshKey}`}
                columns={formattedColumns}
                data={formattersDemoData}
                options={{
                  searchKey: "title",
                  searchPlaceholder: "Buscar tareas...",
                  defaultFilters: ["status", "priority"],
                  showViewOptions: true,
                  showAddFilter: true
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simple" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DataTable Sin Formatters</CardTitle>
              <CardDescription>
                La misma data pero sin formateo especial para comparar la diferencia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTableWithDynamicToolbar
                key={`simple-${refreshKey}`}
                columns={simpleColumns}
                data={formattersDemoData}
                options={{
                  searchKey: "title",
                  searchPlaceholder: "Buscar tareas...",
                  showViewOptions: true
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🎨 Formatters Disponibles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span>default</span>
                <Badge variant="secondary">Texto simple</Badge>
              </div>
              <div className="flex justify-between">
                <span>badge</span>
                <Badge variant="outline">Badges con iconos</Badge>
              </div>
              <div className="flex justify-between">
                <span>date</span>
                <Badge variant="outline">Fechas formateadas</Badge>
              </div>
              <div className="flex justify-between">
                <span>currency</span>
                <Badge variant="outline">Monedas</Badge>
              </div>
              <div className="flex justify-between">
                <span>percentage</span>
                <Badge variant="outline">Porcentajes</Badge>
              </div>
              <div className="flex justify-between">
                <span>icon</span>
                <Badge variant="outline">Solo iconos</Badge>
              </div>
              <div className="flex justify-between">
                <span>icon-text</span>
                <Badge variant="outline">Icono + texto</Badge>
              </div>
              <div className="flex justify-between">
                <span>link</span>
                <Badge variant="outline">Enlaces</Badge>
              </div>
              <div className="flex justify-between">
                <span>image</span>
                <Badge variant="outline">Imágenes</Badge>
              </div>
              <div className="flex justify-between">
                <span>custom</span>
                <Badge variant="outline">Personalizado</Badge>
              </div>
              <div className="flex justify-between">
                <span>html</span>
                <Badge variant="outline">HTML custom</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚙️ Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Formateo condicional basado en valores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Templates dinámicos con variables</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Clases CSS personalizables</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Iconos integrados con Lucide</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Soporte para múltiples monedas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Fechas en múltiples formatos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Configuración 100% JSON</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>TypeScript con tipos seguros</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
