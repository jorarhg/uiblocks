"use client"
import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/docs/code-block'
import { cn } from '@/lib/utils'

interface ExampleTabsProps {
  className?: string
  preview: React.ReactNode
  code: string
  language?: string
  defaultTab?: 'preview' | 'code'
  padded?: boolean
}

// Componente reutilizable para docs: sincroniza altura de Code con Preview.
export function ExampleTabs({ className, preview, code, language='tsx', defaultTab='preview', padded=true }: ExampleTabsProps) {
  const previewRef = React.useRef<HTMLDivElement | null>(null)
  const [h, setH] = React.useState(220)

  React.useEffect(()=>{
    const el = previewRef.current
    if(!el) return
    const update = () => {
      const nh = Math.max(220, el.offsetHeight || 0)
      setH(nh)
    }
    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    const raf = requestAnimationFrame(update)
    const t = setTimeout(update, 250)
    return ()=>{ ro.disconnect(); cancelAnimationFrame(raf); clearTimeout(t) }
  },[])

  return (
    <div className={cn('w-full rounded-lg border bg-background/40 backdrop-blur-sm', className)}>
      <Tabs defaultValue={defaultTab} className='w-full flex flex-col'>
        <TabsList className='px-1 py-1'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='code'>Code</TabsTrigger>
        </TabsList>
        <TabsContent value='preview' className={cn('m-0 border-t', padded && 'p-5')} style={{ minHeight: h }}>
          <div ref={previewRef} className='relative h-full'>
            {preview}
          </div>
        </TabsContent>
        <TabsContent value='code' className='m-0 border-t p-0 bg-black/95 rounded-b-lg overflow-hidden' style={{ minHeight: h, height: h, maxHeight: h }}>
          <CodeBlock language={language} code={code} className='h-full' />
        </TabsContent>
      </Tabs>
    </div>
  )
}
