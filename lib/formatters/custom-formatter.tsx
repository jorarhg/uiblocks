
import React from 'react'
import { FormatterFunction } from '@/types/formatters'
import { applyTemplate } from './index'

/**
 * Formatter personalizado que permite plantillas y lógica avanzada
 */
export const CustomFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  
  // Si hay un template, aplicarlo
  if (options?.template) {
    const processedValue = applyTemplate(options.template, value, record)
    
    return {
      content: (
        <span 
          className={options?.className}
          style={options?.style}
        >
          {processedValue}
        </span>
      )
    }
  }
  
  // Si no hay template, usar el valor directamente
  return {
    content: (
      <span 
        className={options?.className}
        style={options?.style}
      >
        {String(value || '')}
      </span>
    )
  }
}
