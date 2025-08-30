
import React from 'react'
import { FormatterFunction } from '@/types/formatters'
import { Badge } from '@/components/ui/badge'
import { applyTemplate } from './index'
import { 
  CircleIcon, 
  CircleDashedIcon, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Heart,
  Zap
} from 'lucide-react'

// Registry de iconos disponibles para badges
const BADGE_ICONS = {
  'circle': CircleIcon,
  'circle-dashed': CircleDashedIcon,
  'clock': Clock,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'alert-circle': AlertCircle,
  'star': Star,
  'heart': Heart,
  'zap': Zap
}

/**
 * Formatter para badges con soporte completo de configuración
 */
export const BadgeFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  
  // Buscar configuración específica para este valor
  const valueConfig = options?.valueMap?.[value]
  
  // Determinar la variante del badge
  const variant = valueConfig?.variant || options?.variant || 'default'
  
  // Determinar el texto a mostrar
  let displayText = valueConfig?.label || value
  if (options?.template) {
    displayText = applyTemplate(options.template, value, record)
  }
  
  // Determinar el icono
  const iconKey = valueConfig?.icon || options?.icon
  const IconComponent = iconKey ? BADGE_ICONS[iconKey as keyof typeof BADGE_ICONS] : null
  
  // Combinar clases CSS
  const combinedClassName = [
    options?.badgeClassName,
    valueConfig?.className,
    options?.className
  ].filter(Boolean).join(' ')
  
  // Combinar estilos
  const combinedStyle = {
    ...options?.style,
    ...valueConfig?.style
  }
  
  return {
    content: (
      <Badge 
        variant={variant as any} 
        className={combinedClassName}
        style={combinedStyle}
      >
        {IconComponent && (
          <IconComponent className={`mr-1 h-3 w-3 ${options?.iconClassName || ''}`} />
        )}
        {displayText}
      </Badge>
    )
  }
}
