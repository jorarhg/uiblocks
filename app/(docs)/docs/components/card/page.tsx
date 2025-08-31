"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CardComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Card</h1>
        <p className='text-muted-foreground'>Contenedor para agrupar contenido relacionado.</p>
      </header>
      <DocExample
        title='Estructura'
        description='Header, contenido y footer.'
        preview={<Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle>Plan Pro</CardTitle>
            <CardDescription>Funcionalidades avanzadas</CardDescription>
          </CardHeader>
            <CardContent>
            <ul className='text-sm list-disc pl-4 space-y-1'>
              <li>Hasta 10 proyectos</li>
              <li>Analíticas básicas</li>
              <li>Soporte prioritario</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button leftIcon={undefined}>Actualizar</Button>
          </CardFooter>
        </Card>}
        code={`import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título</CardTitle>
        <CardDescription>Descripción</CardDescription>
      </CardHeader>
      <CardContent>Contenido</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  )
}`}
        variant='panel'
      />
    </div>
  )
}
