import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip, ScatterChart, Scatter, XAxis, YAxis, ZAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts'
import { chartColor } from './palette'
import { ChartContainer, ChartTooltipContent, ChartTooltip, type ChartConfig } from '../ui/chart'
import { cn } from '../internal/lib/utils'

// ---------- Donut Chart ----------
export interface DonutDatum { name: string; value: number; fill?: string }
export const DonutChart: React.FC<{ data: DonutDatum[]; height?: number; innerRadius?: number; outerRadius?: number; config?: ChartConfig; className?: string }>=({ data, height=260, innerRadius=60, outerRadius=100, config, className })=>{
  const cfg: ChartConfig = config || data.reduce((acc, d, i)=>{ acc[d.name] = { label: d.name, color: d.fill || chartColor(i) }; return acc }, {} as ChartConfig)
  return (
    <ChartContainer config={cfg} className={cn('w-full', className)} style={{ height }}>
      <PieChart>
        <Pie data={data} dataKey='value' nameKey='name' innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={2} stroke='none'>
          {data.map((d,i)=>(<Cell key={i} fill={d.fill || chartColor(i)} />))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

// ---------- Scatter Chart ----------
export interface ScatterDatum { x: number; y: number; z?: number; category?: string }
export const ScatterPointsChart: React.FC<{ data: ScatterDatum[]; height?: number; showZ?: boolean; className?: string }>=({ data, height=260, showZ=false, className })=>{
  // series por category
  const groups = data.reduce<Record<string, ScatterDatum[]>>((acc,d)=>{ const key = d.category||'Serie'; (acc[key]=acc[key]||[]).push(d); return acc }, {})
  const config: ChartConfig = Object.keys(groups).reduce((a,k,i)=>{ a[k]={ label:k, color: chartColor(i) }; return a }, {} as ChartConfig)
  return (
    <ChartContainer config={config} className={cn('w-full', className)} style={{ height }}>
      <ScatterChart margin={{ top: 8, right: 12, bottom: 8, left: 12 }}>
        <XAxis dataKey='x' type='number' tickLine={false} axisLine={false} />
        <YAxis dataKey='y' type='number' tickLine={false} axisLine={false} />
        {showZ && <ZAxis dataKey='z' range={[40,400]} />}
        <ChartTooltip content={<ChartTooltipContent />} />
        {Object.entries(groups).map(([k,vals],i)=>(
          <Scatter key={k} name={k} data={vals} fill={chartColor(i)} />
        ))}
      </ScatterChart>
    </ChartContainer>
  )
}

// ---------- Radar Chart ----------
export interface RadarDatum { subject: string; [serie: string]: any }
export const SimpleRadarChart: React.FC<{ data: RadarDatum[]; series: string[]; height?: number; className?: string }> = ({ data, series, height=300, className }) => {
  const config: ChartConfig = series.reduce((acc,s,i)=>{ acc[s]={ label:s, color: chartColor(i) }; return acc }, {} as ChartConfig)
  return (
    <ChartContainer config={config} className={cn('w-full', className)} style={{ height }}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis />
        {series.map((s,i) => (
          <Radar key={s} dataKey={s} stroke={chartColor(i)} fill={chartColor(i)} fillOpacity={0.2} />
        ))}
        <ChartTooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

// ---------- Heatmap (Treemap approximation) ----------
export interface HeatmapDatum { name: string; value: number; children?: HeatmapDatum[]; fill?: string }
export const SimpleHeatmap: React.FC<{ data: HeatmapDatum[]; height?: number; className?: string }> = ({ data, height=300, className }) => {
  // Treemap como aproximación de heatmap jerárquico
  const config: ChartConfig = data.reduce((acc,d,i)=>{ acc[d.name]={ label:d.name, color: d.fill || chartColor(i) }; return acc }, {} as ChartConfig)
  return (
    <ChartContainer config={config} className={cn('w-full', className)} style={{ height }}>
      <Treemap data={data.map((d,i)=> ({ ...d, fill: d.fill || chartColor(i) }))} dataKey='value' stroke='var(--background)' fill='transparent' />
    </ChartContainer>
  )
}

// ---------- Heatmap (real grid) ----------
export interface HeatmapCellDatum { x: string|number; y: string|number; value: number }
export const HeatmapChart: React.FC<{ data: HeatmapCellDatum[]; xKeys?: (string|number)[]; yKeys?: (string|number)[]; height?: number; className?: string; colors?: { from: string; to: string }; valueFormatter?: (v:number)=>string | number; gap?: number; showCellValues?: boolean; showAxes?: boolean }> = ({ data, xKeys, yKeys, height=320, className, colors={ from: chartColor(0).replace(/\)$/,' / 0.15)'), to: chartColor(0) }, valueFormatter, gap=0, showCellValues=true, showAxes=false }) => {
  const [hover, setHover] = React.useState<{ x: any; y: any; value: number; cx: number; cy: number } | null>(null)
  // Derivar ejes
  const xs = xKeys || Array.from(new Set(data.map(d=>d.x)))
  const ys = yKeys || Array.from(new Set(data.map(d=>d.y)))
  const max = Math.max(...data.map(d=>d.value)) || 1
  const min = Math.min(...data.map(d=>d.value)) || 0
  const cfg: ChartConfig = { value: { label: 'Valor', color: 'hsl(var(--primary))' } }
  // Interpolación simple entre from -> to usando alpha según valor
  function cellColor(v:number){
    if(max===min) return colors.to
    const ratio = (v - min) / (max - min)
    // Usar color destino con alpha escalada si to es formato hsl(var(--primary)) asumimos variable; fallback gradiente simple
    if(colors.to.startsWith('hsl(') && colors.from.includes('/')){
      // Insertar alpha ratio mapeado 0.15->1
      const base = colors.to.replace(/\)$/,'')
      return base + ` / ${0.15 + ratio*0.85})`
    }
    return colors.to
  }
  return (
    <ChartContainer config={cfg} className={cn('w-full', className)} style={{ height }}>
      {/* Custom SVG heatmap (no Recharts) */}
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
        onMouseLeave={()=>setHover(null)}
        onMouseMove={(e)=>{
      const container = e.currentTarget as HTMLDivElement
      const bounds = container.getBoundingClientRect()
      const relX = e.clientX - bounds.left
      const relY = e.clientY - bounds.top
      const cw = bounds.width / xs.length
      const ch = bounds.height / ys.length
          const xi = Math.floor(relX / cw)
            , yi = Math.floor(relY / ch)
          if(xi<0||xi>=xs.length||yi<0||yi>=ys.length) { setHover(null); return }
          const x = xs[xi], y = ys[yi]
          const cell = data.find(d=>d.x===x && d.y===y)
          if(!cell){ setHover(null); return }
      setHover({ x, y, value: cell.value, cx: (xi+0.5)*cw, cy: (yi+0.5)*ch })
        }}>
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${xs.length} ${ys.length}`}>
          {ys.map((y, yi)=> (
            <g key={`row-${y}`}>
              {xs.map((x, xi)=> { const cell = data.find(d=>d.x===x && d.y===y); const v = cell?.value ?? 0; const isActive = hover && hover.x===x && hover.y===y; const g = Math.min(Math.max(gap,0),0.9); const off = g/2; const size = 1 - g; return (
                <rect key={`${x}-${y}`} x={xi+off} y={yi+off} width={size} height={size} fill={cellColor(v)} rx={0.12} stroke={isActive ? 'hsl(var(--foreground))' : 'none'} strokeWidth={isActive ? 0.04 : 0} />
              )})}
            </g>
          ))}
        </svg>
        {/* Etiquetas overlay */}
        {showCellValues && (
          <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${xs.length}, 1fr)`, gridTemplateRows: `repeat(${ys.length}, 1fr)` }}>
            {ys.map((y, yi)=> (
              <React.Fragment key={`labels-row-${y}`}>
                {xs.map((x, xi)=> { const cell = data.find(d=>d.x===x && d.y===y); const v = cell?.value ?? 0; return (
                  <div key={`label-${x}-${y}`} className="flex items-center justify-center text-[10px] font-medium text-foreground/70">
                    {valueFormatter ? valueFormatter(v) : v}
                  </div>
                )})}
              </React.Fragment>
            ))}
          </div>
        )}
        {showAxes && (
          <>
            {/* Eje X inferior */}
            <div className="absolute left-0 right-0 bottom-0 translate-y-full mt-2 grid text-[10px] font-medium text-muted-foreground" style={{ gridTemplateColumns: `repeat(${xs.length}, 1fr)` }} aria-label="Eje X">
              {xs.map(x=> <div key={`x-${x}`} className="text-center truncate px-1">{String(x)}</div>)}
            </div>
            {/* Eje Y izquierdo (distribución completa, alineado a la izquierda del grid) */}
            <div className="absolute top-0 bottom-0 -translate-x-full mr-2 flex flex-col justify-between" aria-label="Eje Y">
              {ys.map(y=> (
                <div
                  key={`y-${y}`}
                  className="text-[10px] font-medium text-muted-foreground flex items-center justify-end pr-1"
                >{String(y)}</div>
              ))}
            </div>
          </>
        )}
        {/* Leyendas simples */}
        <div className="absolute top-1 left-1 flex gap-2 text-[10px] text-muted-foreground">
          <span>{min}</span><span className="bg-border/40 h-px w-8 self-center" /><span>{max}</span>
        </div>
        {hover && (
          <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-2 py-1 text-[10px] shadow-md" style={{ left: hover.cx, top: hover.cy }}>
            <div className="font-medium">{valueFormatter ? valueFormatter(hover.value) : hover.value}</div>
            <div className="text-muted-foreground">({String(hover.x)}, {String(hover.y)})</div>
          </div>
        )}
      </div>
    </ChartContainer>
  )
}
