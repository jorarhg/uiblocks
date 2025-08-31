"use client"

import { DocExample } from '@/components/docs/doc-example'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function RadioGroupComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Radio Group</h1>
        <p className='text-muted-foreground'>Selección exclusiva de una opción dentro de un conjunto.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo rápido</h2>
        <DocExample
          title='Básico'
          description='Tres opciones con estado controlado.'
          preview={<ControlledRadioDemo />}
          code={`import { RadioGroup, RadioGroupItem } from '@teribit/ui-blocks'
import { useState } from 'react'

export function Demo(){
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup value={value} onValueChange={setValue} className='flex flex-col gap-2'>
      <label className='flex items-center gap-2'>
        <RadioGroupItem value='apple' id='apple' />
        <span>Apple</span>
      </label>
      <label className='flex items-center gap-2'>
        <RadioGroupItem value='orange' id='orange' />
        <span>Orange</span>
      </label>
      <label className='flex items-center gap-2 opacity-50'>
        <RadioGroupItem value='banana' id='banana' disabled />
        <span>Banana (disabled)</span>
      </label>
      <div className='text-xs text-muted-foreground'>Seleccionado: {value}</div>
    </RadioGroup>
  )
}`}
          variant='panel'
        />
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Variantes</h2>
        <DocExample
          title='Layout inline'
          description='Usa layout="inline" para colocar los radios horizontalmente.'
          preview={<InlineDemo />}
    code={`<RadioGroup layout='inline' defaultValue='opt1'>
  <label className='flex items-center gap-1'><RadioGroupItem value='opt1' /> <span>Opción 1</span></label>
  <label className='flex items-center gap-1'><RadioGroupItem value='opt2' /> <span>Opción 2</span></label>
  <label className='flex items-center gap-1'><RadioGroupItem value='opt3' /> <span>Opción 3</span></label>
</RadioGroup>`}
          variant='panel'
        />
        <DocExample
          title='Tamaños'
          description='Cuatro tamaños: sm, md, lg, xl.'
          preview={<SizesShowcase />}
          code={`<div className='space-y-3'>
  <RadioGroup defaultValue='1'>
    <label className='flex items-center gap-2'><RadioGroupItem size='sm' value='1' /> <span className='text-sm'>Small</span></label>
  </RadioGroup>
  <RadioGroup defaultValue='2'>
    <label className='flex items-center gap-2'><RadioGroupItem size='md' value='2' /> <span className='text-sm'>Medium</span></label>
  </RadioGroup>
  <RadioGroup defaultValue='3'>
    <label className='flex items-center gap-2'><RadioGroupItem size='lg' value='3' /> <span className='text-sm'>Large</span></label>
  </RadioGroup>
  <RadioGroup defaultValue='4'>
    <label className='flex items-center gap-2'><RadioGroupItem size='xl' value='4' /> <span className='text-sm'>X-Large</span></label>
  </RadioGroup>
</div>`}
          variant='panel'
        />
      </section>
    </div>
  )
}

function ControlledRadioDemo(){
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup value={value} onValueChange={setValue} className='flex flex-col gap-2'>
      <Label className='flex items-center gap-2'>
        <RadioGroupItem value='apple' id='apple' />
        <span>Apple</span>
      </Label>
      <Label className='flex items-center gap-2'>
        <RadioGroupItem value='orange' id='orange' />
        <span>Orange</span>
      </Label>
      <Label className='flex items-center gap-2 opacity-50'>
        <RadioGroupItem value='banana' id='banana' disabled />
        <span>Banana (disabled)</span>
      </Label>
      <div className='text-xs text-muted-foreground'>Seleccionado: {value}</div>
    </RadioGroup>
  )
}

function InlineDemo(){
  return (
    <RadioGroup layout='inline' defaultValue='opt1'>
      <label className='flex items-center gap-1'><RadioGroupItem value='opt1' /> <span>Opción 1</span></label>
      <label className='flex items-center gap-1'><RadioGroupItem value='opt2' /> <span>Opción 2</span></label>
      <label className='flex items-center gap-1'><RadioGroupItem value='opt3' /> <span>Opción 3</span></label>
    </RadioGroup>
  )
}

function SizesShowcase(){
  return (
    <div className='space-y-3'>
      <RadioGroup defaultValue='1'>
        <label className='flex items-center gap-2'><RadioGroupItem size='sm' value='1' /> <span className='text-sm'>Small</span></label>
      </RadioGroup>
      <RadioGroup defaultValue='2'>
        <label className='flex items-center gap-2'><RadioGroupItem size='md' value='2' /> <span className='text-sm'>Medium</span></label>
      </RadioGroup>
      <RadioGroup defaultValue='3'>
        <label className='flex items-center gap-2'><RadioGroupItem size='lg' value='3' /> <span className='text-sm'>Large</span></label>
      </RadioGroup>
      <RadioGroup defaultValue='4'>
        <label className='flex items-center gap-2'><RadioGroupItem size='xl' value='4' /> <span className='text-sm'>X-Large</span></label>
      </RadioGroup>
    </div>
  )
}