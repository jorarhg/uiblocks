/**
 * Validación completa del sistema híbrido de filtros
 * Este archivo puede ser ejecutado desde Node.js para verificar la funcionalidad
 */

import { HybridFilterAnalyzer } from "./utils/hybrid-filter-analyzer"
import type { GlobalFilterConfig } from "./types/filter-config"

// Mock de datos para pruebas
const mockEmployeeData = [
  { id: 1, name: "John Doe", email: "john@company.com", isActive: true, department: "Engineering", salary: 95000 },
  { id: 2, name: "Jane Smith", email: "jane@company.com", isActive: false, department: "Marketing", salary: 75000 },
  { id: 3, name: "Bob Johnson", email: "bob@company.com", isActive: true, department: "Engineering", salary: 87000 },
]

// Configuración global de prueba
const testConfig: Partial<GlobalFilterConfig> = {
  facetedThreshold: 5,
  searchMinLength: 1,
  columnConfigs: {
    'email': { 
      type: 'search', 
      priority: 'high',
      searchConfig: { minLength: 1, debounceMs: 300, caseSensitive: false, matchMode: 'contains' }
    },
    'department': { 
      type: 'faceted', 
      priority: 'high',
      options: []
    }
  },
  columnNameMappings: {
    'isActive': { type: 'faceted', priority: 'medium' },
    'salario': { type: 'range', priority: 'medium' }
  },
  patterns: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    url: /^https?:\/\/.+/,
    phone: /^\+?[\d\s\-\(\)]+$/,
    date: [/^\d{4}-\d{2}-\d{2}$/, /^\d{2}\/\d{2}\/\d{4}$/],
    currency: /^\$?[\d,]+\.?\d*$/,
    percentage: /^\d+%$/
  }
}

// Función para crear un mock de columna
function createMockColumn(columnId: string, accessorKey: string, data: any[]) {
  const uniqueValues = new Set(data.map(row => row[accessorKey]))
  const facetedMap = new Map()
  
  // Contar ocurrencias
  data.forEach(row => {
    const value = row[accessorKey]
    facetedMap.set(value, (facetedMap.get(value) || 0) + 1)
  })

  return {
    id: columnId,
    columnDef: {
      accessorKey,
      header: columnId
    },
    getFacetedRowModel: () => ({
      rows: data.map(row => ({
        getValue: () => row[accessorKey]
      }))
    }),
    getFacetedUniqueValues: () => facetedMap
  } as any
}

// Tests del sistema híbrido
function runHybridSystemTests() {
  console.log('🚀 Iniciando validación del sistema híbrido de filtros...\n')
  
  const analyzer = new HybridFilterAnalyzer(testConfig)
  let passed = 0
  let total = 0

  // Test 1: Análisis de columna booleana
  total++
  console.log('📋 Test 1: Análisis de columna booleana (isActive)')
  try {
    const booleanColumn = createMockColumn('isActive', 'isActive', mockEmployeeData)
    const result = analyzer.analyzeColumn(booleanColumn)
    
    console.log(`   Tipo detectado: ${result.type}`)
    console.log(`   Confianza: ${result.confidence}`)
    console.log(`   Fuente: ${result.source}`)
    console.log(`   Razonamiento: ${result.reasoning}`)
    
    if (result.type === 'faceted' && result.confidence > 0.8) {
      console.log('   ✅ PASADO - Detectó correctamente columna booleana como faceted')
      passed++
    } else {
      console.log('   ❌ FALLIDO - No detectó correctamente la columna booleana')
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error}`)
  }
  console.log('')

  // Test 2: Análisis de columna con configuración override
  total++
  console.log('📋 Test 2: Análisis con configuración override (email)')
  try {
    const emailColumn = createMockColumn('email', 'email', mockEmployeeData)
    const result = analyzer.analyzeColumn(emailColumn)
    
    console.log(`   Tipo detectado: ${result.type}`)
    console.log(`   Confianza: ${result.confidence}`)
    console.log(`   Fuente: ${result.source}`)
    
    if (result.type === 'search' && result.source === 'config-override') {
      console.log('   ✅ PASADO - Utilizó correctamente configuración override')
      passed++
    } else {
      console.log('   ❌ FALLIDO - No utilizó configuración override')
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error}`)
  }
  console.log('')

  // Test 3: Análisis por inferencia de tipo (salary)
  total++
  console.log('📋 Test 3: Análisis por inferencia de tipo (salary)')
  try {
    const salaryColumn = createMockColumn('salary', 'salary', mockEmployeeData)
    const result = analyzer.analyzeColumn(salaryColumn)
    
    console.log(`   Tipo detectado: ${result.type}`)
    console.log(`   Confianza: ${result.confidence}`)
    console.log(`   Fuente: ${result.source}`)
    
    if (result.type === 'range' && result.source === 'type-inference') {
      console.log('   ✅ PASADO - Detectó correctamente por inferencia de tipo')
      passed++
    } else {
      console.log('   ❌ FALLIDO - No detectó correctamente por inferencia')
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error}`)
  }
  console.log('')

  // Test 4: Análisis de columna de departamento (cardinalidad baja)
  total++
  console.log('📋 Test 4: Análisis por cardinalidad (department)')
  try {
    const deptColumn = createMockColumn('department', 'department', mockEmployeeData)
    const result = analyzer.analyzeColumn(deptColumn)
    
    console.log(`   Tipo detectado: ${result.type}`)
    console.log(`   Confianza: ${result.confidence}`)
    console.log(`   Fuente: ${result.source}`)
    
    if (result.type === 'faceted') {
      console.log('   ✅ PASADO - Detectó correctamente baja cardinalidad como faceted')
      passed++
    } else {
      console.log('   ❌ FALLIDO - No detectó correctamente la baja cardinalidad')
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error}`)
  }
  console.log('')

  // Test 5: Análisis de ID secuencial
  total++
  console.log('📋 Test 5: Análisis de ID secuencial')
  try {
    const idColumn = createMockColumn('id', 'id', mockEmployeeData)
    const result = analyzer.analyzeColumn(idColumn)
    
    console.log(`   Tipo detectado: ${result.type}`)
    console.log(`   Confianza: ${result.confidence}`)
    console.log(`   Fuente: ${result.source}`)
    
    if (result.type === 'search') {
      console.log('   ✅ PASADO - Detectó correctamente ID secuencial como search')
      passed++
    } else {
      console.log('   ❌ FALLIDO - No detectó correctamente ID secuencial')
    }
  } catch (error) {
    console.log(`   ❌ ERROR: ${error}`)
  }
  console.log('')

  // Resumen final
  console.log('📊 RESUMEN DE VALIDACIÓN:')
  console.log(`   Tests pasados: ${passed}/${total}`)
  console.log(`   Porcentaje de éxito: ${Math.round((passed / total) * 100)}%`)
  
  if (passed === total) {
    console.log('   🎉 ¡Todos los tests pasaron! El sistema híbrido funciona correctamente.')
  } else {
    console.log('   ⚠️  Algunos tests fallaron. Revisar la implementación.')
  }
  
  return { passed, total }
}

// Ejecutar tests
if (require.main === module) {
  runHybridSystemTests()
}

export { runHybridSystemTests }
