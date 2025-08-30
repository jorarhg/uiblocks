"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Blocks } from "lucide-react"

import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs/docs-config"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Blocks className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          UI Blocks
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
    </div>
  )
}
