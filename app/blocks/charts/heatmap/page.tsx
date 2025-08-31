"use client"
import { HeatmapChart } from '@teribit/ui-blocks'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

const heatmapData = Array.from({length: 7}).flatMap((_, y) => Array.from({length: 7}).map((_, x) => ({ x, y, value: (x*7 + y*11) % 100 })))

// Datos adicionales deterministas para ejemplos extra
const rectData = Array.from({length: 5}).flatMap((_, y) => Array.from({length: 12}).map((_, x) => ({ x, y, value: (x*13 + y*17) % 100 })))
const rectValuesData = Array.from({length: 4}).flatMap((_, y) => Array.from({length: 16}).map((_, x) => ({ x, y, value: (x*19 + y*23) % 100 })))

const heatBlocks: BlockMeta[] = [
  { id: 'chart-heatmap-basic', title: 'Heatmap Básico', category: 'charts', description: 'Distribución de intensidad en grilla.', preview: <div className='rounded-md'><HeatmapChart data={heatmapData} width={420} title='Actividad Semanal' /></div>, code: `<HeatmapChart data={data} width={420} title='Actividad Semanal' />`, status: 'beta', tags:['heatmap','grid'], payload: heatmapData },
  { id: 'chart-heatmap-colored', title: 'Heatmap Colores Custom', category: 'charts', description: 'Gradiente personalizado con stops.', preview: <div className='rounded-md'><HeatmapChart data={heatmapData} width={420} title='Patrón de Intensidad' baseColor='#6366f1' colorStops={['#eef2ff','#6366f1','#312e81']} /></div>, code: `<HeatmapChart data={data} width={420} title='Patrón de Intensidad' baseColor='#6366f1' colorStops={['#eef2ff','#6366f1','#312e81']} />`, status: 'beta', tags:['heatmap','gradient'], payload: heatmapData },
  { id: 'chart-heatmap-rect', title: 'Heatmap Rectangular', category: 'charts', description: 'Layout rectangular con gap y ejes.', preview: <div className='rounded-md'><HeatmapChart data={rectData} width={420} gap={0.18} showAxes showCellValues={false} title='Rectangular' /></div>, code: `<HeatmapChart data={data} width={420} gap={0.18} showAxes title='Rectangular' />`, status: 'beta', tags:['heatmap','rect'], payload: rectData },
  { id: 'chart-heatmap-rect-values', title: 'Heatmap Rect Valores', category: 'charts', description: 'Rectangular con valores visibles.', preview: <div className='rounded-md'><HeatmapChart data={rectValuesData} width={420} height={180} gap={0.12} showAxes showCellValues title='Rect Valores' /></div>, code: `<HeatmapChart data={data} width={420} height={180} gap={0.12} showAxes showCellValues title='Rect Valores' />`, status: 'beta', tags:['heatmap','rect','values'], payload: rectValuesData },
]

export default function HeatmapChartsBlock(){
  return (
    <div className='space-y-12 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>Heatmaps</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Variantes de heatmap cuadricular y configuración de colores.</p>
      </header>
      <section className='grid gap-8 md:grid-cols-2'>
        {heatBlocks.map(b => (
          <div key={b.id}>
            <BlockCard block={b} />
          </div>
        ))}
      </section>
    </div>
  )
}
