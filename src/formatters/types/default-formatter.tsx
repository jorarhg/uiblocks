import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'
import { applyTemplate } from '../helpers'

export const DefaultFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  let displayValue = value
  if (options?.template) displayValue = applyTemplate(options.template, value, record)
  else displayValue = value?.toString() || ''
  return {
    content: <span className={options?.className}>{displayValue}</span>,
    className: options?.className,
    style: options?.style
  }
}
