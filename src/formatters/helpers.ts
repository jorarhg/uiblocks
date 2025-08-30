import React from 'react'
import { FormatterContext, FormatterResult, ColumnFormatter, ConditionalFormat } from '../internal/types/formatters'

export function applyTemplate(template: string, value: any, record?: any): string {
  if (!template) return String(value ?? '')
  return template
    .replace(/\{value\}/g, String(value ?? ''))
    .replace(/\{record\.(\w+)\}/g, (_, prop) => String(record?.[prop] ?? ''))
}

export function createCustomFormatter(
  render: (context: FormatterContext) => React.ReactNode
) {
  return (context: FormatterContext) => ({ content: render(context) })
}

export function applyConditionalFormatting(
  context: FormatterContext,
  baseResult: FormatterResult,
  formatCell: (ctx: FormatterContext) => FormatterResult
): FormatterResult {
  const { field, value, record } = context
  const conditionalFormats: ConditionalFormat[] = field.formatter?.options?.conditionalFormatting || field.conditionalFormatting || []
  for (const format of conditionalFormats) {
    let met = false
    if (typeof format.condition === 'function') met = format.condition(value, record)
    else if (typeof format.condition === 'string') {
      try { met = evaluateCondition(format.condition, value, record) } catch { continue }
    }
    if (met) {
      if (format.formatter) {
        const newCtx: FormatterContext = { ...context, field: { ...context.field, formatter: format.formatter as ColumnFormatter } }
        return formatCell(newCtx)
      }
      return { ...baseResult, className: combineClassNames(baseResult.className, format.className), style: { ...baseResult.style, ...format.style } }
    }
  }
  return baseResult
}

function evaluateCondition(condition: string, value: any, record: any): boolean {
  const safe = condition
    .replace(/\bvalue\b/g, JSON.stringify(value))
    .replace(/\brecord\.(\w+)\b/g, (_, p) => JSON.stringify(record?.[p]))
  const allowed = /^[\d\s\+\-\*\/\(\)\>\<\=\!\&\|\.\"\'\w]+$/
  if (!allowed.test(safe)) throw new Error('Unsafe condition')
  // eslint-disable-next-line no-new-func
  return new Function('return ' + safe)()
}

function combineClassNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}