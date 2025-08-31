"use client"
import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// Definición de meta datos de bloques (inspirado en reui.io/blocks)
// BlockMeta ahora importado desde componente reusable

// Página índice mínima: ya no contiene ejemplos duplicados.

export default function BlocksPage(){
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Cargando bloques…</div>}>
      <BlocksPageContent />
    </Suspense>
  )
}

function BlocksPageContent(){
  return (
    <div className="py-10">
      <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-10">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Blocks Overview</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">Selecciona una categoría para ver los ejemplos consolidados. Cada categoría tiene su propia página con scrollspy y anchors.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/blocks/data-tables" className="group rounded-lg border p-6 hover:bg-accent transition space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">DataTables <span className="text-xs font-medium rounded bg-primary/10 text-primary px-2 py-0.5 group-hover:bg-primary/15">Tablas</span></h2>
            <p className="text-xs text-muted-foreground leading-relaxed">Búsqueda, filtros facetados, placeholder, reordenación y agrupación en una sola página.</p>
            <span className="text-xs inline-flex items-center gap-1 text-primary font-medium">Ver ejemplos <ChevronRight className="h-3 w-3" /></span>
          </Link>
          <Link href="/blocks/charts" className="group rounded-lg border p-6 hover:bg-accent transition space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">Charts <span className="text-xs font-medium rounded bg-primary/10 text-primary px-2 py-0.5 group-hover:bg-primary/15">Gráficas</span></h2>
            <p className="text-xs text-muted-foreground leading-relaxed">Líneas, barras, áreas, distribución, radar y heatmaps consolidados.</p>
            <span className="text-xs inline-flex items-center gap-1 text-primary font-medium">Ver ejemplos <ChevronRight className="h-3 w-3" /></span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// BlockCard reutilizado (Preview / Code / Payload)
