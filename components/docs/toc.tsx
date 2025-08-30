"use client"
import * as React from 'react'
import { usePathname } from 'next/navigation'

interface HeadingItem { id:string; text:string; level:number }

function extract(idsRoot: HTMLElement): HeadingItem[] {
  const hs = Array.from(idsRoot.querySelectorAll('h1, h2, h3')) as HTMLHeadingElement[]
  return hs.filter(h=>h.id).map(h=>({ id: h.id, text: h.textContent||'', level: Number(h.tagName.replace('H','')) }))
}

export function Toc() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [items, setItems] = React.useState<HeadingItem[]>([])
  const [active, setActive] = React.useState<string>('')
  const pathname = usePathname()

  React.useEffect(()=>{
    const root = document.querySelector('[data-doc-root]') as HTMLElement | null
    if(!root) return
    setItems(extract(root))
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '0% 0% -70% 0%' })
    root.querySelectorAll('h1, h2, h3').forEach(el=> el.id && obs.observe(el))
    return ()=> obs.disconnect()
  }, [pathname])

  if(!items.length) return null

  return (
    <nav ref={ref} className="text-sm space-y-2">
      <p className="font-medium text-muted-foreground uppercase tracking-wide text-[11px]">On this page</p>
      <ul className="space-y-1">
        {items.map(item=> (
          <li key={item.id}>
            <a href={`#${item.id}`} className={
              `block truncate hover:text-foreground transition ${active===item.id ? 'text-foreground font-medium' : 'text-muted-foreground'} pl-${(item.level-1)*3}`
            }>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
