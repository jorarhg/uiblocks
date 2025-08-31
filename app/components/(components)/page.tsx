import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ComponentItem { id: string; name: string; href: string; description: string; category: string; preview?: React.ReactNode }

const componentsList: ComponentItem[] = [
  { id:'button', name:'Button', href:'/components/button', description:'Variantes y tamaños', category:'Inputs' },
  { id:'input', name:'Input', href:'/components/input', description:'Campos de texto', category:'Inputs' },
  { id:'select', name:'Select', href:'/components/select', description:'Lista desplegable', category:'Inputs' },
  { id:'checkbox', name:'Checkbox', href:'/components/checkbox', description:'Casillas de verificación', category:'Inputs' },
  { id:'radio', name:'Radio Group', href:'/components/radio-group', description:'Selección única', category:'Inputs' },
  { id:'switch', name:'Switch', href:'/components/switch', description:'Toggle accesible', category:'Inputs' },
  { id:'badge', name:'Badge', href:'/components/badge', description:'Etiquetas de estado', category:'Display' },
  { id:'card', name:'Card', href:'/components/card', description:'Contenedor con header/body', category:'Layout' },
  { id:'tabs', name:'Tabs', href:'/components/tabs', description:'Navegación segmentada', category:'Navigation' },
  { id:'dialog', name:'Dialog', href:'/components/dialog', description:'Modales accesibles', category:'Overlay' },
  { id:'dropdown-menu', name:'Dropdown', href:'/components/dropdown-menu', description:'Menús contextuales', category:'Navigation' },
  { id:'tooltip', name:'Tooltip', href:'/components/tooltip', description:'Ayuda contextual', category:'Overlay' },
]

const groups = Array.from(new Map(componentsList.map(i=>[i.category, null])).keys())

export default function ComponentsLibraryPage(){
  return (
    <div className='px-6 py-10 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-10'>
        <div className='space-y-4 flex-1'>
          <h1 className='text-3xl font-semibold tracking-tight'>Componentes</h1>
          <p className='text-muted-foreground max-w-2xl text-sm'>Colección de componentes base construidos sobre primitivas accesibles. Cada pieza es themable usando variables CSS y clases utilitarias.</p>
          <div className='flex flex-wrap gap-2 pt-2'>
            {groups.map(g=> <span key={g} className='text-[10px] rounded bg-muted px-2 py-1 tracking-wide uppercase text-muted-foreground'>{g}</span>)}
          </div>
        </div>
        <div className='flex gap-2'>
          <Link href='/docs/installation' className={cn(buttonVariants({ size:'sm' }))}>Instalar</Link>
          <Link href='/blocks' className={cn(buttonVariants({ variant:'outline', size:'sm' }))}>Ver Blocks</Link>
        </div>
      </div>
      <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
        {componentsList.map(c=> (
          <Link key={c.id} href={c.href} className='group relative rounded-xl border p-5 bg-gradient-to-b from-background to-muted/40 hover:shadow-sm transition flex flex-col'>
            <div className='mb-4 h-28 w-full rounded-md bg-linear-to-br from-muted/80 to-muted/40 flex items-center justify-center text-[10px] text-muted-foreground font-mono tracking-wide'>
              {c.name}
            </div>
            <div className='space-y-1'>
              <h2 className='font-medium tracking-tight group-hover:text-foreground flex items-center gap-2'>
                {c.name}
                <span className='text-[9px] font-medium rounded border px-1.5 py-0.5 text-muted-foreground group-hover:border-foreground/40'>THEMABLE</span>
              </h2>
              <p className='text-[11px] leading-relaxed text-muted-foreground'>{c.description}</p>
            </div>
            <span className='absolute inset-0 rounded-xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition pointer-events-none' />
          </Link>
        ))}
      </div>
    </div>
  )
}
