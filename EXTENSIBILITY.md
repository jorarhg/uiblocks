# Guía de Extensibilidad

Este documento explica cómo extender `@teribit/ui-blocks` para adaptarlo a tus necesidades específicas.

## 🎨 Sistema de Theming

### Variables CSS personalizables

Los componentes usan variables CSS para permitir theming dinámico sin recompilar:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... más variables */
}
```

**Para personalizar**:

1. Define tus propios valores HSL
2. Crea temas adicionales con clases (ej: `.theme-brand`)
3. Cambia dinámicamente agregando/quitando clases

### Configuración de Tailwind

El archivo `tailwind.config.reference.js` es una **plantilla**. Personaliza:

- **Colores**: Cambia los valores HSL según tu marca
- **Border radius**: Ajusta `--radius` para esquinas más/menos redondeadas
- **Spacing**: Extiende con tus propios valores
- **Breakpoints**: Modifica `screens` si lo necesitas

## 🔧 Sistema de Formatters

### Formatters incluidos

- `default` - Texto plano
- `badge` - Badges con variantes
- `date` - Formateo de fechas (múltiples formatos)
- `currency` - Moneda con locales
- `percentage` - Porcentajes con decimales
- `icon` - Solo íconos
- `icon-text` - Ícono + texto
- `custom` - Template strings
- `html` - HTML raw (sanitizado)
- `link` - Enlaces
- `image` - Imágenes

### Registrar formatters personalizados

#### Ejemplo básico

```typescript
import { registerFormatter, type FormatterFunction } from '@teribit/ui-blocks'

const myFormatter: FormatterFunction = (context) => {
  const { value, record, field } = context
  
  return {
    content: <span>{value}</span>,
    className: 'my-custom-class',
    style: { color: 'red' }
  }
}

registerFormatter('my-type', myFormatter)
```

#### Ejemplo avanzado con opciones

```typescript
const advancedFormatter: FormatterFunction = (context) => {
  const { value, field } = context
  const options = field.formatter?.options || {}
  const threshold = options.threshold || 50
  
  const variant = value > threshold ? 'success' : 'warning'
  
  return {
    content: (
      <div className={`formatter-${variant}`}>
        <strong>{value}</strong>
        {options.suffix && <span> {options.suffix}</span>}
      </div>
    )
  }
}

registerFormatter('threshold', advancedFormatter)

// Uso:
{
  key: 'score',
  formatter: {
    type: 'threshold',
    options: {
      threshold: 75,
      suffix: 'pts'
    }
  }
}
```

#### Composición de formatters

```typescript
import { getFormatter, registerFormatter } from '@teribit/ui-blocks'

// Obtener formatter existente
const badgeFormatter = getFormatter('badge')!

// Crear uno nuevo que lo extiende
const customBadgeFormatter: FormatterFunction = (context) => {
  // Pre-procesamiento
  const modifiedContext = {
    ...context,
    value: context.value.toUpperCase()
  }
  
  // Usar formatter base
  const result = badgeFormatter(modifiedContext)
  
  // Post-procesamiento
  return {
    ...result,
    className: `${result.className} my-additional-class`
  }
}

registerFormatter('custom-badge', customBadgeFormatter)
```

### Formateo condicional

Aplica formateo sin crear un formatter custom:

```typescript
{
  key: 'amount',
  formatter: { type: 'currency' },
  conditionalFormatting: [
    {
      condition: (value) => value < 0,
      className: 'text-red-600 font-bold'
    },
    {
      condition: (value) => value > 1000,
      className: 'text-green-600 font-bold'
    }
  ]
}
```

Con string conditions (evaluadas de forma segura):

```typescript
{
  key: 'score',
  formatter: { type: 'default' },
  conditionalFormatting: [
    {
      condition: 'value >= 90',
      className: 'bg-green-100 text-green-800'
    },
    {
      condition: 'value < 50',
      className: 'bg-red-100 text-red-800'
    }
  ]
}
```

## 📊 Configuración JSON externa

Los componentes pueden consumir configuración desde JSON:

```json
{
  "columns": [
    {
      "key": "status",
      "label": "Estado",
      "formatter": {
        "type": "badge",
        "options": {
          "valueMap": {
            "active": { "label": "Activo", "variant": "default" },
            "inactive": { "label": "Inactivo", "variant": "secondary" }
          }
        }
      }
    }
  ]
}
```

Carga y úsalo:

```typescript
const config = await fetch('/mi-config.json').then(r => r.json())
const columns = createFormattedColumns(config.columns)
```

## 🎯 Mejores prácticas

### 1. Separa lógica de presentación

```typescript
// ✅ Bien: Lógica separada
const getStatusColor = (status: string) => {
  const colors = { active: 'green', pending: 'yellow', inactive: 'gray' }
  return colors[status] || 'gray'
}

const statusFormatter: FormatterFunction = (ctx) => ({
  content: <Badge color={getStatusColor(ctx.value)}>{ctx.value}</Badge>
})
```

### 2. Valida entrada

```typescript
const safeFormatter: FormatterFunction = (ctx) => {
  if (ctx.value == null) {
    return { content: '-' }
  }
  
  if (typeof ctx.value !== 'number') {
    console.warn('Expected number, got', typeof ctx.value)
    return { content: String(ctx.value) }
  }
  
  return { content: ctx.value.toFixed(2) }
}
```

### 3. Usa TypeScript

```typescript
interface MyFormatterOptions {
  prefix?: string
  suffix?: string
  decimals?: number
}

const typedFormatter: FormatterFunction = (ctx) => {
  const opts = ctx.field.formatter?.options as MyFormatterOptions | undefined
  // Ahora tienes autocompletado
}
```

### 4. Documenta tus formatters

```typescript
/**
 * Formatter para códigos QR
 * 
 * @example
 * {
 *   type: 'qr-code',
 *   options: {
 *     size: 100,        // Tamaño en px
 *     errorLevel: 'M'   // L, M, Q, H
 *   }
 * }
 */
registerFormatter('qr-code', qrFormatter)
```

## 🔄 Migración y compatibilidad

Si tienes formatters registrados y actualizas el paquete:

1. **Los formatters incluidos NO cambiarán** su interfaz en versiones minor/patch
2. **Tus formatters custom seguirán funcionando** (el registry es tuyo)
3. **Nuevos formatters se añadirán** sin sobrescribir los tuyos

Para evitar conflictos de nombres:

```typescript
// Usa un prefijo para tus formatters
registerFormatter('myapp-status', statusFormatter)
registerFormatter('myapp-priority', priorityFormatter)
```

## 📚 Recursos adicionales

- Ver `/config/formatters-demo-config.json` en el repo para ejemplos completos
- Revisar `/lib/formatters/` para implementaciones de referencia
- Consultar types en `src/internal/types/formatters.d.ts` para interfaces completas
