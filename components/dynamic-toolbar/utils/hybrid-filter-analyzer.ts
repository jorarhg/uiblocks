/**
 * Motor de análisis híbrido para detección automática de tipos de filtros
 * Implementa múltiples estrategias con orden de prioridad
 */

import type { Column } from "@tanstack/react-table"
import type { 
  FilterAnalysisResult, 
  FilterType, 
  DataType, 
  ColumnFilterConfig,
  GlobalFilterConfig,
  FilterMetadata,
  StatisticalDistribution,
  FilterOption
} from "../types/filter-config"

export class HybridFilterAnalyzer<TData = any> {
  private globalConfig: GlobalFilterConfig

  constructor(config?: Partial<GlobalFilterConfig>) {
    this.globalConfig = {
      facetedThreshold: 20,
      searchMinLength: 2,
      maxCacheTime: 3600,
      fallbackStrategy: ['column-meta', 'config-override', 'type-inference', 'data-analysis'],
      columnConfigs: {},
      patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        url: /^https?:\/\/.+/,
        phone: /^\+?[\d\s\-\(\)]+$/,
        date: [
          /^\d{4}-\d{2}-\d{2}$/,
          /^\d{2}\/\d{2}\/\d{4}$/,
          /^\d{2}-\d{2}-\d{4}$/
        ],
        currency: /^\$?[\d,]+\.?\d*$/,
        percentage: /^\d+\.?\d*%$/
      },
      columnNameMappings: {
        // Mapeos comunes por nombre de columna
        'status': { type: 'faceted', priority: 'high' },
        'state': { type: 'faceted', priority: 'high' },
        'priority': { type: 'faceted', priority: 'high' },
        'type': { type: 'faceted', priority: 'high' },
        'category': { type: 'faceted', priority: 'high' },
        'tag': { type: 'faceted', priority: 'medium' },
        'tags': { type: 'faceted', priority: 'medium' },
        'department': { type: 'faceted', priority: 'high' },
        'role': { type: 'faceted', priority: 'high' },
        'level': { type: 'faceted', priority: 'medium' },
        'grade': { type: 'faceted', priority: 'medium' },
        
        // Campos de búsqueda
        'name': { type: 'search', priority: 'high' },
        'title': { type: 'search', priority: 'high' },
        'description': { type: 'search', priority: 'medium' },
        'comment': { type: 'search', priority: 'medium' },
        'note': { type: 'search', priority: 'medium' },
        'notes': { type: 'search', priority: 'medium' },
        'email': { type: 'search', priority: 'medium' },
        'username': { type: 'search', priority: 'medium' },
        
        // Campos de rango
        'price': { type: 'range', priority: 'high' },
        'cost': { type: 'range', priority: 'high' },
        'amount': { type: 'range', priority: 'high' },
        'total': { type: 'range', priority: 'high' },
        'quantity': { type: 'range', priority: 'medium' },
        'count': { type: 'range', priority: 'medium' },
        'age': { type: 'range', priority: 'medium' },
        'rating': { type: 'range', priority: 'medium' },
        'score': { type: 'range', priority: 'medium' },
        'weight': { type: 'range', priority: 'medium' },
        'height': { type: 'range', priority: 'medium' },
        'duration': { type: 'range', priority: 'medium' },
        'size': { type: 'range', priority: 'medium' },
        
        // Campos de fecha
        'date': { type: 'range', priority: 'high' },
        'created': { type: 'range', priority: 'medium' },
        'createdAt': { type: 'range', priority: 'medium' },
        'updated': { type: 'range', priority: 'medium' },
        'updatedAt': { type: 'range', priority: 'medium' },
        'deleted': { type: 'range', priority: 'medium' },
        'deletedAt': { type: 'range', priority: 'medium' },
        'published': { type: 'range', priority: 'medium' },
        'publishedAt': { type: 'range', priority: 'medium' },
        'start': { type: 'range', priority: 'medium' },
        'startDate': { type: 'range', priority: 'medium' },
        'end': { type: 'range', priority: 'medium' },
        'endDate': { type: 'range', priority: 'medium' },
        'expires': { type: 'range', priority: 'medium' },
        'expiresAt': { type: 'range', priority: 'medium' },
        
        // Campos booleanos
        'active': { type: 'boolean', priority: 'high' },
        'enabled': { type: 'boolean', priority: 'high' },
        'disabled': { type: 'boolean', priority: 'high' },
        'visible': { type: 'boolean', priority: 'medium' },
        'public': { type: 'boolean', priority: 'medium' },
        'private': { type: 'boolean', priority: 'medium' },
        'featured': { type: 'boolean', priority: 'medium' },
        'archived': { type: 'boolean', priority: 'medium' },
        'verified': { type: 'boolean', priority: 'medium' },
        'confirmed': { type: 'boolean', priority: 'medium' }
      },
      ...config
    }
  }

  /**
   * Analiza una columna y determina el mejor tipo de filtro usando estrategias híbridas
   */
  analyzeColumn(column: Column<TData, unknown>): FilterAnalysisResult {
    const reasoning: string[] = []
    let bestResult: FilterAnalysisResult | null = null

    // Seguir la estrategia de fallback configurada
    for (const strategy of this.globalConfig.fallbackStrategy) {
      const result = this.applyStrategy(strategy, column, reasoning)
      
      if (result) {
        bestResult = result
        reasoning.push(`✅ Strategy '${strategy}' succeeded with confidence ${result.confidence}`)
        break
      } else {
        reasoning.push(`❌ Strategy '${strategy}' failed`)
      }
    }

    // Si no hay resultado, crear uno por defecto
    if (!bestResult) {
      bestResult = this.createFallbackResult(column)
      reasoning.push("⚠️ Using fallback search filter")
    }

    bestResult.reasoning = reasoning
    return bestResult
  }

  /**
   * Aplica una estrategia específica de análisis
   */
  private applyStrategy(
    strategy: string, 
    column: Column<TData, unknown>, 
    reasoning: string[]
  ): FilterAnalysisResult | null {
    switch (strategy) {
      case 'column-meta':
        return this.analyzeColumnMetadata(column, reasoning)
      case 'config-override':
        return this.analyzeConfigOverride(column, reasoning)
      case 'type-inference':
        return this.analyzeTypeInference(column, reasoning)
      case 'data-analysis':
        return this.analyzeDataPattern(column, reasoning)
      default:
        reasoning.push(`❌ Unknown strategy: ${strategy}`)
        return null
    }
  }

  /**
   * Estrategia 1: Análisis de metadatos de columna
   */
  private analyzeColumnMetadata(
    column: Column<TData, unknown>, 
    reasoning: string[]
  ): FilterAnalysisResult | null {
    const columnDef = column.columnDef as any
    
    // Verificar si hay metadata de filtro explícita
    if (columnDef.meta?.filter) {
      reasoning.push("✅ Found explicit filter metadata in column definition")
      return {
        type: columnDef.meta.filter.type,
        confidence: 1.0,
        source: 'column-meta',
        metadata: this.createMetadata(column, 'column-meta', 1.0),
        config: columnDef.meta.filter.config || this.createDefaultConfig(columnDef.meta.filter.type),
        reasoning: []
      }
    }

    reasoning.push("❌ No filter metadata found in column definition")
    return null
  }

  /**
   * Estrategia 2: Análisis de configuración global
   */
  private analyzeConfigOverride(
    column: Column<TData, unknown>, 
    reasoning: string[]
  ): FilterAnalysisResult | null {
    const columnId = column.id
    
    // Verificar configuración específica por ID de columna
    const specificConfig = this.globalConfig.columnConfigs?.[columnId]
    if (specificConfig) {
      reasoning.push(`✅ Found specific config override for column '${columnId}'`)
      return this.createResultFromConfig(column, specificConfig, 'config-override', 0.95)
    }

    // Verificar mapeo por nombre de columna
    const nameConfig = this.globalConfig.columnNameMappings?.[columnId.toLowerCase()]
    if (nameConfig) {
      reasoning.push(`✅ Found name-based config mapping for '${columnId}'`)
      return this.createResultFromConfig(column, nameConfig, 'config-override', 0.85)
    }

    // Verificar patrones en el nombre
    const patternMatch = this.findPatternInName(columnId)
    if (patternMatch) {
      reasoning.push(`✅ Found pattern match in column name: ${patternMatch.pattern}`)
      return this.createResultFromConfig(column, patternMatch.config, 'config-override', 0.75)
    }

    reasoning.push("❌ No config overrides found")
    return null
  }

  /**
   * Estrategia 3: Inferencia de tipos
   */
  private analyzeTypeInference(
    column: Column<TData, unknown>, 
    reasoning: string[]
  ): FilterAnalysisResult | null {
    const columnDef = column.columnDef as any
    const accessorKey = columnDef.accessorKey
    
    if (!accessorKey) {
      reasoning.push("❌ No accessor key available for type inference")
      return null
    }

    const typeHints = this.inferTypeFromAccessorKey(accessorKey as string)
    
    if (typeHints.length > 0) {
      const bestHint = typeHints[0]
      reasoning.push(`✅ Type inference suggests '${bestHint.type}' (confidence: ${bestHint.confidence})`)
      
      return {
        type: bestHint.type,
        confidence: bestHint.confidence,
        source: 'type-inference',
        metadata: this.createMetadata(column, 'type-inference', bestHint.confidence),
        config: this.createDefaultConfig(bestHint.type),
        reasoning: []
      }
    }

    reasoning.push("❌ Type inference found no clear patterns")
    return null
  }

  /**
   * Estrategia 4: Análisis de datos
   */
  private analyzeDataPattern(
    column: Column<TData, unknown>, 
    reasoning: string[]
  ): FilterAnalysisResult | null {
    const rows = column.getFacetedRowModel()?.rows || []
    
    if (rows.length === 0) {
      reasoning.push("❌ No data available for analysis")
      return null
    }

    // Extraer valores únicos de la columna
    const values = rows
      .map(row => row.getValue(column.id))
      .filter(value => value != null && value !== "")

    if (values.length === 0) {
      reasoning.push("❌ No valid values found for analysis")
      return null
    }

    const dataAnalysis = this.performDataAnalysis(values, reasoning)
    
    if (dataAnalysis) {
      reasoning.push(`✅ Data analysis suggests '${dataAnalysis.type}' (confidence: ${dataAnalysis.confidence})`)
      
      return {
        type: dataAnalysis.type,
        confidence: dataAnalysis.confidence,
        source: 'data-analysis',
        metadata: this.createMetadata(column, 'data-analysis', dataAnalysis.confidence),
        config: this.createDefaultConfig(dataAnalysis.type),
        reasoning: []
      }
    }

    reasoning.push("❌ Data analysis could not determine appropriate filter type")
    return null
  }

  /**
   * Realiza análisis estadístico de los datos
   */
  private performDataAnalysis(
    values: any[], 
    reasoning: string[]
  ): { type: FilterType; confidence: number } | null {
    const uniqueValues = new Set(values)
    const uniqueCount = uniqueValues.size
    const totalCount = values.length
    const uniqueRatio = uniqueCount / totalCount

    // Análisis booleano
    const booleanAnalysis = this.analyzeBooleanData(values, reasoning)
    if (booleanAnalysis?.isBoolean) {
      return {
        type: 'boolean',
        confidence: booleanAnalysis.confidence
      }
    }

    // Análisis numérico
    const numericAnalysis = this.analyzeNumericData(values, reasoning)
    if (numericAnalysis) {
      return numericAnalysis
    }

    // Análisis de fechas
    const dateAnalysis = this.analyzeDateData(values, reasoning)
    if (dateAnalysis) {
      return dateAnalysis
    }

    // Análisis de patrones
    const patternAnalysis = this.analyzePatterns(values, reasoning)
    if (patternAnalysis) {
      return patternAnalysis
    }

    // Decidir entre faceted y search basado en cardinalidad
    if (uniqueCount <= this.globalConfig.facetedThreshold) {
      reasoning.push(`✅ Low cardinality (${uniqueCount}/${totalCount}) suggests faceted filter`)
      return {
        type: 'faceted',
        confidence: Math.max(0.6, 1 - uniqueRatio)
      }
    } else {
      reasoning.push(`✅ High cardinality (${uniqueCount}/${totalCount}) suggests search filter`)
      return {
        type: 'search',
        confidence: Math.min(0.8, uniqueRatio)
      }
    }
  }

  /**
   * Analiza si los datos son booleanos
   */
  private analyzeBooleanData(
    values: any[], 
    reasoning: string[]
  ): { isBoolean: boolean; confidence: number } | undefined {
    const uniqueValues = new Set(values.map(v => String(v).toLowerCase()))
    
    // Patrones booleanos comunes
    const booleanPatterns = [
      ['true', 'false'],
      ['yes', 'no'],
      ['si', 'no'],
      ['sí', 'no'],
      ['active', 'inactive'],
      ['enabled', 'disabled'],
      ['on', 'off'],
      ['1', '0']
    ]

    for (const pattern of booleanPatterns) {
      if (pattern.every(val => uniqueValues.has(val)) && uniqueValues.size === pattern.length) {
        reasoning.push(`✅ Boolean pattern detected: ${pattern.join('/')}`)
        return {
          isBoolean: true,
          confidence: 0.9
        }
      }
    }

    // Verificar valores booleanos nativos
    if (uniqueValues.size === 2 && 
        Array.from(uniqueValues).every(val => val === 'true' || val === 'false')) {
      reasoning.push("✅ Native boolean values detected")
      return {
        isBoolean: true,
        confidence: 0.95
      }
    }

    return undefined
  }

  /**
   * Analiza si los datos son numéricos
   */
  private analyzeNumericData(
    values: any[], 
    reasoning: string[]
  ): { type: FilterType; confidence: number } | null {
    const numericValues = values
      .map(v => Number(v))
      .filter(n => !isNaN(n) && isFinite(n))

    const numericRatio = numericValues.length / values.length

    if (numericRatio >= 0.8) {
      reasoning.push(`✅ High numeric ratio (${numericRatio.toFixed(2)}) detected`)
      
      // Verificar si son enteros secuenciales (posibles IDs)
      const sortedNumbers = Array.from(numericValues).sort((a, b) => a - b)
      const isSequential = sortedNumbers.every((num, idx) => 
        idx === 0 || num === sortedNumbers[idx - 1] + 1
      )

      if (isSequential && sortedNumbers.length > 5) {
        reasoning.push("✅ Sequential integers suggest ID field - using search filter")
        return {
          type: 'search',
          confidence: 0.85
        }
      }

      return {
        type: 'range',
        confidence: numericRatio
      }
    }

    return null
  }

  /**
   * Analiza si los datos son fechas
   */
  private analyzeDateData(
    values: any[], 
    reasoning: string[]
  ): { type: FilterType; confidence: number } | null {
    let dateCount = 0

    for (const value of values) {
      const strValue = String(value)
      
      // Intentar parsear como fecha
      const date = new Date(strValue)
      if (!isNaN(date.getTime())) {
        dateCount++
        continue
      }

      // Verificar patrones de fecha
      const datePatterns = this.globalConfig.patterns?.date || []
      if (Array.isArray(datePatterns)) {
        for (const pattern of datePatterns) {
          if (pattern.test(strValue)) {
            dateCount++
            break
          }
        }
      }
    }

    const dateRatio = dateCount / values.length

    if (dateRatio >= 0.7) {
      reasoning.push(`✅ High date ratio (${dateRatio.toFixed(2)}) detected`)
      return {
        type: 'range',
        confidence: dateRatio
      }
    }

    return null
  }

  /**
   * Analiza patrones específicos en los datos
   */
  private analyzePatterns(
    values: any[], 
    reasoning: string[]
  ): { type: FilterType; confidence: number } | null {
    const patterns = this.globalConfig.patterns

    if (!patterns) return null

    for (const [patternName, pattern] of Object.entries(patterns)) {
      if (patternName === 'date') continue // Ya manejado en analyzeDateData

      let matchCount = 0

      for (const value of values) {
        const strValue = String(value)
        
        if (Array.isArray(pattern)) {
          if (pattern.some(p => p.test(strValue))) {
            matchCount++
          }
        } else if (pattern.test(strValue)) {
          matchCount++
        }
      }

      const matchRatio = matchCount / values.length

      if (matchRatio >= 0.6) {
        reasoning.push(`✅ Pattern '${patternName}' matched ${matchRatio.toFixed(2)} of values`)
        
        return {
          type: 'search',
          confidence: matchRatio
        }
      }
    }

    return null
  }

  /**
   * Busca patrones en el nombre de la columna
   */
  private findPatternInName(columnName: string): { pattern: string; config: ColumnFilterConfig } | null {
    const lowerName = columnName.toLowerCase()

    // Patrones comunes en nombres de columnas
    const namePatterns = [
      { pattern: /id$/i, config: { type: 'search' as FilterType, priority: 'medium' as const } },
      { pattern: /email/i, config: { type: 'search' as FilterType, priority: 'medium' as const } },
      { pattern: /phone/i, config: { type: 'search' as FilterType, priority: 'medium' as const } },
      { pattern: /url/i, config: { type: 'search' as FilterType, priority: 'medium' as const } },
      { pattern: /date|time/i, config: { type: 'range' as FilterType, priority: 'high' as const } },
      { pattern: /price|cost|amount/i, config: { type: 'range' as FilterType, priority: 'high' as const } },
      { pattern: /count|quantity|number/i, config: { type: 'range' as FilterType, priority: 'medium' as const } },
      { pattern: /status|state|type|category/i, config: { type: 'faceted' as FilterType, priority: 'high' as const } },
      { pattern: /active|enabled|visible|public/i, config: { type: 'boolean' as FilterType, priority: 'high' as const } }
    ]

    for (const { pattern, config } of namePatterns) {
      if (pattern.test(lowerName)) {
        return { pattern: pattern.source, config }
      }
    }

    return null
  }

  /**
   * Infiere tipos basado en la clave de acceso
   */
  private inferTypeFromAccessorKey(accessorKey: string): Array<{ type: FilterType; confidence: number }> {
    const hints: Array<{ type: FilterType; confidence: number }> = []
    const key = accessorKey.toLowerCase()

    // Mapeo de sufijos/prefijos a tipos
    const typeMap = [
      { pattern: /id$/i, type: 'search' as FilterType, confidence: 0.7 },
      { pattern: /name|title|description/i, type: 'search' as FilterType, confidence: 0.8 },
      { pattern: /date|time|created|updated/i, type: 'range' as FilterType, confidence: 0.85 },
      { pattern: /price|cost|amount|total|count/i, type: 'range' as FilterType, confidence: 0.9 },
      { pattern: /status|state|type|category|priority/i, type: 'faceted' as FilterType, confidence: 0.85 },
      { pattern: /active|enabled|visible|public|private/i, type: 'boolean' as FilterType, confidence: 0.9 }
    ]

    for (const { pattern, type, confidence } of typeMap) {
      if (pattern.test(key)) {
        hints.push({ type, confidence })
      }
    }

    return hints.sort((a, b) => b.confidence - a.confidence)
  }

  /**
   * Crea un resultado desde una configuración
   */
  private createResultFromConfig(
    column: Column<TData, unknown>,
    config: ColumnFilterConfig,
    strategy: string,
    confidence: number
  ): FilterAnalysisResult {
    const filterType = config.type || 'search'
    return {
      type: filterType,
      confidence,
      source: strategy as any,
      metadata: this.createMetadata(column, strategy, confidence),
      config: this.createDefaultConfig(filterType),
      reasoning: []
    }
  }

  /**
   * Crea un resultado de fallback
   */
  private createFallbackResult(column: Column<TData, unknown>): FilterAnalysisResult {
    return {
      type: 'search',
      confidence: 0.5,
      source: 'data-analysis',
      metadata: this.createMetadata(column, 'fallback', 0.5),
      config: this.createDefaultConfig('search'),
      reasoning: []
    }
  }

  /**
   * Crea metadatos para el resultado
   */
  private createMetadata(
    column: Column<TData, unknown>,
    strategy: string,
    confidence: number
  ): FilterMetadata {
    const uniqueValues = column.getFacetedUniqueValues() || new Map()
    const rows = column.getFacetedRowModel()?.rows || []
    const values = rows.map(row => row.getValue(column.id)).filter(v => v != null)
    
    return {
      confidence,
      dataType: this.inferDataType(column),
      uniqueCount: uniqueValues.size,
      nullCount: rows.length - values.length,
      sampleSize: rows.length,
      source: strategy as any
    }
  }

  /**
   * Crea configuración por defecto para un tipo de filtro
   */
  private createDefaultConfig(filterType: FilterType): any {
    switch (filterType) {
      case 'search':
        return {
          placeholder: 'Buscar...',
          minLength: this.globalConfig.searchMinLength
        }
      case 'faceted':
        return {
          maxOptions: 100,
          searchable: true
        }
      case 'range':
        return {
          step: 'any',
          placeholder: { from: 'Desde', to: 'Hasta' }
        }
      case 'boolean':
        return {
          labels: { true: 'Sí', false: 'No' }
        }
      default:
        return {}
    }
  }

  /**
   * Infiere el tipo de datos desde el tipo de filtro
   */
  private inferDataTypeFromFilterType(filterType: FilterType): DataType {
    switch (filterType) {
      case 'range':
        return 'number' // Por defecto, puede ser sobrescrito
      case 'boolean':
        return 'boolean'
      case 'search':
      case 'faceted':
      default:
        return 'string'
    }
  }

  /**
   * Infiere el tipo de datos de una columna basado en sus valores
   */
  private inferDataType(column: Column<TData, unknown>): DataType {
    // Por ahora, inferimos basándose en los datos
    const uniqueValues = column.getFacetedUniqueValues()
    if (!uniqueValues || uniqueValues.size === 0) return 'string'
    
    const firstValue = Array.from(uniqueValues.keys())[0]
    
    if (typeof firstValue === 'boolean') return 'boolean'
    if (typeof firstValue === 'number') return 'number'
    if (firstValue instanceof Date) return 'date'
    if (typeof firstValue === 'object') return 'object'
    
    // Intentar detectar fechas en strings
    if (typeof firstValue === 'string' && !isNaN(Date.parse(firstValue))) {
      return 'date'
    }
    
    // Intentar detectar números en strings
    if (typeof firstValue === 'string' && !isNaN(Number(firstValue))) {
      return 'number'
    }
    
    return 'string'
  }
}
