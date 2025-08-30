import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'
import { Badge } from '../../ui/badge'
import { applyTemplate } from '../helpers'
import { CircleIcon, CircleDashedIcon, Clock, CheckCircle, XCircle, AlertCircle, Star, Heart, Zap } from 'lucide-react'

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

export const BadgeFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  const valueConfig = options?.valueMap?.[value]
  const variant = valueConfig?.variant || options?.variant || 'default'
  let displayText = valueConfig?.label || value
  if (options?.template) displayText = applyTemplate(options.template, value, record)
  const iconKey = valueConfig?.icon || options?.icon
  const IconComponent = iconKey ? BADGE_ICONS[iconKey as keyof typeof BADGE_ICONS] : null
  const combinedClassName = [options?.badgeClassName, valueConfig?.className, options?.className].filter(Boolean).join(' ')
  const combinedStyle = { ...options?.style, ...valueConfig?.style }
  return {
    content: (
      <Badge variant={variant as any} className={combinedClassName} style={combinedStyle}>
        {IconComponent && <IconComponent className={`mr-1 h-3 w-3 ${options?.iconClassName || ''}`} />}
        {displayText}
      </Badge>
    )
  }
}
