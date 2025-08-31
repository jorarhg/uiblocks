"use client"
import * as React from 'react'
import { Table as TableIcon, Filter, LayoutTemplate, Code2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/docs/code-block'

export interface BlockMeta {
  id: string
  title: string
  category: string
  description: string
  preview: React.ReactNode
  code: string
  tags?: string[]
  status?: 'stable' | 'beta' | 'soon'
  fullWidth?: boolean
  payload?: any
}

export function BlockCard({ block }: { block: BlockMeta }) {
  const StatusIcon = block.status === 'stable' ? TableIcon : block.status === 'beta' ? Filter : LayoutTemplate
  const previewRef = React.useRef<HTMLDivElement | null>(null)
  const codeRef = React.useRef<HTMLDivElement | null>(null)
  const [minHeight, setMinHeight] = React.useState<number>(220)

  React.useEffect(() => {
    const previewEl = previewRef.current
    if (!previewEl) return

    const update = () => {
      const ph = previewEl.offsetHeight || 0
      const target = Math.max(220, ph)
      setMinHeight(target)
    }

    const ro = new ResizeObserver(update)
    ro.observe(previewEl)

    // Primer cálculo tras render y siguiente frame (por layout / fuentes)
    update()
    const raf = requestAnimationFrame(update)
    const t = setTimeout(update, 300)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [])


  return (
  <Card className='flex flex-col overflow-hidden border-0 shadow-none bg-transparent p-0'>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between gap-4'>
          <div className='space-y-1'>
            <CardTitle className='text-lg'>{block.title}</CardTitle>
            <CardDescription className='text-sm'>{block.description}</CardDescription>
          </div>
          <div className='flex flex-col items-end gap-2'>
            {block.status && (
              <Badge variant={block.status === 'stable' ? 'default' : 'secondary'} className='uppercase'>
                {block.status}
              </Badge>
            )}
            <StatusIcon className='h-5 w-5 text-muted-foreground' />
          </div>
        </div>
        {block.tags && (
          <div className='flex flex-wrap gap-1 pt-2'>
            {block.tags.map(t => (
              <span key={t} className='text-[10px] rounded bg-muted px-2 py-0.5 tracking-wide uppercase text-muted-foreground'>
                {t}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className='pt-0 flex-1 flex flex-col'>
        <div className='rounded-lg border bg-background/40 backdrop-blur-sm flex-1 flex flex-col'>
        <Tabs defaultValue='preview' className='flex-1 flex flex-col'>
          <TabsList className='px-2 py-1 justify-start w-full' fullWidth>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
            <TabsTrigger value='code'><Code2 className='h-4 w-4 mr-1' />Code</TabsTrigger>
            {block.category === 'charts' && block.payload && (
              <TabsTrigger value='payload'>Payload</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value='preview' className='flex-1 m-0 border-t p-5 overflow-auto' style={{ minHeight }}>
            <div ref={previewRef} className='relative h-full' aria-label={`Vista previa: ${block.title}`} role='group'>
              {block.preview}
            </div>
          </TabsContent>
          <TabsContent value='code' className='flex-1 m-0 border-t bg-black/95 p-0 overflow-auto relative min-h-0' style={{ minHeight, height: minHeight, maxHeight: minHeight }}>
            <div ref={codeRef} className='h-full max-h-full flex flex-col'>
              <CodeBlock code={block.code} language='tsx' />
            </div>
          </TabsContent>
          {block.category === 'charts' && block.payload && (
            <TabsContent value='payload' className='flex-1 m-0 border-t bg-black/95 p-0 overflow-auto relative min-h-0' style={{ minHeight, height: minHeight, maxHeight: minHeight }}>
              <div className='h-full max-h-full flex flex-col'>
                <CodeBlock code={JSON.stringify(block.payload, null, 2)} language='json' />
              </div>
            </TabsContent>
          )}
        </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
