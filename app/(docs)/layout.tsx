import { SidebarNav } from "@/components/docs/sidebar-nav"
import { Toc } from "@/components/docs/toc"
import { docsConfig } from "@/config/docs/docs-config"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:gap-12">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <SidebarNav items={docsConfig.sidebarNav} />
          </div>
        </aside>
        <main className="relative pt-8 pb-16 md:pt-10 lg:pt-12 xl:pt-14 xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
          <div className="mx-auto w-full min-w-0 max-w-3xl xl:max-w-4xl prose dark:prose-invert prose-headings:scroll-mt-24" data-doc-root>
            {children}
          </div>
          <div className="hidden xl:block pt-2">
            <div className="sticky top-24">
              <Toc />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
