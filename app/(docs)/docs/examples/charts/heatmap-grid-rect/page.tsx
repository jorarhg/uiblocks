"use client"
import React from 'react'
import { HeatmapChart, type HeatmapCellDatum } from '@teribit/ui-blocks'

// Ejemplo rectangular (más columnas que filas) con separación y ejes
const xLabels = ['L','M','X','J','V','S','D','L2','M2','X2']
const yLabels = ['Mañana','Tarde','Noche']
const data: HeatmapCellDatum[] = xLabels.flatMap(x => yLabels.map(y => ({ x, y, value: Math.round(Math.random()*100) })))

export default function HeatmapRectExample(){
  return (
    <div className='space-y-8 py-8'>
      <header className='space-y-2'>
        <h1 className='text-2xl font-semibold tracking-tight'>Heatmap Grid (Rectangular)</h1>
        <p className='text-sm text-muted-foreground max-w-prose'>Ejemplo con formato rectangular (más columnas que filas), separación entre celdas y ejes visibles en la parte inferior y lateral izquierda.</p>
      </header>
      <div className='rounded-lg border bg-card p-4'>
        <HeatmapChart data={data} gap={0.15} showAxes height={260} />
      </div>
    </div>
  )
}
