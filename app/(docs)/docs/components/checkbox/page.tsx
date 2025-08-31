"use client"

import { DocExample } from '@/components/docs/doc-example'
import { Checkbox } from '@/components/ui/checkbox'
import { PropsTable } from '@/components/docs/props-table'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function CheckboxComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Checkbox</h1>
        <p className='text-muted-foreground'>Control para selección booleana. Accesible y estilable.</p>
      </header>
  <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo rápido</h2>
        <DocExample
          title='Básico'
          description='Estados checked y disabled.'
          preview={<div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Checkbox id='terms' />
              <Label htmlFor='terms'>Aceptar términos</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='disabled' disabled />
              <Label htmlFor='disabled' className='text-muted-foreground'>Deshabilitado</Label>
            </div>
            <ControlledCheckboxDemo />
          </div>}
          code={`import { Checkbox } from '@teribit/ui-blocks'
import { useState } from 'react'

export function Demo(){
  const [checked, setChecked] = useState(false)
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id='demo' checked={checked} onCheckedChange={v => setChecked(!!v)} />
      <label htmlFor='demo' className='text-sm select-none'>Valor: {String(checked)}</label>
    </div>
  )
}`}
          variant='panel'
        />
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Variantes de icono</h2>
        <DocExample
          title='Iconos'
          description='Puedes cambiar el símbolo interno.'
          preview={<div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Checkbox id='v-check' iconVariant='check' defaultChecked />
              <Label htmlFor='v-check'>Check (default)</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='v-cross' iconVariant='cross' defaultChecked />
              <Label htmlFor='v-cross'>Cruz</Label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='v-fill' iconVariant='fill' defaultChecked />
              <Label htmlFor='v-fill'>Cuadro relleno</Label>
            </div>
          </div>}
          code={`<Checkbox iconVariant='check' defaultChecked />
<Checkbox iconVariant='cross' defaultChecked />
<Checkbox iconVariant='fill' defaultChecked />`}
          variant='panel'
        />
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>API</h2>
        <h3 className='font-medium text-sm'>Props</h3>
        <PropsTable component='Checkbox' />
        <h3 className='font-medium text-sm pt-4'>Eventos</h3>
        <PropsTable component='Checkbox' eventsOnly />
      </section>
    </div>
  )
}

function ControlledCheckboxDemo(){
  const [checked, setChecked] = useState(false)
  return (
    <div className='flex items-center gap-2'>
      <Checkbox id='c-demo' checked={checked} onCheckedChange={v => setChecked(!!v)} />
      <Label htmlFor='c-demo' className='text-sm select-none'>Valor: {String(checked)}</Label>
    </div>
  )
}