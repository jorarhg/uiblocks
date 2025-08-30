# DataTable UI

Una biblioteca de componentes de tabla altamente personalizables construida con React, TypeScript, shadcn/ui y Tailwind CSS.

## 🚀 Características

- **📊 Tablas Avanzadas**: Componentes de tabla con filtrado, ordenamiento y paginación
- **🔧 Sistema Dinámico**: Configuración automática basada en esquemas de datos
- **🎨 Completamente Personalizable**: Estilos personalizables con Tailwind CSS
- **📱 Responsive**: Funciona perfectamente en todos los dispositivos
- **♿ Accesible**: Construido siguiendo las mejores prácticas de accesibilidad
- **⚡ Performance**: Optimizado para grandes volúmenes de datos
- **🔒 Type Safe**: Completamente tipado con TypeScript

## 📦 Instalación

```bash
npm install @tanstack/react-table lucide-react class-variance-authority clsx tailwind-merge
```

## 🏃‍♂️ Quick Start

### 1. Define tus tipos

```tsx
interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
}
```

### 2. Configura las columnas

```tsx
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

const columns: ColumnDef<Task>[] = [
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
]
```

### 3. Usa el componente

```tsx
import { DataTable } from "@/components/data-table/data-table"

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={taskData} />
    </div>
  )
}
```

## 📚 Documentación

Visita nuestra [documentación completa](http://localhost:3000/docs) para:

- **[Guía de instalación](http://localhost:3000/docs/installation)**: Configura DataTable UI en tu proyecto
- **[Quick Start](http://localhost:3000/docs/quick-start)**: Empieza en menos de 5 minutos
- **[Componentes](http://localhost:3000/docs/components)**: Documentación detallada de todos los componentes
- **[Ejemplos](http://localhost:3000/examples)**: Ejemplos interactivos y casos de uso

## 🎯 Componentes Principales

### DataTable
Componente básico de tabla con funcionalidades esenciales:
- Filtrado global
- Ordenamiento por columnas
- Paginación
- Selección de filas

### DataTableWithDynamicToolbar
Versión avanzada con sistema de filtros dinámicos:
- Filtros por columna personalizables
- Búsqueda avanzada
- Configuración JSON
- Filtros activos visuales

### Dynamic Schema System
Sistema que se adapta automáticamente a tus datos:
- Auto-generación de columnas
- Filtros basados en tipos de datos
- Validación automática
- Formateadores inteligentes

## 🎨 Ejemplos

### Tabla Básica
```tsx
<DataTable columns={columns} data={data} />
```

### Con Filtros Dinámicos
```tsx
<DataTableWithDynamicToolbar 
  columns={columns} 
  data={data}
  options={{
    enableGlobalFilter: true,
    filters: {
      status: {
        type: "select",
        options: ["todo", "in-progress", "done"]
      }
    }
  }}
/>
```

### Configuración desde JSON
```tsx
const config = await getConfigFromJSON()
<DataTableWithDynamicToolbar 
  columns={config.columns}
  data={data}
  options={config.options}
/>
```

## 🛠️ Tecnologías

- **React 18+**: Framework principal
- **TypeScript**: Tipado estático
- **TanStack Table v8**: Motor de tabla
- **shadcn/ui**: Componentes base
- **Tailwind CSS**: Estilos
- **Radix UI**: Primitivos accesibles
- **Lucide React**: Iconos

## 📁 Estructura del Proyecto

```
datatable-ui/
├── app/                          # Aplicación Next.js
│   ├── (docs)/                   # Grupo de rutas de documentación
│   │   ├── docs/                 # Páginas de documentación
│   │   └── examples/             # Páginas de ejemplos
│   ├── demo/                     # Demo original preservado
│   └── page.tsx                  # Página de inicio
├── components/
│   ├── data-table/               # Componentes de tabla
│   ├── docs/                     # Componentes de documentación
│   ├── dynamic-datatable-factory/ # Sistema dinámico
│   ├── dynamic-toolbar/          # Toolbar avanzado
│   └── ui/                       # Componentes base shadcn/ui
├── config/
│   └── docs/                     # Configuración de documentación
├── lib/                          # Utilidades y helpers
└── types/                        # Definiciones de tipos
```

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## 📄 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Ejecutar linting
- `npm run validate:filters` - Validar integración de filtros
- `npm run test:filters` - Tests de filtros
- `npm run demo:filters` - Demo de filtros

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com) por los componentes base
- [TanStack Table](https://tanstack.com/table) por el motor de tabla
- [Tailwind CSS](https://tailwindcss.com) por el sistema de estilos
- [Radix UI](https://radix-ui.com) por los primitivos accesibles

---

Construido con ❤️ usando las mejores tecnologías modernas de React.
