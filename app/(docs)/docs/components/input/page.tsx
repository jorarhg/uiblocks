import { CodeBlock } from '@/components/docs/code-block'
import { Input } from '@/components/ui/input'

export default function InputComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Input</h1>
        <p className='text-muted-foreground'>Campo de texto controlado y accesible con soporte de theming.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplos</h2>
        <div className='flex flex-col gap-3 max-w-sm'>
          <Input placeholder='Placeholder' />
          <Input disabled placeholder='Disabled' />
          <Input className='border-primary/50 focus-visible:ring-primary' placeholder='Custom Themed' />
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Uso</h2>
        <CodeBlock language='tsx' code={`import { Input } from '@teribit/ui-blocks'

export function Demo(){
  return <Input placeholder='Nombre' />
}`} />
      </section>
    </div>
  )
}
