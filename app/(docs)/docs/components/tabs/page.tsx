"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PropsTable } from '@/components/docs/props-table'
import { Home, Settings, Bell } from 'lucide-react'
import { useState } from 'react'
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
        code={`function CollapsibleTabsDemo(){
  const [collapsed,setCollapsed]=useState(true)
  return (
    <Tabs defaultValue='home' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden'>
      <div className={cn('flex flex-col border-r transition-all duration-300', collapsed ? 'w-16' : 'w-56')}>
        <button onClick={()=>setCollapsed(c=>!c)} className='h-11 flex items-center justify-center text-xs font-medium border-b hover:bg-muted/60'>
          {collapsed ? '>' : '<'}
        </button>
        <TabsList variant='ghost' className='flex-1 p-1 data-[orientation=vertical]:p-1 overflow-y-auto'>
          <TabsTrigger value='home' variant='icon' className={!collapsed ? 'justify-start gap-2 px-3 py-2 [&>.tab-label]:not-sr-only' : ''}>
            <Home className='h-5 w-5' /><span className='tab-label text-sm'>{!collapsed && 'Home'}</span>
          </TabsTrigger>
          <TabsTrigger value='alerts' variant='icon' className={!collapsed ? 'justify-start gap-2 px-3 py-2 [&>.tab-label]:not-sr-only' : ''}>
            <Bell className='h-5 w-5' /><span className='tab-label text-sm'>{!collapsed && 'Alertas'}</span>
          </TabsTrigger>
          <TabsTrigger value='settings' variant='icon' className={!collapsed ? 'justify-start gap-2 px-3 py-2 [&>.tab-label]:not-sr-only' : ''}>
            <Settings className='h-5 w-5' /><span className='tab-label text-sm'>{!collapsed && 'Ajustes'}</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <div className='flex-1'>
        <TabsContent value='home' className='p-6'>Panel principal</TabsContent>
        <TabsContent value='alerts' className='p-6'>Listado de alertas</TabsContent>
        <TabsContent value='settings' className='p-6'>Preferencias del usuario</TabsContent>
      </div>
    </Tabs>
  )
}`}
        variant='panel'
      />

      <DocExample
        title='Vertical numérica colapsable'
        description='Secciones numeradas que expanden sub-tabs.'
        preview={<CollapsibleNumberTabsDemo />}
        code={`function CollapsibleNumberTabsDemo(){
  const [open,setOpen]=useState<string | null>('group-1')
  const toggle = (id:string)=> setOpen(o=> o===id ? null : id)
  const groups = [
    { id:'group-1', num:1, label:'Perfil', children:[
      { id:'g1-general', label:'General' },
      { id:'g1-security', label:'Seguridad' }
    ]},
    { id:'group-2', num:2, label:'Equipo', children:[
      { id:'g2-members', label:'Miembros' },
      { id:'g2-perms', label:'Permisos' }
    ]},
    { id:'group-3', num:3, label:'Facturación', children:[
      { id:'g3-plan', label:'Plan' },
      { id:'g3-invoices', label:'Facturas' }
    ]},
  ] as const
  return (
    <Tabs defaultValue='group-1' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden'>
      <TabsList variant='ghost' className='shrink-0 w-20 hover:w-60 focus-within:w-60 data-[orientation=vertical]:p-2 transition-[width] duration-300 overflow-y-auto group'>
        {groups.map(g => (
          <div key={g.id} className='flex flex-col'>
            <TabsTrigger
              value={g.id}
              variant='number'
              onClick={()=>toggle(g.id)}
              className={cn('relative mx-1 my-1 flex items-center justify-center gap-2 transition-all', open===g.id && 'data-[state=active]:bg-primary')}
            >
              {g.num}
              <span className={cn('tab-label text-xs font-medium truncate opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200', open===g.id && 'opacity-100 translate-x-0')}>{g.label}</span>
            </TabsTrigger>
            {open===g.id && (
              <div className='pl-5 pr-2 pb-2 space-y-1'>
                {g.children.map(ch => (
                  <TabsTrigger key={ch.id} value={ch.id} className='justify-start text-xs h-7 px-2 py-1 rounded hover:bg-muted/60 data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                    {ch.label}
                  </TabsTrigger>
                ))}
              </div>
            )}
          </div>
        ))}
      </TabsList>
      <div className='flex-1'>
        {groups.map(g => (
          <TabsContent key={g.id} value={g.id} className='p-6'>Resumen de {g.label}</TabsContent>
        ))}
        {groups.flatMap(g => g.children).map(ch => (
          <TabsContent key={ch.id} value={ch.id} className='p-6'>Contenido {ch.label}</TabsContent>
        ))}
      </div>
    </Tabs>
  )
}`}
        variant='panel'
      />

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>API</h2>
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
  const [collapsed,setCollapsed]=useState(true)
  return (
    <Tabs defaultValue='home' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden'>
      <div className={cn('flex flex-col border-r transition-all duration-300', collapsed ? 'w-16' : 'w-56')}>
        <button onClick={()=>setCollapsed(c=>!c)} className='h-11 flex items-center justify-center text-xs font-medium border-b hover:bg-muted/60'>
          {collapsed ? 'Expandir' : 'Colapsar'}
        </button>
        <TabsList variant='ghost' className='flex-1 p-1 data-[orientation=vertical]:p-1 overflow-y-auto'>
          <TabsTrigger value='home' variant='icon' className={!collapsed ? 'justify-start gap-2 px-3 py-2 [&>.tab-label]:not-sr-only' : ''}>
            <Home className='h-5 w-5' /><span className='tab-label text-sm'>{!collapsed && 'Home'}</span>
          </TabsTrigger>
          <TabsTrigger value='alerts' variant='icon' className={!collapsed ? 'justify-start gap-2 px-3 py-2 [&>.tab-label]:not-sr-only' : ''}>
            <Bell className='h-5 w-5' /><span className='tab-label text-sm'>{!collapsed && 'Alertas'}</span>
          </TabsTrigger>
            <TabsTrigger value='settings' variant='icon' className={!collapsed ? 'justify-start gap-2 px-3 py-2 [&>.tab-label]:not-sr-only' : ''}>
            <Settings className='h-5 w-5' /><span className='tab-label text-sm'>{!collapsed && 'Ajustes'}</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <div className='flex-1'>
        <TabsContent value='home' className='p-6'>Panel principal</TabsContent>
        <TabsContent value='alerts' className='p-6'>Listado de alertas</TabsContent>
        <TabsContent value='settings' className='p-6'>Preferencias del usuario</TabsContent>
      </div>
    </Tabs>
  )
}

function CollapsibleNumberTabsDemo(){
  const [open,setOpen]=useState<string | null>('group-1')
  const toggle = (id:string)=> setOpen(o=> o===id ? null : id)
  const groups: {id:string; num:number; label:string; children:{id:string; label:string}[]}[] = [
    { id:'group-1', num:1, label:'Perfil', children:[
      { id:'g1-general', label:'General' },
      { id:'g1-security', label:'Seguridad' }
    ]},
    { id:'group-2', num:2, label:'Equipo', children:[
      { id:'g2-members', label:'Miembros' },
      { id:'g2-perms', label:'Permisos' }
    ]},
    { id:'group-3', num:3, label:'Facturación', children:[
      { id:'g3-plan', label:'Plan' },
      { id:'g3-invoices', label:'Facturas' }
    ]},
  ]
  return (
    <Tabs defaultValue='group-1' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden'>
      <TabsList variant='ghost' className='shrink-0 w-20 hover:w-60 focus-within:w-60 data-[orientation=vertical]:p-2 transition-[width] duration-300 overflow-y-auto group'>
        {groups.map(g => (
          <div key={g.id} className='flex flex-col'>
            <TabsTrigger
              value={g.id}
              variant='number'
              onClick={()=>toggle(g.id)}
              className={cn('relative mx-1 my-1 flex items-center justify-center gap-2 transition-all', open===g.id && 'data-[state=active]:bg-primary')}
            >
              {g.num}
              <span className={cn('tab-label text-xs font-medium truncate opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200', open===g.id && 'opacity-100 translate-x-0')}>{g.label}</span>
            </TabsTrigger>
            {open===g.id && (
              <div className='pl-5 pr-2 pb-2 space-y-1'>
                {g.children.map(ch => (
                  <TabsTrigger key={ch.id} value={ch.id} className='justify-start text-xs h-7 px-2 py-1 rounded hover:bg-muted/60 data-[state=active]:bg-muted data-[state=active]:text-foreground'>
                    {ch.label}
                  </TabsTrigger>
                ))}
              </div>
            )}
          </div>
        ))}
      </TabsList>
      <div className='flex-1'>
        {groups.map(g => (
          <TabsContent key={g.id} value={g.id} className='p-6'>Resumen de {g.label}</TabsContent>
        ))}
        {groups.flatMap(g => g.children).map(ch => (
          <TabsContent key={ch.id} value={ch.id} className='p-6'>Contenido {ch.label}</TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
