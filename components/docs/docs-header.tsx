import Link from "next/link"
import { Database } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { MainNav } from "@/components/docs/main-nav"
import { MobileNav } from "@/components/docs/mobile-nav"
import { docsConfig } from "@/config/docs/docs-config"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search component could go here */}
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/docs/installation">Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
