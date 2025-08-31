import Link from "next/link"
import { ArrowRight, Blocks } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Lista resumida de componentes (migrada desde /components)
const componentsList = [
  { id:'button', name:'Button', href:'/components/button', description:'Variantes y tamaños', category:'Inputs' },
  { id:'input', name:'Input', href:'/components/input', description:'Campos de texto', category:'Inputs' },
  { id:'select', name:'Select', href:'/components/select', description:'Lista desplegable', category:'Inputs' },
  { id:'checkbox', name:'Checkbox', href:'/components/checkbox', description:'Casillas de verificación', category:'Inputs' },
  { id:'radio', name:'Radio Group', href:'/components/radio-group', description:'Selección única', category:'Inputs' },
  { id:'switch', name:'Switch', href:'/components/switch', description:'Toggle accesible', category:'Inputs' },
  { id:'badge', name:'Badge', href:'/components/badge', description:'Etiquetas de estado', category:'Display' },
  { id:'card', name:'Card', href:'/components/card', description:'Contenedor header/body', category:'Layout' },
  { id:'tabs', name:'Tabs', href:'/components/tabs', description:'Navegación segmentada', category:'Navigation' },
  { id:'dialog', name:'Dialog', href:'/components/dialog', description:'Modales accesibles', category:'Overlay' },
  { id:'dropdown-menu', name:'Dropdown', href:'/components/dropdown-menu', description:'Menús contextuales', category:'Navigation' },
  { id:'tooltip', name:'Tooltip', href:'/components/tooltip', description:'Ayuda contextual', category:'Overlay' },
]

export default function HomePage() {
  return (
  <div className="flex flex-col">

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Blocks className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">
            Build with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UI Blocks
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Una colección creciente de componentes UI altamente personalizables y reutilizables. 
            Cada block está diseñado para resolver problemas específicos con máxima flexibilidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
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

          {/* Components Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {componentsList.map(c => (
              <Link key={c.id} href={c.href} className="group relative rounded-xl border p-5 bg-gradient-to-b from-background to-muted/40 hover:shadow-sm transition flex flex-col">
                <div className="mb-4 h-28 w-full rounded-md bg-linear-to-br from-muted/80 to-muted/40 flex items-center justify-center text-[10px] text-muted-foreground font-mono tracking-wide">
                  {c.name}
                </div>
                <div className="space-y-1">
                  <h2 className="font-medium tracking-tight group-hover:text-foreground flex items-center gap-2">
                    {c.name}
                    <span className="text-[9px] font-medium rounded border px-1.5 py-0.5 text-muted-foreground group-hover:border-foreground/40">THEMABLE</span>
                  </h2>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
                <span className="absolute inset-0 rounded-xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

  {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Why UI Blocks?</h2>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Cada block está diseñado con principios de reutilización y escalabilidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
      <footer className="border-t py-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
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
