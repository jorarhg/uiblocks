"use client"
import React from 'react'
import { HeatmapChart, SimpleHeatmap, type HeatmapCellDatum, type HeatmapDatum } from '@teribit/ui-blocks'

// Datos para heatmap simple (treemap jerárquico)
const treemapData: HeatmapDatum[] = [
  { name: 'A', value: 40 },
  { name: 'B', value: 25 },
  { name: 'C', value: 15 },
  { name: 'D', value: 20 },
]

// Datos para heatmap real en grid
const xLabels = ['L','M','X','J','V']
const yLabels = ['1','2','3','4','5','6']
const gridData: HeatmapCellDatum[] = xLabels.flatMap(x => yLabels.map(y => ({ x, y, value: Math.round(Math.random()*100) })))

export default function HeatmapExamplesPage(){
  return (
    <div className="space-y-12 py-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Heatmaps</h1>
        <p className="text-muted-foreground text-sm max-w-prose">Dos variantes: un <strong>SimpleHeatmap</strong> usando Treemap para distribuciones jerárquicas y un <strong>HeatmapChart</strong> real en forma de grid SVG con tooltip y formateo de valores.</p>
      </section>
      <section className="space-y-4">
        <div className="rounded-lg border p-4 bg-card">
          <h2 className="font-medium mb-2 text-sm uppercase tracking-wide text-muted-foreground">Treemap Approx</h2>
          <SimpleHeatmap data={treemapData} />
        </div>
      </section>
      <section className="space-y-4">
        <div className="rounded-lg border p-4 bg-card">
          <h2 className="font-medium mb-2 text-sm uppercase tracking-wide text-muted-foreground">Heatmap Grid (con tooltip)</h2>
          <HeatmapChart data={gridData} valueFormatter={(v)=> v + '%'} />
        </div>
      </section>
    </div>
  )
}
