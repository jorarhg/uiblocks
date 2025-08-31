import { CodeBlock } from '@/components/docs/code-block'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function SelectComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Select</h1>
        <p className='text-muted-foreground'>Selector desplegable para elegir una opción. Accesible y themable.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo</h2>
        <div className='max-w-sm'>
          <Select defaultValue='apple'>
            <SelectTrigger><SelectValue placeholder='Elige una fruta' /></SelectTrigger>
            <SelectContent>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='orange'>Orange</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Uso</h2>
        <CodeBlock language='tsx' code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@teribit/ui-blocks'

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
}`} />
      </section>
    </div>
  )
}
