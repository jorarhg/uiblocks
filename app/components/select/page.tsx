import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function SelectDocs(){
  return (
    <div className='px-6 py-10 max-w-5xl mx-auto space-y-8'>
      <header>
        <h1 className='text-2xl font-semibold tracking-tight'>Select</h1>
        <p className='text-muted-foreground text-sm mt-2'>Lista desplegable para selección única. Themable y con soporte de teclado.</p>
      </header>
      <section className='grid gap-4 max-w-sm'>
        <Select defaultValue='apple'>
          <SelectTrigger>
            <SelectValue placeholder='Elige una fruta' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='orange'>Orange</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
          </SelectContent>
        </Select>
      </section>
    </div>
  )
}
