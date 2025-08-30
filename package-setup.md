# Crear NPM Package del Sistema DataTable

## Paso 1: Preparar Package Structure
```
dynamic-datatable-package/
├── package.json
├── tsconfig.json
├── rollup.config.js
├── src/
│   ├── index.ts
│   ├── components/
│   │   ├── data-table/
│   │   ├── dynamic-datatable-factory/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── dist/
└── README.md
```

## Paso 2: Package.json para NPM
```json
{
  "name": "@your-org/dynamic-datatable",
  "version": "1.0.0",
  "description": "Sistema dinámico de DataTable con acciones, filtros y configuración JSON",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "@tanstack/react-table": "^8.0.0",
    "lucide-react": "^0.400.0"
  },
  "dependencies": {
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-checkbox": "^1.1.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5"
  }
}
```

## Paso 3: Entry Point (src/index.ts)
```typescript
// Componentes principales
export { DynamicDataTable } from './components/dynamic-datatable-factory'
export { DataTableWithDynamicToolbar } from './components/data-table'

// Sistema de acciones
export { ActionsMenu, createActionsColumn, defaultActions } from './components/data-table/actions'
export type { ActionItem } from './components/data-table/actions'

// Factory y builders
export { ColumnBuilder, SchemaManager } from './components/dynamic-datatable-factory'

// Hooks
export { useDynamicFilters } from './hooks'

// Tipos
export type * from './types'

// Utilidades
export { cn } from './lib/utils'
```

## Paso 4: Build con Rollup
```javascript
// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: ['react', 'react-dom', '@tanstack/react-table'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({ extract: true })
  ]
}
```
