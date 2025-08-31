"use client"
import { SimpleLineChart, MultiLineChart, LineChartWithReference, SimpleBarChart, StackedBarChart, SimpleAreaChart, DonutChart, ScatterPointsChart, SimpleRadarChart, SimpleHeatmap, HeatmapChart, GaugeChart } from '@teribit/ui-blocks'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

// Datos deterministas para payloads consistentes
const lineData = Array.from({ length: 6 }).map((_, i) => ({ category: `M${i+1}`, value: 40 + i * 7 }))
const multiLine = Array.from({ length: 6 }).map((_, i) => ({ category: `S${i+1}`, serieA: 20 + i * 4, serieB: 25 + i * 3, serieC: 15 + i * 5 }))
const stacked = Array.from({ length: 5 }).map((_, i) => ({ category: `C${i+1}`, alpha: 12 + i * 5, beta: 18 + i * 4 }))
const donutData = [ { name: 'A', value: 35 }, { name: 'B', value: 25 }, { name: 'C', value: 15 }, { name: 'D', value: 25 } ]
const scatterData = Array.from({ length: 18 }).map((_, i) => ({ x: i * 6 + 5, y: (i * 11) % 100, category: i % 2 ? 'Grupo A' : 'Grupo B' }))
const radarData = [
  { subject: 'Q1', serieA: 32, serieB: 18 },
  { subject: 'Q2', serieA: 45, serieB: 26 },
  { subject: 'Q3', serieA: 50, serieB: 34 },
  { subject: 'Q4', serieA: 42, serieB: 22 },
]
const heatGridX = ['L','M','X','J','V']
const heatGridY = ['1','2','3','4']
const heatGrid = heatGridX.flatMap(x => heatGridY.map(y => ({ x, y, value: (x.charCodeAt(0) + y.charCodeAt(0)) % 100 })))
// Datos adicionales para variantes extra de heatmap
const heatmapData = Array.from({length:7}).flatMap((_, y) => Array.from({length:7}).map((_, x) => ({ x, y, value: (x*7 + y*11) % 100 })))
const rectValuesData = Array.from({length:4}).flatMap((_, y) => Array.from({length:16}).map((_, x) => ({ x, y, value: (x*19 + y*23) % 100 })))

const chartBlocks: BlockMeta[] = [
  { id: 'chart-line-simple', title: 'Línea Simple', category: 'charts', description: 'Serie única con área.', preview: <div className='rounded-md'><SimpleLineChart data={lineData} /></div>, code: `<SimpleLineChart data={data} />`, status: 'stable', tags:['line'], payload: lineData },
  { id: 'chart-line-multi', title: 'Líneas Múltiples', category: 'charts', description: 'Comparación de varias series.', preview: <div className='rounded-md'><MultiLineChart data={multiLine} series={['serieA','serieB','serieC']} /></div>, code: `<MultiLineChart data={data} series={['serieA','serieB','serieC']} />`, status: 'stable', tags:['line','multi'], payload: multiLine },
  { id: 'chart-line-reference', title: 'Línea con Meta', category: 'charts', description: 'Incluye línea de referencia.', preview: <div className='rounded-md'><LineChartWithReference data={lineData} referenceY={70} /></div>, code: `<LineChartWithReference data={data} referenceY={70} />`, status: 'stable', tags:['line','reference'], payload: lineData },
  { id: 'chart-bar-simple', title: 'Barra Simple', category: 'charts', description: 'Comparación categórica simple.', preview: <div className='rounded-md'><SimpleBarChart data={lineData} /></div>, code: `<SimpleBarChart data={data} />`, status: 'stable', tags:['bar'], payload: lineData },
  { id: 'chart-bar-stacked', title: 'Barras Apiladas', category: 'charts', description: 'Composición por categoría.', preview: <div className='rounded-md'><StackedBarChart data={stacked} series={['alpha','beta']} /></div>, code: `<StackedBarChart data={data} series={['alpha','beta']} />`, status: 'stable', tags:['bar','stacked'], payload: stacked },
  { id: 'chart-area-simple', title: 'Área Simple', category: 'charts', description: 'Área bajo la curva.', preview: <div className='rounded-md'><SimpleAreaChart data={lineData} /></div>, code: `<SimpleAreaChart data={data} />`, status: 'stable', tags:['area'], payload: lineData },
  { id: 'chart-donut', title: 'Donut', category: 'charts', description: 'Distribución porcentual.', preview: <div className='rounded-md'><DonutChart data={donutData} /></div>, code: `<DonutChart data={data} />`, status: 'beta', tags:['donut'], payload: donutData },
  { id: 'chart-scatter', title: 'Scatter', category: 'charts', description: 'Correlación y clusters.', preview: <div className='rounded-md'><ScatterPointsChart data={scatterData} /></div>, code: `<ScatterPointsChart data={data} />`, status: 'beta', tags:['scatter'], payload: scatterData },
  { id: 'chart-radar', title: 'Radar', category: 'charts', description: 'Perfil multivariable.', preview: <div className='rounded-md'><SimpleRadarChart data={radarData} series={['serieA','serieB']} /></div>, code: `<SimpleRadarChart data={data} series={['serieA','serieB']} />`, status: 'beta', tags:['radar'], payload: radarData },
  { id: 'chart-heatmap-grid', title: 'Heatmap Grid', category: 'charts', description: 'Intensidad en grilla.', preview: <div className='rounded-md'><HeatmapChart data={heatGrid} /></div>, code: `<HeatmapChart data={data} />`, status: 'beta', tags:['heatmap','grid'], payload: heatGrid },
  { id: 'chart-heatmap-treemap', title: 'Heatmap Treemap', category: 'charts', description: 'Treemap intensidades.', preview: <div className='rounded-md'><SimpleHeatmap data={[{ name:'A', value:40 }, { name:'B', value:25 }, { name:'C', value:15 }, { name:'D', value:20 }]} /></div>, code: `<SimpleHeatmap data={data} />`, status: 'beta', tags:['heatmap','treemap'], payload: [{ name:'A', value:40 }, { name:'B', value:25 }, { name:'C', value:15 }, { name:'D', value:20 }] },
  { id: 'chart-heatmap-colored', title: 'Heatmap Colores Custom', category: 'charts', description: 'Gradiente personalizado con stops.', preview: <div className='rounded-md'><HeatmapChart data={heatmapData} baseColor='#6366f1' colorStops={['#eef2ff','#6366f1','#312e81']} title='Patrón de Intensidad' /></div>, code: `<HeatmapChart data={data} baseColor='#6366f1' colorStops={["#eef2ff","#6366f1","#312e81"]} title='Patrón de Intensidad' />`, status: 'beta', tags:['heatmap','gradient'], payload: heatmapData },
  { id: 'chart-heatmap-rect-values', title: 'Heatmap Rect Valores', category: 'charts', description: 'Rectangular con valores visibles.', preview: <div className='rounded-md'><HeatmapChart data={rectValuesData} height={180} gap={0.12} showAxes showCellValues title='Rect Valores' /></div>, code: `<HeatmapChart data={data} height={180} gap={0.12} showAxes showCellValues title='Rect Valores' />`, status: 'beta', tags:['heatmap','rect','values'], payload: rectValuesData },
  { id: 'chart-gauge', title: 'Gauge', category: 'charts', description: 'Indicador semicircular de progreso/uso.', preview: <div className='rounded-md'><GaugeChart value={72} maxValue={100} label='Uso' /></div>, code: `<GaugeChart value={72} maxValue={100} label='Uso' />`, status: 'beta', tags:['gauge','radial'], payload: [{ value:72, max:100 }] },
]

const groups: { title: string; id: string; match: (b: BlockMeta)=> boolean }[] = [
  { title: 'Líneas', id: 'charts-lines', match: b=> b.id.startsWith('chart-line') },
  { title: 'Barras / Área', id: 'charts-bars', match: b=> b.id.includes('bar') || b.id.includes('area') },
  { title: 'Distribución', id: 'charts-distribucion', match: b=> ['chart-donut','chart-scatter','chart-radar'].includes(b.id) },
  { title: 'Heatmaps', id: 'charts-heatmaps', match: b=> b.id.includes('heatmap') },
  { title: 'Gauge', id: 'charts-gauge', match: b=> b.id.includes('gauge') },
]

export default function ChartsBlocksPage(){
  return (
    <div className='space-y-14 py-8 md:py-12' data-block-root>
      <section id='charts-overview' className='space-y-3'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>Chart Blocks</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base leading-relazed'>Colección de bloques de visualización listos para usar.</p>
      </section>
      {groups.map(g => {
        const subset = chartBlocks.filter(g.match)
        if(!subset.length) return null
        return (
          <section key={g.id} id={g.id} className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold tracking-tight'>{g.title}</h2>
              <span className='text-xs text-muted-foreground'>{subset.length} ejemplo{subset.length!==1 && 's'}</span>
            </div>
            <div className='grid gap-8 md:grid-cols-2'>
              {subset.map(block => (
                <div key={block.id}>
                  <BlockCard block={block} />
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
