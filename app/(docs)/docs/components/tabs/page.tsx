"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function TabsComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Tabs</h1>
        <p className='text-muted-foreground'>Navegación horizontal entre vistas relacionadas.</p>
      </header>
      <DocExample
        title='Básico'
        description='Tres tabs con contenido.'
        preview={<Tabs defaultValue='a' className='w-full max-w-md'>
          <TabsList>
            <TabsTrigger value='a'>Resumen</TabsTrigger>
            <TabsTrigger value='b'>Detalles</TabsTrigger>
            <TabsTrigger value='c'>Historial</TabsTrigger>
          </TabsList>
          <TabsContent value='a' className='p-4 border rounded-md bg-background'>Contenido A</TabsContent>
          <TabsContent value='b' className='p-4 border rounded-md bg-background'>Contenido B</TabsContent>
          <TabsContent value='c' className='p-4 border rounded-md bg-background'>Contenido C</TabsContent>
        </Tabs>}
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@teribit/ui-blocks'

export function Demo(){
  return (
    <Tabs defaultValue='a'>
      <TabsList>
        <TabsTrigger value='a'>A</TabsTrigger>
        <TabsTrigger value='b'>B</TabsTrigger>
      </TabsList>
      <TabsContent value='a'>Contenido A</TabsContent>
      <TabsContent value='b'>Contenido B</TabsContent>
    </Tabs>
  )
}`}
        variant='panel'
      />
    </div>
  )
}
