# 🎨 SISTEMA DE FORMATEO CONFIGURABLE DE COLUMNAS

## 📋 Resumen Ejecutivo

Esta propuesta extiende el sistema actual de DataTable para permitir **formateo configurable de columnas** a través de configuración JSON y TypeScript, proporcionando flexibilidad total para personalizar la apariencia y comportamiento de cada columna.

## 🎯 Objetivos

1. **Formateo Flexible**: Permitir configuración de formateo por columna
2. **CSS Personalizable**: Aplicar clases CSS específicas a columnas/celdas
3. **Formateo de Fechas**: Múltiples formatos de fecha configurables
4. **Badges Dinámicos**: Configuración completa de badges y variantes
5. **Iconos Integrados**: Sistema de iconos configurable
6. **Compatibilidad**: Mantener retrocompatibilidad con sistema actual
7. **Performance**: Mínimo impacto en rendimiento

## 🏗️ Arquitectura Propuesta

### 1. **Tipos de Formatters Disponibles**

```typescript
type FormatterType = 
  | 'default'      // Texto simple
  | 'badge'        // Badge con variantes y colores
  | 'date'         // Formateo de fechas
  | 'currency'     // Formateo de moneda
  | 'percentage'   // Formateo de porcentaje
  | 'icon'         // Solo icono
  | 'icon-text'    // Icono + texto
  | 'custom'       // Formatter personalizado
  | 'html'         // HTML personalizado
  | 'link'         // Enlaces
  | 'image'        // Imágenes
```

### 2. **Configuración de Formatter por Columna**

```typescript
interface ColumnFormatter {
  type: FormatterType
  options?: {
    // Para todos los tipos
    className?: string
    style?: React.CSSProperties
    
    // Para badges
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    badgeClassName?: string
    
    // Para fechas
    format?: 'short' | 'medium' | 'long' | 'iso' | 'custom'
    customFormat?: string // ej: 'DD/MM/YYYY'
    locale?: string
    
    // Para currency
    currency?: string // 'USD', 'EUR', etc.
    decimals?: number
    
    // Para percentage
    decimals?: number
    suffix?: string
    
    // Para iconos
    icon?: string
    iconPosition?: 'left' | 'right'
    iconClassName?: string
    
    // Para links
    href?: string | ((value: any, record: any) => string)
    target?: '_blank' | '_self'
    
    // Para imágenes
    width?: number
    height?: number
    alt?: string
    
    // Para custom HTML
    template?: string
    
    // Mapping de valores a estilos específicos
    valueMap?: Record<string, {
      className?: string
      style?: React.CSSProperties
      icon?: string
      label?: string
      variant?: string
    }>
  }
}
```

### 3. **Configuración de Columna Extendida**

```typescript
interface ExtendedColumnConfig {
  key: string
  label: string
  type?: FieldType
  sortable?: boolean
  filterable?: boolean
  
  // NUEVO: Configuración de formateo
  formatter?: ColumnFormatter
  
  // NUEVO: Clases CSS para la columna completa
  columnClassName?: string
  headerClassName?: string
  cellClassName?: string
  
  // NUEVO: Configuración condicional
  conditionalFormatting?: ConditionalFormat[]
}

interface ConditionalFormat {
  condition: (value: any, record: any) => boolean
  formatter: ColumnFormatter
}
```

## 🛠️ Implementación Técnica

### 1. **Nuevo Sistema de Formatters**

```typescript
// /lib/formatters/index.ts
export interface FormatterContext {
  value: any
  record: any
  field: ExtendedColumnConfig
  rowIndex: number
  columnIndex: number
}

export interface FormatterResult {
  content: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export type FormatterFunction = (context: FormatterContext) => FormatterResult

// Registry de formatters
export const FORMATTERS: Record<FormatterType, FormatterFunction> = {
  default: DefaultFormatter,
  badge: BadgeFormatter,
  date: DateFormatter,
  currency: CurrencyFormatter,
  percentage: PercentageFormatter,
  icon: IconFormatter,
  'icon-text': IconTextFormatter,
  custom: CustomFormatter,
  html: HtmlFormatter,
  link: LinkFormatter,
  image: ImageFormatter,
}
```

### 2. **Implementación de Formatters Específicos**

```typescript
// /lib/formatters/badge-formatter.ts
export const BadgeFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  const valueMap = options?.valueMap?.[value]
  
  const variant = valueMap?.variant || options?.variant || 'default'
  const className = cn(
    options?.badgeClassName,
    valueMap?.className,
    options?.className
  )
  
  const icon = valueMap?.icon || options?.icon
  const label = valueMap?.label || value
  
  return {
    content: (
      <Badge variant={variant} className={className}>
        {icon && <Icon name={icon} className="mr-1 h-3 w-3" />}
        {label}
      </Badge>
    )
  }
}

// /lib/formatters/date-formatter.ts
export const DateFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  
  if (!value) return { content: <span>-</span> }
  
  const date = new Date(value)
  if (isNaN(date.getTime())) return { content: <span>{value}</span> }
  
  let formattedDate: string
  
  switch (options?.format) {
    case 'short':
      formattedDate = date.toLocaleDateString(options?.locale)
      break
    case 'medium':
      formattedDate = date.toLocaleDateString(options?.locale, { 
        year: 'numeric', month: 'short', day: 'numeric' 
      })
      break
    case 'long':
      formattedDate = date.toLocaleDateString(options?.locale, { 
        year: 'numeric', month: 'long', day: 'numeric' 
      })
      break
    case 'custom':
      formattedDate = formatCustomDate(date, options?.customFormat || 'DD/MM/YYYY')
      break
    default:
      formattedDate = date.toISOString().split('T')[0]
  }
  
  return {
    content: <span className={options?.className}>{formattedDate}</span>
  }
}
```

### 3. **Configuración JSON Extendida**

```json
{
  "columns": [
    {
      "key": "id",
      "label": "ID",
      "formatter": {
        "type": "default",
        "options": {
          "className": "font-mono text-sm",
          "template": "TASK-{value}"
        }
      }
    },
    {
      "key": "status",
      "label": "Estado",
      "formatter": {
        "type": "badge",
        "options": {
          "variant": "outline",
          "valueMap": {
            "todo": {
              "label": "Por Hacer",
              "icon": "circle-dashed",
              "className": "bg-gray-50 text-gray-700 border-gray-200"
            },
            "in-progress": {
              "label": "En Progreso",
              "icon": "clock",
              "className": "bg-blue-50 text-blue-700 border-blue-200"
            },
            "done": {
              "label": "Completado",
              "icon": "check-circle",
              "className": "bg-green-50 text-green-700 border-green-200"
            }
          }
        }
      }
    },
    {
      "key": "priority",
      "label": "Prioridad",
      "formatter": {
        "type": "badge",
        "options": {
          "valueMap": {
            "high": {
              "label": "Alta",
              "variant": "destructive",
              "className": "font-semibold"
            },
            "medium": {
              "label": "Media",
              "variant": "outline",
              "className": "bg-yellow-50 text-yellow-700 border-yellow-200"
            },
            "low": {
              "label": "Baja",
              "variant": "secondary"
            }
          }
        }
      }
    },
    {
      "key": "createdAt",
      "label": "Fecha de Creación",
      "formatter": {
        "type": "date",
        "options": {
          "format": "medium",
          "locale": "es-ES",
          "className": "text-muted-foreground"
        }
      }
    },
    {
      "key": "estimate",
      "label": "Estimación",
      "formatter": {
        "type": "custom",
        "options": {
          "template": "{value}h",
          "className": "font-medium",
          "conditionalFormatting": [
            {
              "condition": "value > 8",
              "className": "text-red-600 font-bold"
            },
            {
              "condition": "value <= 2",
              "className": "text-green-600"
            }
          ]
        }
      }
    }
  ]
}
```

### 4. **Formateo Condicional Avanzado**

```typescript
// Ejemplo de formateo condicional más complejo
{
  "key": "score",
  "label": "Puntuación",
  "formatter": {
    "type": "badge",
    "options": {
      "conditionalFormatting": [
        {
          "condition": "value >= 90",
          "formatter": {
            "type": "badge",
            "options": {
              "variant": "default",
              "className": "bg-green-500 text-white",
              "icon": "star",
              "template": "⭐ {value}%"
            }
          }
        },
        {
          "condition": "value >= 70",
          "formatter": {
            "type": "badge",
            "options": {
              "variant": "outline",
              "className": "bg-blue-50 text-blue-700",
              "template": "{value}%"
            }
          }
        },
        {
          "condition": "value < 70",
          "formatter": {
            "type": "badge",
            "options": {
              "variant": "destructive",
              "template": "⚠️ {value}%"
            }
          }
        }
      ]
    }
  }
}
```

## 🎨 Ejemplos de Uso

### 1. **Configuración de Badge con Iconos**
```json
{
  "key": "status",
  "formatter": {
    "type": "badge",
    "options": {
      "variant": "outline",
      "valueMap": {
        "active": {
          "label": "Activo",
          "icon": "check-circle",
          "className": "bg-green-50 text-green-700 border-green-200"
        },
        "inactive": {
          "label": "Inactivo",
          "icon": "x-circle",
          "className": "bg-red-50 text-red-700 border-red-200"
        }
      }
    }
  }
}
```

### 2. **Formateo de Moneda**
```json
{
  "key": "price",
  "formatter": {
    "type": "currency",
    "options": {
      "currency": "EUR",
      "decimals": 2,
      "className": "font-semibold text-green-600"
    }
  }
}
```

### 3. **Enlaces Dinámicos**
```json
{
  "key": "email",
  "formatter": {
    "type": "link",
    "options": {
      "href": "mailto:{value}",
      "className": "text-blue-600 hover:underline",
      "template": "📧 {value}"
    }
  }
}
```

### 4. **Formateo Condicional Múltiple**
```json
{
  "key": "temperature",
  "formatter": {
    "type": "default",
    "options": {
      "template": "{value}°C",
      "conditionalFormatting": [
        {
          "condition": "value > 30",
          "className": "text-red-600 font-bold bg-red-50 px-2 py-1 rounded"
        },
        {
          "condition": "value < 10",
          "className": "text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded"
        }
      ]
    }
  }
}
```

## 🔧 Plan de Implementación

### Fase 1: Core Formatters (Semana 1)
- [ ] Implementar sistema base de formatters
- [ ] Crear formatters básicos (default, badge, date)
- [ ] Integrar con column-factory existente
- [ ] Tests unitarios básicos

### Fase 2: Formatters Avanzados (Semana 2)
- [ ] Implementar formatters de currency, percentage
- [ ] Sistema de iconos integrado
- [ ] Formatters de link e image
- [ ] Documentación completa

### Fase 3: Formateo Condicional (Semana 3)
- [ ] Sistema de formateo condicional
- [ ] Templates dinámicos
- [ ] Configuración JSON extendida
- [ ] Ejemplos de uso

### Fase 4: Optimización y Testing (Semana 4)
- [ ] Optimización de performance
- [ ] Tests de integración
- [ ] Documentación de migración
- [ ] Demo interactivo completo

## 📈 Beneficios

### Para Desarrolladores
- **Flexibilidad Total**: Configuración completa sin código
- **Reutilización**: Formatters reutilizables entre proyectos
- **Mantenibilidad**: Separación clara entre lógica y presentación
- **Extensibilidad**: Fácil agregar nuevos formatters

### Para Usuarios Finales
- **Consistencia Visual**: Formateo coherente en toda la aplicación
- **Legibilidad Mejorada**: Datos presentados de forma clara
- **Experiencia Rica**: Iconos, colores y formateo contextual

### Para el Sistema
- **Performance**: Formatters optimizados con memoización
- **Compatibilidad**: No rompe funcionalidad existente
- **Escalabilidad**: Soporta configuraciones complejas

## 🚀 Próximos Pasos

1. **Crear el sistema base de formatters**
2. **Implementar los formatters más comunes**
3. **Integrar con el sistema actual**
4. **Crear ejemplos y documentación**
5. **Testing exhaustivo**

¿Te gustaría que proceda con la implementación de alguna fase específica?
