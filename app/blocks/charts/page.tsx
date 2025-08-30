"use client"
import { SimpleLineChart, MultiLineChart, LineChartWithReference, SimpleBarChart, StackedBarChart, SimpleAreaChart } from '@teribit/ui-blocks'

const lineData = Array.from({ length: 10 }).map((_, i) => ({ category: `M${i+1}`, value: Math.round(50+Math.random()*70) }))
const multiLine = Array.from({ length: 10 }).map((_, i) => ({ category: `W${i+1}`, serieA: Math.round(20+Math.random()*40), serieB: Math.round(10+Math.random()*50), serieC: Math.round(15+Math.random()*45) }))
const stacked = Array.from({ length: 8 }).map((_, i) => ({ category: `S${i+1}`, alpha: Math.round(10+Math.random()*30), beta: Math.round(15+Math.random()*25) }))

export default function ChartsBlocksPage(){
  return (
    <div className='space-y-12 py-8 md:py-12'>
      <header className='space-y-3'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>Chart Blocks</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed'>Colección de bloques de visualización listos para usar, construidos sobre Recharts con estilos integrados de UI Blocks.</p>
      </header>

  <section className='grid gap-8 grid-cols-1 sm:grid-cols-2'>
        <div className='space-y-3'>
          <h2 className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>Línea Simple</h2>
          <div className='rounded-lg border p-4 bg-card'>
            <SimpleLineChart data={lineData} />
          </div>
          <pre className='bg-muted/50 text-xs p-4 rounded-md overflow-x-auto'><code>{`import { SimpleLineChart } from '@teribit/ui-blocks'

<SimpleLineChart data={data} />`}</code></pre>
        </div>
        <div className='space-y-3'>
          <h2 className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>Líneas Múltiples</h2>
          <div className='rounded-lg border p-4 bg-card'>
            <MultiLineChart data={multiLine} series={['serieA','serieB','serieC']} />
          </div>
          <pre className='bg-muted/50 text-xs p-4 rounded-md overflow-x-auto'><code>{`import { MultiLineChart } from '@teribit/ui-blocks'

<MultiLineChart data={data} series={['serieA','serieB','serieC']} />`}</code></pre>
        </div>
        <div className='space-y-3'>
          <h2 className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>Meta / Referencia</h2>
          <div className='rounded-lg border p-4 bg-card'>
            <LineChartWithReference data={lineData} referenceY={90} />
          </div>
          <pre className='bg-muted/50 text-xs p-4 rounded-md overflow-x-auto'><code>{`import { LineChartWithReference } from '@teribit/ui-blocks'

<LineChartWithReference data={data} referenceY={90} />`}</code></pre>
        </div>
        <div className='space-y-3'>
          <h2 className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>Barra Simple</h2>
          <div className='rounded-lg border p-4 bg-card'>
            <SimpleBarChart data={lineData} />
          </div>
          <pre className='bg-muted/50 text-xs p-4 rounded-md overflow-x-auto'><code>{`import { SimpleBarChart } from '@teribit/ui-blocks'

<SimpleBarChart data={data} />`}</code></pre>
        </div>
        <div className='space-y-3'>
          <h2 className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>Barras Apiladas</h2>
          <div className='rounded-lg border p-4 bg-card'>
            <StackedBarChart data={stacked} series={['alpha','beta']} />
          </div>
          <pre className='bg-muted/50 text-xs p-4 rounded-md overflow-x-auto'><code>{`import { StackedBarChart } from '@teribit/ui-blocks'

<StackedBarChart data={data} series={['alpha','beta']} />`}</code></pre>
        </div>
        <div className='space-y-3'>
          <h2 className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>Área Simple</h2>
          <div className='rounded-lg border p-4 bg-card'>
            <SimpleAreaChart data={lineData} />
          </div>
          <pre className='bg-muted/50 text-xs p-4 rounded-md overflow-x-auto'><code>{`import { SimpleAreaChart } from '@teribit/ui-blocks'

<SimpleAreaChart data={data} />`}</code></pre>
        </div>
      </section>
    </div>
  )
}
