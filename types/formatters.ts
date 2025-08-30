
import React from 'react'

export type FormatterType = 
  | 'default'      // Texto simple
  | 'badge'        // Badge con variantes y colores
  | 'date'         // Formateo de fechas
  | 'currency'     // Formateo de moneda
  | 'percentage'   // Formateo de porcentaje
  | 'icon'         // Solo icono
  | 'icon-text'    // Icono + texto
  | 'custom'       // Formatter personalizado
  | 'html'         // HTML personalizado
  | 'link'         // Enlaces
  | 'image'        // Imágenes

export interface ColumnFormatter {
  type: FormatterType
  options?: {
    // Para todos los tipos
    className?: string
    style?: React.CSSProperties
    template?: string // ej: "{value}h", "TASK-{value}"
    
    // Para badges
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    badgeClassName?: string
    
    // Para fechas
    format?: 'short' | 'medium' | 'long' | 'iso' | 'custom' | 'relative'
    customFormat?: string // ej: 'DD/MM/YYYY'
    locale?: string
    
    // Para currency
    currency?: string // 'USD', 'EUR', etc.
    currencyDecimals?: number
    
    // Para percentage
    decimals?: number
    suffix?: string
    
    // Para iconos
    icon?: string
    iconPosition?: 'left' | 'right'
    iconClassName?: string
    
    // Para links
    href?: string | ((value: any, record: any) => string)
    target?: '_blank' | '_self'
    linkClassName?: string
    
    // Para imágenes
    width?: number
    height?: number
    alt?: string
    fallbackSrc?: string
    
    // Mapping de valores a estilos específicos
    valueMap?: Record<string, {
      className?: string
      style?: React.CSSProperties
      icon?: string
      label?: string
      variant?: string
    }>
    
    // Formateo condicional
    conditionalFormatting?: ConditionalFormat[]
  }
}

export interface ConditionalFormat {
  condition: string | ((value: any, record: any) => boolean)
  className?: string
  style?: React.CSSProperties
  formatter?: ColumnFormatter
}

export interface FormatterContext {
  value: any
  record: any
  field: ExtendedColumnConfig
  rowIndex: number
  columnIndex: number
}

export interface FormatterResult {
  content: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export type FormatterFunction = (context: FormatterContext) => FormatterResult

export interface ExtendedColumnConfig {
  key: string
  label: string
  type?: string
  sortable?: boolean
  filterable?: boolean
  
  // Configuración de formateo
  formatter?: ColumnFormatter
  
  // Clases CSS para la columna completa
  columnClassName?: string
  headerClassName?: string
  cellClassName?: string
  
  // Configuración condicional
  conditionalFormatting?: ConditionalFormat[]
}

export interface FormatterConfig {
  columns: ExtendedColumnConfig[]
  globalOptions?: {
    locale?: string
    currency?: string
    dateFormat?: string
    theme?: 'light' | 'dark'
  }
}
