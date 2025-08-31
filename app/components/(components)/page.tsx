import React from 'react'
import Link from 'next/link'

// Página base de librería de componentes (placeholder inicial)
export default function ComponentsLibraryPage(){
  return (
    <div className='px-6 py-10 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-semibold tracking-tight mb-4'>Componentes</h1>
      <p className='text-muted-foreground mb-8 max-w-2xl text-sm'>Colección de componentes básicos y themables. (En construcción)</p>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <Link href='#' className='group rounded-xl border p-5 hover:shadow-sm transition bg-gradient-to-b from-background to-muted/30'>
          <div className='mb-3 h-32 w-full rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground'>Preview</div>
          <div className='space-y-1'>
            <h2 className='font-medium tracking-tight group-hover:text-foreground'>Botón</h2>
            <p className='text-[11px] text-muted-foreground leading-relaxed'>Variantes, tamaños y estados.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
