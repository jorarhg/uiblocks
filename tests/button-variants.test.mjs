#!/usr/bin/env node
// Verifica que las variantes extendidas de Button generan clases no vacías y distintas.
import assert from 'node:assert'
import { buttonVariants } from '@teribit/ui-blocks'

const variants = ['default','destructive','outline','secondary','ghost','link','dashed','input','badge','circle','full']
const sizes = ['default','sm','lg','icon','circle','xs','input']

for (const v of variants){
  const cls = buttonVariants({ variant: v })
  assert.ok(typeof cls === 'string' && cls.length>0, `Clase vacía para variant=${v}`)
}

for (const s of sizes){
  const cls = buttonVariants({ size: s })
  assert.ok(typeof cls === 'string' && cls.length>0, `Clase vacía para size=${s}`)
}

// Comprobar que al menos dos variantes producen clases diferentes
const clsDefault = buttonVariants({ variant:'default' })
const clsDashed = buttonVariants({ variant:'dashed' })
assert.notStrictEqual(clsDefault, clsDashed, 'default y dashed deberían diferir')

console.log('✅ buttonVariants extended test OK')
