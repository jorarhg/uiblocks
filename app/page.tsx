import Link from "next/link"
import { ArrowRight, Blocks, Database, FormInput, Navigation, Layout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const blockCategories = [
  {
    icon: Database,
    title: "Data & Tables",
    description: "Componentes avanzados para mostrar y manipular datos tabulares.",
    href: "/blocks/data-tables",
    blocks: ["DataTable", "Advanced Filters", "Dynamic Schema"]
  },
  {
    icon: FormInput,
    title: "Forms & Inputs",
    description: "Formularios inteligentes y campos de entrada personalizados.",
    href: "/blocks/forms",
    blocks: ["Smart Forms", "Validation", "Multi-step Forms"],
    comingSoon: true
  },
  {
    icon: Navigation,
    title: "Navigation",
    description: "Componentes de navegación y menús responsivos.",
    href: "/blocks/navigation", 
    blocks: ["Sidebar", "Breadcrumbs", "Menu Systems"],
    comingSoon: true
  },
  {
    icon: Layout,
    title: "Layout",
    description: "Layouts y contenedores para estructurar aplicaciones.",
    href: "/blocks/layout",
    blocks: ["Dashboard", "Grid Systems", "Responsive Layouts"],
    comingSoon: true
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Blocks className="h-6 w-6" />
              <span className="font-bold text-xl">UI Blocks</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
              <Link href="/blocks" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Browse Blocks
              </Link>
              <Button asChild size="sm">
                <Link href="/docs/installation">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Blocks className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UI Blocks
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Una colección creciente de componentes UI altamente personalizables y reutilizables. 
            Cada block está diseñado para resolver problemas específicos con máxima flexibilidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/docs/installation">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/blocks">Browse All Blocks</Link>
            </Button>
          </div>

          {/* Block Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {blockCategories.map((category, index) => (
              <Card key={index} className={`border-border/50 hover:shadow-lg transition-shadow ${category.comingSoon ? 'opacity-75' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg flex items-center justify-center gap-2">
                    {category.title}
                    {category.comingSoon && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {category.blocks.map((block, blockIndex) => (
                      <span 
                        key={blockIndex}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                      >
                        {block}
                      </span>
                    ))}
                  </div>
                  <Button 
                    asChild 
                    variant={category.comingSoon ? "secondary" : "outline"} 
                    className="w-full"
                    disabled={category.comingSoon}
                  >
                    <Link href={category.comingSoon ? "#" : category.href}>
                      {category.comingSoon ? "Coming Soon" : "View Blocks"}
                      {!category.comingSoon && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why UI Blocks?</h2>
            <p className="text-xl text-muted-foreground">
              Cada block está diseñado con principios de reutilización y escalabilidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold mb-2">Plug & Play</h3>
              <p className="text-sm text-muted-foreground">
                Cada block funciona independientemente. Instala solo lo que necesitas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">High Performance</h3>
              <p className="text-sm text-muted-foreground">
                Optimizados para velocidad y eficiencia, sin comprometer funcionalidad.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Fully Customizable</h3>
              <p className="text-sm text-muted-foreground">
                Personaliza estilos, comportamiento y funcionalidad según tus necesidades.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Mobile First</h3>
              <p className="text-sm text-muted-foreground">
                Diseñados con enfoque mobile-first para funcionar en cualquier dispositivo.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold mb-2">Type Safe</h3>
              <p className="text-sm text-muted-foreground">
                Completamente tipado con TypeScript para mejor experiencia de desarrollo.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Well Documented</h3>
              <p className="text-sm text-muted-foreground">
                Documentación completa con ejemplos y guías paso a paso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Built with ❤️ using{" "}
            <Link href="https://ui.shadcn.com" className="font-medium underline underline-offset-4">
              shadcn/ui
            </Link>
            {" "}and{" "}
            <Link href="https://tailwindcss.com" className="font-medium underline underline-offset-4">
              Tailwind CSS
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
