"use client"
import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CollapsibleSidebarTabsItem {
  value: string
  label: string
  icon?: React.ReactNode
  number?: number
  content?: React.ReactNode
}

export interface CollapsibleSidebarTabsProps {
  items: CollapsibleSidebarTabsItem[]
  defaultValue?: string
  title?: string
  variant: 'icon' | 'number'
  config?: { base?: number; min?: number; maxFactor?: number }
  className?: string
}

function useResizableSidebar(cfg?: { base?: number; min?: number; maxFactor?: number }) {
  const base = cfg?.base ?? 224
  const min = cfg?.min ?? 54
  const max = Math.round(base * (cfg?.maxFactor ?? 1.35))
  const [collapsed, setCollapsed] = React.useState(false)
  const [width, setWidth] = React.useState(base)
  const [isResizing, setIsResizing] = React.useState(false)
  const startX = React.useRef(0)
  const startW = React.useRef(base)
  React.useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!isResizing || collapsed) return
      const delta = e.clientX - startX.current
      const next = Math.min(Math.max(base, startW.current + delta), max)
      setWidth(next)
    }
    function onUp() { setIsResizing(false) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [isResizing, collapsed, base, max])
  const startResize = (e: React.MouseEvent) => { if (collapsed) return; startX.current = e.clientX; startW.current = width; setIsResizing(true) }
  return { collapsed, toggle: () => setCollapsed(c => !c), width: collapsed ? min : width, min, startResize, isResizing }
}

export function CollapsibleSidebarTabs({ items, defaultValue, title = 'Secciones', variant, config, className }: CollapsibleSidebarTabsProps) {
  const { collapsed, toggle, width, startResize, isResizing } = useResizableSidebar(config)
  const iconWrapper = 'flex items-center justify-center rounded-md border border-border/60 h-9 w-9 p-1 shrink-0'
  return (
    <Tabs defaultValue={defaultValue ?? items[0]?.value} orientation='vertical' className={cn('flex w-full max-w-3xl rounded-md border overflow-hidden select-none', className)}>
      <div className={cn('relative flex flex-col border-r transition-[width] duration-200 ease-in-out', isResizing && 'transition-none')} style={{ width }}>
        <div className={cn('flex items-center h-11 border-b px-2', collapsed ? 'justify-start' : 'justify-between')}>
          {!collapsed && <span className='text-xs font-medium tracking-wide uppercase text-muted-foreground'>{title}</span>}
          <button onClick={toggle} aria-label={collapsed ? 'Expandir barra' : 'Colapsar barra'} className='flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
            <span className={iconWrapper}>{collapsed ? <ChevronRight className='h-[18px] w-[18px]' /> : <ChevronLeft className='h-[18px] w-[18px]' />}</span>
          </button>
        </div>
        <TabsList variant='ghost' className='flex-1 py-2 px-1 data-[orientation=vertical]:p-0 overflow-y-auto'>
          {items.map((it, idx) => (
            <TabsTrigger key={it.value} value={it.value} variant={variant === 'icon' ? 'icon' : 'number'} className='group w-full px-2 py-2 transition-colors flex items-center justify-start'>
              <span className={iconWrapper} aria-hidden>
                {variant === 'icon' ? it.icon : (it.number ?? (idx + 1))}
              </span>
              <span className={cn('text-sm whitespace-nowrap overflow-hidden ml-3 transition-[max-width,opacity] duration-200 ease-in-out', collapsed ? 'opacity-0 max-w-0 pointer-events-none' : 'opacity-100 max-w-[140px]')}>{it.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {!collapsed && <div onMouseDown={startResize} className={cn('absolute top-0 right-0 h-full w-1.5 cursor-col-resize hover:bg-border/70 active:bg-border/90', isResizing && 'bg-border/70')} />}
      </div>
      <div className='flex-1'>
        {items.map(it => (
          <TabsContent key={it.value} value={it.value} className='p-6'>
            {it.content ?? `Contenido ${it.label}`}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
