"use client"
import { DocExample } from '@/components/docs/doc-example'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export default function DropdownMenuComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Dropdown Menu</h1>
        <p className='text-muted-foreground'>Menú contextual para acciones.</p>
      </header>
      <DocExample
        title='Básico'
        description='Disparo de menú con opciones.'
        preview={<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Acciones</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive'>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
        code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><button>Más</button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Acción</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
        variant='panel'
      />
    </div>
  )
}
