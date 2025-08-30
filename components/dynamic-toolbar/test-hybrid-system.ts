/**
 * Test básico del sistema híbrido de filtros
 */

import { HybridFilterAnalyzer } from "./utils/hybrid-filter-analyzer"
import type { GlobalFilterConfig } from "./types/filter-config"

// Configuración de prueba
const testConfig: Partial<GlobalFilterConfig> = {
  facetedThreshold: 10,
  columnConfigs: {
    'user_email': { type: 'search', priority: 'high' }
  }
}

// Crear instancia del analizador
const analyzer = new HybridFilterAnalyzer(testConfig)

// Mock de una columna para testing
const mockColumn = {
  id: 'status',
  columnDef: {
    accessorKey: 'status'
  },
  getFacetedRowModel: () => ({
    rows: [
      { getValue: () => 'active' },
      { getValue: () => 'inactive' },
      { getValue: () => 'active' },
    ]
  }),
  getFacetedUniqueValues: () => new Map([
    ['active', 2],
    ['inactive', 1]
  ])
} as any

// Test del análisis
console.log('🧪 Testing Hybrid Filter Analyzer...')

try {
  const result = analyzer.analyzeColumn(mockColumn)
  
  console.log('✅ Analysis Result:', {
    type: result.type,
    confidence: result.confidence,
    source: result.source,
    reasoning: result.reasoning
  })
  
  console.log('✅ Hybrid Filter Analyzer working correctly!')
} catch (error) {
  console.error('❌ Error in analyzer:', error)
}

export default analyzer
