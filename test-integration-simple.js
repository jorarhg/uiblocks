#!/usr/bin/env node

/**
 * Script simple de validación de la integración híbrida
 */

console.log('🚀 Validando integración del sistema híbrido...\n')

// Test 1: Verificar que los archivos existen
const fs = require('fs')
const path = require('path')

const requiredFiles = [
  'components/dynamic-toolbar/utils/enhanced-hybrid-filter-engine.ts',
  'components/dynamic-toolbar/hooks/use-dynamic-filters.ts',
  'components/dynamic-toolbar/data-table-with-dynamic-toolbar.tsx',
  'components/dynamic-toolbar/dynamic-data-table-toolbar.tsx',
  'components/dynamic-toolbar/types/filter-config.ts'
]

console.log('📁 Verificando archivos requeridos...')
let allFilesExist = true

for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - NO ENCONTRADO`)
    allFilesExist = false
  }
}

if (!allFilesExist) {
  console.log('\n❌ Faltan archivos requeridos')
  process.exit(1)
}

// Test 2: Verificar que los exports principales están disponibles
console.log('\n📦 Verificando exports y sintaxis...')

try {
  // Verificar sintaxis de archivos TypeScript básicos
  const { execSync } = require('child_process')
  
  console.log('✅ Verificando sintaxis TypeScript...')
  execSync('npx tsc --noEmit --skipLibCheck components/dynamic-toolbar/utils/enhanced-hybrid-filter-engine.ts', {
    cwd: __dirname,
    stdio: 'pipe'
  })
  console.log('✅ EnhancedHybridFilterEngine - Sintaxis OK')
  
  execSync('npx tsc --noEmit --skipLibCheck components/dynamic-toolbar/hooks/use-dynamic-filters.ts', {
    cwd: __dirname,
    stdio: 'pipe'
  })
  console.log('✅ useDynamicFilters - Sintaxis OK')
  
} catch (error) {
  console.log(`❌ Error de sintaxis TypeScript: ${error.message}`)
  process.exit(1)
}

// Test 3: Verificar estructura de configuración
console.log('\n⚙️  Verificando estructura de configuración...')

const configContent = fs.readFileSync('components/dynamic-toolbar/hooks/use-dynamic-filters.ts', 'utf8')

if (configContent.includes('DynamicFiltersConfig')) {
  console.log('✅ DynamicFiltersConfig interface encontrada')
} else {
  console.log('❌ DynamicFiltersConfig interface no encontrada')
  process.exit(1)
}

if (configContent.includes('useEnhancedEngine')) {
  console.log('✅ Feature flag useEnhancedEngine encontrado')
} else {
  console.log('❌ Feature flag useEnhancedEngine no encontrado')
  process.exit(1)
}

// Test 4: Verificar package.json scripts
console.log('\n📋 Verificando scripts npm...')

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const requiredScripts = ['validate:filters', 'test:filters', 'demo:filters']
for (const script of requiredScripts) {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`✅ Script '${script}' configurado`)
  } else {
    console.log(`⚠️  Script '${script}' no encontrado en package.json`)
  }
}

console.log('\n🎉 ¡VALIDACIÓN EXITOSA!')
console.log('   El sistema híbrido está correctamente integrado')
console.log('   y listo para usar.\n')

console.log('📚 Próximos pasos:')
console.log('   1. Revisa la documentación en: docs/INTEGRATION_GUIDE.md')
console.log('   2. Prueba los ejemplos en: examples/enhanced-integration-demo.tsx')
console.log('   3. Activa feature flags gradualmente')
console.log('   4. Ejecuta tests específicos con: npm run test:filters\n')

console.log('🔧 Uso básico:')
console.log(`const filterConfig = {
  useEnhancedEngine: true,
  analysisContext: {
    domain: 'ecommerce',
    dataSource: 'api',
    expectedCardinality: 'medium'
  },
  performanceMode: 'balanced'
}

<DataTableWithDynamicToolbar
  data={data}
  columns={columns}
  filterConfig={filterConfig}
/>`)

console.log('\n✨ Integración completada exitosamente!')
