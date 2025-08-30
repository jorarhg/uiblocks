'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { DynamicDataTable, DynamicDataTableFromSchema, useDynamicSchema } from '@/components/dynamic-datatable-factory'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { getAvailableSchemas } from '@/config/dynamic-schemas'
import { defaultActions } from '@/components/data-table'
import { Edit, Trash2, Eye } from 'lucide-react'

// Datos de ejemplo dinámicos para diferentes esquemas
const SAMPLE_DATA = {
  tasks: [
    {
      id: "TASK-8782",
      title: "Implementar autenticación",
      status: "in_progress",
      priority: "high",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-22T15:45:00Z"
    },
    {
      id: "TASK-7878", 
      title: "Diseñar interfaz de usuario",
      status: "done",
      priority: "medium",
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-20T14:30:00Z"
    },
    {
      id: "TASK-6677",
      title: "Configurar base de datos",
      status: "todo",
      priority: "high",
      createdAt: "2024-01-20T11:00:00Z",
      updatedAt: "2024-01-20T11:00:00Z"
    },
    {
      id: "TASK-5555",
      title: "Escribir documentación",
      status: "backlog",
      priority: "low",
      createdAt: "2024-01-25T08:30:00Z",
      updatedAt: "2024-01-25T08:30:00Z"
    },
    {
      id: "TASK-4444",
      title: "Pruebas unitarias",
      status: "canceled",
      priority: "medium",
      createdAt: "2024-01-12T16:20:00Z",
      updatedAt: "2024-01-18T12:15:00Z"
    }
  ],
  users: [
    {
      id: "USR-001",
      name: "Ana García",
      email: "ana@empresa.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-22T15:30:00Z",
      createdAt: "2023-06-15T10:00:00Z"
    },
    {
      id: "USR-002",
      name: "Carlos López",
      email: "carlos@empresa.com",
      role: "user",
      status: "active",
      lastLogin: "2024-01-21T09:45:00Z",
      createdAt: "2023-08-20T14:30:00Z"
    },
    {
      id: "USR-003",
      name: "María Rodríguez",
      email: "maria@empresa.com", 
      role: "guest",
      status: "inactive",
      lastLogin: "2024-01-15T11:20:00Z",
      createdAt: "2023-12-05T16:45:00Z"
    },
    {
      id: "USR-004",
      name: "David Sánchez",
      email: "david@empresa.com",
      role: "user",
      status: "banned",
      lastLogin: "2024-01-10T13:15:00Z",
      createdAt: "2023-09-12T12:00:00Z"
    }
  ],
  products: [
    {
      id: "SKU-001",
      name: "Smartphone Android",
      category: "electronics",
      price: 299.99,
      stock: 45,
      available: true,
      createdAt: "2023-11-15T10:00:00Z"
    },
    {
      id: "SKU-002",
      name: "Camiseta Básica",
      category: "clothing",
      price: 19.99,
      stock: 120,
      available: true,
      createdAt: "2023-12-01T14:30:00Z"
    },
    {
      id: "SKU-003",
      name: "JavaScript: The Good Parts",
      category: "books",
      price: 29.99,
      stock: 8,
      available: true,
      createdAt: "2023-11-20T09:15:00Z"
    },
    {
      id: "SKU-004",
      name: "Lámpara de Mesa",
      category: "home",
      price: 49.99,
      stock: 15,
      available: true,
      createdAt: "2023-12-10T11:30:00Z"
    }
  ]
}

export default function DynamicTableDemo() {
  const [selectedSchema, setSelectedSchema] = useState<string>('tasks')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoizar campos para evitar re-creación en cada render
  const runtimeFields = useMemo(() => [
    { key: 'id', label: 'ID', type: 'string' },
    { key: 'name', label: 'Nombre', type: 'string' },
    { 
      key: 'status', 
      label: 'Estado', 
      type: 'badge',
      options: [
        { value: 'active', label: 'Activo', variant: 'default' },
        { value: 'inactive', label: 'Inactivo', variant: 'secondary' }
      ]
    }
  ], [])

  // Memoizar opciones para evitar re-creación en cada render
  const runtimeOptions = useMemo(() => ({
    searchKey: 'name',
    searchPlaceholder: 'Buscar elementos...',
    defaultFilters: ['status']
  }), [])

  // Ejemplo de esquema creado dinámicamente en tiempo de ejecución
  const { schema: runtimeSchema, error: runtimeError } = useDynamicSchema(
    'runtime-example',
    runtimeFields,
    runtimeOptions
  )

  const runtimeData = useMemo(() => [
    { id: '1', name: 'Elemento A', status: 'active' },
    { id: '2', name: 'Elemento B', status: 'inactive' },
    { id: '3', name: 'Elemento C', status: 'active' }
  ], [])

  // Mostrar loading durante hidratación para evitar mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Sistema de DataTable Dinámico</h1>
          <p className="text-lg text-muted-foreground">
            Demostración de un sistema completamente dinámico que genera tablas desde configuración TypeScript sin hardcoding.
          </p>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-sm text-muted-foreground">Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Sistema de DataTable Dinámico</h1>
        <p className="text-lg text-muted-foreground">
          Demostración de un sistema completamente dinámico que genera tablas desde configuración TypeScript sin hardcoding.
        </p>
      </div>

      <Tabs value={selectedSchema} onValueChange={setSelectedSchema} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Gestión de Tareas</CardTitle>
              <CardDescription>
                Tabla generada dinámicamente desde el esquema "tasks" en dynamic-schemas.ts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicDataTable
                schemaName="tasks"
                data={SAMPLE_DATA.tasks}
                enableActions={true}
                actions={[
                  {
                    id: 'view',
                    label: 'Ver detalles',
                    icon: Eye,
                    onClick: (record) => alert(`Viendo tarea: ${record.title}`)
                  },
                  {
                    id: 'edit',
                    label: 'Editar',
                    icon: Edit,
                    onClick: (record) => alert(`Editando tarea: ${record.title}`)
                  },
                  {
                    id: 'delete',
                    label: 'Eliminar',
                    icon: Trash2,
                    onClick: (record) => alert(`Eliminando tarea: ${record.title}`),
                    variant: 'destructive'
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Tabla generada dinámicamente desde el esquema "users" en dynamic-schemas.ts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicDataTable
                schemaName="users"
                data={SAMPLE_DATA.users}
                enableActions={true}
                actions={[
                  {
                    id: 'view',
                    label: 'Ver Perfil',
                    icon: Eye,
                    onClick: (record) => alert(`Viendo perfil de: ${record.name}`)
                  }
                ]}
                optionsOverride={{
                  pageSize: 5 // Override del tamaño de página
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Productos</CardTitle>
              <CardDescription>
                Tabla generada dinámicamente desde el esquema "products" en dynamic-schemas.ts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicDataTable
                schemaName="products"
                data={SAMPLE_DATA.products}
                enableActions={true}
                actions={[
                  {
                    id: 'view',
                    label: 'Ver Detalles',
                    icon: Eye,
                    onClick: (record) => alert(`Viendo producto: ${record.name}`)
                  },
                  {
                    id: 'edit',
                    label: 'Editar Stock',
                    icon: Edit,
                    onClick: (record) => alert(`Editando stock de: ${record.name}`)
                  }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="runtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Esquema Creado en Runtime</CardTitle>
              <CardDescription>
                Tabla generada dinámicamente usando useDynamicSchema hook (sin archivo JSON)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {runtimeError ? (
                <div className="text-red-600">Error: {runtimeError.message}</div>
              ) : runtimeSchema ? (
                <DynamicDataTableFromSchema
                  schemaConfig={runtimeSchema}
                  data={runtimeData}
                  enableActions={true}
                  actions={[
                    {
                      id: 'runtime',
                      label: 'Acción Runtime',
                      icon: Edit,
                      onClick: (record) => alert(`Acción en: ${record.name}`)
                    }
                  ]}
                />
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="text-sm text-muted-foreground">Cargando esquema...</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Características del Sistema Dinámico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Badge variant="default">Sin Hardcoding</Badge>
              <p className="text-sm text-muted-foreground">
                No hay tipos ni columnas hardcodeadas. Todo se genera dinámicamente.
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Configuración TypeScript</Badge>
              <p className="text-sm text-muted-foreground">
                Esquemas definidos con type safety en archivos TypeScript.
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Fábrica Genérica</Badge>
              <p className="text-sm text-muted-foreground">
                Sistema reutilizable para cualquier estructura de datos.
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="default">Renderizadores Dinámicos</Badge>
              <p className="text-sm text-muted-foreground">
                Diferentes tipos de campos con renderizadores específicos.
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Filtros Configurables</Badge>
              <p className="text-sm text-muted-foreground">
                Filtros que se adaptan automáticamente al tipo de campo.
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Runtime Creation</Badge>
              <p className="text-sm text-muted-foreground">
                Posibilidad de crear esquemas dinámicamente en tiempo de ejecución.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
