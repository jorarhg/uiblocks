# Guía de Migración Copy & Paste

## Archivos Esenciales a Copiar

### 1. Componentes Core (OBLIGATORIOS)
```
src/components/data-table/
├── actions-menu.tsx           # Sistema de acciones
├── actions-column.tsx         # Helper de columnas  
├── data-table.tsx            # Componente base
├── data-table-toolbar.tsx    # Toolbar básico
├── data-table-pagination.tsx # Paginación
└── index.ts                  # Exports

src/components/dynamic-datatable-factory/
├── datatable-factory.tsx     # Factory principal
├── column-builder.tsx        # Constructor de columnas
├── cell-renderers.tsx        # Renderers de celdas
└── schema-manager.ts         # Gestión de schemas
```

### 2. Componentes UI Requeridos (shadcn/ui)
```
src/components/ui/
├── button.tsx
├── dropdown-menu.tsx
├── select.tsx
├── checkbox.tsx
├── input.tsx
├── table.tsx
└── badge.tsx
```

### 3. Hooks y Utilidades
```
src/hooks/
└── use-dynamic-filters.ts

src/lib/
├── utils.ts              # cn() function
└── column-factory.tsx    # Factory estático
```

### 4. Tipos TypeScript
```
src/types/
├── datatable-config.ts
└── schema.ts
```

## Dependencias Mínimas Requeridas
```json
{
  "dependencies": {
    "@tanstack/react-table": "^8.0.0",
    "lucide-react": "^0.400.0",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5"
  }
}
```

## Setup en Proyecto Destino

### Paso 1: Instalar dependencias
```bash
npm install @tanstack/react-table lucide-react @radix-ui/react-dropdown-menu
```

### Paso 2: Configurar Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  // ... resto de config
}
```

### Paso 3: Uso básico
```tsx
import { DynamicDataTable } from './components/dynamic-datatable-factory'

function MyTable() {
  return (
    <DynamicDataTable
      data={myData}
      enableActions={true}
      actions={[
        { id: 'edit', label: 'Editar', icon: Edit, onClick: handleEdit }
      ]}
    />
  )
}
```
