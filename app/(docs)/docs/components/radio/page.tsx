"use client"

import { DocExample } from '@/components/docs/doc-example'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Radio } from '@/components/ui/radio'
import { useState } from 'react'

export default function RadioComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Radio</h1>
        <p className='text-muted-foreground'>Botón de opción individual dentro de un grupo exclusivo.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo rápido</h2>
        <DocExample
          title='Uso básico'
            description='Grupo con tres opciones y estado controlado.'
            preview={<BasicRadioDemo />}
            code={`import { RadioGroup, Radio, RadioGroupItem } from '@teribit/ui-blocks'

export function Demo(){
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup value={value} onValueChange={setValue} className='flex flex-col gap-2'>
      <label className='flex items-center gap-2'>
        <Radio value='apple' id='apple' />
        <span>Apple</span>
      </label>
      <label className='flex items-center gap-2'>
        <RadioGroupItem value='orange' id='orange' />
        <span>Orange</span>
      </label>
      <label className='flex items-center gap-2 opacity-50'>
        <Radio value='banana' id='banana' disabled />
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
          description='Usa layout="inline" para disponer las opciones en línea.'
          preview={<InlineLayoutDemo />}
          code={`<RadioGroup layout='inline' defaultValue='a'>
  <label className='flex items-center gap-1'>
    <RadioGroupItem value='a' /> <span>A</span>
  </label>
  <label className='flex items-center gap-1'>
    <RadioGroupItem value='b' /> <span>B</span>
  </label>
  <label className='flex items-center gap-1'>
    <RadioGroupItem value='c' /> <span>C</span>
  </label>
</RadioGroup>`}
          variant='panel'
        />
        <DocExample
          title='Tamaños'
          description='Cuatro tamaños disponibles: sm, md, lg, xl.'
          preview={<SizesDemo />}
          code={`<div className='space-y-4'>
  <RadioGroup defaultValue='1'>
    <label className='flex items-center gap-2'>
      <RadioGroupItem size='sm' value='1' /> <span className='text-sm'>Small</span>
    </label>
  </RadioGroup>
  <RadioGroup defaultValue='2'>
    <label className='flex items-center gap-2'>
      <RadioGroupItem size='md' value='2' /> <span className='text-sm'>Medium</span>
    </label>
  </RadioGroup>
  <RadioGroup defaultValue='3'>
    <label className='flex items-center gap-2'>
      <RadioGroupItem size='lg' value='3' /> <span className='text-sm'>Large</span>
    </label>
  </RadioGroup>
  <RadioGroup defaultValue='4'>
    <label className='flex items-center gap-2'>
      <RadioGroupItem size='xl' value='4' /> <span className='text-sm'>X-Large</span>
    </label>
  </RadioGroup>
</div>`}
          variant='panel'
        />
      </section>
    </div>
  )
}

function BasicRadioDemo(){
  const [value, setValue] = useState('apple')
  return (
    <RadioGroup value={value} onValueChange={setValue} className='flex flex-col gap-2'>
      <label className='flex items-center gap-2'>
        <Radio value='apple' id='apple' />
        <span>Apple</span>
      </label>
      <label className='flex items-center gap-2'>
        <RadioGroupItem value='orange' id='orange' />
        <span>Orange</span>
      </label>
      <label className='flex items-center gap-2 opacity-50'>
        <Radio value='banana' id='banana' disabled />
        <span>Banana (disabled)</span>
      </label>
      <div className='text-xs text-muted-foreground'>Seleccionado: {value}</div>
    </RadioGroup>
  )
}

function InlineLayoutDemo(){
  return (
    <RadioGroup layout='inline' defaultValue='a'>
      <label className='flex items-center gap-1'>
        <RadioGroupItem value='a' /> <span>A</span>
      </label>
      <label className='flex items-center gap-1'>
        <RadioGroupItem value='b' /> <span>B</span>
      </label>
      <label className='flex items-center gap-1'>
        <RadioGroupItem value='c' /> <span>C</span>
      </label>
    </RadioGroup>
  )
}

function SizesDemo(){
  return (
    <div className='space-y-4'>
      <RadioGroup defaultValue='1'>
        <label className='flex items-center gap-2'>
          <RadioGroupItem size='sm' value='1' /> <span className='text-sm'>Small</span>
        </label>
      </RadioGroup>
      <RadioGroup defaultValue='2'>
        <label className='flex items-center gap-2'>
          <RadioGroupItem size='md' value='2' /> <span className='text-sm'>Medium</span>
        </label>
      </RadioGroup>
      <RadioGroup defaultValue='3'>
        <label className='flex items-center gap-2'>
          <RadioGroupItem size='lg' value='3' /> <span className='text-sm'>Large</span>
        </label>
      </RadioGroup>
      <RadioGroup defaultValue='4'>
        <label className='flex items-center gap-2'>
          <RadioGroupItem size='xl' value='4' /> <span className='text-sm'>X-Large</span>
        </label>
      </RadioGroup>
    </div>
  )
}
