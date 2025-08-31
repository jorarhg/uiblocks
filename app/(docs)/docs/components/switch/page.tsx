"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

export default function SwitchComponentDoc(){
  const [checked, setChecked] = useState(false)
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Switch</h1>
        <p className='text-muted-foreground'>Interruptor para activar o desactivar un estado.</p>
      </header>
      <DocExample
        title='Básico'
        description='Estado controlado y deshabilitado.'
        preview={<div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Switch checked={checked} onCheckedChange={setChecked} id='s1' />
            <label htmlFor='s1' className='text-sm select-none'>Valor: {String(checked)}</label>
          </div>
          <div className='flex items-center gap-2 opacity-60'>
            <Switch disabled />
            <span className='text-sm'>Disabled</span>
          </div>
        </div>}
        code={`import { Switch } from '@teribit/ui-blocks'
import { useState } from 'react'

export function Demo(){
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onCheckedChange={setChecked} />
}`}
        variant='panel'
      />
    </div>
  )
}
