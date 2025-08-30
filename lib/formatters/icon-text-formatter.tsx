
import React from 'react'
import { FormatterFunction } from '@/types/formatters'
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
  Zap,
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  Home,
  Building,
  MapPin,
  Camera,
  FileText,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Plus,
  Minus
} from 'lucide-react'

// Mismo registry que icon-formatter
const ICON_REGISTRY = {
  'circle': CircleIcon,
  'circle-dashed': CircleDashedIcon,
  'clock': Clock,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'alert-circle': AlertCircle,
  'star': Star,
  'heart': Heart,
  'zap': Zap,
  'user': User,
  'mail': Mail,
  'phone': Phone,
  'calendar': Calendar,
  'settings': Settings,
  'home': Home,
  'building': Building,
  'map-pin': MapPin,
  'camera': Camera,
  'file-text': FileText,
  'download': Download,
  'upload': Upload,
  'edit': Edit,
  'trash': Trash2,
  'eye': Eye,
  'search': Search,
  'filter': Filter,
  'plus': Plus,
  'minus': Minus
}

/**
 * Formatter que muestra un icono junto con texto
 */
export const IconTextFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  
  // Buscar configuración específica para este valor
  const valueConfig = options?.valueMap?.[value]
  
  // Determinar el texto a mostrar
  let displayText = valueConfig?.label || value
  if (options?.template) {
    displayText = applyTemplate(options.template, value, record)
  }
  
  // Determinar el icono
  const iconKey = valueConfig?.icon || options?.icon
  const IconComponent = iconKey ? ICON_REGISTRY[iconKey as keyof typeof ICON_REGISTRY] : null
  
  // Determinar posición del icono
  const iconPosition = options?.iconPosition || 'left'
  
  // Combinar clases CSS
  const textClassName = [
    valueConfig?.className,
    options?.className
  ].filter(Boolean).join(' ')
  
  const iconClassName = [
    'h-4 w-4',
    options?.iconClassName
  ].filter(Boolean).join(' ')
  
  const containerClassName = 'flex items-center gap-2'
  
  return {
    content: (
      <div className={containerClassName}>
        {IconComponent && iconPosition === 'left' && (
          <IconComponent className={iconClassName} />
        )}
        <span className={textClassName}>
          {displayText}
        </span>
        {IconComponent && iconPosition === 'right' && (
          <IconComponent className={iconClassName} />
        )}
      </div>
    ),
    style: { ...options?.style, ...valueConfig?.style }
  }
}
