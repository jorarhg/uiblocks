import { ArrowRight, Database, Layers, Code2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Introduction</h1>
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
          Bienvenido a DataTable UI, una biblioteca de componentes de tabla altamente personalizables construida con React, TypeScript y Tailwind CSS.
        </p>
      </div>

  <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Tables
            </CardTitle>
            <CardDescription>
              Componentes de tabla avanzados con filtrado, ordenamiento y paginación integrados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/docs/components/data-table">
                Ver Componentes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Dynamic System
            </CardTitle>
            <CardDescription>
              Sistema dinámico que se adapta automáticamente a tus esquemas de datos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/docs/advanced/dynamic-schema">
                Ver Esquemas Dinámicos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Características principales</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-semibold">🚀 Performance</h3>
            <p className="text-sm text-muted-foreground">
              Optimizado para manejar grandes volúmenes de datos con virtualización y lazy loading.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">🎨 Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Completamente personalizable con Tailwind CSS y sistema de temas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">📱 Responsive</h3>
            <p className="text-sm text-muted-foreground">
              Diseño responsivo que funciona perfectamente en todos los dispositivos.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">🔧 Type Safe</h3>
            <p className="text-sm text-muted-foreground">
              Completamente tipado con TypeScript para una mejor experiencia de desarrollo.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">♿ Accessible</h3>
            <p className="text-sm text-muted-foreground">
              Construido con accesibilidad en mente, siguiendo las mejores prácticas de WAI-ARIA.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">🔌 Modular</h3>
            <p className="text-sm text-muted-foreground">
              Arquitectura modular que permite usar solo los componentes que necesitas.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Primeros pasos</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Instalación</CardTitle>
              <CardDescription>
                Aprende cómo instalar y configurar DataTable UI en tu proyecto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/docs/installation">
                  Comenzar instalación
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Una guía rápida para empezar a usar los componentes inmediatamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/docs/quick-start">
                  Ver guía rápida
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
