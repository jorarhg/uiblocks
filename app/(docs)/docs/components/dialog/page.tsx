"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function DialogComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Dialog</h1>
        <p className='text-muted-foreground'>Superposición modal para interacción enfocada.</p>
      </header>
      <DocExample
        title='Básico'
        description='Apertura y cierre con botones.'
        preview={<Dialog>
          <DialogTrigger asChild>
            <Button>Abrir diálogo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar acción</DialogTitle>
              <DialogDescription>Esto no se puede deshacer.</DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex justify-end gap-2'>
              <DialogClose asChild>
                <Button variant='ghost'>Cancelar</Button>
              </DialogClose>
              <Button variant='destructive'>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>}
        code={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <Dialog>
      <DialogTrigger asChild><button>Abrir</button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Título</DialogTitle>
          <DialogDescription>Descripción</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><button>OK</button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
        variant='panel'
      />
    </div>
  )
}
