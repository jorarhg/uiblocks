import Link from "next/link"
import { ArrowRight, Database, Filter, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const examples = [
  {
    icon: Database,
    title: "Basic Data Table",
    description: "Una tabla básica con funcionalidades de filtrado, ordenamiento y paginación.",
    href: "/examples/basic",
    preview: "/api/og?title=Basic%20Data%20Table",
  },
  {
    icon: Filter,
    title: "Dynamic Filters",
    description: "Sistema avanzado de filtros dinámicos que se adaptan al esquema de datos.",
    href: "/examples/filters",
    preview: "/api/og?title=Dynamic%20Filters",
  },
  {
    icon: Palette,
    title: "Custom Formatters",
    description: "Formateadores personalizados para mostrar datos de manera elegante.",
    href: "/examples/formatters",
    preview: "/api/og?title=Custom%20Formatters",
  },
]

export default function ExamplesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Examples</h1>
        <p className="text-xl text-muted-foreground">
          Explora ejemplos interactivos de los componentes de DataTable UI en acción.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((example, index) => (
          <Card key={index} className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <example.icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg">{example.title}</CardTitle>
              </div>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Preview</span>
                </div>
                <Button asChild className="w-full">
                  <Link href={example.href}>
                    Ver Ejemplo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda?</h2>
        <p className="text-muted-foreground mb-4">
          Si tienes alguna pregunta sobre cómo implementar estos ejemplos en tu proyecto, 
          consulta nuestra documentación completa.
        </p>
        <Button asChild>
          <Link href="/docs">
            Ver Documentación
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
