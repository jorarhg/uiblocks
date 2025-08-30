"use strict";
/**
 * PROPUESTA DE ARQUITECTURA HÍBRIDA MEJORADA
 * Solución realista que aborda todas las limitaciones identificadas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedHybridFilterEngine = exports.CONFIDENCE_STRATEGIES = void 0;
exports.CONFIDENCE_STRATEGIES = {
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
};
// ================================
// MOTOR HÍBRIDO MEJORADO
// ================================
class EnhancedHybridFilterEngine {
    constructor(config = {}) {
        this.config = config;
        this.schemaRegistry = new Map();
        this.domainKnowledge = new Map();
        this.userFeedback = new Map();
        this.performanceCache = new Map();
        this.loadDefaultDomainKnowledge();
    }
    /**
     * Análisis principal con contexto completo
     */
    analyzeColumn(column, context = {}) {
        const columnId = column.id;
        const cacheKey = this.generateCacheKey(column, context);
        // Check cache si está habilitado
        if (this.config.enableCaching) {
            const cached = this.performanceCache.get(cacheKey);
            if (cached && !this.isCacheStale(cached)) {
                return cached.result;
            }
        }
        const reasoning = [];
        // Ejecutar estrategias en orden de prioridad
        const strategies = this.getOrderedStrategies(context);
        for (const strategy of strategies) {
            try {
                const result = this.executeStrategy(strategy, column, context, reasoning);
                if (result && this.meetsConfidenceThreshold(result, strategy)) {
                    result.reasoning = reasoning;
                    // Cache el resultado
                    if (this.config.enableCaching) {
                        this.cacheResult(cacheKey, result);
                    }
                    // Aprender del resultado si está habilitado
                    if (this.config.enableLearning) {
                        this.learnFromResult(column, result, context);
                    }
                    return result;
                }
            }
            catch (error) {
                reasoning.push(`❌ Strategy '${strategy.name}' failed: ${error}`);
            }
        }
        // Si todo falla, usar fallback conservador
        return this.createConservativeFallback(column, reasoning);
    }
    /**
     * ESTRATEGIA 1: Schema explícito (máxima confianza)
     */
    executeExplicitSchema(column, context, reasoning) {
        // Buscar en registry de schemas
        const schemaKey = context.domain || 'default';
        const schema = this.schemaRegistry.get(schemaKey);
        if (!schema || !schema[column.id]) {
            reasoning.push("❌ No explicit schema found");
            return null;
        }
        const fieldDef = schema[column.id];
        reasoning.push(`✅ Found explicit schema for '${column.id}'`);
        return {
            type: fieldDef.filterType,
            confidence: exports.CONFIDENCE_STRATEGIES.EXPLICIT_SCHEMA.confidence,
            source: 'explicit-schema',
            metadata: this.createMetadataFromSchema(fieldDef),
            config: fieldDef.filterConfig || this.createDefaultConfig(fieldDef.filterType),
            reasoning: []
        };
    }
    /**
     * ESTRATEGIA 2: Naming semántico (alta confianza)
     */
    executeSemanticNaming(column, context, reasoning) {
        const columnId = column.id.toLowerCase();
        // Patrones semánticos universales (independientes del idioma)
        const semanticPatterns = [
            // Identificadores únicos
            {
                pattern: /^.*(id|key|uuid|guid)$/,
                filterType: 'search',
                dataType: 'string',
                confidence: 0.9,
                reasoning: 'Identifier pattern detected'
            },
            // Campos booleanos por convención
            {
                pattern: /^(is|has|can|should|will|did)[A-Z]/,
                filterType: 'boolean',
                dataType: 'boolean',
                confidence: 0.95,
                reasoning: 'Boolean prefix convention'
            },
            // Estados/categorías por convención
            {
                pattern: /^(status|state|type|category|kind|priority|level|grade|role)$/,
                filterType: 'faceted',
                dataType: 'string',
                confidence: 0.9,
                reasoning: 'Categorical field pattern'
            },
            // Métricas/medidas
            {
                pattern: /^(count|total|sum|avg|average|price|cost|amount|value|rating|score)$/,
                filterType: 'range',
                dataType: 'number',
                confidence: 0.85,
                reasoning: 'Metric field pattern'
            },
            // Campos de timestamp
            {
                pattern: /^.*(date|time|at|on)$/,
                filterType: 'range',
                dataType: 'date',
                confidence: 0.9,
                reasoning: 'Timestamp field pattern'
            },
            // Campos de texto libre
            {
                pattern: /^(name|title|description|comment|note|summary|text|content)$/,
                filterType: 'search',
                dataType: 'string',
                confidence: 0.85,
                reasoning: 'Text search field pattern'
            }
        ];
        for (const pattern of semanticPatterns) {
            if (pattern.pattern.test(columnId)) {
                reasoning.push(`✅ Semantic naming: ${pattern.reasoning}`);
                return {
                    type: pattern.filterType,
                    confidence: exports.CONFIDENCE_STRATEGIES.SEMANTIC_NAMING.confidence * pattern.confidence,
                    source: 'semantic-naming',
                    metadata: {
                        confidence: pattern.confidence,
                        dataType: pattern.dataType,
                        uniqueCount: 0,
                        nullCount: 0,
                        sampleSize: 0,
                        source: 'semantic-naming'
                    },
                    config: this.createDefaultConfig(pattern.filterType),
                    reasoning: []
                };
            }
        }
        reasoning.push("❌ No semantic naming patterns matched");
        return null;
    }
    /**
     * ESTRATEGIA 3: Contexto de dominio (alta confianza)
     */
    executeBusinessContext(column, context, reasoning) {
        if (!context.domain) {
            reasoning.push("❌ No domain context provided");
            return null;
        }
        const domainRules = this.domainKnowledge.get(context.domain);
        if (!domainRules) {
            reasoning.push(`❌ No domain knowledge for '${context.domain}'`);
            return null;
        }
        const fieldRule = domainRules.fieldRules[column.id] ||
            domainRules.patternRules.find(rule => rule.pattern.test(column.id));
        if (!fieldRule) {
            reasoning.push(`❌ No domain rules for '${column.id}'`);
            return null;
        }
        reasoning.push(`✅ Domain context (${context.domain}): ${fieldRule.reasoning}`);
        return {
            type: fieldRule.filterType,
            confidence: exports.CONFIDENCE_STRATEGIES.BUSINESS_CONTEXT.confidence * fieldRule.confidence,
            source: 'business-context',
            metadata: {
                confidence: fieldRule.confidence,
                dataType: fieldRule.dataType,
                uniqueCount: 0,
                nullCount: 0,
                sampleSize: 0,
                source: 'business-context',
                domainContext: context.domain
            },
            config: fieldRule.config || this.createDefaultConfig(fieldRule.filterType),
            reasoning: []
        };
    }
    /**
     * ESTRATEGIA 4: Análisis estadístico inteligente (confianza media)
     */
    executeStatisticalInference(column, context, reasoning) {
        const rows = column.getFacetedRowModel()?.rows || [];
        if (rows.length === 0) {
            reasoning.push("❌ No data available for statistical analysis");
            return null;
        }
        // Usar muestra representativa para performance
        const sampleSize = Math.min(1000, Math.max(100, Math.sqrt(rows.length)));
        const sample = this.createRepresentativeSample(rows, sampleSize);
        const values = sample
            .map(row => row.getValue(column.id))
            .filter(value => value != null && value !== "");
        if (values.length === 0) {
            reasoning.push("❌ No valid values in sample");
            return null;
        }
        // Análisis estadístico avanzado
        const stats = this.computeAdvancedStatistics(values);
        const analysis = this.inferFromStatistics(stats, context, reasoning);
        if (analysis) {
            reasoning.push(`✅ Statistical inference: ${analysis.reasoning}`);
            return {
                type: analysis.filterType,
                confidence: exports.CONFIDENCE_STRATEGIES.STATISTICAL_INFERENCE.confidence * analysis.confidence,
                source: 'statistical-inference',
                metadata: {
                    confidence: analysis.confidence,
                    dataType: analysis.dataType,
                    uniqueCount: stats.uniqueCount,
                    nullCount: sample.length - values.length,
                    sampleSize: sample.length,
                    source: 'statistical-inference',
                    distribution: stats
                },
                config: this.createDefaultConfig(analysis.filterType),
                reasoning: []
            };
        }
        reasoning.push("❌ Statistical inference inconclusive");
        return null;
    }
    /**
     * ESTRATEGIA 5: Fallback conservador (siempre funciona)
     */
    createConservativeFallback(column, reasoning) {
        reasoning.push("⚠️ Using conservative fallback - text search filter");
        return {
            type: 'search',
            confidence: exports.CONFIDENCE_STRATEGIES.CONSERVATIVE_FALLBACK.confidence,
            source: 'conservative-fallback',
            metadata: {
                confidence: exports.CONFIDENCE_STRATEGIES.CONSERVATIVE_FALLBACK.confidence,
                dataType: 'string',
                uniqueCount: 0,
                nullCount: 0,
                sampleSize: 0,
                source: 'conservative-fallback'
            },
            config: {
                placeholder: 'Buscar...',
                searchConfig: {
                    minLength: 1,
                    debounceMs: 300,
                    caseSensitive: false,
                    matchMode: 'contains'
                }
            },
            reasoning: []
        };
    }
    // ================================
    // MÉTODOS DE APOYO
    // ================================
    getOrderedStrategies(context) {
        return Object.values(exports.CONFIDENCE_STRATEGIES).sort((a, b) => a.priority - b.priority);
    }
    executeStrategy(strategy, column, context, reasoning) {
        switch (strategy.name) {
            case 'explicit-schema':
                return this.executeExplicitSchema(column, context, reasoning);
            case 'semantic-naming':
                return this.executeSemanticNaming(column, context, reasoning);
            case 'business-context':
                return this.executeBusinessContext(column, context, reasoning);
            case 'statistical-inference':
                return this.executeStatisticalInference(column, context, reasoning);
            default:
                return null;
        }
    }
    meetsConfidenceThreshold(result, strategy) {
        const minimumThreshold = this.config.minimumConfidence || 0.6;
        return result.confidence >= minimumThreshold;
    }
    loadDefaultDomainKnowledge() {
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
        });
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
        });
    }
    createRepresentativeSample(rows, sampleSize) {
        if (rows.length <= sampleSize)
            return rows;
        // Muestreo estratificado: tomar muestras distribuidas uniformemente
        const step = Math.floor(rows.length / sampleSize);
        return rows.filter((_, index) => index % step === 0).slice(0, sampleSize);
    }
    computeAdvancedStatistics(values) {
        const uniqueValues = new Set(values);
        const uniqueRatio = uniqueValues.size / values.length;
        // Análisis de tipos
        const typeDistribution = this.analyzeTypeDistribution(values);
        // Análisis de patrones
        const patternAnalysis = this.analyzeValuePatterns(values);
        return {
            uniqueCount: uniqueValues.size,
            uniqueRatio,
            typeDistribution,
            patternAnalysis,
            length: values.length
        };
    }
    analyzeTypeDistribution(values) {
        let numeric = 0, boolean = 0, date = 0, string = 0;
        for (const value of values) {
            if (typeof value === 'boolean') {
                boolean++;
            }
            else if (typeof value === 'number' || (!isNaN(Number(value)) && isFinite(Number(value)))) {
                numeric++;
            }
            else if (!isNaN(Date.parse(String(value)))) {
                date++;
            }
            else {
                string++;
            }
        }
        const total = values.length;
        return {
            numeric: numeric / total,
            boolean: boolean / total,
            date: date / total,
            string: string / total
        };
    }
    analyzeValuePatterns(values) {
        const sampleValues = values.slice(0, 50).map(v => String(v));
        return {
            hasEmailPattern: sampleValues.some(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
            hasUrlPattern: sampleValues.some(v => /^https?:\/\//.test(v)),
            hasPhonePattern: sampleValues.some(v => /^\+?[\d\s\-\(\)]+$/.test(v)),
            hasIdPattern: sampleValues.some(v => /^[A-Z0-9\-_]+$/.test(v)),
            hasCurrencyPattern: sampleValues.some(v => /^\$?[\d,]+\.?\d*$/.test(v))
        };
    }
    inferFromStatistics(stats, context, reasoning) {
        // Booleanos: exactamente 2 valores únicos con alta proporción booleana
        if (stats.uniqueCount === 2 && stats.typeDistribution.boolean > 0.8) {
            return {
                filterType: 'boolean',
                dataType: 'boolean',
                confidence: 0.9,
                reasoning: 'Exactly 2 unique values with boolean distribution'
            };
        }
        // Numéricos: alta proporción numérica
        if (stats.typeDistribution.numeric > 0.9) {
            return {
                filterType: 'range',
                dataType: 'number',
                confidence: 0.85,
                reasoning: 'High numeric distribution detected'
            };
        }
        // Fechas: alta proporción de fechas
        if (stats.typeDistribution.date > 0.8) {
            return {
                filterType: 'range',
                dataType: 'date',
                confidence: 0.8,
                reasoning: 'High date distribution detected'
            };
        }
        // Categóricos: baja cardinalidad con alta repetición
        if (stats.uniqueRatio < 0.3 && stats.uniqueCount < 20) {
            return {
                filterType: 'faceted',
                dataType: 'string',
                confidence: 0.75,
                reasoning: 'Low cardinality suggests categorical data'
            };
        }
        // IDs: patrones de identificadores
        if (stats.patternAnalysis.hasIdPattern && stats.uniqueRatio > 0.9) {
            return {
                filterType: 'search',
                dataType: 'string',
                confidence: 0.8,
                reasoning: 'ID pattern with high uniqueness'
            };
        }
        return null;
    }
    createDefaultConfig(filterType) {
        switch (filterType) {
            case 'search':
                return { placeholder: 'Buscar...', minLength: 2, debounceMs: 300 };
            case 'faceted':
                return { maxOptions: 100, searchable: true };
            case 'range':
                return { step: 'any', placeholder: { from: 'Desde', to: 'Hasta' } };
            case 'boolean':
                return { labels: { true: 'Sí', false: 'No' } };
            default:
                return {};
        }
    }
    createMetadataFromSchema(fieldDef) {
        return {
            confidence: 1.0,
            dataType: fieldDef.dataType || 'string',
            uniqueCount: 0,
            nullCount: 0,
            sampleSize: 0,
            source: 'explicit-schema'
        };
    }
    // Otros métodos de apoyo...
    generateCacheKey(column, context) {
        return `${column.id}-${JSON.stringify(context)}`;
    }
    isCacheStale(cached) {
        const maxAge = this.config.cacheMaxAge || 300000; // 5 minutes
        return Date.now() - cached.timestamp > maxAge;
    }
    cacheResult(key, result) {
        this.performanceCache.set(key, {
            result,
            timestamp: Date.now()
        });
    }
    learnFromResult(column, result, context) {
        // Implementar aprendizaje automático para mejorar futuras detecciones
    }
}
exports.EnhancedHybridFilterEngine = EnhancedHybridFilterEngine;
