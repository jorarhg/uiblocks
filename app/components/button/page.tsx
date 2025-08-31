import React from 'react'
import { Button } from '@/components/ui/button'

export default function ButtonDocs(){
  return (
    <div className='px-6 py-10 max-w-5xl mx-auto space-y-8'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Button</h1>
        <p className='text-muted-foreground text-sm mt-2'>Botones accesibles con variantes y tamaños. Totalmente themable vía CSS vars.</p>
      </header>
      <section className='grid gap-4'>
        <div className='flex flex-wrap gap-3'>
          <Button>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </div>
  )
}
