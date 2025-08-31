"use client"

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/config/docs/docs-config'

interface SidebarNavProps {
  items: { title: string; items?: NavItem[] }[]
}

// Mapa que asocia páginas "overview" (sin hash en el link) al id de la primera sección real
// Esto permite que el link Overview deje de estar activo al avanzar a otras secciones.
const overviewSectionMap: Record<string, string> = {}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = React.useState<string>('')
  const activeHashRef = React.useRef(activeHash)
  React.useEffect(()=> { activeHashRef.current = activeHash }, [activeHash])
  const clickLockRef = React.useRef<number | null>(null)
  const mountedRef = React.useRef(false)

  // Recolectar ids (sin #) de secciones en el orden declarado (el orden final se valida por offsetTop luego)
  const linkIds = React.useMemo(() => {
    const ids: string[] = []
    items.forEach(group => {
      group.items?.forEach(it => {
        if (!it.href) return
        const hash = it.href.split('#')[1]
        if (hash) ids.push(hash)
      })
    })
    return ids
  }, [items])

  // Scrollspy secuencial estable
  React.useEffect(() => {
    mountedRef.current = true
    if (!linkIds.length) return () => { mountedRef.current = false }
    const headerOffset = 96

    const collectElements = () => (
      linkIds
        .map(id => ({ id, el: document.getElementById(id) as HTMLElement | null }))
        .filter(o => !!o.el) as { id: string; el: HTMLElement }[]
    ).sort((a, b) => a.el.offsetTop - b.el.offsetTop)

    let elements = collectElements()
    let retryCount = 0
    const maxRetries = 30 // ~3s si intervalo 100ms
    let retryTimer: number | null = null

    const computeActive = () => {
      if (!mountedRef.current) return
      if (clickLockRef.current && Date.now() < clickLockRef.current) return
      if (elements.length !== linkIds.length) elements = collectElements()
      if (!elements.length) return
      const scrollY = window.scrollY
      let current = elements[0]
      for (const item of elements) {
        if (item.el.offsetTop - headerOffset <= scrollY) current = item
        else break
      }
      const targetHash = '#' + current.id
      if (targetHash !== activeHashRef.current) setActiveHash(targetHash)
    }

    const ensureElements = () => {
      if (!mountedRef.current) return
      elements = collectElements()
      if (elements.length === linkIds.length || retryCount >= maxRetries) {
        computeActive()
        return
      }
      retryCount++
      retryTimer = window.setTimeout(ensureElements, 100)
    }

    const onScroll = () => requestAnimationFrame(computeActive)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Hash inicial (carga directa con #...)
    if (window.location.hash) {
      const h = window.location.hash
      // Si el elemento existe, marcamos directo; si no, se hará en ensureElements
      if (document.getElementById(h.replace('#',''))) setActiveHash(h)
    }
    ensureElements()

    return () => {
      mountedRef.current = false
      window.removeEventListener('scroll', onScroll)
      if (retryTimer) window.clearTimeout(retryTimer)
    }
  }, [linkIds])

  // Click suave en enlaces hash internos
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [base, hash] = href.split('#')
    if (hash && (base === '' || base === window.location.pathname)) {
      const el = document.getElementById(hash)
      if (el) {
        e.preventDefault()
        setActiveHash('#' + hash)
        clickLockRef.current = Date.now() + 600 // evitar parpadeo mientras hace scroll suave
        const headerOffset = 96
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top, behavior: 'smooth' })
        history.replaceState(null, '', '#' + hash)
      }
    }
  }

  return items.length ? (
    <div className="w-full">
      {items.map((group, index) => (
        <div key={index} className={cn('pb-4')}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{group.title}</h4>
          {group.items?.length ? (
            <SidebarNavItems
              items={group.items}
              pathname={pathname}
              activeHash={activeHash}
              onNavClick={handleNavClick}
            />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}

interface SidebarNavItemsProps {
  items: NavItem[]
  pathname: string | null
  activeHash?: string
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

function SidebarNavItems({ items, pathname, activeHash, onNavClick }: SidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) => {
        if (!item.href || item.disabled) {
          return (
            <span
              key={index}
              className={cn(
                'flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </span>
          )
        }

  const [base, hash] = item.href.split('#')
  const hashWithHash = hash ? '#' + hash : null
  const isActive = !!hashWithHash && activeHash === hashWithHash

        return (
          <Link
            key={index}
            href={item.href}
            onClick={(e) => onNavClick(e, item.href!)}
            className={cn(
              'group relative flex w-full items-center rounded-md border border-transparent px-2 py-1 pl-4 transition-colors',
              isActive
                ? 'font-semibold text-foreground before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:rounded-full before:bg-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
            {item.external && <span className="sr-only"> (opens in a new tab)</span>}
          </Link>
        )
      })}
    </div>
  ) : null
}

