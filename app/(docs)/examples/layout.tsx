import { DocsHeader } from "@/components/docs/docs-header"

interface ExamplesLayoutProps {
  children: React.ReactNode
}

export default function ExamplesLayout({ children }: ExamplesLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <div className="container flex-1 py-6 lg:py-8">
        {children}
      </div>
    </div>
  )
}
