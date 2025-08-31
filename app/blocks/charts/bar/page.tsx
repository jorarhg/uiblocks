"use client"
import { SimpleBarChart, StackedBarChart } from '@teribit/ui-blocks'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

const barData = Array.from({ length: 6 }).map((_, i) => ({ category: `C${i+1}`, value: 25 + i * 10 }))
const stackedData = Array.from({ length: 6 }).map((_, i) => ({ category: `S${i+1}`, a: 5 + i * 4, b: 8 + i * 3, c: 4 + i * 2 }))

const barBlocks: BlockMeta[] = [
  { id: 'chart-bar-simple', title: 'Barras Simples', category: 'charts', description: 'Comparación directa entre categorías.', preview: <div className='rounded-md'><SimpleBarChart data={barData} /></div>, code: `<SimpleBarChart data={data} />`, status: 'stable', tags:['bar'], payload: barData },
  { id: 'chart-bar-stacked', title: 'Barras Apiladas', category: 'charts', description: 'Composición de series por categoría.', preview: <div className='rounded-md'><StackedBarChart data={stackedData} series={['a','b','c']} /></div>, code: `<StackedBarChart data={data} series={['a','b','c']} />`, status: 'stable', tags:['bar','stacked'], payload: stackedData },
]

export default function BarChartsBlock(){
  return (
    <div className='space-y-12 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>Bar Charts</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Variantes de barras simples y apiladas para comparar categorías.</p>
      </header>
      <section className='grid gap-8 md:grid-cols-2'>
        {barBlocks.map(b => (
          <div key={b.id}>
            <BlockCard block={b} />
          </div>
        ))}
      </section>
    </div>
  )
}
