"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Badge } from '@/components/ui/badge'

export default function BadgeComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Badge</h1>
        <p className='text-muted-foreground'>Etiqueta pequeña para resaltar estados o conteos.</p>
      </header>
      <DocExample
        title='Variantes'
        description='Diferentes estilos básicos.'
        preview={<div className='flex flex-wrap gap-3'>
          <Badge>Default</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='destructive'>Destructive</Badge>
          <Badge variant='outline'>Outline</Badge>
        </div>}
        code={`import { Badge } from '@teribit/ui-blocks'

export function Demo(){
  return <Badge variant='secondary'>Etiqueta</Badge>
}`}
        variant='panel'
      />
    </div>
  )
}
