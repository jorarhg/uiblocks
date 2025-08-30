
import React from 'react'
import { FormatterFunction } from '@/types/formatters'
import { applyTemplate } from './index'

/**
 * Formatter por defecto - renderiza texto simple con soporte para templates
 */
export const DefaultFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  
  // Aplicar template si existe
  let displayValue = value
  if (options?.template) {
    displayValue = applyTemplate(options.template, value, record)
  } else {
    displayValue = value?.toString() || ''
  }
  
  return {
    content: <span className={options?.className}>{displayValue}</span>,
    className: options?.className,
    style: options?.style
  }
}
