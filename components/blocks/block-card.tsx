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
  const [minHeight, setMinHeight] = React.useState<number>(220)

  React.useEffect(() => {
    if (!previewRef.current) return
    const el = previewRef.current
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight
      setMinHeight(prev => (h > prev ? h : prev))
    })
    ro.observe(el)
    setTimeout(() => {
      if (el) {
        const h = el.offsetHeight
        setMinHeight(prev => (h > prev ? h : prev))
      }
    }, 0)
    return () => ro.disconnect()
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
        <Tabs defaultValue='preview' className='flex-1 flex flex-col'>
          <TabsList className='mb-2 w-fit self-start justify-start'>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
            <TabsTrigger value='code'><Code2 className='h-4 w-4 mr-1' />Code</TabsTrigger>
            {block.category === 'charts' && block.payload && (
              <TabsTrigger value='payload'>Payload</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value='preview' className='flex-1 m-0 rounded-md border bg-background p-5 overflow-auto' style={{ minHeight }}>
            <div ref={previewRef} className='relative h-full' aria-label={`Vista previa: ${block.title}`} role='group'>
              {block.preview}
            </div>
          </TabsContent>
          <TabsContent value='code' className='flex-1 m-0 rounded-md border bg-black/95 p-0 overflow-hidden' style={{ minHeight }}>
            <CodeBlock code={block.code} language='tsx' />
          </TabsContent>
          {block.category === 'charts' && block.payload && (
            <TabsContent value='payload' className='flex-1 m-0 rounded-md border bg-black/95 p-0 overflow-hidden' style={{ minHeight }}>
              <CodeBlock code={JSON.stringify(block.payload, null, 2)} language='json' />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
