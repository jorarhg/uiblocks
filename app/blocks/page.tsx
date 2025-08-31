"use client"
import * as React from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Table as TableIcon, Filter, Code2, LayoutTemplate, ChevronRight, ExternalLink, MonitorSmartphone, Copy, Check } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'
import { DataTable, SimpleLineChart, MultiLineChart, LineChartWithReference, SimpleBarChart, StackedBarChart, SimpleAreaChart, DonutChart, ScatterPointsChart, SimpleRadarChart, SimpleHeatmap, HeatmapChart } from '@teribit/ui-blocks'
import { columns as demoColumns, type Task } from '@/app/columns'
import { taskData } from '@/app/data'

// Definición de meta datos de bloques (inspirado en reui.io/blocks)
// BlockMeta ahora importado desde componente reusable

const basicTableCode = `import { DataTable } from '@teribit/ui-blocks'
import { columns } from './columns'
import { data } from './data'

export function Example(){
  return <DataTable columns={columns} data={data} searchKey='title' />
}`

const sampleLineData = Array.from({ length: 8 }).map((_, i) => ({ category: `M${i+1}`, value: Math.round(40+Math.random()*60) }))
const sampleMultiLine = Array.from({ length: 7 }).map((_, i) => ({ category: `Q${i+1}`, serieA: Math.round(20+Math.random()*30), serieB: Math.round(10+Math.random()*40), serieC: Math.round(15+Math.random()*25) }))
const sampleStacked = Array.from({ length: 6 }).map((_, i) => ({ category: `S${i+1}`, alpha: Math.round(10+Math.random()*30), beta: Math.round(5+Math.random()*25) }))
// Datos para otros charts
const donutData = [ { name: 'A', value: 30 }, { name: 'B', value: 25 }, { name: 'C', value: 20 }, { name: 'D', value: 25 } ]
const scatterData = Array.from({ length: 25 }).map(()=> ({ x: Math.round(Math.random()*100), y: Math.round(Math.random()*100), category: Math.random()>0.5? 'Grupo A':'Grupo B' }))
const radarData = [
  { subject: 'Q1', serieA: 30, serieB: 15 },
  { subject: 'Q2', serieA: 45, serieB: 25 },
  { subject: 'Q3', serieA: 50, serieB: 35 },
  { subject: 'Q4', serieA: 40, serieB: 20 },
]
const treemapHeatData = [ { name: 'A', value: 40 }, { name: 'B', value: 25 }, { name: 'C', value: 15 }, { name: 'D', value: 20 } ]
const gridHeatX = ['L','M','X','J','V']
const gridHeatY = ['1','2','3','4','5','6']
const gridHeatData = gridHeatX.flatMap(x=> gridHeatY.map(y=> ({ x, y, value: Math.round(Math.random()*100) })))
// Variante rectangular (más columnas que filas) para demostrar layout rectangular
const gridHeatRectX = Array.from({ length: 12 }).map((_,i)=> `C${i+1}`)
const gridHeatRectY = ['R1','R2','R3','R4','R5']
const gridHeatRectData = gridHeatRectX.flatMap(x=> gridHeatRectY.map(y=> ({ x, y, value: Math.round(Math.random()*100) })))
// Heatmap rectangular con celdas más anchas (valores visibles)
const gridHeatRectWideX = Array.from({ length: 16 }).map((_,i)=> `C${i+1}`)
const gridHeatRectWideY = ['R1','R2','R3','R4']
const gridHeatRectWideData = gridHeatRectWideX.flatMap(x=> gridHeatRectWideY.map(y=> ({ x, y, value: Math.round(Math.random()*100) })))

const blocks: BlockMeta[] = [
  {
    id: 'datatable-basic',
    title: 'DataTable Básico',
  category: 'tables',
    description: 'Tabla con búsqueda, filtros facetados y paginación.',
  preview: <div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,5) as Task[]} searchKey='title' /></div>,
    code: basicTableCode,
    tags: ['table','filter','pagination'],
  status: 'stable',
  fullWidth: true
  },
  {
    id: 'chart-line-simple',
    title: 'Línea Simple',
    category: 'charts',
    description: 'Gráfica de línea con área suave y tooltip personalizado.',
    preview: <div className='rounded-md'><SimpleLineChart data={sampleLineData} /></div>,
  code: `import { SimpleLineChart } from '@teribit/ui-blocks'
const data = [ { category: 'Ene', value: 120 }, { category: 'Feb', value: 95 } ]
<SimpleLineChart data={data} />`,
    tags: ['chart','line'],
    status: 'stable',
  fullWidth: false,
  payload: sampleLineData
  },
  {
    id: 'chart-line-multi',
    title: 'Líneas Múltiples',
    category: 'charts',
    description: 'Varias series sobre el mismo eje comparando tendencias.',
    preview: <div className='rounded-md'><MultiLineChart data={sampleMultiLine} series={['serieA','serieB','serieC']} /></div>,
  code: `import { MultiLineChart } from '@teribit/ui-blocks'
const data = [ { category: 'Q1', serieA: 30, serieB: 42, serieC: 25 } ]
<MultiLineChart data={data} series={['serieA','serieB','serieC']} />`,
    tags: ['chart','line','multi'],
    status: 'stable',
  fullWidth: false,
  payload: sampleMultiLine
  },
  {
    id: 'chart-line-reference',
    title: 'Línea con Meta',
    category: 'charts',
    description: 'Línea con línea de referencia para objetivos.',
    preview: <div className='rounded-md'><LineChartWithReference data={sampleLineData} referenceY={80} /></div>,
  code: `import { LineChartWithReference } from '@teribit/ui-blocks'
<LineChartWithReference data={data} referenceY={80} />`,
    tags: ['chart','line','reference'],
    status: 'stable',
  fullWidth: false,
  payload: sampleLineData
  },
  {
    id: 'chart-bar-simple',
    title: 'Barra Simple',
    category: 'charts',
    description: 'Gráfica de barras para valores discretos.',
    preview: <div className='rounded-md'><SimpleBarChart data={sampleLineData} /></div>,
  code: `import { SimpleBarChart } from '@teribit/ui-blocks'
const data = [ { category: 'Ene', value: 42 } ]
<SimpleBarChart data={data} />`,
    tags: ['chart','bar'],
    status: 'stable',
  fullWidth: false,
  payload: sampleLineData
  },
  {
    id: 'chart-bar-stacked',
    title: 'Barras Apiladas',
    category: 'charts',
    description: 'Comparación de composición entre categorías.',
    preview: <div className='rounded-md'><StackedBarChart data={sampleStacked} series={['alpha','beta']} /></div>,
  code: `import { StackedBarChart } from '@teribit/ui-blocks'
const data = [ { category: 'S1', alpha: 12, beta: 20 } ]
<StackedBarChart data={data} series={['alpha','beta']} />`,
    tags: ['chart','bar','stacked'],
    status: 'stable',
  fullWidth: false,
  payload: sampleStacked
  },
  {
    id: 'chart-area-simple',
    title: 'Área Simple',
    category: 'charts',
    description: 'Área rellena destacando volumen bajo la curva.',
    preview: <div className='rounded-md'><SimpleAreaChart data={sampleLineData} /></div>,
  code: `import { SimpleAreaChart } from '@teribit/ui-blocks'
const data = [ { category: 'Ene', value: 70 } ]
<SimpleAreaChart data={data} />`,
    tags: ['chart','area'],
    status: 'stable',
  fullWidth: false,
  payload: sampleLineData
  },
  {
    id: 'chart-donut',
    title: 'Donut',
    category: 'charts',
    description: 'Distribución porcentual en anillo.',
    preview: <div className='rounded-md'><DonutChart data={donutData} /></div>,
    code: `import { DonutChart } from '@teribit/ui-blocks'
const data = [ { name: 'A', value: 30 }, { name: 'B', value: 25 } ]
<DonutChart data={data} />`,
    tags: ['chart','donut','pie'],
    status: 'beta',
  fullWidth: false,
  payload: donutData
  },
  {
    id: 'chart-scatter',
    title: 'Scatter',
    category: 'charts',
    description: 'Dispersión para correlaciones y clusters.',
    preview: <div className='rounded-md'><ScatterPointsChart data={scatterData} /></div>,
    code: `import { ScatterPointsChart } from '@teribit/ui-blocks'
const data = [ { x: 10, y: 20, category: 'Grupo A' } ]
<ScatterPointsChart data={data} />`,
    tags: ['chart','scatter'],
    status: 'beta',
  fullWidth: false,
  payload: scatterData
  },
  {
    id: 'chart-radar',
    title: 'Radar',
    category: 'charts',
    description: 'Comparación multivariable radial.',
    preview: <div className='rounded-md'><SimpleRadarChart data={radarData} series={['serieA','serieB']} /></div>,
    code: `import { SimpleRadarChart } from '@teribit/ui-blocks'
const data = [ { subject:'Q1', serieA:30, serieB:15 } ]
<SimpleRadarChart data={data} series={['serieA','serieB']} />`,
    tags: ['chart','radar'],
    status: 'beta',
  fullWidth: false,
  payload: radarData
  },
  {
    id: 'chart-heatmap-treemap',
    title: 'Heatmap (Treemap)',
    category: 'charts',
    description: 'Aproximación jerárquica de intensidad.',
    preview: <div className='rounded-md'><SimpleHeatmap data={treemapHeatData} /></div>,
    code: `import { SimpleHeatmap } from '@teribit/ui-blocks'
const data = [ { name:'A', value:40 }, { name:'B', value:25 } ]
<SimpleHeatmap data={data} />`,
    tags: ['chart','heatmap','treemap'],
    status: 'beta',
  fullWidth: false,
  payload: treemapHeatData
  },
  {
    id: 'chart-heatmap-grid',
    title: 'Heatmap Grid',
    category: 'charts',
    description: 'Heatmap real en grid SVG con tooltip.',
    preview: <div className='rounded-md'><HeatmapChart data={gridHeatData} /></div>,
    code: `import { HeatmapChart } from '@teribit/ui-blocks'
const data = [ { x:'L', y:'1', value:12 } ]
<HeatmapChart data={data} />`,
    tags: ['chart','heatmap','grid'],
    status: 'beta',
  fullWidth: false,
  payload: gridHeatData
  },
  {
    id: 'chart-heatmap-grid-rect',
    title: 'Heatmap Grid Rect',
    category: 'charts',
    description: 'Heatmap rectangular con gap, ejes y sin valores en celdas.',
    preview: <div className='rounded-md'><HeatmapChart data={gridHeatRectData} gap={0.18} showAxes showCellValues={false} /></div>,
    code: `import { HeatmapChart } from '@teribit/ui-blocks'
const xKeys = ['C1','C2','C3','C4','C5','C6']
const yKeys = ['R1','R2','R3']
const data = xKeys.flatMap(x=> yKeys.map(y=> ({ x, y, value: Math.round(Math.random()*100) })))
<HeatmapChart data={data} gap={0.18} showAxes showCellValues={false} />`,
    tags: ['chart','heatmap','grid','rect'],
    status: 'beta',
  fullWidth: false,
  payload: gridHeatRectData
  },
  {
    id: 'chart-heatmap-grid-rect-values',
    title: 'Heatmap Grid Rect Valores',
    category: 'charts',
    description: 'Heatmap rectangular con celdas rectangulares y valores visibles.',
    preview: <div className='rounded-md'><HeatmapChart data={gridHeatRectWideData} height={180} gap={0.12} showAxes showCellValues /></div>,
    code: `import { HeatmapChart } from '@teribit/ui-blocks'
const xKeys = Array.from({length:16}).map((_,i)=> 'C'+(i+1))
const yKeys = ['R1','R2','R3','R4']
const data = xKeys.flatMap(x=> yKeys.map(y=> ({ x, y, value: Math.round(Math.random()*100) })))
<HeatmapChart data={data} height={180} gap={0.12} showAxes showCellValues />`,
    tags: ['chart','heatmap','grid','rect','values'],
    status: 'beta',
  fullWidth: false,
  payload: gridHeatRectWideData
  },
  {
    id: 'datatable-filters',
    title: 'DataTable con Filtros',
    category: 'tables',
    description: 'Incluye filtros facetados para status y prioridad.',
    preview: (
      <div className='rounded-md'>
        <DataTable
          columns={demoColumns as any}
          data={taskData.slice(0,8) as Task[]}
          searchKey='title'
          filters={[
            { columnId: 'status', title: 'Status', options: [
              { label: 'Backlog', value: 'backlog' },
              { label: 'Todo', value: 'todo' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Done', value: 'done' },
              { label: 'Canceled', value: 'canceled' },
            ]},
            { columnId: 'priority', title: 'Priority', options: [
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ]},
          ]}
          // Nota: la funcionalidad de filtros y columnas depende de DataTableViewOptions y DataTableFacetedFilter
        />
      </div>
    ),
    code: '// Ejemplo con filtros facetados... (pendiente de snippet completo)',
    tags: ['filters','facet'],
  status: 'stable',
  fullWidth: true
  },
  {
    id: 'datatable-search-placeholder',
    title: 'Placeholder personalizado',
    category: 'tables',
    description: 'Cambia el placeholder para guiar al usuario.',
    preview: (
      <div className='rounded-md'>
        <DataTable
          columns={demoColumns as any}
          data={taskData.slice(0,6) as Task[]}
          searchKey='title'
          searchPlaceholder='Buscar tarea por título...'
        />
      </div>
    ),
    code: '// Ejemplo con placeholder de búsqueda',
    tags: ['search','ux'],
  status: 'beta',
  fullWidth: true
  },
  {
    id: 'datatable-reorder',
    title: 'Reordenar columnas (Drag & Drop)',
    category: 'tables',
    description: 'Permite arrastrar encabezados para cambiar el orden de las columnas.',
    preview: (
      <div className='rounded-md'>
        <DataTable
          columns={demoColumns as any}
          data={taskData.slice(0,7) as Task[]}
          searchKey='title'
          enableColumnReorder
        />
      </div>
    ),
    code: `// Reordenación de columnas
<DataTable
  columns={columns}
  data={data}
  enableColumnReorder
  searchKey='title'
/>`,
    tags: ['dnd','reorder'],
    status: 'beta',
    fullWidth: true
  },
  {
    id: 'datatable-grouping',
    title: 'Agrupación de filas',
    category: 'tables',
    description: 'Agrupa por status y/o priority, expandiendo para ver filas hijas.',
    preview: (
      <div className='rounded-md'>
        <DataTable
          columns={demoColumns as any}
          data={taskData.slice(0,12) as Task[]}
          searchKey='title'
          enableGrouping
          groupableColumns={['status','priority']}
          filters={[{ columnId:'status', title:'Status', options:[
            {label:'Backlog', value:'backlog'},{label:'Todo', value:'todo'},{label:'In Progress', value:'in-progress'},{label:'Done', value:'done'},{label:'Canceled', value:'canceled'}
          ]}]}
        />
      </div>
    ),
    code: `// Agrupación
<DataTable
  columns={columns}
  data={data}
  enableGrouping
  groupableColumns={['status','priority']}
  searchKey='title'
/>`,
    tags: ['group','expand'],
    status: 'beta',
    fullWidth: true
  },
]

// Agrupar categorías para la barra lateral (placeholder de futuras secciones)
// Sidebar anterior eliminado: se mantiene listado plano de bloques

export default function BlocksPage(){
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Cargando bloques…</div>}>
      <BlocksPageContent />
    </Suspense>
  )
}

function BlocksPageContent(){
  const filtered = blocks
  const tableBlocks = filtered.filter(b=> b.category==='tables')
  const chartBlocks = filtered.filter(b=> b.category==='charts')

  return (
    <div className="py-6 md:py-10">
  <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        {/* Main content (sidebar removido) */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb simple */}
          <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <span className="text-foreground font-medium">Blocks</span>
          </div>

          {/* Header */}
          <div className="mb-6 md:mb-8 space-y-3">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Bloques reutilizables</h1>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">Colección de bloques listos para usar con enfoque en productividad y consistencia visual. Vista previa interactiva y código limpio.</p>
          </div>

          {/* Tabs globales para vista colectiva (si se desea cambiar a code para todos) */}
          {/* Por ahora cada tarjeta mantiene sus propias tabs */}

          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-muted-foreground">{filtered.length} bloque{filtered.length!==1 && 's'}</div>
            <div className="hidden md:flex items-center gap-1 text-xs">
              <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 border text-muted-foreground hover:text-foreground hover:bg-accent transition"><MonitorSmartphone className="h-3.5 w-3.5" /> Viewports</button>
              <span className="mx-2 h-4 w-px bg-border" />
              <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 border font-medium hover:bg-accent transition"><ExternalLink className="h-3.5 w-3.5" /> Abrir</button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground border rounded-md p-8">No hay bloques todavía.</div>
          ) : (
            <div className='space-y-12'>
              <section id='tables' className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-semibold tracking-tight'>Tablas</h2>
                  <span className='text-xs text-muted-foreground'>{tableBlocks.length} ejemplo{tableBlocks.length!==1 && 's'}</span>
                </div>
                <div className='grid gap-8 md:grid-cols-12'>
                  {tableBlocks.map(block=> {
                    const base = block.fullWidth ? 'md:col-span-12' : 'md:col-span-6 xl:col-span-4'
                    return (
                      <div key={block.id} className={base}>
                        <BlockCard block={block} />
                      </div>
                    )
                  })}
                </div>
              </section>
              <section id='charts' className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-semibold tracking-tight'>Gráficas</h2>
                  <span className='text-xs text-muted-foreground'>{chartBlocks.length} ejemplo{chartBlocks.length!==1 && 's'}</span>
                </div>
                <div className='grid gap-8 md:grid-cols-12'>
                  {chartBlocks.map(block=> {
                    const base = block.fullWidth ? 'md:col-span-12' : 'md:col-span-6 xl:col-span-6'
                    return (
                      <div key={block.id} className={base}>
                        <BlockCard block={block} />
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// BlockCard reutilizado (Preview / Code / Payload)
