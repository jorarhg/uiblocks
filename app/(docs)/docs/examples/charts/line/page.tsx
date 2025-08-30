"use client"
import React from "react"
import { SimpleLineChart, MultiLineChart, LineChartWithReference, type LineDatum } from "@teribit/ui-blocks"

const simpleData: LineDatum[] = Array.from({ length: 12 }).map((_, i) => ({
  category: `M${i+1}`,
  value: Math.round(50 + Math.random()*50)
}))

const multiData: LineDatum[] = Array.from({ length: 10 }).map((_, i) => ({
  category: `T${i+1}`,
  serieA: Math.round(20 + Math.random()*40),
  serieB: Math.round(10 + Math.random()*50),
  serieC: Math.round(30 + Math.random()*30),
}))

const refData: LineDatum[] = simpleData.map(d => ({ ...d, value: d.value }))

export default function LineChartsExamplesPage() {
  return (
    <div className="space-y-12 py-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Line Charts</h1>
        <p className="text-muted-foreground text-sm max-w-prose">Ejemplos de gráficas de líneas basados en Recharts siguiendo la línea visual del sistema. Incluyen estilos adaptados al tema y componentes reutilizables.</p>
        <div className="rounded-lg border p-4 bg-card">
          <h2 className="font-medium mb-2 text-sm uppercase tracking-wide text-muted-foreground">Simple</h2>
          <SimpleLineChart data={simpleData} />
        </div>
      </section>
      <section className="space-y-4">
        <div className="rounded-lg border p-4 bg-card">
          <h2 className="font-medium mb-2 text-sm uppercase tracking-wide text-muted-foreground">Múltiples series</h2>
          <MultiLineChart data={multiData} series={["serieA","serieB","serieC"]} />
        </div>
      </section>
      <section className="space-y-4">
        <div className="rounded-lg border p-4 bg-card">
          <h2 className="font-medium mb-2 text-sm uppercase tracking-wide text-muted-foreground">Con referencia</h2>
          <LineChartWithReference data={refData} referenceY={90} />
        </div>
      </section>
    </div>
  )
}
