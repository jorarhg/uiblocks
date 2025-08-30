import { CodeBlock } from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function QuickStartPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Quick Start</h1>
        <p className="text-xl text-muted-foreground">
          Empieza a usar DataTable UI en menos de 5 minutos con esta guía rápida.
        </p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Asegúrate de haber completado la <a href="/docs/installation" className="underline">instalación</a> antes de continuar.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Paso 1: Define tus tipos de datos</h2>
          <p className="text-muted-foreground mb-4">
            Primero, define la interfaz TypeScript para tus datos:
          </p>
          <CodeBlock
            language="tsx"
            code={`// types/task.ts
export interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "done" | "canceled"
  label: "bug" | "feature" | "documentation"
  priority: "low" | "medium" | "high"
  createdAt: Date
}`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Paso 2: Configura las columnas</h2>
          <p className="text-muted-foreground mb-4">
            Define las columnas de tu tabla usando ColumnDef de TanStack Table:
          </p>
          <CodeBlock
            language="tsx"
            code={`// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@/types/task"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
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
      return <Badge variant="outline">{status}</Badge>
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
]`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Paso 3: Prepara tus datos</h2>
          <p className="text-muted-foreground mb-4">
            Crea algunos datos de ejemplo o conecta tu fuente de datos:
          </p>
          <CodeBlock
            language="tsx"
            code={`// data/tasks.ts
import { Task } from "@/types/task"

export const taskData: Task[] = [
  {
    id: "TASK-001",
    title: "Implementar autenticación de usuarios",
    status: "in-progress",
    label: "feature",
    priority: "high",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "TASK-002", 
    title: "Corregir bug en la paginación",
    status: "todo",
    label: "bug",
    priority: "medium",
    createdAt: new Date("2024-01-16"),
  },
  // ... más datos
]`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Paso 4: Usa el componente</h2>
          <p className="text-muted-foreground mb-4">
            Ahora puedes usar el componente DataTable en tu aplicación:
          </p>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList>
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="advanced">Avanzado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <CodeBlock
                language="tsx"
                code={`// app/tasks/page.tsx
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "@/components/columns"
import { taskData } from "@/data/tasks"

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Tasks</h1>
      <DataTable columns={columns} data={taskData} />
    </div>
  )
}`}
              />
            </TabsContent>
            
            <TabsContent value="advanced">
              <CodeBlock
                language="tsx"
                code={`// app/tasks/page.tsx - Con toolbar dinámico
import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { columns } from "@/components/columns"
import { taskData } from "@/data/tasks"

const options = {
  enableGlobalFilter: true,
  enableColumnFilters: true,
  filters: {
    status: {
      type: "select" as const,
      options: ["todo", "in-progress", "done", "canceled"],
      placeholder: "Filter by status..."
    },
    priority: {
      type: "select" as const,
      options: ["low", "medium", "high"],
      placeholder: "Filter by priority..."
    }
  }
}

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Tasks</h1>
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
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">¡Listo! 🎉</h2>
          <p className="text-muted-foreground mb-4">
            Ahora tienes una tabla completamente funcional con:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">✅ Selección de filas</h3>
              <p className="text-sm text-muted-foreground">
                Los usuarios pueden seleccionar una o múltiples filas
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🔍 Búsqueda y filtrado</h3>
              <p className="text-sm text-muted-foreground">
                Filtrado global y por columnas específicas
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">↕️ Ordenamiento</h3>
              <p className="text-sm text-muted-foreground">
                Ordena cualquier columna de forma ascendente o descendente
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📄 Paginación</h3>
              <p className="text-sm text-muted-foreground">
                Navegación fluida entre páginas de datos
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-bold mb-4">Siguientes pasos</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">📚 Explora la documentación</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Aprende sobre características avanzadas como filtros dinámicos, formateadores personalizados y más.
              </p>
              <a href="/docs/components" className="text-primary hover:underline text-sm">
                Ver todos los componentes →
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎨 Personaliza el diseño</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Personaliza los estilos y temas para que coincidan con tu aplicación.
              </p>
              <a href="/docs/customization" className="text-primary hover:underline text-sm">
                Guía de personalización →
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔧 Ve ejemplos avanzados</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Revisa ejemplos más complejos y casos de uso del mundo real.
              </p>
              <a href="/examples" className="text-primary hover:underline text-sm">
                Ver ejemplos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
