# @teribit/ui-blocks

Colección modular de componentes React para construir tablas de datos y patrones de interacción (Radix + Tailwind). Incluye:

- DataTable (TanStack Table v8)
- Sistema de acciones (ActionsMenu + createActionsColumn)
- Filtros facetados, vista (toggle columnas), paginación
- Primitivos UI (Dialog, DropdownMenu, Popover, Select, Command palette, etc.)
- Registry de formatters para renderizado flexible de celdas

## Instalación

Instala peer deps (ejemplo):

```bash
pnpm add @teribit/ui-blocks @tanstack/react-table lucide-react @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-separator cmdk class-variance-authority clsx tailwind-merge zod
```

Asegura Tailwind configurado y añade (opcional) estilos base de tu proyecto. Las clases usan tokens genéricos (`bg-background`, `text-muted-foreground`, etc.) compatibles con presets tipo shadcn.

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

## Roadmap breve

- Tests más completos (sorting, filtros, paginación)
- Theming con CSS variables centralizadas
- Más bloques (toolbar dinámica, layouts)

## Tests

Se incluye un test básico (`src/__tests__/datatable-basic.test.tsx`) exportando `runBasicDataTableTest()` para entornos sin Jest. Puedes integrarlo en tu runner preferido (Vitest/Jest) envolviéndolo en `test()` si lo deseas.

## Licencia

MIT
