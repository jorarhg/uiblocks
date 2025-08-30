import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'

export const PercentageFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  if (value === null || value === undefined || isNaN(Number(value))) return { content: <span className="text-muted-foreground">-</span> }
  const decimals = options?.decimals ?? 1
  const suffix = options?.suffix || '%'
  let percentageValue = Number(value)
  if (percentageValue <=1 && percentageValue >=0) percentageValue *= 100
  const formattedValue = percentageValue.toFixed(decimals)
  return { content: <span className={options?.className}>{formattedValue}{suffix}</span>, style: options?.style }
}
