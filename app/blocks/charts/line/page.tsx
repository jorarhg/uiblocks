"use client"
import { SimpleLineChart, MultiLineChart, LineChartWithReference } from '@teribit/ui-blocks'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

const lineData = Array.from({ length: 8 }).map((_, i) => ({ category: `M${i+1}`, value: 50 + i * 5 }))
const multiLine = Array.from({ length: 8 }).map((_, i) => ({ category: `Q${i+1}`, serieA: 20 + i * 4, serieB: 15 + i * 5, serieC: 10 + i * 3 }))

const lineBlocks: BlockMeta[] = [
  { id: 'chart-line-simple', title: 'Línea Simple', category: 'charts', description: 'Tendencia básica con área.', preview: <div className='rounded-md'><SimpleLineChart data={lineData} /></div>, code: `<SimpleLineChart data={data} />`, status: 'stable', tags:['line'], payload: lineData },
  { id: 'chart-line-multi', title: 'Líneas Múltiples', category: 'charts', description: 'Comparación de series múltiples.', preview: <div className='rounded-md'><MultiLineChart data={multiLine} series={['serieA','serieB','serieC']} /></div>, code: `<MultiLineChart data={data} series={['serieA','serieB','serieC']} />`, status: 'stable', tags:['line','multi'], payload: multiLine },
  { id: 'chart-line-reference', title: 'Línea con Meta', category: 'charts', description: 'Incluye línea de referencia para objetivo.', preview: <div className='rounded-md'><LineChartWithReference data={lineData} referenceY={80} /></div>, code: `<LineChartWithReference data={data} referenceY={80} />`, status: 'stable', tags:['line','reference'], payload: lineData },
]

export default function LineChartsBlock(){
  return (
    <div className='space-y-12 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>Line Charts</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Variantes para tendencias simples, múltiples series y líneas de referencia.</p>
      </header>
      <section className='grid gap-8 md:grid-cols-2'>
        {lineBlocks.map(b => (
          <div key={b.id}>
            <BlockCard block={b} />
          </div>
        ))}
      </section>
    </div>
  )
}
