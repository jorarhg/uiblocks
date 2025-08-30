"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/app/columns"
import { taskData } from "@/app/data"
import { CodeBlock } from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BasicExamplePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Basic Data Table</h1>
        <p className="text-xl text-muted-foreground">
          Un ejemplo básico de una tabla de datos con filtrado, ordenamiento y paginación.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Demo</h2>
          <div className="rounded-lg border bg-card p-6">
            <DataTable columns={columns} data={taskData} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Código</h2>
          <Tabs defaultValue="component" className="w-full">
            <TabsList>
              <TabsTrigger value="component">Componente</TabsTrigger>
              <TabsTrigger value="columns">Columnas</TabsTrigger>
              <TabsTrigger value="data">Datos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="component">
              <CodeBlock
                language="tsx"
                code={`import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { taskData } from "./data"

export default function BasicExample() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={taskData} />
    </div>
  )
}`}
              />
            </TabsContent>
            
            <TabsContent value="columns">
              <CodeBlock
                language="tsx"
                code={`import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done" | "canceled"
  label: "bug" | "feature" | "documentation"
  priority: "low" | "medium" | "high"
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "done" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return (
        <Badge 
          variant={priority === "high" ? "destructive" : "outline"}
        >
          {priority}
        </Badge>
      )
    },
  },
]`}
              />
            </TabsContent>
            
            <TabsContent value="data">
              <CodeBlock
                language="tsx"
                code={`export const taskData = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in-progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "todo",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "done",
    label: "bug",
    priority: "high",
  },
  // ... más datos
]`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Características</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">✅ Selección de filas</h3>
              <p className="text-sm text-muted-foreground">
                Selecciona una o múltiples filas con checkboxes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🔍 Filtrado</h3>
              <p className="text-sm text-muted-foreground">
                Filtra datos por cualquier columna usando la barra de búsqueda.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">↕️ Ordenamiento</h3>
              <p className="text-sm text-muted-foreground">
                Ordena datos haciendo clic en los headers de las columnas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📄 Paginación</h3>
              <p className="text-sm text-muted-foreground">
                Navega entre páginas de datos con controles de paginación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
