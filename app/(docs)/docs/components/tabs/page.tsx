"use client"
import { DocExample } from '@/components/docs/doc-example'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PropsTable } from '@/components/docs/props-table'
import { Home, Settings, Bell, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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
  const BASE_WIDTH = 224
  const MAX_WIDTH = Math.round(BASE_WIDTH * 1.35)
  const MIN_WIDTH = 54
  const [collapsed,setCollapsed]=useState(false) // inicia expandido
  const [width,setWidth]=useState(BASE_WIDTH)
  const [isResizing,setIsResizing]=useState(false)
  const startXRef=useRef(0); const startWRef=useRef(BASE_WIDTH)
  const title='Secciones'
  const iconWrapper='flex items-center justify-center rounded-md border border-border/60 h-9 w-9 p-1 shrink-0'
  const iconSize='h-[18px] w-[18px]'
  useEffect(()=>{function onMove(e:MouseEvent){if(!isResizing) return; const delta=e.clientX-startXRef.current; const next=Math.min(Math.max(BASE_WIDTH,startWRef.current+delta),MAX_WIDTH); setWidth(next)} function onUp(){setIsResizing(false)} window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp); return()=>{window.removeEventListener('mousemove',onMove);window.removeEventListener('mouseup',onUp)}},[isResizing])
  const startResize=(e:React.MouseEvent)=>{startXRef.current=e.clientX; startWRef.current=width; setIsResizing(true)}
  return (<Tabs defaultValue='home' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden select-none'>
    <div className={cn('relative flex flex-col border-r transition-[width] duration-200 ease-in-out', isResizing && 'transition-none')} style={{ width: collapsed ? MIN_WIDTH : width }}>
  <div className={cn('flex items-center h-11 border-b px-2', collapsed ? 'justify-start' : 'justify-between')}>
        {!collapsed && <span className='text-xs font-medium tracking-wide uppercase text-muted-foreground transition-opacity'>{title}</span>}
        <button onClick={()=>setCollapsed(c=>!c)} aria-label={collapsed?'Expandir barra':'Colapsar barra'} className='flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
          <span className={iconWrapper}>{collapsed ? <ChevronRight className={iconSize} /> : <ChevronLeft className={iconSize} />}</span>
        </button>
      </div>
      <TabsList variant='ghost' className='flex-1 py-2 px-1 data-[orientation=vertical]:p-0 overflow-y-auto'>
  <TabsTrigger value='home' variant='icon' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
          <span className={iconWrapper}><Home className={iconSize} /></span>
          <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Home</span>
        </TabsTrigger>
  <TabsTrigger value='alerts' variant='icon' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
          <span className={iconWrapper}><Bell className={iconSize} /></span>
          <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Alertas</span>
        </TabsTrigger>
  <TabsTrigger value='settings' variant='icon' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
          <span className={iconWrapper}><Settings className={iconSize} /></span>
          <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Ajustes</span>
        </TabsTrigger>
      </TabsList>
      {!collapsed && <div onMouseDown={startResize} className={cn('absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-border/70 active:bg-border/90', isResizing && 'bg-border/70')} />}
    </div>
    <div className='flex-1'>
      <TabsContent value='home' className='p-6'>Panel principal</TabsContent>
      <TabsContent value='alerts' className='p-6'>Listado de alertas</TabsContent>
      <TabsContent value='settings' className='p-6'>Preferencias del usuario</TabsContent>
    </div>
  </Tabs>)
}`}
        variant='panel'
      />

      <DocExample
        title='Vertical numérica colapsable'
        description='Secciones numeradas que expanden sub-tabs.'
        preview={<CollapsibleNumberTabsDemo />}
  code={`function CollapsibleNumberTabsDemo(){\n  const BASE_WIDTH=224; const MAX_WIDTH=Math.round(BASE_WIDTH*1.35); const MIN_WIDTH=54;\n  const [collapsed,setCollapsed]=useState(false); const [width,setWidth]=useState(BASE_WIDTH); const [isResizing,setIsResizing]=useState(false);\n  const startX=useRef(0); const startW=useRef(BASE_WIDTH);\n  useEffect(()=>{function onMove(e){ if(!isResizing) return; const delta=e.clientX-startX.current; const next=Math.min(Math.max(BASE_WIDTH,startW.current+delta),MAX_WIDTH); setWidth(next)} function onUp(){setIsResizing(false)} window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp); return()=>{window.removeEventListener('mousemove',onMove);window.removeEventListener('mouseup',onUp)}},[isResizing]);\n  const startResize=(e)=>{startX.current=e.clientX; startW.current=width; setIsResizing(true)};\n  const iconWrapper='flex items-center justify-center rounded-md border border-border/60 h-9 w-9 p-1 shrink-0';\n  return (<Tabs defaultValue='one' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden select-none'>\n    <div className={'relative flex flex-col border-r transition-[width] duration-200 ease-in-out '+(isResizing?'transition-none':'')} style={{width:collapsed?MIN_WIDTH:width}}>\n      <div className={'flex items-center h-11 border-b px-2 '+(collapsed?'justify-start':'justify-between')}>\n        {!collapsed && <span className='text-xs font-medium tracking-wide uppercase text-muted-foreground'>Secciones</span>}\n        <button onClick={()=>setCollapsed(c=>!c)} aria-label={collapsed?'Expandir barra':'Colapsar barra'} className='flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>\n          <span className={iconWrapper}>{collapsed ? <ChevronRight className='h-[18px] w-[18px]'/> : <ChevronLeft className='h-[18px] w-[18px]'/>}</span>\n        </button>\n      </div>\n      <TabsList variant='ghost' className='flex-1 py-2 px-1 data-[orientation=vertical]:p-0 overflow-y-auto'>\n        {['one','two','three'].map((v,i)=>(\n          <TabsTrigger key={v} value={v} variant='number' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>\n            <span className={iconWrapper} aria-hidden>{i+1}</span>\n            <span className={'text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out '+(collapsed?'opacity-0 max-w-0 pointer-events-none':'opacity-100 max-w-[140px]')}>Tab {i+1}</span>\n          </TabsTrigger>))}\n      </TabsList>\n      {!collapsed && <div onMouseDown={startResize} className={'absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-border/70 active:bg-border/90 '+(isResizing?'bg-border/70':'')} /> }\n    </div>\n    <div className='flex-1'>\n      <TabsContent value='one' className='p-6'>Contenido 1</TabsContent>\n      <TabsContent value='two' className='p-6'>Contenido 2</TabsContent>\n      <TabsContent value='three' className='p-6'>Contenido 3</TabsContent>\n    </div>\n  </Tabs>)\n}`}
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
  const BASE_WIDTH = 224
  const MAX_WIDTH = Math.round(BASE_WIDTH * 1.35)
  const MIN_WIDTH = 54
  const [collapsed,setCollapsed]=useState(false) // inicia expandido
  const [width,setWidth]=useState(BASE_WIDTH)
  const [isResizing,setIsResizing]=useState(false)
  const startXRef=useRef(0); const startWRef=useRef(BASE_WIDTH)
  const title='Secciones'
  const iconWrapper='flex items-center justify-center rounded-md border border-border/60 h-9 w-9 p-1 shrink-0'
  const iconSize='h-[18px] w-[18px]'
  useEffect(()=>{function onMove(e:MouseEvent){if(!isResizing) return; const delta=e.clientX-startXRef.current; const next=Math.min(Math.max(BASE_WIDTH,startWRef.current+delta),MAX_WIDTH); setWidth(next)} function onUp(){setIsResizing(false)} window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp); return()=>{window.removeEventListener('mousemove',onMove);window.removeEventListener('mouseup',onUp)}},[isResizing])
  const startResize=(e:React.MouseEvent)=>{startXRef.current=e.clientX; startWRef.current=width; setIsResizing(true)}
  return (<Tabs defaultValue='home' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden select-none'>
    <div className={cn('relative flex flex-col border-r transition-[width] duration-200 ease-in-out', isResizing && 'transition-none')} style={{ width: collapsed ? MIN_WIDTH : width }}>
  <div className={cn('flex items-center h-11 border-b px-2', collapsed ? 'justify-start' : 'justify-between')}>
        {!collapsed && <span className='text-xs font-medium tracking-wide uppercase text-muted-foreground transition-opacity'>{title}</span>}
        <button onClick={()=>setCollapsed(c=>!c)} aria-label={collapsed?'Expandir barra':'Colapsar barra'} className='flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
          <span className={iconWrapper}>{collapsed ? <ChevronRight className={iconSize} /> : <ChevronLeft className={iconSize} />}</span>
        </button>
      </div>
      <TabsList variant='ghost' className='flex-1 py-2 px-1 data-[orientation=vertical]:p-0 overflow-y-auto'>
  <TabsTrigger value='home' variant='icon' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
          <span className={iconWrapper}><Home className={iconSize} /></span>
          <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Home</span>
        </TabsTrigger>
  <TabsTrigger value='alerts' variant='icon' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
          <span className={iconWrapper}><Bell className={iconSize} /></span>
          <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Alertas</span>
        </TabsTrigger>
  <TabsTrigger value='settings' variant='icon' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
          <span className={iconWrapper}><Settings className={iconSize} /></span>
          <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Ajustes</span>
        </TabsTrigger>
      </TabsList>
      {!collapsed && <div onMouseDown={startResize} className={cn('absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-border/70 active:bg-border/90', isResizing && 'bg-border/70')} />}
    </div>
    <div className='flex-1'>
      <TabsContent value='home' className='p-6'>Panel principal</TabsContent>
      <TabsContent value='alerts' className='p-6'>Listado de alertas</TabsContent>
      <TabsContent value='settings' className='p-6'>Preferencias del usuario</TabsContent>
    </div>
  </Tabs>)
}

function CollapsibleNumberTabsDemo(){
  const BASE_WIDTH = 224
  const MAX_WIDTH = Math.round(BASE_WIDTH * 1.35)
  const MIN_WIDTH = 54
  const [collapsed,setCollapsed]=useState(false)
  const [width,setWidth]=useState(BASE_WIDTH)
  const [isResizing,setIsResizing]=useState(false)
  const startXRef=useRef(0); const startWRef=useRef(BASE_WIDTH)
  useEffect(()=>{function onMove(e:MouseEvent){if(!isResizing) return; const delta=e.clientX-startXRef.current; const next=Math.min(Math.max(BASE_WIDTH,startWRef.current+delta),MAX_WIDTH); setWidth(next)} function onUp(){setIsResizing(false)} window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp); return()=>{window.removeEventListener('mousemove',onMove);window.removeEventListener('mouseup',onUp)}},[isResizing])
  const startResize=(e:React.MouseEvent)=>{startXRef.current=e.clientX; startWRef.current=width; setIsResizing(true)}
  const iconWrapper='flex items-center justify-center rounded-md border border-border/60 h-9 w-9 p-1 shrink-0'
  return (
    <Tabs defaultValue='one' orientation='vertical' className='flex w-full max-w-3xl rounded-md border overflow-hidden select-none'>
      <div className={cn('relative flex flex-col border-r transition-[width] duration-200 ease-in-out', isResizing && 'transition-none')} style={{ width: collapsed ? MIN_WIDTH : width }}>
        <div className={cn('flex items-center h-11 border-b px-2', collapsed ? 'justify-start' : 'justify-between')}>
          {!collapsed && <span className='text-xs font-medium tracking-wide uppercase text-muted-foreground transition-opacity'>Secciones</span>}
          <button onClick={()=>setCollapsed(c=>!c)} aria-label={collapsed?'Expandir barra':'Colapsar barra'} className='flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
            <span className={iconWrapper}>{collapsed ? <ChevronRight className='h-[18px] w-[18px]' /> : <ChevronLeft className='h-[18px] w-[18px]' />}</span>
          </button>
        </div>
        <TabsList variant='ghost' className='flex-1 py-2 px-1 data-[orientation=vertical]:p-0 overflow-y-auto'>
          {['one','two','three'].map((v,i)=>(
            <TabsTrigger key={v} value={v} variant='number' className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
              <span className={iconWrapper} aria-hidden>{i+1}</span>
              <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>Tab {i+1}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {!collapsed && <div onMouseDown={startResize} className={cn('absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-border/70 active:bg-border/90', isResizing && 'bg-border/70')} />}
      </div>
      <div className='flex-1'>
        <TabsContent value='one' className='p-6'>Contenido 1</TabsContent>
        <TabsContent value='two' className='p-6'>Contenido 2</TabsContent>
        <TabsContent value='three' className='p-6'>Contenido 3</TabsContent>
      </div>
    </Tabs>
  )
}
