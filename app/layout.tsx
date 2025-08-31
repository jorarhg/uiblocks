import type { Metadata } from 'next'
import { DocsHeader } from "@/components/docs/docs-header"
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'UI Blocks - Production-ready components for your React applications',
  description: 'A collection of production-ready UI blocks built with modern technologies. Copy, paste, and customize to build your applications faster.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme='light' themes={['light','dark','custom']}>
          <div className="min-h-screen flex flex-col">
            <DocsHeader />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
