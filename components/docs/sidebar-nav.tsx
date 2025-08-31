"use client"

import * as React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { NavItem } from "@/config/docs/docs-config"

interface SidebarNavProps {
  items: NavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = React.useState<string>("")

  // Observa headings dentro del contenedor principal (usamos data-block-root para página de bloques)
  React.useEffect(()=> {
    const root = document.querySelector('[data-block-root]') || document
    const headings = Array.from(root.querySelectorAll('section[id]')) as HTMLElement[]
    if(!headings.length) return
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          setActiveHash('#'+entry.target.id)
        }
      })
    }, { root: null, rootMargin: '0px 0px -65% 0px', threshold: 0 })
    headings.forEach(h=> observer.observe(h))
    return ()=> { observer.disconnect() }
  },[])

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <SidebarNavItems items={item.items} pathname={pathname} activeHash={activeHash} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

interface SidebarNavItemsProps {
  items: NavItem[]
  pathname: string | null
  activeHash?: string
}

function SidebarNavItems({ items, pathname, activeHash }: SidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href || (activeHash && item.href === activeHash.replace(/^#/,''))
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.external && (
              <span className="sr-only"> (opens in a new tab)</span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null
}
