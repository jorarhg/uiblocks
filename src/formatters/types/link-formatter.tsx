import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'
import { applyTemplate } from '../helpers'

export const LinkFormatter: FormatterFunction = ({ value, field, record }) => {
  const options = field.formatter?.options
  if (!value) return { content: <span className='text-muted-foreground'>-</span> }
  let href: string
  if (typeof options?.href === 'function') href = options.href(value, record)
  else if (options?.href) href = applyTemplate(options.href, value, record)
  else href = String(value)
  let displayText = value
  if (options?.template) displayText = applyTemplate(options.template, value, record)
  const target = options?.target || '_self'
  return { content: <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer':undefined} className={`hover:underline ${options?.linkClassName || 'text-blue-600'} ${options?.className || ''}`} style={options?.style}>{displayText}</a> }
}
