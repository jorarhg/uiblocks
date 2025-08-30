
import { FormatterFunction, FormatterType, FormatterContext, FormatterResult } from '@/types/formatters'
import { DefaultFormatter } from './default-formatter'
import { BadgeFormatter } from './badge-formatter'
import { DateFormatter } from './date-formatter'
import { CurrencyFormatter } from './currency-formatter'
import { PercentageFormatter } from './percentage-formatter'
import { IconFormatter } from './icon-formatter'
import { IconTextFormatter } from './icon-text-formatter'
import { CustomFormatter } from './custom-formatter'
import { HtmlFormatter } from './html-formatter'
import { LinkFormatter } from './link-formatter'
import { ImageFormatter } from './image-formatter'

// Registry de formatters disponibles
export const FORMATTERS: Record<FormatterType, FormatterFunction> = {
  default: DefaultFormatter,
  badge: BadgeFormatter,
  date: DateFormatter,
  currency: CurrencyFormatter,
  percentage: PercentageFormatter,
  icon: IconFormatter,
  'icon-text': IconTextFormatter,
  custom: CustomFormatter,
  html: HtmlFormatter,
  link: LinkFormatter,
  image: ImageFormatter,
}

/**
 * Función principal para aplicar formateo a una celda
 */
export function formatCell(context: FormatterContext): FormatterResult {
  const { field } = context
  
  if (!field.formatter) {
    return DefaultFormatter(context)
  }
  
  const formatter = FORMATTERS[field.formatter.type]
  if (!formatter) {
    console.warn(`Formatter type '${field.formatter.type}' not found, using default`)
    return DefaultFormatter(context)
  }
  
  try {
    const result = formatter(context)
    
    // Aplicar formateo condicional si existe
    const conditionalResult = applyConditionalFormatting(context, result)
    
    return conditionalResult
  } catch (error) {
    console.error(`Error in formatter '${field.formatter.type}':`, error)
    return DefaultFormatter(context)
  }
}

/**
 * Aplica formateo condicional basado en condiciones
 */
function applyConditionalFormatting(
  context: FormatterContext, 
  baseResult: FormatterResult
): FormatterResult {
  const { field, value, record } = context
  const conditionalFormats = field.formatter?.options?.conditionalFormatting || field.conditionalFormatting || []
  
  if (!conditionalFormats.length) {
    return baseResult
  }
  
  // Buscar la primera condición que se cumpla
  for (const format of conditionalFormats) {
    let conditionMet = false
    
    if (typeof format.condition === 'function') {
      conditionMet = format.condition(value, record)
    } else if (typeof format.condition === 'string') {
      // Evaluar condición como string (ej: "value > 10")
      try {
        conditionMet = evaluateCondition(format.condition, value, record)
      } catch (error) {
        console.warn('Error evaluating condition:', format.condition, error)
        continue
      }
    }
    
    if (conditionMet) {
      // Si hay un formatter específico, usarlo
      if (format.formatter) {
        const newContext = { ...context, field: { ...context.field, formatter: format.formatter } }
        return formatCell(newContext)
      }
      
      // Aplicar solo estilos condicionales
      return {
        ...baseResult,
        className: combineClassNames(baseResult.className, format.className),
        style: { ...baseResult.style, ...format.style }
      }
    }
  }
  
  return baseResult
}

/**
 * Evalúa una condición de string de manera segura
 */
function evaluateCondition(condition: string, value: any, record: any): boolean {
  // Reemplazar 'value' y 'record' en la condición
  const safeCondition = condition
    .replace(/\bvalue\b/g, JSON.stringify(value))
    .replace(/\brecord\.(\w+)\b/g, (_, prop) => JSON.stringify(record[prop]))
  
  // Solo permitir operadores seguros
  const allowedOperators = /^[\d\s\+\-\*\/\(\)\>\<\=\!\&\|\.\"\'\w]+$/
  if (!allowedOperators.test(safeCondition)) {
    throw new Error('Unsafe condition')
  }
  
  // Evaluar usando Function constructor (más seguro que eval)
  return new Function('return ' + safeCondition)()
}

/**
 * Combina nombres de clases CSS
 */
function combineClassNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Aplica template a un valor (ej: "TASK-{value}" con value="123" -> "TASK-123")
 */
export function applyTemplate(template: string, value: any, record?: any): string {
  if (!template) return String(value || '')
  
  return template
    .replace(/\{value\}/g, String(value || ''))
    .replace(/\{record\.(\w+)\}/g, (_, prop) => String(record?.[prop] || ''))
}

/**
 * Utilidad para crear un formatter personalizado
 */
export function createCustomFormatter(
  render: (context: FormatterContext) => React.ReactNode
): FormatterFunction {
  return (context) => ({
    content: render(context)
  })
}

// Re-exportar tipos para facilitar el uso
export type { FormatterFunction, FormatterContext, FormatterResult, FormatterType } from '@/types/formatters'
