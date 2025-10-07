# Setup para consumo vía Git Subtree

Si integraste este paquete usando `git subtree`, sigue estos pasos:

## 1. Estructura esperada

Asumiendo que hiciste:

```bash
git subtree add --prefix=libs/ui-blocks https://github.com/jorarhg/uiblocks.git split/ui-blocks --squash
```

Tu estructura será:

```
tu-proyecto/
├── libs/
│   └── ui-blocks/          # <- Este paquete
│       ├── src/
│       ├── dist/
│       ├── tailwind.config.reference.js
│       └── ...
├── src/
├── tailwind.config.js      # <- Tu config
└── ...
```

## 2. Configurar Tailwind

En tu `tailwind.config.js`:

```js
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    
    // IMPORTANTE: Apuntar al código FUENTE del paquete
    "./libs/ui-blocks/src/**/*.{ts,tsx}",  // ✅ Correcto
    // NO: "./libs/ui-blocks/dist/**/*.js"  // ❌ Menos eficiente
  ],
  theme: {
    extend: {
      // Copia de tailwind.config.reference.js y personaliza
      colors: {
        background: "hsl(var(--background))",
        // ...
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

**¿Por qué `src/` y no `dist/`?**
- Mejor tree-shaking (Tailwind solo incluye clases usadas)
- Hot reload funciona correctamente
- Debugging más fácil (source maps directos)

## 3. Configurar imports

### Opción A: Path alias en tsconfig.json (recomendado)

```json
{
  "compilerOptions": {
    "paths": {
      "@teribit/ui-blocks": ["./libs/ui-blocks/src"],
      "@teribit/ui-blocks/*": ["./libs/ui-blocks/src/*"]
    }
  }
}
```

Luego importa normalmente:

```typescript
import { DataTable, registerFormatter } from '@teribit/ui-blocks'
```

### Opción B: Imports relativos

```typescript
import { DataTable } from '../libs/ui-blocks/src'
import { registerFormatter } from '../libs/ui-blocks/src/formatters'
```

## 4. Variables CSS

Copia el contenido de `libs/ui-blocks/styles.reference.css` a tu `globals.css`:

```css
/* tu-proyecto/src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Copiado y personalizado desde styles.reference.css */
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    /* ... tus valores personalizados */
  }

  .dark {
    /* ... */
  }
}
```

## 5. Actualizar el subtree

Cuando haya cambios en el paquete original:

```bash
# Fetch cambios
git fetch https://github.com/jorarhg/uiblocks.git split/ui-blocks

# Pull cambios al subtree
git subtree pull --prefix=libs/ui-blocks https://github.com/jorarhg/uiblocks.git split/ui-blocks --squash
```

## 6. Verificar configuración

Crea un componente de prueba:

```tsx
// src/test/ui-blocks-test.tsx
import { DataTable, Button, Badge } from '@teribit/ui-blocks'

export function UIBlocksTest() {
  const data = [{ id: 1, name: 'Test' }]
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">UI Blocks Test</h1>
      <div className="space-y-4">
        <Button>Test Button</Button>
        <Badge>Test Badge</Badge>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
```

Si los estilos se ven correctamente, ¡todo está configurado! 🎉

## Troubleshooting

### Los estilos no se aplican

1. Verifica que `content` en tailwind.config apunta a `libs/ui-blocks/src/**/*.{ts,tsx}`
2. Asegúrate de que las variables CSS están definidas en tu globals.css
3. Reinicia el servidor de desarrollo

### Errores de TypeScript

1. Verifica los `paths` en tsconfig.json
2. Asegúrate de que el alias apunta a `src/`, no `dist/`
3. Reinicia el language server de TypeScript

### Imports no funcionan

Si usaste un prefix diferente (ej: `vendor/uiblocks/packages/ui-blocks`):

```json
{
  "compilerOptions": {
    "paths": {
      "@teribit/ui-blocks": ["./vendor/uiblocks/packages/ui-blocks/src"]
    }
  }
}
```

Y en tailwind.config:

```js
content: [
  "./vendor/uiblocks/packages/ui-blocks/src/**/*.{ts,tsx}",
]
```
