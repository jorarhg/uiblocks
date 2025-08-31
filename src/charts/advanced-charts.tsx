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
export interface HeatmapChartProps {
  data: HeatmapCellDatum[]
  xKeys?: (string|number)[]
  yKeys?: (string|number)[]
  height?: number
  width?: number | string
  className?: string
  // Compat: colors (from/to) se mantiene. Nuevos: baseColor y/o colorStops
  colors?: { from: string; to: string }
  baseColor?: string // si se pasa, genera from (alpha .15) y to (color pleno)
  colorStops?: string[] // gradiente múltiple; si existe anula colors/baseColor
  valueFormatter?: (v:number)=>string | number
  gap?: number
  showCellValues?: boolean
  showAxes?: boolean
  title?: string
}
export const HeatmapChart: React.FC<HeatmapChartProps> = ({ data, xKeys, yKeys, height=320, width, className, colors, baseColor, colorStops, valueFormatter, gap=0, showCellValues=true, showAxes=false, title }) => {
  const [hover, setHover] = React.useState<{ x: any; y: any; value: number; cx: number; cy: number } | null>(null)
  // Derivar ejes
  const xs = xKeys || Array.from(new Set(data.map(d=>d.x)))
  const ys = yKeys || Array.from(new Set(data.map(d=>d.y)))
  const max = Math.max(...data.map(d=>d.value)) || 1
  const min = Math.min(...data.map(d=>d.value)) || 0
  const cfg: ChartConfig = { value: { label: 'Valor', color: 'hsl(var(--primary))' } }
  // Preparar esquema de color
  let scheme: string[] | null = null
  if(colorStops && colorStops.length >= 2) scheme = colorStops
  else if(baseColor){
    // Construir from/to con alpha
    const alphaFrom = baseColor.startsWith('hsl(') ? baseColor.replace(/\)$/,' / 0.15)') : baseColor + '26'
    scheme = [alphaFrom, baseColor]
  }
  const finalColors = colors || (scheme ? { from: scheme[0], to: scheme[scheme.length-1] } : { from: chartColor(0).replace(/\)$/,' / 0.15)'), to: chartColor(0) })
  if(!scheme) scheme = [finalColors.from, finalColors.to]
  // Interpolación lineal entre stops (si >2)
  function interpColor(stopA:string, stopB:string, t:number){
    // Sólo soportamos hsl(var(--...)) con alpha o hsl(x y z / a). Para otros retornamos stopB.
    // Heurística: no intentar mezclar si hay variables distintas.
    return t<0.5 ? stopA : stopB
  }
  function cellColor(v:number){
    if(max===min) return scheme![scheme!.length-1]
    const ratio = (v - min) / (max - min)
    if(scheme!.length === 2){
      const [from, to] = scheme!
      if(to.startsWith('hsl(') && from.includes('/')){
        const base = to.replace(/\)$/,'')
        return base + ` / ${0.15 + ratio*0.85})`
      }
      return ratio < 0.5 ? from : to
    }
    // múltiple
    const seg = 1 / (scheme!.length - 1)
    const idx = Math.min(scheme!.length - 2, Math.floor(ratio / seg))
    const localT = (ratio - idx*seg) / seg
    return interpColor(scheme![idx], scheme![idx+1], localT)
  }
  // Márgenes internos en unidades de celda para colocar ejes dentro del SVG
  const mLeft = showAxes ? 1.2 : 0
  const mBottom = showAxes ? 1 : 0
  const totalW = xs.length + mLeft
  const totalH = ys.length + mBottom
  return (
    <ChartContainer config={cfg} className={cn('w-full', className)} style={{ height, width }} aria-label={title || 'Heatmap chart'}>
      <div
        className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
        onMouseLeave={()=>setHover(null)}
        onMouseMove={(e)=>{
          const container = e.currentTarget as HTMLDivElement
          const bounds = container.getBoundingClientRect()
          const relX = e.clientX - bounds.left
          const relY = e.clientY - bounds.top
          const cw = bounds.width / totalW
          const ch = bounds.height / totalH
          if(relX < mLeft*cw || relY > ys.length*ch) { setHover(null); return }
          const xi = Math.floor((relX - mLeft*cw) / cw)
          const yi = Math.floor(relY / ch)
          if(xi<0||xi>=xs.length||yi<0||yi>=ys.length){ setHover(null); return }
          const x = xs[xi], y = ys[yi]
          const cell = data.find(d=>d.x===x && d.y===y)
          if(!cell){ setHover(null); return }
          setHover({ x, y, value: cell.value, cx: (mLeft+xi+0.5)*cw, cy: (yi+0.5)*ch })
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${totalW} ${totalH}`}> 
          {title && (
            <text x={mLeft} y={-0.6} fontSize={0.45} fill="hsl(var(--muted-foreground))" textAnchor="start">{title}</text>
          )}
          <g className="cells">
            {ys.map((y, yi)=> xs.map((x, xi)=>{ const cell = data.find(d=>d.x===x && d.y===y); const v = cell?.value ?? 0; const g = Math.min(Math.max(gap,0),0.9); const off = g/2; const size = 1 - g; const isActive = hover && hover.x===x && hover.y===y; return (
              <g key={`${x}-${y}`}> 
                <rect x={mLeft + xi + off} y={yi + off} width={size} height={size} rx={0.12} fill={cellColor(v)} stroke={isActive ? 'hsl(var(--foreground))':'none'} strokeWidth={isActive?0.04:0} />
                {showCellValues && (
                  <text x={mLeft + xi + 0.5} y={yi + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize={0.28} fill="hsl(var(--foreground) / 0.7)">{valueFormatter ? valueFormatter(v) : v}</text>
                )}
              </g>
            )}))}
          </g>
          {showAxes && (
            <g className="axes" fontSize={0.3} fill="hsl(var(--muted-foreground))">
              {ys.map((y, yi)=> (
                <text key={`y-${y}`} x={mLeft - 0.25} y={yi+0.5} textAnchor="end" dominantBaseline="middle">{String(y)}</text>
              ))}
              {xs.map((x, xi)=> (
                <text key={`x-${x}`} x={mLeft + xi + 0.5} y={ys.length + 0.55} textAnchor="middle" dominantBaseline="middle">{String(x)}</text>
              ))}
            </g>
          )}
          {/* Min/Max legend (si no hay título desplazar arriba) */}
          <g fontSize={0.3} fill="hsl(var(--muted-foreground))">
            <text x={0} y={title ? -0.15 : -0.4}>{min}</text>
            <text x={mLeft + xs.length - 1} y={title ? -0.15 : -0.4} textAnchor="end">{max}</text>
          </g>
        </svg>
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
