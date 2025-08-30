"use client"

import { useState, useEffect } from "react"
import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { DynamicDataTable, DynamicDataTableFromSchema } from "@/components/dynamic-datatable-factory"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Eye } from "lucide-react"

// Datos de ejemplo para demostración
const sampleData = [
  { id: "1", title: "Tarea 1", status: "todo", priority: "high" },
  { id: "2", title: "Tarea 2", status: "in-progress", priority: "medium" },
  { id: "3", title: "Tarea 3", status: "done", priority: "low" },
]

const sampleColumns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Título" },
  { accessorKey: "status", header: "Estado" },
  { accessorKey: "priority", header: "Prioridad" },
]

export default function SkeletonDemoPage() {
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(false)
  const [isLoading3, setIsLoading3] = useState(false)

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading1(false)
    }, 2000) // 2 segundos para mejor visualización

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = (setLoading: (value: boolean) => void) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">🎨 Demostración Skeleton Loading</h1>
        <p className="text-lg text-muted-foreground">
          Ejemplos completos del sistema de skeleton loading implementado en todos los componentes DataTable.
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="dynamic">Dinámico</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>DataTableWithDynamicToolbar</CardTitle>
                  <CardDescription>
                    Componente principal con skeleton loading integrado
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isLoading1 ? "destructive" : "default"}>
                    {isLoading1 ? "Loading..." : "Ready"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRefresh(setIsLoading1)}
                    disabled={isLoading1}
                  >
                    {isLoading1 ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTableWithDynamicToolbar
                columns={sampleColumns}
                data={sampleData}
                options={{
                  searchKey: "title",
                  searchPlaceholder: "Buscar tareas...",
                  pageSize: 10,
                  showViewOptions: true,
                  showAddFilter: true
                }}
                loading={isLoading1}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dynamic" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>DynamicDataTable</CardTitle>
                  <CardDescription>
                    Sistema dinámico con carga de esquemas
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isLoading2 ? "destructive" : "default"}>
                    {isLoading2 ? "Loading Schema..." : "Schema Loaded"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRefresh(setIsLoading2)}
                    disabled={isLoading2}
                  >
                    {isLoading2 ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DynamicDataTable
                schemaName="tasks"
                data={sampleData}
                loading={isLoading2}
                enableActions={true}
                actions={[
                  {
                    id: 'view',
                    label: 'Ver',
                    icon: Eye,
                    onClick: (record) => alert(`Viendo: ${record.title}`)
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>DynamicDataTableFromSchema</CardTitle>
                  <CardDescription>
                    Esquema runtime con skeleton loading
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isLoading3 ? "destructive" : "default"}>
                    {isLoading3 ? "Processing..." : "Processed"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRefresh(setIsLoading3)}
                    disabled={isLoading3}
                  >
                    {isLoading3 ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DynamicDataTableFromSchema
                schemaConfig={{
                  name: "demo",
                  primaryKey: "id",
                  fields: [
                    { key: "id", label: "ID", type: "string", sortable: true, filterable: false, searchable: false },
                    { key: "title", label: "Título", type: "string", sortable: true, filterable: false, searchable: true },
                    { key: "status", label: "Estado", type: "badge", sortable: true, filterable: true, searchable: false },
                    { key: "priority", label: "Prioridad", type: "string", sortable: true, filterable: true, searchable: false }
                  ],
                  tableOptions: {
                    searchKey: "title",
                    searchPlaceholder: "Buscar en demo...",
                    pageSize: 10,
                    enableSorting: true,
                    enableFiltering: true,
                    enableSearch: true,
                    showToolbar: true
                  }
                }}
                data={sampleData}
                loading={isLoading3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Características del Skeleton</CardTitle>
              <CardDescription>
                Todas las funcionalidades implementadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Badge variant="default">✅ Responsive</Badge>
                  <p className="text-sm text-muted-foreground">
                    Se adapta automáticamente a cualquier tamaño de pantalla
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">✅ Configurable</Badge>
                  <p className="text-sm text-muted-foreground">
                    Número de filas y columnas personalizable
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">✅ Consistente</Badge>
                  <p className="text-sm text-muted-foreground">
                    Diseño unificado en todo el ecosistema
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="default">✅ Performante</Badge>
                  <p className="text-sm text-muted-foreground">
                    CSS puro sin JavaScript innecesario
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">✅ Accessible</Badge>
                  <p className="text-sm text-muted-foreground">
                    Compatible con lectores de pantalla
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">✅ Professional</Badge>
                  <p className="text-sm text-muted-foreground">
                    UX moderna y profesional
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">📋 Uso Simple</h3>
                <pre className="text-sm bg-background p-3 rounded border overflow-auto">
{`// Solo agregar la prop loading
<DataTableWithDynamicToolbar
  columns={columns}
  data={data}
  loading={isLoading}  // ← ¡Eso es todo!
/>

// El skeleton aparece automáticamente
// y se adapta al pageSize configurado`}
                </pre>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">🎉 Resultado</h3>
                <ul className="text-sm space-y-1">
                  <li>• ✅ No más pantallas en blanco</li>
                  <li>• ✅ Feedback visual inmediato</li>
                  <li>• ✅ Experiencia profesional</li>
                  <li>• ✅ Zero configuration required</li>
                  <li>• ✅ Compatible con todo el ecosistema</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
