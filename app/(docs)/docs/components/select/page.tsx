import { DocExample } from '@/components/docs/doc-example'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { PropsTable } from '@/components/docs/props-table'

export default function SelectComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Select</h1>
        <p className='text-muted-foreground'>Selector desplegable para elegir una opción. Accesible y themable.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo rápido</h2>
        <DocExample
          title='Uso básico'
          description='Select controlado por Radix con items accesibles.'
          preview={<div className='max-w-sm'>
            <Select defaultValue='apple'>
              <SelectTrigger><SelectValue placeholder='Elige una fruta' /></SelectTrigger>
              <SelectContent>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='orange'>Orange</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
              </SelectContent>
            </Select>
          </div>}
          code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <Select defaultValue='apple'>
      <SelectTrigger><SelectValue placeholder='Elige una fruta' /></SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='orange'>Orange</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
          variant='panel'
        />
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>API</h2>
        <h3 className='font-medium text-sm'>Props (Root)</h3>
        <PropsTable component='Select' />
        <h3 className='font-medium text-sm pt-4'>Eventos</h3>
        <PropsTable component='Select' eventsOnly />
      </section>
    </div>
  )
}
