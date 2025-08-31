import React from 'react'
import { Input } from '@/components/ui/input'

export default function InputDocs(){
  return (
    <div className='px-6 py-10 max-w-5xl mx-auto space-y-8'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Input</h1>
        <p className='text-muted-foreground text-sm mt-2'>Campo de texto controlado y accesible. Themable vía CSS vars.</p>
      </header>
      <section className='grid gap-4'>
        <div className='flex flex-col gap-3 max-w-sm'>
          <Input placeholder='Placeholder' />
          <Input disabled placeholder='Disabled' />
          <Input className='border-primary/50 focus-visible:ring-primary' placeholder='Custom Themed' />
        </div>
      </section>
    </div>
  )
}
