"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps { language: string; code: string; className?: string; wrap?: boolean; noHorizontalScroll?: boolean }

export function CodeBlock({ language, code, className, wrap=false, noHorizontalScroll=false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState<string | null>(null)

  useEffect(()=>{
    let active = true
    ;(async()=>{
      try {
        const { codeToHtml } = await import('shiki')
        const out = await codeToHtml(code, { lang: language || 'tsx', theme: 'github-dark' })
        if(active) setHtml(out)
      } catch {
        if(active) setHtml('')
      }
    })()
    return ()=>{ active = false }
  }, [code, language])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={cn("relative border rounded-lg overflow-hidden bg-black/95 flex flex-col h-full", className)}>
      <div className="flex items-center justify-between h-9 shrink-0 px-4 border-b border-white/10 bg-gradient-to-r from-zinc-900/90 to-zinc-900/60 backdrop-blur text-[11px] uppercase tracking-wide">
        <span className="text-neutral-400">{language}</span>
        <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-7 px-2 text-neutral-300 hover:text-white">
          {copied ? <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="ml-1">Copiado</span></> : <><Copy className="h-3.5 w-3.5" /><span className="ml-1">Copiar</span></>}
        </Button>
      </div>
      <div className={cn(
        "p-4 text-xs leading-relaxed overflow-auto flex-1 h-full",
        wrap && '[&_code]:whitespace-pre-wrap',
        noHorizontalScroll && '[&_pre]:overflow-x-hidden [&_code]:break-words'
      )}>        
        {html === null && (
          <pre className="animate-pulse text-neutral-500"><code>Cargando…</code></pre>
        )}
        {html === '' && (
          <pre><code>{code}</code></pre>
        )}
        {html && html !== '' && (
          <div className='shiki-wrapper [&_pre]:p-0 [&_code_span]:leading-relaxed' dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  )
}
