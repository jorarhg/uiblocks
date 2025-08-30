
import React from 'react'
import { FormatterFunction } from '@/types/formatters'

/**
 * Formatter para fechas con múltiples opciones de formato
 */
export const DateFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  
  if (!value) {
    return {
      content: <span className="text-muted-foreground">-</span>
    }
  }
  
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    return {
      content: <span className={options?.className}>{value}</span>
    }
  }
  
  let formattedDate: string
  const locale = options?.locale || 'es-ES'
  
  switch (options?.format) {
    case 'short':
      formattedDate = date.toLocaleDateString(locale)
      break
      
    case 'medium':
      formattedDate = date.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
      break
      
    case 'long':
      formattedDate = date.toLocaleDateString(locale, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      })
      break
      
    case 'relative':
      formattedDate = formatRelativeDate(date)
      break
      
    case 'custom':
      formattedDate = formatCustomDate(date, options?.customFormat || 'DD/MM/YYYY')
      break
      
    default: // 'iso'
      formattedDate = date.toISOString().split('T')[0]
  }
  
  return {
    content: (
      <span 
        className={options?.className}
        title={date.toLocaleString(locale)}
      >
        {formattedDate}
      </span>
    ),
    style: options?.style
  }
}

/**
 * Formatea una fecha de manera relativa (ej: "hace 2 días")
 */
function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffInMilliseconds = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Hoy'
  if (diffInDays === 1) return 'Ayer'
  if (diffInDays === -1) return 'Mañana'
  if (diffInDays > 1 && diffInDays <= 7) return `Hace ${diffInDays} días`
  if (diffInDays < -1 && diffInDays >= -7) return `En ${Math.abs(diffInDays)} días`
  
  // Para fechas más lejanas, usar formato corto
  return date.toLocaleDateString('es-ES')
}

/**
 * Formatea una fecha con un patrón personalizado
 */
function formatCustomDate(date: Date, pattern: string): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  const shortYear = year.slice(-2)
  
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  
  const monthNamesShort = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
  
  return pattern
    .replace(/YYYY/g, year)
    .replace(/YY/g, shortYear)
    .replace(/MMMM/g, monthNames[date.getMonth()])
    .replace(/MMM/g, monthNamesShort[date.getMonth()])
    .replace(/MM/g, month)
    .replace(/M/g, (date.getMonth() + 1).toString())
    .replace(/DD/g, day)
    .replace(/D/g, date.getDate().toString())
    .replace(/HH/g, hours)
    .replace(/H/g, date.getHours().toString())
    .replace(/mm/g, minutes)
    .replace(/m/g, date.getMinutes().toString())
    .replace(/ss/g, seconds)
    .replace(/s/g, date.getSeconds().toString())
}
