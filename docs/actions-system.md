# Sistema de Acciones Estándar para DataTable

Este documento describe el nuevo sistema estándar de acciones para todas las tablas del sistema dinámico de DataTable.

## Características

- ✅ **Icono de 3 puntos estándar**: Todos los menús de acciones usan el mismo icono `MoreHorizontal`
- ✅ **Menú desplegable**: Implementado con `DropdownMenu` de shadcn/ui
- ✅ **Iconos en items**: Cada acción incluye un icono usando lucide-react
- ✅ **Acciones configurables**: Fácil de personalizar por tabla
- ✅ **Variantes de estilo**: Soporte para acciones destructivas y normales
- ✅ **Reutilizable**: Mismo sistema para todas las tablas

## Uso Básico

### 1. Importar componentes

```tsx
import { createActionsColumn, defaultActions, ActionItem } from '@/components/data-table'
import { Edit, Trash2, Eye, Copy } from 'lucide-react'
```

### 2. Crear acciones personalizadas

```tsx
const actions: ActionItem[] = [
  {
    id: 'view',
    label: 'Ver detalles',
    icon: Eye,
    onClick: (row) => console.log('Ver:', row)
  },
  {
    id: 'edit',
    label: 'Editar',
    icon: Edit,
    onClick: (row) => console.log('Editar:', row)
  },
  {
    id: 'delete',
    label: 'Eliminar',
    icon: Trash2,
    onClick: (row) => console.log('Eliminar:', row),
    variant: 'destructive'
  }
]
```

### 3. Usar en DataTable estático

```tsx
import { createActionsColumn } from '@/components/data-table'

const columns = [
  // ... otras columnas
  createActionsColumn<MyDataType>({
    actions,
    menuLabel: 'Acciones'
  })
]
```

### 4. Usar en DataTable dinámico

```tsx
<DynamicDataTable
  schemaName="tasks"
  data={data}
  enableActions={true}
  actions={actions}
/>
```

## Acciones Predefinidas

El sistema incluye acciones comunes que puedes usar directamente:

```tsx
import { defaultActions } from '@/components/data-table'

const commonActions = [
  defaultActions.view((row) => handleView(row)),
  defaultActions.edit((row) => handleEdit(row)),
  defaultActions.copy((row) => handleCopy(row)),
  defaultActions.archive((row) => handleArchive(row)),
  defaultActions.delete((row) => handleDelete(row))
]
```

## Interfaz ActionItem

```tsx
interface ActionItem {
  id: string                                    // Identificador único
  label: string                                 // Texto mostrado
  icon: React.ComponentType<{ className?: string }> // Icono de lucide-react
  onClick: (row: any) => void                   // Handler del click
  variant?: 'default' | 'destructive'          // Estilo visual
  disabled?: boolean | ((row: any) => boolean) // Estado deshabilitado
}
```

## Ejemplos de Uso

### Tabla de Tareas

```tsx
const taskActions: ActionItem[] = [
  {
    id: 'view',
    label: 'Ver detalles',
    icon: Eye,
    onClick: (task) => router.push(`/tasks/${task.id}`)
  },
  {
    id: 'edit',
    label: 'Editar',
    icon: Edit,
    onClick: (task) => setEditingTask(task)
  },
  {
    id: 'complete',
    label: 'Marcar completada',
    icon: CheckCircle,
    onClick: (task) => markAsComplete(task.id),
    disabled: (task) => task.status === 'completed'
  },
  {
    id: 'delete',
    label: 'Eliminar',
    icon: Trash2,
    onClick: (task) => deleteTask(task.id),
    variant: 'destructive'
  }
]
```

### Tabla de Usuarios

```tsx
const userActions: ActionItem[] = [
  {
    id: 'profile',
    label: 'Ver perfil',
    icon: User,
    onClick: (user) => router.push(`/users/${user.id}`)
  },
  {
    id: 'edit',
    label: 'Editar usuario',
    icon: Edit,
    onClick: (user) => setEditingUser(user)
  },
  {
    id: 'resetPassword',
    label: 'Resetear contraseña',
    icon: Key,
    onClick: (user) => resetPassword(user.id)
  },
  {
    id: 'ban',
    label: 'Suspender usuario',
    icon: Ban,
    onClick: (user) => banUser(user.id),
    variant: 'destructive',
    disabled: (user) => user.role === 'admin'
  }
]
```

## Ventajas del Sistema

1. **Consistencia**: Todas las tablas tienen el mismo patrón de interacción
2. **Usabilidad**: Menú desplegable ahorra espacio y es más limpio
3. **Accesibilidad**: Soporte para screen readers y navegación por teclado
4. **Flexibilidad**: Fácil agregar/quitar acciones según necesidades
5. **Type Safety**: Completamente tipado con TypeScript
6. **Rendimiento**: Componentes optimizados y memoizados

## Migración desde Sistema Anterior

Si tienes tablas con el sistema anterior de botones inline:

```tsx
// ❌ Antes: Botones inline
{
  id: "actions",
  cell: ({ row }) => (
    <div className="flex gap-2">
      <Button onClick={() => edit(row.original)}>Editar</Button>
      <Button onClick={() => delete(row.original)}>Eliminar</Button>
    </div>
  )
}

// ✅ Después: Sistema estándar
createActionsColumn<MyType>({
  actions: [
    {
      id: 'edit',
      label: 'Editar',
      icon: Edit,
      onClick: (row) => edit(row)
    },
    {
      id: 'delete',
      label: 'Eliminar',
      icon: Trash2,
      onClick: (row) => delete(row),
      variant: 'destructive'
    }
  ]
})
```

## Componentes Internos

- `ActionsMenu`: Componente base del menú de acciones
- `createActionsColumn`: Helper para crear la columna de acciones
- `defaultActions`: Acciones predefinidas comunes

Todos estos componentes están disponibles desde `@/components/data-table`.
