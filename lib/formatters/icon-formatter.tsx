
import React from 'react'
import { FormatterFunction } from '@/types/formatters'
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

// Registry expandido de iconos
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
 * Formatter que muestra solo un icono basado en el valor
 */
export const IconFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  
  // Buscar configuración específica para este valor
  const valueConfig = options?.valueMap?.[value]
  
  // Determinar el icono a mostrar
  const iconKey = valueConfig?.icon || options?.icon || value
  const IconComponent = ICON_REGISTRY[iconKey as keyof typeof ICON_REGISTRY]
  
  if (!IconComponent) {
    return {
      content: <span className="text-muted-foreground">-</span>
    }
  }
  
  // Combinar clases CSS
  const combinedClassName = [
    'h-4 w-4',
    options?.iconClassName,
    valueConfig?.className,
    options?.className
  ].filter(Boolean).join(' ')
  
  return {
    content: (
      <IconComponent 
        className={combinedClassName}
        style={{ ...options?.style, ...valueConfig?.style }}
      />
    )
  }
}
