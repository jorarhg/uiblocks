import { CodeBlock } from '@/components/docs/code-block'
import { Button } from '@/components/ui/button'

export default function ButtonComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Button</h1>
        <p className='text-muted-foreground'>Botón accesible con variantes, tamaños y estados themables.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplos</h2>
        <div className='flex flex-wrap gap-3'>
          <Button>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Uso</h2>
        <CodeBlock language='tsx' code={`import { Button } from '@teribit/ui-blocks'

export function Demo(){
  return <Button variant='secondary'>Acción</Button>
}`} />
      </section>
    </div>
  )
}
