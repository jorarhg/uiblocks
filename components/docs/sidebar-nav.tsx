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
const overviewSectionMap: Record<string, string> = {
  '/blocks/data-tables': '#dt-overview',
  '/blocks/charts': '#charts-overview',
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = React.useState<string>('')
  const activeHashRef = React.useRef(activeHash)
  React.useEffect(()=> { activeHashRef.current = activeHash }, [activeHash])
  const clickLockRef = React.useRef<number | null>(null)

  // Recolectar ids (sin #) de secciones en el orden declarado (el orden final se valida por offsetTop luego)
  const linkIds = React.useMemo(() => {
    const ids: string[] = []
    items.forEach(group => {
      group.items?.forEach(it => {
        if (!it.href) return
        const [base, hash] = it.href.split('#')
        if (hash) ids.push(hash)
        else if (overviewSectionMap[it.href]) {
          // Insertar el id (sin #) de la sección overview relevante
            ids.push(overviewSectionMap[it.href].replace('#', ''))
        }
      })
    })
    return ids
  }, [items])

  // Scrollspy secuencial estable
  React.useEffect(() => {
    if (!linkIds.length) return
    const headerOffset = 96
    let isMounted = true

    const collectElements = () => (
      linkIds
        .map(id => ({ id, el: document.getElementById(id) as HTMLElement | null }))
        .filter(o => !!o.el) as { id: string; el: HTMLElement }[]
    ).sort((a, b) => a.el.offsetTop - b.el.offsetTop)

    let elements = collectElements()

    const computeActive = () => {
      if (!isMounted) return
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

    const onScroll = () => requestAnimationFrame(computeActive)
    window.addEventListener('scroll', onScroll, { passive: true })
    computeActive()
    return () => {
      isMounted = false
      window.removeEventListener('scroll', onScroll)
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
        const expectedOverviewHash = overviewSectionMap[item.href]

        let isActive = false
        if (hashWithHash) {
          // Link con hash: activo si coincide exactamente.
          isActive = activeHash === hashWithHash
        } else if (pathname === item.href) {
          // Link overview sin hash: activo sólo mientras no hemos pasado a otra sección distinta.
          if (!activeHash) isActive = true
          else if (expectedOverviewHash && activeHash === expectedOverviewHash) isActive = true
        }

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

