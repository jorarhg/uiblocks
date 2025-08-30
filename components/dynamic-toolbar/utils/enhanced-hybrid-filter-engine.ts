/**
 * PROPUESTA DE ARQUITECTURA HÍBRIDA MEJORADA
 * Solución realista que aborda todas las limitaciones identificadas
 */

import type { Column } from "@tanstack/react-table"
import type { 
  FilterAnalysisResult, 
  FilterType, 
  DataType, 
  ColumnFilterConfig,
  FilterMetadata 
} from "../types/filter-config"

// ================================
// SISTEMA DE CONFIANZA ESTRATIFICADO
// ================================

export interface ConfidenceStrategy {
  name: string
  priority: number  // 1 = highest, 5 = lowest
  confidence: number // 0-1
  description: string
}

export const CONFIDENCE_STRATEGIES: Record<string, ConfidenceStrategy> = {
  // Nivel 1: Máxima confianza - Configuración explícita
  EXPLICIT_SCHEMA: {
    name: 'explicit-schema',
    priority: 1,
    confidence: 1.0,
    description: 'Schema definido explícitamente (Zod, manual, etc.)'
  },
  
  MANUAL_OVERRIDE: {
    name: 'manual-override', 
    priority: 1,
    confidence: 0.95,
    description: 'Override manual del desarrollador'
  },
  
  // Nivel 2: Alta confianza - Inferencia semántica  
  SEMANTIC_NAMING: {
    name: 'semantic-naming',
    priority: 2, 
    confidence: 0.85,
    description: 'Convenciones de naming semánticas universales'
  },
  
  BUSINESS_CONTEXT: {
    name: 'business-context',
    priority: 2,
    confidence: 0.8,
    description: 'Contexto de dominio de negocio conocido'
  },
  
  // Nivel 3: Confianza media - Análisis inteligente
  STATISTICAL_INFERENCE: {
    name: 'statistical-inference', 
    priority: 3,
    confidence: 0.7,
    description: 'Análisis estadístico de muestra representativa'
  },
  
  TYPE_PATTERNS: {
    name: 'type-patterns',
    priority: 3, 
    confidence: 0.65,
    description: 'Patrones de tipos conocidos en el dominio'
  },
  
  // Nivel 4: Baja confianza - Análisis de contenido
  CONTENT_ANALYSIS: {
    name: 'content-analysis',
    priority: 4,
    confidence: 0.5,
    description: 'Análisis de contenido/patrones de datos'
  },
  
  // Nivel 5: Fallback - Safety net
  CONSERVATIVE_FALLBACK: {
    name: 'conservative-fallback',
    priority: 5,
    confidence: 0.3,
    description: 'Fallback conservador que siempre funciona'
  }
}

// ================================
// CONTEXTO DE ANÁLISIS
// ================================

export interface AnalysisContext {
  // Contexto de dominio
  domain?: 'ecommerce' | 'hr' | 'finance' | 'crm' | 'inventory' | 'analytics'
  
  // Contexto técnico
  dataSource?: 'api' | 'csv' | 'database' | 'user-input' | 'computed'
  expectedCardinality?: 'low' | 'medium' | 'high'
  
  // Contexto de negocio
  userIntent?: 'exact-match' | 'fuzzy-search' | 'range-filter' | 'categorical'
  businessPurpose?: 'reporting' | 'filtering' | 'search' | 'analysis'
  
  // Configuración de comportamiento
  allowFallback?: boolean
  preferPerformance?: boolean
  requireExactness?: boolean
  
  // Metadatos adicionales
  columnHints?: {
    isId?: boolean
    isCategory?: boolean
    isMetric?: boolean
    isTimestamp?: boolean
  }
}

// ================================
// MOTOR HÍBRIDO MEJORADO
// ================================

export class EnhancedHybridFilterEngine<TData = any> {
  private schemaRegistry = new Map<string, any>()
  private domainKnowledge = new Map<string, DomainRules>()
  private userFeedback = new Map<string, UserFeedbackData>()
  private performanceCache = new Map<string, CachedResult>()
  
  constructor(private config: EngineConfig = {}) {
    this.loadDefaultDomainKnowledge()
  }

  /**
   * Análisis principal con contexto completo
   */
  analyzeColumn(
    column: Column<TData, unknown>, 
    context: AnalysisContext = {}
  ): FilterAnalysisResult {
    const columnId = column.id
    const cacheKey = this.generateCacheKey(column, context)
    
    // Check cache si está habilitado
    if (this.config.enableCaching) {
      const cached = this.performanceCache.get(cacheKey)
      if (cached && !this.isCacheStale(cached)) {
        return cached.result
      }
    }
    
    const reasoning: string[] = []
    
    // Ejecutar estrategias en orden de prioridad
    const strategies = this.getOrderedStrategies(context)
    
    for (const strategy of strategies) {
      try {
        const result = this.executeStrategy(strategy, column, context, reasoning)
        
        if (result && this.meetsConfidenceThreshold(result, strategy)) {
          result.reasoning = reasoning
          
          // Cache el resultado
          if (this.config.enableCaching) {
            this.cacheResult(cacheKey, result)
          }
          
          // Aprender del resultado si está habilitado
          if (this.config.enableLearning) {
            this.learnFromResult(column, result, context)
          }
          
          return result
        }
      } catch (error) {
        reasoning.push(`❌ Strategy '${strategy.name}' failed: ${error}`)
      }
    }
    
    // Si todo falla, usar fallback conservador
    return this.createConservativeFallback(column, reasoning)
  }

  /**
   * ESTRATEGIA 1: Schema explícito (máxima confianza)
   */
  private executeExplicitSchema(
    column: Column<TData, unknown>,
    context: AnalysisContext,
    reasoning: string[]
  ): FilterAnalysisResult | null {
    // Buscar en registry de schemas
    const schemaKey = context.domain || 'default'
    const schema = this.schemaRegistry.get(schemaKey)
    
    if (!schema || !schema[column.id]) {
      reasoning.push("❌ No explicit schema found")
      return null
    }
    
    const fieldDef = schema[column.id]
    reasoning.push(`✅ Found explicit schema for '${column.id}'`)
    
    return {
      type: fieldDef.filterType,
      confidence: CONFIDENCE_STRATEGIES.EXPLICIT_SCHEMA.confidence,
      source: 'explicit-schema' as any,
      metadata: this.createMetadataFromSchema(fieldDef),
      config: fieldDef.filterConfig || this.createDefaultConfig(fieldDef.filterType),
      reasoning: []
    }
  }

  /**
   * ESTRATEGIA 2: Naming semántico (alta confianza)
   */
  private executeSemanticNaming(
    column: Column<TData, unknown>,
    context: AnalysisContext,
    reasoning: string[]
  ): FilterAnalysisResult | null {
    const columnId = column.id.toLowerCase()
    
    // Patrones semánticos universales (independientes del idioma)
    const semanticPatterns = [
      // Identificadores únicos
      {
        pattern: /^.*(id|key|uuid|guid)$/,
        filterType: 'search' as FilterType,
        dataType: 'string' as DataType,
        confidence: 0.9,
        reasoning: 'Identifier pattern detected'
      },
      
      // Campos booleanos por convención
      {
        pattern: /^(is|has|can|should|will|did)[A-Z]/,
        filterType: 'boolean' as FilterType,
        dataType: 'boolean' as DataType,
        confidence: 0.95,
        reasoning: 'Boolean prefix convention'
      },
      
      // Estados/categorías por convención
      {
        pattern: /^(status|state|type|category|kind|priority|level|grade|role)$/,
        filterType: 'faceted' as FilterType,
        dataType: 'string' as DataType,
        confidence: 0.9,
        reasoning: 'Categorical field pattern'
      },
      
      // Métricas/medidas
      {
        pattern: /^(count|total|sum|avg|average|price|cost|amount|value|rating|score)$/,
        filterType: 'range' as FilterType,
        dataType: 'number' as DataType,
        confidence: 0.85,
        reasoning: 'Metric field pattern'
      },
      
      // Campos de timestamp
      {
        pattern: /^.*(date|time|at|on)$/,
        filterType: 'range' as FilterType,
        dataType: 'date' as DataType,
        confidence: 0.9,
        reasoning: 'Timestamp field pattern'
      },
      
      // Campos de texto libre
      {
        pattern: /^(name|title|description|comment|note|summary|text|content)$/,
        filterType: 'search' as FilterType,
        dataType: 'string' as DataType,
        confidence: 0.85,
        reasoning: 'Text search field pattern'
      }
    ]
    
    for (const pattern of semanticPatterns) {
      if (pattern.pattern.test(columnId)) {
        reasoning.push(`✅ Semantic naming: ${pattern.reasoning}`)
        
        return {
          type: pattern.filterType,
          confidence: CONFIDENCE_STRATEGIES.SEMANTIC_NAMING.confidence * pattern.confidence,
          source: 'semantic-naming' as any,
          metadata: {
            confidence: pattern.confidence,
            dataType: pattern.dataType,
            uniqueCount: 0,
            nullCount: 0,
            sampleSize: 0,
            source: 'semantic-naming' as any
          },
          config: this.createDefaultConfig(pattern.filterType),
          reasoning: []
        }
      }
    }
    
    reasoning.push("❌ No semantic naming patterns matched")
    return null
  }

  /**
   * ESTRATEGIA 3: Contexto de dominio (alta confianza)
   */
  private executeBusinessContext(
    column: Column<TData, unknown>,
    context: AnalysisContext,
    reasoning: string[]
  ): FilterAnalysisResult | null {
    if (!context.domain) {
      reasoning.push("❌ No domain context provided")
      return null
    }
    
    const domainRules = this.domainKnowledge.get(context.domain)
    if (!domainRules) {
      reasoning.push(`❌ No domain knowledge for '${context.domain}'`)
      return null
    }
    
    const fieldRule = domainRules.fieldRules[column.id] || 
                     domainRules.patternRules.find(rule => rule.pattern.test(column.id))
    
    if (!fieldRule) {
      reasoning.push(`❌ No domain rules for '${column.id}'`)
      return null
    }
    
    reasoning.push(`✅ Domain context (${context.domain}): ${fieldRule.reasoning}`)
    
    return {
      type: fieldRule.filterType,
      confidence: CONFIDENCE_STRATEGIES.BUSINESS_CONTEXT.confidence * fieldRule.confidence,
      source: 'business-context' as any,
      metadata: {
        confidence: fieldRule.confidence,
        dataType: fieldRule.dataType,
        uniqueCount: 0,
        nullCount: 0,
        sampleSize: 0,
        source: 'business-context' as any,
        domainContext: context.domain
      },
      config: ('config' in fieldRule ? fieldRule.config : undefined) || this.createDefaultConfig(fieldRule.filterType),
      reasoning: []
    }
  }

  /**
   * ESTRATEGIA 4: Análisis estadístico inteligente (confianza media)
   */
  private executeStatisticalInference(
    column: Column<TData, unknown>,
    context: AnalysisContext,
    reasoning: string[]
  ): FilterAnalysisResult | null {
    const rows = column.getFacetedRowModel()?.rows || []
    
    if (rows.length === 0) {
      reasoning.push("❌ No data available for statistical analysis")
      return null
    }
    
    // Usar muestra representativa para performance
    const sampleSize = Math.min(1000, Math.max(100, Math.sqrt(rows.length)))
    const sample = this.createRepresentativeSample(rows, sampleSize)
    
    const values = sample
      .map(row => row.getValue(column.id))
      .filter(value => value != null && value !== "")
    
    if (values.length === 0) {
      reasoning.push("❌ No valid values in sample")
      return null
    }
    
    // Análisis estadístico avanzado
    const stats = this.computeAdvancedStatistics(values)
    const analysis = this.inferFromStatistics(stats, context, reasoning)
    
    if (analysis) {
      reasoning.push(`✅ Statistical inference: ${analysis.reasoning}`)
      
      return {
        type: analysis.filterType,
        confidence: CONFIDENCE_STRATEGIES.STATISTICAL_INFERENCE.confidence * analysis.confidence,
        source: 'statistical-inference' as any,
        metadata: {
          confidence: analysis.confidence,
          dataType: analysis.dataType,
          uniqueCount: stats.uniqueCount,
          nullCount: sample.length - values.length,
          sampleSize: sample.length,
          source: 'statistical-inference' as any,
          distribution: stats as any
        },
        config: this.createDefaultConfig(analysis.filterType),
        reasoning: []
      }
    }
    
    reasoning.push("❌ Statistical inference inconclusive")
    return null
  }

  /**
   * ESTRATEGIA 5: Fallback conservador (siempre funciona)
   */
  private createConservativeFallback(
    column: Column<TData, unknown>,
    reasoning: string[]
  ): FilterAnalysisResult {
    reasoning.push("⚠️ Using conservative fallback - text search filter")
    
    return {
      type: 'search',
      confidence: CONFIDENCE_STRATEGIES.CONSERVATIVE_FALLBACK.confidence,
      source: 'conservative-fallback' as any,
      metadata: {
        confidence: CONFIDENCE_STRATEGIES.CONSERVATIVE_FALLBACK.confidence,
        dataType: 'string',
        uniqueCount: 0,
        nullCount: 0,
        sampleSize: 0,
        source: 'conservative-fallback' as any
      },
      config: {
        placeholder: 'Buscar...',
        searchConfig: {
          minLength: 1,
          debounceMs: 300,
          caseSensitive: false,
          matchMode: 'contains' as const
        }
      },
      reasoning: []
    }
  }

  // ================================
  // MÉTODOS DE APOYO
  // ================================

  private getOrderedStrategies(context: AnalysisContext): ConfidenceStrategy[] {
    return Object.values(CONFIDENCE_STRATEGIES).sort((a, b) => a.priority - b.priority)
  }

  private executeStrategy(
    strategy: ConfidenceStrategy,
    column: Column<TData, unknown>,
    context: AnalysisContext,
    reasoning: string[]
  ): FilterAnalysisResult | null {
    switch (strategy.name) {
      case 'explicit-schema':
        return this.executeExplicitSchema(column, context, reasoning)
      case 'semantic-naming':
        return this.executeSemanticNaming(column, context, reasoning)
      case 'business-context':
        return this.executeBusinessContext(column, context, reasoning)
      case 'statistical-inference':
        return this.executeStatisticalInference(column, context, reasoning)
      default:
        return null
    }
  }

  private meetsConfidenceThreshold(result: FilterAnalysisResult, strategy: ConfidenceStrategy): boolean {
    const minimumThreshold = this.config.minimumConfidence || 0.6
    return result.confidence >= minimumThreshold
  }

  private loadDefaultDomainKnowledge(): void {
    // E-commerce domain
    this.domainKnowledge.set('ecommerce', {
      fieldRules: {
        'price': { filterType: 'range', dataType: 'number', confidence: 0.95, reasoning: 'E-commerce: price is always a range filter' },
        'category': { filterType: 'faceted', dataType: 'string', confidence: 0.9, reasoning: 'E-commerce: category is faceted' },
        'inStock': { filterType: 'boolean', dataType: 'boolean', confidence: 0.95, reasoning: 'E-commerce: stock status is boolean' }
      },
      patternRules: [
        { pattern: /sku|productId/, filterType: 'search', dataType: 'string', confidence: 0.9, reasoning: 'E-commerce: product identifiers are searchable' }
      ]
    })

    // HR domain  
    this.domainKnowledge.set('hr', {
      fieldRules: {
        'salary': { filterType: 'range', dataType: 'number', confidence: 0.95, reasoning: 'HR: salary is always a range' },
        'department': { filterType: 'faceted', dataType: 'string', confidence: 0.9, reasoning: 'HR: department is categorical' },
        'isActive': { filterType: 'boolean', dataType: 'boolean', confidence: 0.95, reasoning: 'HR: employee status is boolean' }
      },
      patternRules: [
        { pattern: /employeeId/, filterType: 'search', dataType: 'string', confidence: 0.9, reasoning: 'HR: employee IDs are searchable' }
      ]
    })
  }

  private createRepresentativeSample(rows: any[], sampleSize: number): any[] {
    if (rows.length <= sampleSize) return rows
    
    // Muestreo estratificado: tomar muestras distribuidas uniformemente
    const step = Math.floor(rows.length / sampleSize)
    return rows.filter((_, index) => index % step === 0).slice(0, sampleSize)
  }

  private computeAdvancedStatistics(values: any[]): AdvancedStatistics {
    const uniqueValues = new Set(values)
    const uniqueRatio = uniqueValues.size / values.length
    
    // Análisis de tipos
    const typeDistribution = this.analyzeTypeDistribution(values)
    
    // Análisis de patrones
    const patternAnalysis = this.analyzeValuePatterns(values)
    
    return {
      uniqueCount: uniqueValues.size,
      uniqueRatio,
      typeDistribution,
      patternAnalysis,
      length: values.length
    }
  }

  private analyzeTypeDistribution(values: any[]) {
    let numeric = 0, boolean = 0, date = 0, string = 0
    
    for (const value of values) {
      if (typeof value === 'boolean') {
        boolean++
      } else if (typeof value === 'number' || (!isNaN(Number(value)) && isFinite(Number(value)))) {
        numeric++
      } else if (!isNaN(Date.parse(String(value)))) {
        date++
      } else {
        string++
      }
    }
    
    const total = values.length
    return {
      numeric: numeric / total,
      boolean: boolean / total,
      date: date / total,
      string: string / total
    }
  }

  private analyzeValuePatterns(values: any[]) {
    const sampleValues = values.slice(0, 50).map(v => String(v))
    
    return {
      hasEmailPattern: sampleValues.some(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
      hasUrlPattern: sampleValues.some(v => /^https?:\/\//.test(v)),
      hasPhonePattern: sampleValues.some(v => /^\+?[\d\s\-\(\)]+$/.test(v)),
      hasIdPattern: sampleValues.some(v => /^[A-Z0-9\-_]+$/.test(v)),
      hasCurrencyPattern: sampleValues.some(v => /^\$?[\d,]+\.?\d*$/.test(v))
    }
  }

  private inferFromStatistics(
    stats: AdvancedStatistics, 
    context: AnalysisContext, 
    reasoning: string[]
  ): InferenceResult | null {
    // Booleanos: exactamente 2 valores únicos con alta proporción booleana
    if (stats.uniqueCount === 2 && stats.typeDistribution.boolean > 0.8) {
      return {
        filterType: 'boolean',
        dataType: 'boolean',
        confidence: 0.9,
        reasoning: 'Exactly 2 unique values with boolean distribution'
      }
    }
    
    // Numéricos: alta proporción numérica
    if (stats.typeDistribution.numeric > 0.9) {
      return {
        filterType: 'range',
        dataType: 'number',
        confidence: 0.85,
        reasoning: 'High numeric distribution detected'
      }
    }
    
    // Fechas: alta proporción de fechas
    if (stats.typeDistribution.date > 0.8) {
      return {
        filterType: 'range',
        dataType: 'date',
        confidence: 0.8,
        reasoning: 'High date distribution detected'
      }
    }
    
    // Categóricos: baja cardinalidad con alta repetición
    if (stats.uniqueRatio < 0.3 && stats.uniqueCount < 20) {
      return {
        filterType: 'faceted',
        dataType: 'string',
        confidence: 0.75,
        reasoning: 'Low cardinality suggests categorical data'
      }
    }
    
    // IDs: patrones de identificadores
    if (stats.patternAnalysis.hasIdPattern && stats.uniqueRatio > 0.9) {
      return {
        filterType: 'search',
        dataType: 'string', 
        confidence: 0.8,
        reasoning: 'ID pattern with high uniqueness'
      }
    }
    
    return null
  }

  private createDefaultConfig(filterType: FilterType): any {
    switch (filterType) {
      case 'search':
        return { placeholder: 'Buscar...', minLength: 2, debounceMs: 300 }
      case 'faceted':
        return { maxOptions: 100, searchable: true }
      case 'range':
        return { step: 'any', placeholder: { from: 'Desde', to: 'Hasta' } }
      case 'boolean':
        return { labels: { true: 'Sí', false: 'No' } }
      default:
        return {}
    }
  }

  private createMetadataFromSchema(fieldDef: any): FilterMetadata {
    return {
      confidence: 1.0,
      dataType: fieldDef.dataType || 'string',
      uniqueCount: 0,
      nullCount: 0,
      sampleSize: 0,
      source: 'explicit-schema' as any
    }
  }

  // Otros métodos de apoyo...
  private generateCacheKey(column: Column<TData, unknown>, context: AnalysisContext): string {
    return `${column.id}-${JSON.stringify(context)}`
  }

  private isCacheStale(cached: CachedResult): boolean {
    const maxAge = this.config.cacheMaxAge || 300000 // 5 minutes
    return Date.now() - cached.timestamp > maxAge
  }

  private cacheResult(key: string, result: FilterAnalysisResult): void {
    this.performanceCache.set(key, {
      result,
      timestamp: Date.now()
    })
  }

  private learnFromResult(column: Column<TData, unknown>, result: FilterAnalysisResult, context: AnalysisContext): void {
    // Implementar aprendizaje automático para mejorar futuras detecciones
  }
}

// ================================
// INTERFACES DE APOYO
// ================================

interface EngineConfig {
  minimumConfidence?: number
  enableCaching?: boolean
  enableLearning?: boolean
  cacheMaxAge?: number
}

interface DomainRules {
  fieldRules: Record<string, FieldRule>
  patternRules: PatternRule[]
}

interface FieldRule {
  filterType: FilterType
  dataType: DataType
  confidence: number
  reasoning: string
  config?: any
}

interface PatternRule {
  pattern: RegExp
  filterType: FilterType
  dataType: DataType
  confidence: number
  reasoning: string
}

interface AdvancedStatistics {
  uniqueCount: number
  uniqueRatio: number
  length: number
  typeDistribution: {
    numeric: number
    boolean: number
    date: number
    string: number
  }
  patternAnalysis: {
    hasEmailPattern: boolean
    hasUrlPattern: boolean
    hasPhonePattern: boolean
    hasIdPattern: boolean
    hasCurrencyPattern: boolean
  }
}

interface InferenceResult {
  filterType: FilterType
  dataType: DataType
  confidence: number
  reasoning: string
}

interface CachedResult {
  result: FilterAnalysisResult
  timestamp: number
}

interface UserFeedbackData {
  preferredType: FilterType
  confidence: number
  timestamp: number
}
