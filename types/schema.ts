// Tipos para el sistema de esquemas dinámicos

import React from 'react'

export type FieldType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'date' 
  | 'select' 
  | 'multiselect'
  | 'badge'
  | 'icon'
  | 'custom'

export interface FieldOption {
  value: string | number | boolean
  label: string
  variant?: string
  icon?: string
  color?: string
}

export interface FieldSchema {
  key: string
  label: string
  type: FieldType
  required?: boolean
  sortable?: boolean
  filterable?: boolean
  searchable?: boolean
  options?: FieldOption[]
  render?: {
    component: string
    props?: Record<string, any>
  }
  validation?: {
    min?: number
    max?: number
    pattern?: string
    custom?: string
  }
}

export interface TableSchema {
  name: string
  description?: string
  primaryKey: string
  fields: FieldSchema[]
  tableOptions: {
    searchKey?: string
    searchPlaceholder?: string
    defaultFilters?: string[]
    enableSorting?: boolean
    enableFiltering?: boolean
    enableSearch?: boolean
    pageSize?: number
    showToolbar?: boolean
  }
}

export interface SchemaConfig {
  version: string
  schemas: Record<string, TableSchema>
}

// Tipo genérico para datos dinámicos
export type DynamicRecord = Record<string, any>

// Tipo para renderizadores de celdas
export interface CellRendererProps {
  value: any
  field: FieldSchema
  record: DynamicRecord
}

export type CellRenderer = (props: CellRendererProps) => React.ReactNode

// Tipo para constructores de filtros
export interface FilterBuilder {
  build: (field: FieldSchema) => React.ComponentType<any>
  canHandle: (field: FieldSchema) => boolean
}
