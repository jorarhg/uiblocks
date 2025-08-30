/**
 * Tipos y interfaces para la configuración híbrida de filtros dinámicos
 */

export interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
  group?: string
  description?: string
}

export interface DynamicFilter {
  id: string
  columnId: string
  title: string
  type: FilterType
  options?: FilterOption[]
  value?: any
  metadata?: FilterMetadata
  config?: any // Configuración específica del filtro
}

export interface FilterableColumn {
  id: string
  title: string
  type: FilterType
  options?: FilterOption[]
  metadata?: FilterMetadata
  source: FilterConfigSource
}

export type FilterType = "faceted" | "search" | "range" | "boolean" | "custom"

export interface FilterMetadata {
  confidence: number // 0-1, qué tan seguro está el sistema del tipo detectado
  dataType: DataType
  uniqueCount: number
  nullCount: number
  sampleSize: number
  patterns?: string[]
  distribution?: StatisticalDistribution
  source: FilterConfigSource
  domainContext?: string // Contexto del dominio de negocio
  statistics?: StatisticalDistribution // Estadísticas detalladas
}

export type DataType = 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'object' | 'array'

export type FilterConfigSource = 
  | 'column-meta'      // Meta en definición de columna (prioridad más alta)
  | 'config-override'  // Configuración específica por nombre
  | 'type-inference'   // Análisis de tipos TypeScript
  | 'data-analysis'    // Análisis de datos (fallback)

export interface StatisticalDistribution {
  mean?: number
  median?: number
  mode?: any
  variance?: number
  skewness?: number
}

// Configuración avanzada para columnas específicas
export interface ColumnFilterConfig {
  type?: FilterType
  priority?: 'high' | 'medium' | 'low'
  options?: FilterOption[]
  validation?: ValidationRule[]
  formatting?: FormattingRule
  permissions?: string[]
  customLabels?: Record<string, string>
  grouping?: GroupingConfig
  searchConfig?: SearchConfig
  rangeConfig?: RangeConfig
  booleanConfig?: BooleanConfig
  placeholder?: string // Placeholder para campos de búsqueda
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  value?: any
  message?: string
  validator?: (value: any) => boolean
}

export interface FormattingRule {
  type: 'currency' | 'percentage' | 'date' | 'number' | 'custom'
  options?: Record<string, any>
  formatter?: (value: any) => string
}

export interface GroupingConfig {
  enabled: boolean
  groups: Array<{
    label: string
    values: string[]
    icon?: string
  }>
}

export interface SearchConfig {
  minLength: number
  debounceMs: number
  caseSensitive: boolean
  matchMode: 'contains' | 'startsWith' | 'endsWith' | 'exact'
}

export interface RangeConfig {
  min?: number | string
  max?: number | string
  step?: number
  format?: 'number' | 'currency' | 'date' | 'datetime'
  allowPartial: boolean
}

export interface BooleanConfig {
  trueLabel: string
  falseLabel: string
  trueValue: any
  falseValue: any
  allowNull?: boolean
  nullLabel?: string
}

// Configuración global del sistema
export interface GlobalFilterConfig {
  // Umbrales para detección automática
  facetedThreshold: number
  searchMinLength: number
  maxCacheTime: number
  
  // Estrategias de fallback
  fallbackStrategy: FilterConfigSource[]
  
  // Configuraciones por columna
  columnConfigs: Record<string, ColumnFilterConfig>
  
  // Patrones de detección
  patterns: {
    email: RegExp
    url: RegExp
    phone: RegExp
    date: RegExp[]
    currency: RegExp
    percentage: RegExp
  }
  
  // Configuraciones específicas por nombre de columna
  columnNameMappings: Record<string, Partial<ColumnFilterConfig>>
}

// Resultado del análisis híbrido
export interface FilterAnalysisResult {
  type: FilterType
  confidence: number
  source: FilterConfigSource
  metadata: FilterMetadata
  config: ColumnFilterConfig
  options?: FilterOption[]
  reasoning: string[] // Para debugging y transparencia
}
