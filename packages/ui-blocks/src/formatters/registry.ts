import { FormatterFunction, FormatterType, FormatterContext, FormatterResult } from '../internal/types/formatters'
import { DefaultFormatter } from './types/default-formatter'
import { BadgeFormatter } from './types/badge-formatter'
import { DateFormatter } from './types/date-formatter'
import { CurrencyFormatter } from './types/currency-formatter'
import { PercentageFormatter } from './types/percentage-formatter'
import { IconFormatter } from './types/icon-formatter'
import { IconTextFormatter } from './types/icon-text-formatter'
import { CustomFormatter } from './types/custom-formatter'
import { HtmlFormatter } from './types/html-formatter'
import { LinkFormatter } from './types/link-formatter'
import { ImageFormatter } from './types/image-formatter'
import { applyConditionalFormatting, applyTemplate, createCustomFormatter } from './helpers'

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

export function formatCell(context: FormatterContext): FormatterResult {
  const { field } = context
  if (!field.formatter) return DefaultFormatter(context)
  const formatter = FORMATTERS[field.formatter.type]
  if (!formatter) {
    console.warn(`Formatter type '${field.formatter.type}' not found, using default`)
    return DefaultFormatter(context)
  }
  try {
    const result = formatter(context)
  return applyConditionalFormatting(context, result, formatCell)
  } catch (e) {
    console.error(`Error in formatter '${field.formatter.type}':`, e)
    return DefaultFormatter(context)
  }
}

export { applyTemplate, createCustomFormatter }
export type { FormatterFunction, FormatterContext, FormatterResult, FormatterType } from '../internal/types/formatters'
