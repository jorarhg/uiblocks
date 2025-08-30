import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'
import { applyTemplate } from '../helpers'

export const HtmlFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  let htmlContent = String(value || '')
  if (options?.template) htmlContent = applyTemplate(options.template, value, record)
  return { content: <div className={options?.className} style={options?.style} dangerouslySetInnerHTML={{ __html: htmlContent }} /> }
}
