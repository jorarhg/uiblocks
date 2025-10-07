# @teribit/ui-blocks

Colección modular de componentes React para construir tablas de datos y patrones de interacción (Radix + Tailwind). Incluye:

- DataTable (TanStack Table v8)
- Sistema de acciones (ActionsMenu + createActionsColumn)
- Filtros facetados, vista (toggle columnas), paginación
- Primitivos UI (Dialog, DropdownMenu, Popover, Select, Command palette, etc.)
- Registry de formatters **extensible** para renderizado flexible de celdas
- Charts (Recharts): line, bar, area, donut, scatter, radar, heatmap, gauge

## 📦 Instalación

### Peer Dependencies

Instala las dependencias peer necesarias:

```bash
pnpm add @teribit/ui-blocks @tanstack/react-table lucide-react recharts zod \
  @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-separator cmdk \
  class-variance-authority clsx tailwind-merge tailwindcss-animate
```

## ⚙️ Configuración

Los componentes usan clases de Tailwind CSS que requieren configuración en tu proyecto.

### 1. Tailwind CSS

Copia y personaliza `tailwind.config.reference.js` incluido en este paquete:

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Ajustar según tu método de instalación:
    
    // Opción A: Si instalaste vía npm/pnpm
    "./node_modules/@teribit/ui-blocks/dist/**/*.{js,mjs}",
    
    // Opción B: Si usas git subtree en libs/ui-blocks
    // "./libs/ui-blocks/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IMPORTANTE: Personaliza estos colores según tu diseño
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... ver tailwind.config.reference.js para la configuración completa
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 2. Variables CSS

Añade las variables CSS a tu archivo `globals.css` o `app.css`. Consulta `styles.reference.css` incluido para valores de ejemplo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* PERSONALIZAR: Estos son valores de ejemplo */
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    /* ... ver styles.reference.css para todas las variables */
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    /* ... */
  }
}
```

### 3. PostCSS (opcional)

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

> **📝 Nota**: Los archivos `.reference.*` en este paquete son **plantillas personalizables**, no valores fijos. Ajústalos según tu sistema de diseño.

## Uso rápido DataTable

```tsx
"use client"
import { DataTable, createActionsColumn, defaultActions, type ActionItem } from '@teribit/ui-blocks'
import type { ColumnDef } from '@tanstack/react-table'

interface User { id:string; name:string; email:string; role:string }

const baseColumns: ColumnDef<User>[] = [
  { accessorKey:'name', header:'Nombre' },
  { accessorKey:'email', header:'Email' },
  { accessorKey:'role', header:'Rol' },
]

const actionHandlers = {
  onView: (row:User)=>console.log('view', row),
  onEdit: (row:User)=>console.log('edit', row),
  onDelete: (row:User)=>console.log('delete', row),
}

const actions: ActionItem[] = [
  defaultActions.view(actionHandlers.onView),
  defaultActions.edit(actionHandlers.onEdit),
  defaultActions.delete(actionHandlers.onDelete),
]

const columns: ColumnDef<User>[] = [
  ...baseColumns,
  createActionsColumn<User>({ actions })
]

export function UsersTable({ data }:{ data:User[] }){
  return <DataTable columns={columns} data={data} searchKey='name' />
}
```

## Command Palette

Ejemplo mínimo (incluido en `CommandPaletteExample`):

```tsx
"use client"
import { CommandPaletteExample } from '@teribit/ui-blocks'
export default function Demo(){ return <CommandPaletteExample /> }
```

## Directiva "use client"

Sólo los puntos de entrada que se montan directamente en el árbol del App Router necesitan `"use client"`. Los sub-componentes internos del paquete no la incluyen para evitar ruido en el bundle. Añade la directiva en tu archivo consumidor (por ejemplo página o wrapper) cuando el árbol requiera hooks del lado del cliente.

## Formatters

Importa desde `@teribit/ui-blocks/formatters` (re-export via root) para transformar valores de celdas: currency, date, percentage, icon, etc.

### Extender con formatters personalizados

El sistema de formatters es **extensible**. Puedes registrar tus propios formatters:

```tsx
import { registerFormatter, type FormatterFunction } from '@teribit/ui-blocks'

// Define tu formatter personalizado
const statusFormatter: FormatterFunction = (context) => {
  const status = context.value
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  
  return {
    content: (
      <span className={`px-2 py-1 rounded ${colors[status] || ''}`}>
        {status}
      </span>
    )
  }
}

// Registra tu formatter
registerFormatter('status', statusFormatter)

// Úsalo en tu configuración de columnas
const columns = [
  {
    key: 'status',
    label: 'Estado',
    formatter: {
      type: 'status' // Tu formatter personalizado
    }
  }
]
```

**APIs de extensibilidad disponibles**:

- `registerFormatter(type: string, formatter: FormatterFunction)` - Registra un nuevo formatter
- `hasFormatter(type: string)` - Verifica si existe un formatter
- `getFormatter(type: string)` - Obtiene un formatter del registry
- `createCustomFormatter(render)` - Helper para crear formatters inline
- `FORMATTERS` - Objeto mutable del registry (para uso avanzado)

## Roadmap breve

- Tests más completos (sorting, filtros, paginación)
- Theming con CSS variables centralizadas
- Más bloques (toolbar dinámica, layouts)

## Tests

Se incluye un test básico (`src/__tests__/datatable-basic.test.tsx`) exportando `runBasicDataTableTest()` para entornos sin Jest. Puedes integrarlo en tu runner preferido (Vitest/Jest) envolviéndolo en `test()` si lo deseas.

## Licencia

MIT
