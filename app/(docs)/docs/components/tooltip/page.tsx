"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export default function TooltipComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Tooltip</h1>
        <p className='text-muted-foreground'>Etiqueta flotante para sugerencias breves.</p>
      </header>
      <DocExample
        title='Básico'
        description='Tooltip mostrando información contextual.'
        preview={<TooltipProvider><Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline'>Hover</Button>
          </TooltipTrigger>
          <TooltipContent>Información adicional</TooltipContent>
        </Tooltip></TooltipProvider>}
        code={`import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><button>Hover</button></TooltipTrigger>
        <TooltipContent>Info</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`}
        variant='panel'
      />
    </div>
  )
}
