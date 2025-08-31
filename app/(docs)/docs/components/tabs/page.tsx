"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PropsTable } from '@/components/docs/props-table'
import { Home, Settings, Bell } from 'lucide-react'
import { CollapsibleSidebarTabs } from '@/components/ui/collapsible-sidebar-tabs'
import { cn } from '@/lib/utils'

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

      <DocExample
        title='Variants de Lista'
        description='Cambia el contenedor con variant y justify.'
        preview={<div className='space-y-6'>
          <Tabs defaultValue='a' className='w-full max-w-md'>
            <TabsList variant='default' justify='start'>
              <TabsTrigger value='a'>Default</TabsTrigger>
              <TabsTrigger value='b'>Otro</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue='a' className='w-full max-w-md'>
            <TabsList variant='ghost' justify='center'>
              <TabsTrigger value='a'>Ghost</TabsTrigger>
              <TabsTrigger value='b'>Center</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue='a' className='w-full max-w-md'>
            <TabsList variant='outline' justify='between' fullWidth>
              <TabsTrigger value='a'>Outline</TabsTrigger>
              <TabsTrigger value='b'>Between</TabsTrigger>
              <TabsTrigger value='c'>Full</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>}
        code={`<Tabs defaultValue='a'>
  <TabsList variant='default' justify='start'>
    <TabsTrigger value='a'>Default</TabsTrigger>
    <TabsTrigger value='b'>Otro</TabsTrigger>
  </TabsList>
</Tabs>
<Tabs defaultValue='a'>
  <TabsList variant='ghost' justify='center'>
    <TabsTrigger value='a'>Ghost</TabsTrigger>
    <TabsTrigger value='b'>Center</TabsTrigger>
  </TabsList>
</Tabs>
<Tabs defaultValue='a'>
  <TabsList variant='outline' justify='between' fullWidth>
    <TabsTrigger value='a'>Outline</TabsTrigger>
    <TabsTrigger value='b'>Between</TabsTrigger>
    <TabsTrigger value='c'>Full</TabsTrigger>
  </TabsList>
</Tabs>`}
        variant='panel'
      />

      <DocExample
        title='Variants de Trigger'
        description='Formas y tamaños de los triggers.'
        preview={<div className='space-y-6'>
          <Tabs defaultValue='a' className='w-full max-w-md'>
            <TabsList>
              <TabsTrigger value='a' variant='default' size='sm'>Default sm</TabsTrigger>
              <TabsTrigger value='b' variant='default' size='md'>Default md</TabsTrigger>
              <TabsTrigger value='c' variant='default' size='lg'>Default lg</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue='a' className='w-full max-w-md'>
            <TabsList variant='ghost'>
              <TabsTrigger value='a' variant='underline'>Underline</TabsTrigger>
              <TabsTrigger value='b' variant='underline'>Perfil</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue='a' className='w-full max-w-md'>
            <TabsList>
              <TabsTrigger value='a' variant='pill'>Pill A</TabsTrigger>
              <TabsTrigger value='b' variant='pill'>Pill B</TabsTrigger>
              <TabsTrigger value='c' variant='pill'>Pill C</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>}
        code={`<Tabs defaultValue='a'>
  <TabsList>
    <TabsTrigger value='a' variant='default' size='sm'>Default sm</TabsTrigger>
    <TabsTrigger value='b' variant='default' size='md'>Default md</TabsTrigger>
    <TabsTrigger value='c' variant='default' size='lg'>Default lg</TabsTrigger>
  </TabsList>
</Tabs>
<Tabs defaultValue='a'>
  <TabsList variant='ghost'>
    <TabsTrigger value='a' variant='underline'>Underline</TabsTrigger>
    <TabsTrigger value='b' variant='underline'>Perfil</TabsTrigger>
  </TabsList>
</Tabs>
<Tabs defaultValue='a'>
  <TabsList>
    <TabsTrigger value='a' variant='pill'>Pill A</TabsTrigger>
    <TabsTrigger value='b' variant='pill'>Pill B</TabsTrigger>
    <TabsTrigger value='c' variant='pill'>Pill C</TabsTrigger>
  </TabsList>
</Tabs>`}
        variant='panel'
      />

      <DocExample
        title='Con íconos'
        description='Triggers que combinan ícono y etiqueta.'
        preview={<Tabs defaultValue='home' className='w-full max-w-md'>
          <TabsList>
            <TabsTrigger value='home'><Home className='h-4 w-4 mr-1' /> Home</TabsTrigger>
            <TabsTrigger value='alerts'><Bell className='h-4 w-4 mr-1' /> Alertas</TabsTrigger>
            <TabsTrigger value='settings'><Settings className='h-4 w-4 mr-1' /> Ajustes</TabsTrigger>
          </TabsList>
          <TabsContent value='home' className='p-4 border rounded-md bg-background'>Inicio</TabsContent>
          <TabsContent value='alerts' className='p-4 border rounded-md bg-background'>Alertas</TabsContent>
          <TabsContent value='settings' className='p-4 border rounded-md bg-background'>Configuración</TabsContent>
        </Tabs>}
        code={`<Tabs defaultValue='home'>
  <TabsList>
    <TabsTrigger value='home'><Home className='h-4 w-4 mr-1' /> Home</TabsTrigger>
    <TabsTrigger value='alerts'><Bell className='h-4 w-4 mr-1' /> Alertas</TabsTrigger>
    <TabsTrigger value='settings'><Settings className='h-4 w-4 mr-1' /> Ajustes</TabsTrigger>
  </TabsList>
</Tabs>`}
        variant='panel'
      />

      <DocExample
        title='Vertical con íconos'
        description='Usando orientation="vertical" y triggers con ícono.'
        preview={<div className='w-full max-w-3xl'>
          <Tabs defaultValue='home' className='flex w-full rounded-md border overflow-hidden' orientation='vertical'>
            <TabsList variant='ghost' className='shrink-0 border-r p-0 data-[orientation=vertical]:p-0'>
              <TabsTrigger value='home' className='justify-start w-48 px-5 py-3 hover:bg-muted/60 data-[state=active]:bg-muted/80'>
                <Home className='h-4 w-4 mr-2' /> Home
              </TabsTrigger>
              <TabsTrigger value='alerts' className='justify-start w-48 px-5 py-3 hover:bg-muted/60 data-[state=active]:bg-muted/80'>
                <Bell className='h-4 w-4 mr-2' /> Alertas
              </TabsTrigger>
              <TabsTrigger value='settings' className='justify-start w-48 px-5 py-3 hover:bg-muted/60 data-[state=active]:bg-muted/80'>
                <Settings className='h-4 w-4 mr-2' /> Ajustes
              </TabsTrigger>
            </TabsList>
            <div className='flex-1 bg-background'>
              <TabsContent value='home' className='p-6 h-full'>Panel principal</TabsContent>
              <TabsContent value='alerts' className='p-6 h-full'>Listado de alertas</TabsContent>
              <TabsContent value='settings' className='p-6 h-full'>Preferencias del usuario</TabsContent>
            </div>
          </Tabs>
        </div>}
        code={`<Tabs defaultValue='home' orientation='vertical' className='flex w-full rounded-md border overflow-hidden'>
  <TabsList variant='ghost' className='border-r p-0'>
    <TabsTrigger value='home' className='justify-start w-48 px-5 py-3 hover:bg-muted/60 data-[state=active]:bg-muted/80'>
      <Home className='h-4 w-4 mr-2' /> Home
    </TabsTrigger>
    <TabsTrigger value='alerts' className='justify-start w-48 px-5 py-3 hover:bg-muted/60 data-[state=active]:bg-muted/80'>
      <Bell className='h-4 w-4 mr-2' /> Alertas
    </TabsTrigger>
    <TabsTrigger value='settings' className='justify-start w-48 px-5 py-3 hover:bg-muted/60 data-[state=active]:bg-muted/80'>
      <Settings className='h-4 w-4 mr-2' /> Ajustes
    </TabsTrigger>
  </TabsList>
  <div className='flex-1 bg-background'>
    <TabsContent value='home' className='p-6'>Panel principal</TabsContent>
    <TabsContent value='alerts' className='p-6'>Listado de alertas</TabsContent>
    <TabsContent value='settings' className='p-6'>Preferencias del usuario</TabsContent>
  </div>
</Tabs>`}
        variant='panel'
      />

      <DocExample
          title='Colapsable (sidebar mini)'
          description='Barra vertical que colapsa a sólo íconos y expande con un toggle.'
          preview={<CollapsibleTabsDemo />}
          code={`<CollapsibleSidebarTabs variant='icon' items={[{value:'home',label:'Home',icon:<Home className='h-5 w-5'/>},{value:'alerts',label:'Alertas',icon:<Bell className='h-5 w-5'/>},{value:'settings',label:'Ajustes',icon:<Settings className='h-5 w-5'/>}]} />`}
        variant='panel'
      />

      <DocExample
          title='Vertical numérica colapsable'
          description='Secciones numeradas que expanden sub-tabs.'
          preview={<CollapsibleNumberTabsDemo />}
          code={`<CollapsibleSidebarTabs variant='number' items={[{value:'one',label:'Tab 1'},{value:'two',label:'Tab 2'},{value:'three',label:'Tab 3'}]} />`}
        variant='panel'
      />

      <section className='pt-4 space-y-4'>
        <h3 className='text-sm font-medium'>Root</h3>
        <PropsTable component='Tabs' />
        <h3 className='text-sm font-medium pt-4'>TabsList</h3>
        <PropsTable component='TabsList' />
        <h3 className='text-sm font-medium pt-4'>TabsTrigger</h3>
        <PropsTable component='TabsTrigger' />
      </section>
    </div>
  )
}

function CollapsibleTabsDemo(){
  return <CollapsibleSidebarTabs variant='icon' items={[
    { value:'home', label:'Home', icon:<Home className='h-5 w-5' />, content:'Panel principal' },
    { value:'alerts', label:'Alertas', icon:<Bell className='h-5 w-5' />, content:'Listado de alertas' },
    { value:'settings', label:'Ajustes', icon:<Settings className='h-5 w-5' />, content:'Preferencias del usuario' }
  ]} />
}

function CollapsibleNumberTabsDemo(){
  return <CollapsibleSidebarTabs variant='number' items={[
    { value:'one', label:'Tab 1' },
    { value:'two', label:'Tab 2' },
    { value:'three', label:'Tab 3' }
  ]} />
}
