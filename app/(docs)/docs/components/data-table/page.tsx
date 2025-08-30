import { CodeBlock } from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function DataTablePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Data Table</h1>
        <p className="text-xl text-muted-foreground">
          El componente principal para mostrar datos tabulares con funcionalidades avanzadas de filtrado, ordenamiento y paginación.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Este componente está construido sobre <a href="https://tanstack.com/table/v8" className="underline" target="_blank">TanStack Table v8</a> y 
          proporciona una interfaz simplificada para casos de uso comunes.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Importación</h2>
          <CodeBlock
            language="tsx"
            code={`import { DataTable } from "@/components/data-table/data-table"`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Uso básico</h2>
          <CodeBlock
            language="tsx"
            code={`import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { data } from "./data"

export default function Example() {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
    />
  )
}`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">API Reference</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Props</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Prop</th>
                      <th className="border border-border p-3 text-left">Tipo</th>
                      <th className="border border-border p-3 text-left">Descripción</th>
                      <th className="border border-border p-3 text-left">Requerido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 font-mono text-sm">columns</td>
                      <td className="border border-border p-3 font-mono text-sm">ColumnDef&lt;T&gt;[]</td>
                      <td className="border border-border p-3">Definición de las columnas de la tabla</td>
                      <td className="border border-border p-3">✅</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-mono text-sm">data</td>
                      <td className="border border-border p-3 font-mono text-sm">T[]</td>
                      <td className="border border-border p-3">Array de datos a mostrar</td>
                      <td className="border border-border p-3">✅</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-mono text-sm">onRowSelectionChange</td>
                      <td className="border border-border p-3 font-mono text-sm">(selection: object) =&gt; void</td>
                      <td className="border border-border p-3">Callback cuando cambia la selección de filas</td>
                      <td className="border border-border p-3">❌</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-mono text-sm">className</td>
                      <td className="border border-border p-3 font-mono text-sm">string</td>
                      <td className="border border-border p-3">Clases CSS adicionales</td>
                      <td className="border border-border p-3">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Tipos</h3>
              <CodeBlock
                language="tsx"
                code={`import { ColumnDef } from "@tanstack/react-table"

interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowSelectionChange?: (selection: Record<string, boolean>) => void
  className?: string
}`}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Ejemplos</h2>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList>
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="selection">Con Selección</TabsTrigger>
              <TabsTrigger value="custom">Personalizado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <CodeBlock
                language="tsx"
                code={`import { DataTable } from "@/components/data-table/data-table"
import { ColumnDef } from "@tanstack/react-table"

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email", 
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]

const data: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin"
  },
  // ... más datos
]

export default function UsersTable() {
  return <DataTable columns={columns} data={data} />
}`}
              />
            </TabsContent>
            
            <TabsContent value="selection">
              <CodeBlock
                language="tsx"
                code={`import { useState } from "react"
import { DataTable } from "@/components/data-table/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const columns: ColumnDef<User>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  // ... otras columnas
]

export default function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState({})

  const handleSelectionChange = (selection: Record<string, boolean>) => {
    setSelectedRows(selection)
    console.log("Selected rows:", selection)
  }

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={data}
        onRowSelectionChange={handleSelectionChange}
      />
      <div className="mt-4">
        <Button 
          disabled={Object.keys(selectedRows).length === 0}
          onClick={() => console.log("Process selected rows")}
        >
          Process {Object.keys(selectedRows).length} selected
        </Button>
      </div>
    </div>
  )
}`}
              />
            </TabsContent>
            
            <TabsContent value="custom">
              <CodeBlock
                language="tsx"
                code={`import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={status === "active" ? "default" : "secondary"}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      
      return (
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    },
    enableSorting: false,
  },
]

export default function CustomTable() {
  return (
    <DataTable 
      columns={columns} 
      data={data}
      className="border-2 border-dashed"
    />
  )
}`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Características</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">🔍 Búsqueda integrada</h3>
              <p className="text-sm text-muted-foreground">
                Filtrado global que busca en todas las columnas visibles
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">↕️ Ordenamiento</h3>
              <p className="text-sm text-muted-foreground">
                Ordena cualquier columna de forma ascendente, descendente o sin ordenar
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📄 Paginación</h3>
              <p className="text-sm text-muted-foreground">
                Navegación entre páginas con controles de tamaño de página
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">👁️ Visibilidad de columnas</h3>
              <p className="text-sm text-muted-foreground">
                Muestra u oculta columnas según las necesidades del usuario
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Notas</h2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Para casos de uso más avanzados con filtros dinámicos, considera usar el componente 
                <a href="/docs/components/dynamic-toolbar" className="underline ml-1">DataTableWithDynamicToolbar</a>.
              </AlertDescription>
            </Alert>
            
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">
                Para grandes volúmenes de datos (más de 1000 filas), considera implementar paginación 
                del lado del servidor o virtualización.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
