import { FieldSchema, FieldType, CellRenderer, CellRendererProps } from '@/types/schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CircleIcon, 
  CircleDashedIcon, 
  ArrowRightIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon
} from 'lucide-react'

// Registry de iconos disponibles
const ICON_REGISTRY = {
  'circle': CircleIcon,
  'circle-dashed': CircleDashedIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  'check-circle': CheckCircleIcon,
  'x-circle': XCircleIcon
}

// Renderizador para texto simple
export const StringRenderer: CellRenderer = ({ value }) => {
  return <span>{value?.toString() || ''}</span>
}

// Renderizador para números
export const NumberRenderer: CellRenderer = ({ value }) => {
  if (typeof value === 'number') {
    // Usar formato consistente para evitar errores de hidratación
    return <span>{value.toString()}</span>
  }
  return <span>{value}</span>
}

// Renderizador para fechas - hydration-safe
export const DateRenderer: CellRenderer = ({ value }) => {
  if (!value) return <span>-</span>
  
  try {
    const date = new Date(value)
    if (isNaN(date.getTime())) {
      return <span>{value}</span>
    }
    
    // Formato ISO consistente para evitar errores de hidratación
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return <span>{`${year}-${month}-${day}`}</span>
  } catch (error) {
    return <span>{value}</span>
  }
}

// Renderizador para badges
export const BadgeRenderer: CellRenderer = ({ value, field }) => {
  const option = field.options?.find(opt => opt.value === value)
  if (!option) return <span>{value}</span>
  
  return (
    <Badge variant={option.variant as any || 'default'}>
      {option.icon && ICON_REGISTRY[option.icon as keyof typeof ICON_REGISTRY] && (
        <>
          {(() => {
            const IconComponent = ICON_REGISTRY[option.icon as keyof typeof ICON_REGISTRY]
            return <IconComponent className="mr-1 h-3 w-3" />
          })()}
        </>
      )}
      {option.label}
    </Badge>
  )
}

// Renderizador para iconos
export const IconRenderer: CellRenderer = ({ value, field }) => {
  const option = field.options?.find(opt => opt.value === value)
  if (!option || !option.icon) return <span>{value}</span>
  
  const IconComponent = ICON_REGISTRY[option.icon as keyof typeof ICON_REGISTRY]
  if (!IconComponent) return <span>{value}</span>
  
  return <IconComponent className="h-4 w-4" />
}

// Renderizador para selects
export const SelectRenderer: CellRenderer = ({ value, field }) => {
  const option = field.options?.find(opt => opt.value === value)
  return <span>{option?.label || value}</span>
}

// Renderizador para booleanos
export const BooleanRenderer: CellRenderer = ({ value }) => {
  return (
    <Badge variant={value ? 'default' : 'secondary'}>
      {value ? 'Sí' : 'No'}
    </Badge>
  )
}

// Registry principal de renderizadores
export const CELL_RENDERERS: Record<FieldType, CellRenderer> = {
  string: StringRenderer,
  number: NumberRenderer,
  date: DateRenderer,
  boolean: BooleanRenderer,
  select: SelectRenderer,
  multiselect: SelectRenderer,
  badge: BadgeRenderer,
  icon: IconRenderer,
  custom: StringRenderer // Fallback
}

// Función para obtener el renderizador correcto
export function getCellRenderer(field: FieldSchema): CellRenderer {
  return CELL_RENDERERS[field.type] || StringRenderer
}
