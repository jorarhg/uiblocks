"use client"
import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/docs/code-block'
import { cn } from '@/lib/utils'

type ExampleTab = 'preview' | 'code' | 'payload'

interface DocExampleProps {
  title?: string
  description?: string
  preview: React.ReactNode
  code?: string
  payload?: any
  language?: string
  /** Lista explícita de tabs; si se omite se infiere de la presencia de code / payload */
  tabs?: ExampleTab[]
  /** Sincroniza la altura de Code/Payload a la altura inicial del preview */
  syncHeight?: boolean
  /** Estilo visual */
  variant?: 'flat' | 'panel' | 'inset'
  paddedPreview?: boolean
  className?: string
  defaultTab?: ExampleTab
}

// Componente de ejemplo unificado y opinionated para docs.
// Provee: Tabs Preview / Code / Payload, sincronización opcional de altura y variantes de estilo.
export function DocExample({
  title,
  description,
  preview,
  code,
  payload,
  language='tsx',
  tabs,
  syncHeight=true,
  variant='flat',
  paddedPreview=true,
  className,
  defaultTab='preview'
}: DocExampleProps) {
  const previewRef = React.useRef<HTMLDivElement | null>(null)
  const [h, setH] = React.useState(220)

  // Determinar tabs finales
  const finalTabs: ExampleTab[] = React.useMemo(() => {
    if (tabs && tabs.length) return tabs
    const arr: ExampleTab[] = ['preview']
    if (code) arr.push('code')
    if (payload !== undefined) arr.push('payload')
    return arr
  }, [tabs, code, payload])

  React.useEffect(() => {
    if (!syncHeight) return
    const el = previewRef.current
    if (!el) return
    const update = () => {
      const nh = Math.max(200, el.offsetHeight || 0)
      setH(nh)
    }
    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    const raf = requestAnimationFrame(update)
    const t = setTimeout(update, 250)
    return () => { ro.disconnect(); cancelAnimationFrame(raf); clearTimeout(t) }
  }, [syncHeight])

  const variantClasses = {
    flat: 'bg-transparent',
    panel: 'rounded-lg border bg-background/40 backdrop-blur-sm',
    inset: 'rounded-md border bg-muted/30'
  }[variant]

  return (
    <div className={cn('w-full flex flex-col', variantClasses === 'bg-transparent' ? '' : variantClasses, className)}>
      {(title || description) && variant !== 'flat' && (
        <div className='px-5 pt-5 pb-2 space-y-1'>
          {title && <h3 className='text-base font-semibold'>{title}</h3>}
          {description && <p className='text-sm text-muted-foreground'>{description}</p>}
        </div>
      )}
      <Tabs defaultValue={defaultTab} className='w-full flex flex-col'>
        <TabsList className='mb-2 w-fit self-start justify-start'>
          {finalTabs.includes('preview') && <TabsTrigger value='preview'>Preview</TabsTrigger>}
          {finalTabs.includes('code') && <TabsTrigger value='code'>Code</TabsTrigger>}
          {finalTabs.includes('payload') && <TabsTrigger value='payload'>Payload</TabsTrigger>}
        </TabsList>
        {finalTabs.includes('preview') && (
          <TabsContent value='preview' className={cn('flex-1 m-0 rounded-md border bg-background overflow-auto', paddedPreview && 'p-5')} style={syncHeight ? { minHeight: h } : undefined}>
            <div ref={previewRef} className='relative h-full'>{preview}</div>
          </TabsContent>
        )}
        {finalTabs.includes('code') && code && (
          <TabsContent value='code' className='flex-1 m-0 rounded-md border bg-black/95 p-0 overflow-auto relative' style={syncHeight ? { minHeight: h, height: h, maxHeight: h } : undefined}>
            <CodeBlock language={language} code={code} className={syncHeight ? 'h-full' : ''} />
          </TabsContent>
        )}
        {finalTabs.includes('payload') && payload !== undefined && (
          <TabsContent value='payload' className='flex-1 m-0 rounded-md border bg-black/95 p-0 overflow-auto relative' style={syncHeight ? { minHeight: h, height: h, maxHeight: h } : undefined}>
            <CodeBlock language='json' code={typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2)} className={syncHeight ? 'h-full' : ''} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
