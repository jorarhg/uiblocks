
import React from 'react'
import { FormatterFunction } from '@/types/formatters'
import { applyTemplate } from './index'

/**
 * Formatter para HTML personalizado (usar con precaución)
 */
export const HtmlFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  
  let htmlContent = String(value || '')
  
  // Aplicar template si existe
  if (options?.template) {
    htmlContent = applyTemplate(options.template, value, record)
  }
  
  return {
    content: (
      <div 
        className={options?.className}
        style={options?.style}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    )
  }
}
