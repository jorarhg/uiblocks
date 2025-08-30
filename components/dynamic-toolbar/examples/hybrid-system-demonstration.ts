/**
 * DEMOSTRACIÓN: Sistema Híbrido Mejorado en Acción
 * Ejemplos prácticos que muestran cómo el sistema maneja diferentes escenarios
 */

import { EnhancedHybridFilterEngine } from '../utils/enhanced-hybrid-filter-engine'
import { SchemaBuilder } from '../utils/type-based-filter-engine'

// ================================
// ESCENARIO 1: E-COMMERCE CON ESQUEMA EXPLÍCITO
// ================================

interface Product {
  id: string
  name: string
  category: 'Electronics' | 'Clothing' | 'Books'
  price: number
  inStock: boolean
  rating: number
  tags: string[]
  createdAt: Date
}

// Schema explícito usando Zod (máxima confianza)
const productSchema = SchemaBuilder.create<Product>()
  .id('id')
  .searchable('name')
  .categorical('category', ['Electronics', 'Clothing', 'Books'])
  .range('price', 0, 10000)
  .boolean('inStock')
  .range('rating', 0, 5)
  .string('tags', { filter: { type: 'faceted' } })
  .date('createdAt')
  .build()

// ================================
// ESCENARIO 2: DATOS CSV DINÁMICOS SIN TIPOS
// ================================

const dynamicCsvData = [
  { employee_id: 'EMP001', full_name: 'John Doe', department: 'Engineering', salary: 75000, is_active: true, hire_date: '2023-01-15' },
  { employee_id: 'EMP002', full_name: 'Jane Smith', department: 'Marketing', salary: 65000, is_active: true, hire_date: '2023-02-20' },
  { employee_id: 'EMP003', full_name: 'Bob Johnson', department: 'Engineering', salary: 80000, is_active: false, hire_date: '2022-11-10' }
]

// ================================
// ESCENARIO 3: API EXTERNA SIN DOCUMENTACIÓN
// ================================

const externalApiData = [
  { userId: 12345, status: 'active', lastLogin: '2024-01-15T10:30:00Z', preferences: ['email', 'sms'], score: 4.2 },
  { userId: 12346, status: 'inactive', lastLogin: '2024-01-10T15:45:00Z', preferences: ['email'], score: 3.8 },
  { userId: 12347, status: 'pending', lastLogin: null, preferences: [], score: null }
]

// ================================
// DEMOSTRACIÓN PRÁCTICA
// ================================

export function demonstrateHybridSystem() {
  const engine = new EnhancedHybridFilterEngine()
  
  console.log('🔍 DEMOSTRACIÓN: Sistema Híbrido Mejorado\n')
  
  // ================================
  // DEMO 1: E-commerce con schema (máxima confianza)
  // ================================
  
  console.log('📦 ESCENARIO 1: E-commerce con Schema Explícito')
  console.log('===============================================')
  
  engine.registerSchema('product', productSchema)
  
  const productColumns = ['id', 'name', 'category', 'price', 'inStock', 'rating']
  
  productColumns.forEach(columnId => {
    const mockColumn = createMockColumn(columnId, columnId, [])
    const result = engine.analyzeColumn(mockColumn, { 
      domain: 'ecommerce',
      dataSource: 'api'
    })
    
    console.log(`  ${columnId}:`)
    console.log(`    ✅ Tipo: ${result.type}`)
    console.log(`    ✅ Confianza: ${(result.confidence * 100).toFixed(1)}%`)
    console.log(`    ✅ Fuente: ${result.source}`)
    console.log('')
  })
  
  // ================================
  // DEMO 2: CSV dinámico (inferencia inteligente)
  // ================================
  
  console.log('📊 ESCENARIO 2: Datos CSV Dinámicos')
  console.log('===================================')
  
  const csvColumns = Object.keys(dynamicCsvData[0])
  
  csvColumns.forEach(columnId => {
    const values = dynamicCsvData.map(row => row[columnId as keyof typeof row])
    const mockColumn = createMockColumn(columnId, columnId, values)
    const result = engine.analyzeColumn(mockColumn, { 
      domain: 'hr',
      dataSource: 'csv',
      expectedCardinality: 'medium'
    })
    
    console.log(`  ${columnId}:`)
    console.log(`    ✅ Tipo: ${result.type}`)
    console.log(`    ✅ Confianza: ${(result.confidence * 100).toFixed(1)}%`)
    console.log(`    ✅ Fuente: ${result.source}`)
    console.log(`    📝 Razonamiento: ${result.reasoning?.slice(-1)[0] || 'N/A'}`)
    console.log('')
  })
  
  // ================================
  // DEMO 3: API externa (análisis estadístico + fallback)
  // ================================
  
  console.log('🌐 ESCENARIO 3: API Externa Sin Documentación')
  console.log('=============================================')
  
  const apiColumns = Object.keys(externalApiData[0])
  
  apiColumns.forEach(columnId => {
    const values = externalApiData.map(row => row[columnId as keyof typeof row])
    const mockColumn = createMockColumn(columnId, columnId, values)
    const result = engine.analyzeColumn(mockColumn, { 
      dataSource: 'api',
      allowFallback: true,
      preferPerformance: true
    })
    
    console.log(`  ${columnId}:`)
    console.log(`    ✅ Tipo: ${result.type}`)
    console.log(`    ✅ Confianza: ${(result.confidence * 100).toFixed(1)}%`)
    console.log(`    ✅ Fuente: ${result.source}`)
    console.log(`    📝 Razonamiento: ${result.reasoning?.slice(-1)[0] || 'N/A'}`)
    console.log('')
  })
  
  // ================================
  // DEMO 4: Casos edge problemáticos
  // ================================
  
  console.log('⚠️  ESCENARIO 4: Casos Edge Problemáticos')
  console.log('==========================================')
  
  const edgeCases = [
    {
      name: 'mixed_ids',
      values: ['USER123', 'USER124', 'GUEST001', 'N/A'], // IDs con algunos valores especiales
      expectedIssue: 'Tipo mixto - mayoría IDs pero algunos textos'
    },
    {
      name: 'year_category', 
      values: [2020, 2021, 2022, 2023], // Años que podrían ser rangos o categorías
      expectedIssue: 'Números que son categóricos conceptualmente'
    },
    {
      name: 'sparse_booleans',
      values: [true, false, null, null, true, null], // Booleanos con muchos nulls
      expectedIssue: 'Booleanos con alta proporción de valores nulos'
    },
    {
      name: 'numeric_codes',
      values: ['10001', '10002', '20003', '30004'], // Códigos numéricos como strings
      expectedIssue: 'Códigos que parecen números pero son categóricos'
    }
  ]
  
  edgeCases.forEach(edgeCase => {
    const mockColumn = createMockColumn(edgeCase.name, edgeCase.name, edgeCase.values)
    const result = engine.analyzeColumn(mockColumn, { 
      allowFallback: true,
      requireExactness: false
    })
    
    console.log(`  ${edgeCase.name}:`)
    console.log(`    🔍 Problema: ${edgeCase.expectedIssue}`)
    console.log(`    ✅ Decisión: ${result.type}`)
    console.log(`    ✅ Confianza: ${(result.confidence * 100).toFixed(1)}%`)
    console.log(`    ✅ Fuente: ${result.source}`)
    console.log('')
  })
  
  // ================================
  // RESUMEN DE RENDIMIENTO
  // ================================
  
  console.log('📈 RESUMEN DE RENDIMIENTO')
  console.log('=========================')
  console.log('✅ Casos con alta confianza (>80%): Schema explícitos, naming semántico')
  console.log('⚡ Casos con confianza media (60-80%): Inferencia estadística, contexto de dominio')
  console.log('🛡️ Casos con baja confianza (<60%): Análisis de contenido, fallback conservador')
  console.log('🎯 Fallback conservador: Siempre funciona, nunca falla')
  console.log('')
  console.log('🧠 VENTAJAS DEL SISTEMA HÍBRIDO:')
  console.log('• Escalabilidad: Funciona desde schemas explícitos hasta datos completamente desconocidos')
  console.log('• Robustez: Múltiples estrategias de fallback evitan fallos catastróficos')
  console.log('• Performance: Muestreo inteligente para datasets grandes')
  console.log('• Mantenibilidad: Separación clara de estrategias y configuración')
  console.log('• Evolución: Sistema aprende y mejora con el tiempo')
}

// ================================
// UTILIDADES DE DEMO
// ================================

function createMockColumn(id: string, accessorKey: string, values: any[]) {
  // Simular una columna de TanStack Table
  return {
    id,
    columnDef: { accessorKey },
    getFacetedRowModel: () => ({
      rows: values.map(value => ({
        getValue: (columnId: string) => columnId === id ? value : undefined
      }))
    }),
    getFacetedUniqueValues: () => {
      const uniqueMap = new Map()
      values.forEach(value => {
        if (value != null) {
          uniqueMap.set(value, (uniqueMap.get(value) || 0) + 1)
        }
      })
      return uniqueMap
    }
  }
}

// ================================
// CASOS DE PRUEBA ADICIONALES
// ================================

export const COMPREHENSIVE_TEST_CASES = {
  // Casos de alta confianza
  highConfidence: [
    { field: 'isActive', type: 'boolean', values: [true, false, true], confidence: '>90%' },
    { field: 'price', type: 'range', values: [29.99, 19.99, 45.50], confidence: '>85%' },
    { field: 'status', type: 'faceted', values: ['active', 'pending', 'inactive'], confidence: '>85%' }
  ],
  
  // Casos problemáticos que el sistema debe manejar
  edgeCases: [
    { field: 'year', type: '?', values: [2020, 2021, 2022], issue: '¿Rango numérico o categoría?' },
    { field: 'productCode', type: '?', values: ['A001', 'B002', 'C003'], issue: '¿Búsqueda exacta o categórico?' },
    { field: 'rating', type: '?', values: [1, 2, 3, 4, 5], issue: '¿Rango continuo o categorías discretas?' }
  ],
  
  // Casos de rendimiento
  performanceCases: [
    { scenario: 'Large dataset', rows: 100000, strategy: 'Statistical sampling' },
    { scenario: 'Many columns', columns: 50, strategy: 'Parallel analysis with caching' },
    { scenario: 'Real-time data', updates: 'frequent', strategy: 'Incremental analysis' }
  ]
}

// Ejecutar demostración si es llamado directamente
if (require.main === module) {
  demonstrateHybridSystem()
}
