#!/usr/bin/env node
// Test básico: asegurar que el paquete local '@teribit/ui-blocks' se resuelve y exporta piezas clave

import assert from 'node:assert'

console.log('🔍 Verificando import de @teribit/ui-blocks ...')

let pkg
try {
  pkg = await import('@teribit/ui-blocks')
  console.log('✅ Import realizado')
} catch (err) {
  console.error('❌ No se pudo importar @teribit/ui-blocks:', err.message)
  process.exit(1)
}

// Campos/exports mínimos esperados (ajustar si evoluciona API pública)
const expected = [
  'DataTable',
  'defaultActions',
  'createActionsColumn',
]

for (const key of expected) {
  assert.ok(key in pkg, `Export faltante: ${key}`)
  console.log(`✅ Export '${key}' presente`)
}

// Smoke render (sin ReactDOM) comprobando que DataTable es función/componente
assert.equal(typeof pkg.DataTable, 'function', 'DataTable debe ser una función/componente')
console.log('✅ DataTable es función')

console.log('\n🎉 Test de importación @teribit/ui-blocks OK')
