"use client"

import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo
const sampleData = [
  {
    id: "1",
    title: "Tarea 1",
    status: "todo",
    priority: "high",
    assignedTo: "Juan Pérez"
  },
  {
    id: "2", 
    title: "Tarea 2",
    status: "in-progress",
    priority: "medium",
    assignedTo: "María García"
  },
  {
    id: "3",
    title: "Tarea 3", 
    status: "done",
    priority: "low",
    assignedTo: "Carlos López"
  }
]

// Configuración de columnas básica SIN formatters para evitar errores de TypeScript
const columnsConfig = [
  { key: "id", label: "ID" },
  { key: "title", label: "Título" },
  { key: "status", label: "Estado" },
  { key: "priority", label: "Prioridad" },
  { key: "assignedTo", label: "Asignado a" }
]

// Crear columnas manualmente
const columns = columnsConfig.map(config => ({
  accessorKey: config.key,
  header: config.label
}))

export default function DefaultLayoutTest() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Test de Layout por Defecto</h1>
        <p className="text-lg text-muted-foreground">
          Esta página prueba que el layout por defecto sea 'inline' cuando no se especifica filtersLayout.
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            🎯 Layout por Defecto: inline
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            ✅ Sin Errores TypeScript
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DataTable sin especificar filtersLayout</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableWithDynamicToolbar
            columns={columns}
            data={sampleData}
            options={{
              searchKey: "title",
              searchPlaceholder: "Buscar tareas...",
              defaultFilters: ["status", "priority"],
              showViewOptions: true,
              showAddFilter: true
              // NO se especifica filtersLayout - debería ser 'inline' por defecto
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuración utilizada</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`options={{
  searchKey: "title",
  searchPlaceholder: "Buscar tareas...",
  defaultFilters: ["status", "priority"],
  showViewOptions: true,
  showAddFilter: true
  // filtersLayout NO especificado
  // Debe usar valor por defecto: 'inline'
}}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📋 Instrucciones de Prueba</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Los filtros por defecto (Status, Priority) deben aparecer <strong>en línea</strong> con la toolbar</li>
            <li>Al agregar más filtros con "Add Filter", deben aparecer también en la misma línea</li>
            <li>El botón "Limpiar" debe estar en la misma línea que los filtros</li>
            <li>NO debe haber una segunda línea con filtros duplicados</li>
            <li>Todos los controles deben estar en la toolbar principal</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
