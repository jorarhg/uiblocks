import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'

export const CurrencyFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  if (value === null || value === undefined || isNaN(Number(value))) return { content: <span className="text-muted-foreground">-</span> }
  const currency = options?.currency || 'EUR'
  const decimals = options?.decimals ?? 2
  const locale = options?.locale || 'es-ES'
  try {
    const formatter = new Intl.NumberFormat(locale,{ style:'currency', currency, minimumFractionDigits:decimals, maximumFractionDigits:decimals })
    const formattedValue = formatter.format(Number(value))
    return { content: <span className={options?.className}>{formattedValue}</span>, style: options?.style }
  } catch {
    return { content: <span className={options?.className}>{Number(value).toFixed(decimals)} {currency}</span>, style: options?.style }
  }
}
