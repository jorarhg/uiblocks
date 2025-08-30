import { CodeBlock } from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Palette } from "lucide-react"

export default function CustomizationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Customization</h1>
        <p className="text-xl text-muted-foreground">
          Aprende cómo personalizar la apariencia y comportamiento de los componentes de DataTable UI.
        </p>
      </div>

      <Alert>
        <Palette className="h-4 w-4" />
        <AlertDescription>
          DataTable UI está construido con Tailwind CSS y shadcn/ui, lo que significa que es completamente personalizable 
          manteniendo la consistencia del sistema de diseño.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Personalización de Temas</h2>
          <p className="text-muted-foreground mb-4">
            Modifica las variables CSS para cambiar los colores globales de todos los componentes:
          </p>
          
          <Tabs defaultValue="light" className="w-full">
            <TabsList>
              <TabsTrigger value="light">Tema Claro</TabsTrigger>
              <TabsTrigger value="dark">Tema Oscuro</TabsTrigger>
              <TabsTrigger value="custom">Tema Personalizado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="light">
              <CodeBlock
                language="css"
                code={`:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}`}
              />
            </TabsContent>
            
            <TabsContent value="dark">
              <CodeBlock
                language="css"
                code={`.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}`}
              />
            </TabsContent>
            
            <TabsContent value="custom">
              <CodeBlock
                language="css"
                code={`/* Tema personalizado - Azul corporativo */
:root {
  --background: 0 0% 100%;
  --foreground: 215 20% 10%;
  --primary: 210 100% 50%;      /* Azul brillante */
  --primary-foreground: 0 0% 100%;
  --secondary: 210 20% 95%;
  --secondary-foreground: 215 20% 20%;
  --muted: 210 15% 96%;
  --muted-foreground: 215 10% 40%;
  --border: 210 20% 90%;
  --input: 210 20% 90%;
  --ring: 210 100% 50%;
}

/* Personalizar componentes específicos */
.data-table-header {
  @apply bg-primary/5 font-semibold;
}

.data-table-row:hover {
  @apply bg-primary/5;
}

.data-table-selected {
  @apply bg-primary/10;
}`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Personalización de Componentes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Personalizar DataTable</h3>
              <CodeBlock
                language="tsx"
                code={`import { DataTable } from "@/components/data-table/data-table"
import { cn } from "@/lib/utils"

// Extender con estilos personalizados
export function CustomDataTable<TData, TValue>({
  className,
  ...props
}: DataTableProps<TData, TValue>) {
  return (
    <DataTable
      className={cn(
        "border-2 border-blue-200 rounded-xl",
        "shadow-lg shadow-blue-100/50",
        className
      )}
      {...props}
    />
  )
}

// O crear un wrapper personalizado
export function CorporateDataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>
) {
  return (
    <div className="corporate-table-wrapper">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-lg">
        <h3 className="font-semibold">Corporate Data</h3>
      </div>
      <DataTable 
        {...props}
        className="rounded-t-none border-t-0"
      />
    </div>
  )
}`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Personalizar Columnas</h3>
              <CodeBlock
                language="tsx"
                code={`// Columnas con estilos personalizados
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <span className="font-bold text-blue-600">👤</span>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold text-blue-700 hover:text-blue-900"
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
        <Avatar className="h-10 w-10 border-2 border-blue-200">
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback className="bg-blue-100 text-blue-700">
            {row.original.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-gray-900">{row.original.name}</div>
          <div className="text-sm text-blue-600">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  // ... más columnas
]`}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Personalizar Filtros</h2>
          <CodeBlock
            language="tsx"
            code={`// Filtros con estilos personalizados
const customFilterConfig = {
  enableGlobalFilter: true,
  enableColumnFilters: true,
  
  // Personalizar el toolbar
  toolbar: {
    enableSearch: true,
    enableFilters: true,
    searchPlaceholder: "🔍 Buscar en todos los datos...",
    className: "bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
  },
  
  // Personalizar filtros específicos
  filters: {
    status: {
      type: "select" as const,
      options: ["active", "inactive", "pending"],
      placeholder: "📊 Filtrar por estado...",
      className: "border-blue-300 focus:border-blue-500"
    },
    department: {
      type: "select" as const,
      options: ["Engineering", "Design", "Marketing"],
      placeholder: "🏢 Filtrar por departamento...",
      className: "border-green-300 focus:border-green-500"
    }
  }
}

export function CustomFilteredTable() {
  return (
    <DataTableWithDynamicToolbar
      columns={columns}
      data={data}
      options={customFilterConfig}
    />
  )
}`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Clases CSS Personalizadas</h2>
          <p className="text-muted-foreground mb-4">
            Agrega estas clases a tu CSS global para personalizar aún más los componentes:
          </p>
          <CodeBlock
            language="css"
            code={`/* Personalizar tabla principal */
.data-table {
  @apply shadow-xl rounded-2xl overflow-hidden;
}

/* Headers personalizados */
.data-table-header {
  @apply bg-gradient-to-r from-slate-50 to-slate-100;
  @apply border-b-2 border-slate-200;
  @apply font-bold text-slate-700;
}

/* Filas con hover suave */
.data-table-row {
  @apply transition-all duration-200;
}

.data-table-row:hover {
  @apply bg-blue-50 transform scale-[1.01];
}

/* Filas seleccionadas */
.data-table-row[data-state="selected"] {
  @apply bg-blue-100 border-l-4 border-blue-500;
}

/* Paginación personalizada */
.data-table-pagination {
  @apply bg-slate-50 border-t border-slate-200;
  @apply p-4 rounded-b-2xl;
}

/* Botones de filtro */
.filter-button {
  @apply bg-white border-2 border-slate-200;
  @apply hover:border-blue-300 hover:bg-blue-50;
  @apply transition-colors duration-200;
}

/* Badges personalizados */
.status-badge-active {
  @apply bg-green-100 text-green-800 border border-green-200;
}

.status-badge-inactive {
  @apply bg-red-100 text-red-800 border border-red-200;
}

.status-badge-pending {
  @apply bg-yellow-100 text-yellow-800 border border-yellow-200;
}`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Configuración Avanzada</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Variables de Configuración</h3>
              <CodeBlock
                language="tsx"
                code={`// config/table-theme.ts
export const tableTheme = {
  colors: {
    primary: "hsl(210, 100%, 50%)",
    secondary: "hsl(210, 20%, 95%)",
    border: "hsl(210, 20%, 90%)",
    hover: "hsl(210, 40%, 98%)",
    selected: "hsl(210, 40%, 95%)",
  },
  spacing: {
    cellPadding: "0.75rem",
    headerHeight: "3rem",
    rowHeight: "2.5rem",
  },
  typography: {
    headerFont: "font-semibold",
    cellFont: "font-normal",
    fontSize: "text-sm",
  },
  borders: {
    radius: "0.5rem",
    width: "1px",
    style: "solid",
  }
}

// Usar en componentes
export function ThemedDataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>
) {
  return (
    <div 
      style={{
        '--table-primary': tableTheme.colors.primary,
        '--table-border': tableTheme.colors.border,
        // ... más variables
      } as React.CSSProperties}
      className="themed-table"
    >
      <DataTable {...props} />
    </div>
  )
}`}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Responsive Personalizado</h3>
              <CodeBlock
                language="css"
                code={`/* Responsive breakpoints personalizados */
@media (max-width: 768px) {
  .data-table {
    @apply text-xs;
  }
  
  .data-table-header {
    @apply px-2 py-1;
  }
  
  .data-table-cell {
    @apply px-2 py-1;
  }
  
  /* Ocultar columnas menos importantes en móvil */
  .data-table [data-column="description"],
  .data-table [data-column="created-at"] {
    @apply hidden;
  }
}

@media (max-width: 480px) {
  .data-table {
    @apply rounded-lg; /* Menos border radius en móvil */
  }
  
  /* Modo stack en móvil para mejor UX */
  .data-table-mobile-stack .data-table-row {
    @apply flex flex-col space-y-1 p-3 border-b;
  }
  
  .data-table-mobile-stack .data-table-cell {
    @apply flex justify-between items-center;
  }
  
  .data-table-mobile-stack .data-table-cell:before {
    content: attr(data-label) ": ";
    @apply font-semibold text-gray-600;
  }
}`}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-bold mb-4">Mejores Prácticas</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">🎨 Consistencia de Diseño</h3>
              <p className="text-sm text-muted-foreground">
                Mantén una paleta de colores consistente y usa las variables CSS para cambios globales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📱 Diseño Responsivo</h3>
              <p className="text-sm text-muted-foreground">
                Prueba tus personalizaciones en diferentes tamaños de pantalla y considera usar diseños adaptativos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">♿ Accesibilidad</h3>
              <p className="text-sm text-muted-foreground">
                Asegúrate de que tus personalizaciones mantengan un contraste adecuado y la navegación por teclado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⚡ Performance</h3>
              <p className="text-sm text-muted-foreground">
                Evita animaciones complejas en tablas grandes y usa CSS en lugar de JavaScript para estilos cuando sea posible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
