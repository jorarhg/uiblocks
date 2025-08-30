
import React from 'react'
import { FormatterFunction } from '@/types/formatters'

/**
 * Formatter para porcentajes con configuración de decimales
 */
export const PercentageFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  
  if (value === null || value === undefined || isNaN(Number(value))) {
    return {
      content: <span className="text-muted-foreground">-</span>
    }
  }
  
  const decimals = options?.decimals ?? 1
  const suffix = options?.suffix || '%'
  
  // Convertir a porcentaje (asumir que el valor viene como decimal: 0.25 -> 25%)
  let percentageValue = Number(value)
  
  // Si el valor es menor que 1, asumir que está en formato decimal
  if (percentageValue <= 1 && percentageValue >= 0) {
    percentageValue *= 100
  }
  
  const formattedValue = percentageValue.toFixed(decimals)
  
  return {
    content: (
      <span className={options?.className}>
        {formattedValue}{suffix}
      </span>
    ),
    style: options?.style
  }
}
