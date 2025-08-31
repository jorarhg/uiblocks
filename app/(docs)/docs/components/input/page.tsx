import { DocExample } from '@/components/docs/doc-example'
import { Input } from '@/components/ui/input'
import { PropsTable } from '@/components/docs/props-table'

export default function InputComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Input</h1>
        <p className='text-muted-foreground'>Campo de texto controlado y accesible con soporte de theming.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo rápido</h2>
        <DocExample
          title='Variantes básicas'
          description='Estados normales, deshabilitado y personalizado.'
          preview={<div className='flex flex-col gap-3 max-w-sm'>
            <Input placeholder='Placeholder' />
            <Input disabled placeholder='Disabled' />
            <Input className='border-primary/50 focus-visible:ring-primary' placeholder='Custom Themed' />
          </div>}
          code={`import { Input } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <div className='flex flex-col gap-3 max-w-sm'>
      <Input placeholder='Placeholder' />
      <Input disabled placeholder='Disabled' />
      <Input className='border-primary/50 focus-visible:ring-primary' placeholder='Custom Themed' />
    </div>
  )
}`}
          variant='panel'
        />
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>API</h2>
        <h3 className='font-medium text-sm'>Props</h3>
        <PropsTable component='Input' />
        <h3 className='font-medium text-sm pt-4'>Eventos</h3>
        <PropsTable component='Input' eventsOnly />
      </section>
    </div>
  )
}
