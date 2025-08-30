import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'
import { applyTemplate } from '../helpers'
import { CircleIcon, CircleDashedIcon, Clock, CheckCircle, XCircle, AlertCircle, Star, Heart, Zap, User, Mail, Phone, Calendar, Settings, Home, Building, MapPin, Camera, FileText, Download, Upload, Edit, Trash2, Eye, Search, Filter, Plus, Minus } from 'lucide-react'

const ICON_REGISTRY = { 'circle': CircleIcon,'circle-dashed': CircleDashedIcon,'clock': Clock,'check-circle': CheckCircle,'x-circle': XCircle,'alert-circle': AlertCircle,'star': Star,'heart': Heart,'zap': Zap,'user': User,'mail': Mail,'phone': Phone,'calendar': Calendar,'settings': Settings,'home': Home,'building': Building,'map-pin': MapPin,'camera': Camera,'file-text': FileText,'download': Download,'upload': Upload,'edit': Edit,'trash': Trash2,'eye': Eye,'search': Search,'filter': Filter,'plus': Plus,'minus': Minus }

export const IconTextFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  const valueConfig = options?.valueMap?.[value]
  let displayText = valueConfig?.label || value
  if (options?.template) displayText = applyTemplate(options.template, value, record)
  const iconKey = valueConfig?.icon || options?.icon
  const IconComponent = iconKey ? ICON_REGISTRY[iconKey as keyof typeof ICON_REGISTRY] : null
  const iconPosition = options?.iconPosition || 'left'
  const textClassName = [valueConfig?.className, options?.className].filter(Boolean).join(' ')
  const iconClassName = ['h-4 w-4', options?.iconClassName].filter(Boolean).join(' ')
  return { content: (<div className='flex items-center gap-2'>{IconComponent && iconPosition === 'left' && <IconComponent className={iconClassName} />}<span className={textClassName}>{displayText}</span>{IconComponent && iconPosition === 'right' && <IconComponent className={iconClassName} />}</div>), style: { ...options?.style, ...valueConfig?.style } }
}
