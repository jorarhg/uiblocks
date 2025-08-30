import React from 'react'

export type FormatterType = 
  | 'default'
  | 'badge'
  | 'date'
  | 'currency'
  | 'percentage'
  | 'icon'
  | 'icon-text'
  | 'custom'
  | 'html'
  | 'link'
  | 'image'

export interface ColumnFormatter {
  type: FormatterType
  options?: {
    className?: string
    style?: React.CSSProperties
    template?: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    badgeClassName?: string
    format?: 'short' | 'medium' | 'long' | 'iso' | 'custom' | 'relative'
    customFormat?: string
    locale?: string
    currency?: string
    currencyDecimals?: number
    decimals?: number
    suffix?: string
    icon?: string
    iconPosition?: 'left' | 'right'
    iconClassName?: string
    href?: string | ((value: any, record: any) => string)
    target?: '_blank' | '_self'
    linkClassName?: string
    width?: number
    height?: number
    alt?: string
    fallbackSrc?: string
    valueMap?: Record<string, {
      className?: string
      style?: React.CSSProperties
      icon?: string
      label?: string
      variant?: string
    }>
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
  formatter?: ColumnFormatter
  columnClassName?: string
  headerClassName?: string
  cellClassName?: string
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
