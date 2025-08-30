import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'
import { applyTemplate } from '../helpers'

export const CustomFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  if (options?.template) {
    const processedValue = applyTemplate(options.template, value, record)
    return { content: <span className={options?.className} style={options?.style}>{processedValue}</span> }
  }
  return { content: <span className={options?.className} style={options?.style}>{String(value || '')}</span> }
}
