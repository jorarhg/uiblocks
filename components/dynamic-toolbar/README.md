# Sistema de Filtros Dinámicos Híbridos

## Descripción General

El **Sistema de Filtros Dinámicos Híbridos** es una solución avanzada e inteligente para la configuración automática de filtros en tablas de datos. Este sistema combina múltiples estrategias de análisis para determinar automáticamente el tipo de filtro más apropiado para cada columna, optimizando la experiencia del usuario y reduciendo la configuración manual.

## Características Principales

### 🔍 **Análisis Inteligente Multinivel**
El sistema utiliza cuatro estrategias de análisis en orden de prioridad:

1. **Metadatos de Columna** (Prioridad Alta)
2. **Configuración Global de Sobrescritura** (Prioridad Media-Alta)
3. **Inferencia de Tipos** (Prioridad Media)
4. **Análisis de Datos** (Prioridad Baja - Fallback)

### 🛡️ **Robustez y Flexibilidad**
- **Configuración jerárquica**: Permite sobrescribir comportamientos específicos por columna
- **Detección automática**: Analiza patrones en nombres de columna y contenido de datos
- **Puntuación de confianza**: Cada análisis incluye un score de confianza para transparencia
- **Fallbacks inteligentes**: Si una estrategia falla, automáticamente usa la siguiente

### 📊 **Tipos de Filtros Soportados**
- **Texto**: Para cadenas de caracteres y texto libre
- **Numérico**: Para enteros, decimales y rangos numéricos
- **Fecha**: Para fechas y rangos temporales
- **Booleano**: Para valores verdadero/falso y selecciones binarias
- **Selección**: Para valores categóricos con opciones limitadas

## Uso Básico

```tsx
import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"

export function MyTable() {
  return (
    <DataTableWithDynamicToolbar
      columns={columns}
      data={data}
      searchKey="title"
      searchPlaceholder="Buscar tareas..."
      defaultFilters={["status", "priority"]}
      showViewOptions={true}
      showAddFilter={true}
    />
  )
}
```

## Uso Avanzado - Solo Toolbar

```tsx
import { DynamicDataTableToolbar } from "@/components/dynamic-toolbar"

export function CustomTable() {
  const table = useReactTable({
    // ... configuración de tabla
  })

  return (
    <div>
      <DynamicDataTableToolbar
        table={table}
        searchKey="name"
        defaultFilters={["category"]}
      />
      {/* Tu tabla personalizada aquí */}
    </div>
  )
}
```

## Props

### DataTableWithDynamicToolbar

| Prop | Tipo | Descripción | Default |
|------|------|-------------|---------|
| `columns` | `ColumnDef[]` | Definiciones de columnas | - |
| `data` | `TData[]` | Datos de la tabla | - |
| `searchKey` | `string` | Columna para búsqueda global | `"title"` |
| `searchPlaceholder` | `string` | Placeholder del campo de búsqueda | `"Search..."` |
| `defaultFilters` | `string[]` | Filtros que se cargan por defecto | `[]` |
| `showViewOptions` | `boolean` | Mostrar opciones de vista | `true` |
| `showAddFilter` | `boolean` | Mostrar botón "Add Filter" | `true` |

### DynamicDataTableToolbar

| Prop | Tipo | Descripción |
|------|------|-------------|
| `table` | `Table<TData>` | Instancia de tabla de TanStack |
| Resto | - | Mismas props que `DataTableWithDynamicToolbar` |

## Estructura de Archivos

```
components/dynamic-toolbar/
├── index.ts                           # Exportaciones principales
├── dynamic-data-table-toolbar.tsx     # Componente principal del toolbar
├── data-table-with-dynamic-toolbar.tsx # Tabla completa con toolbar
├── components/
│   ├── add-filter-dropdown.tsx        # Dropdown para agregar filtros
│   ├── active-filters-display.tsx     # Visualización de filtros activos
│   ├── data-table-search-filter.tsx   # Filtro de búsqueda individual
│   └── dynamic-filter-component.tsx   # Wrapper para filtros dinámicos
└── hooks/
    └── use-dynamic-filters.ts          # Hook para gestión de estado
```

## Iconos Utilizados

- `ListFilter`: Para filtros individuales
- `Plus`: Para el botón "Add Filter"
- `X`: Para remover filtros
- `Search`: Para búsqueda global

## Customización

### Estilos
Los componentes usan clases de Tailwind CSS y shadcn/ui. Puedes personalizar:
- Colores mediante variables CSS
- Espaciado con props `className`
- Comportamiento hover con modificadores de Tailwind

### Filtros Personalizados
Extiende el hook `useDynamicFilters` para agregar nuevos tipos de filtro:

```typescript
// En use-dynamic-filters.ts
case "custom":
  return <YourCustomFilter />
```

## Dependencias

- `@tanstack/react-table` - Gestión de tablas
- `lucide-react` - Iconos
- `shadcn/ui` - Componentes base
- `tailwindcss` - Estilos

## Compatibilidad

- ✅ React 18+
- ✅ Next.js 13+
- ✅ TypeScript
- ✅ Responsive design
