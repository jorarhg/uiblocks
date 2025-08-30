import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ReferenceLine, BarChart, Bar, ResponsiveContainer } from 'recharts'
import { chartColor } from './palette'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '../ui/chart'
import { cn } from '../internal/lib/utils'

export type LineDatum = { category: string; value?: number; [k: string]: any }
export interface BaseLineChartProps {
  data: LineDatum[]
  lines: Array<{ dataKey: string; stroke?: string; strokeWidth?: number; dot?: boolean; type?: string }>
  config: ChartConfig
  height?: number
  grid?: boolean
  areaUnder?: boolean
  referenceLines?: Array<{ y?: number; x?: string | number; label?: string; stroke?: string; strokeDasharray?: string }>
  tooltipProps?: Partial<React.ComponentProps<typeof ChartTooltip>>
  className?: string
}

export const BaseLineChart: React.FC<BaseLineChartProps> = ({
  data,
  lines,
  config,
  height = 300,
  grid = true,
  areaUnder = false,
  referenceLines = [],
  tooltipProps,
  className,
}) => (
  <ChartContainer config={config} className={cn('w-full', className)} style={{ height }}>
    <LineChart data={data} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
      {grid && <CartesianGrid strokeDasharray='3 3' className='stroke-border/40' />}
      <XAxis dataKey='category' tickLine={false} axisLine={false} tickMargin={8} />
      <YAxis width={40} tickLine={false} axisLine={false} tickMargin={4} />
      <ChartTooltip content={<ChartTooltipContent />} {...tooltipProps} />
      <ChartLegend content={<ChartLegendContent />} />
      {referenceLines.map((r, i) => (
        <ReferenceLine key={i} {...r} stroke={r.stroke || 'hsl(var(--muted-foreground))'} />
      ))}
      {lines.map((l, i) => (
        <Line key={i} type={(l.type as any) || 'monotone'} dataKey={l.dataKey} stroke={l.stroke || `var(--color-${l.dataKey})`} strokeWidth={l.strokeWidth || 2} dot={l.dot ?? false} activeDot={{ r: 5 }} />
      ))}
      {areaUnder && lines.length === 1 && (
        <Area dataKey={lines[0].dataKey} type='monotone' stroke='none' fill={`var(--color-${lines[0].dataKey})`} fillOpacity={0.15} />
      )}
    </LineChart>
  </ChartContainer>
)

export const SimpleLineChart: React.FC<{ data: LineDatum[] }> = ({ data }) => (
  <BaseLineChart data={data} config={{ value: { label: 'Valor', color: chartColor(0) } }} lines={[{ dataKey: 'value', stroke: chartColor(0) }]} areaUnder />
)

export const MultiLineChart: React.FC<{ data: LineDatum[]; series: string[] }> = ({ data, series }) => {
  const config: ChartConfig = series.reduce((acc, key, idx) => {
    acc[key] = { label: key, color: chartColor(idx) }
    return acc
  }, {} as ChartConfig)
  return <BaseLineChart data={data} config={config} lines={series.map((s,i) => ({ dataKey: s, dot: false, stroke: chartColor(i) }))} grid />
}

export const LineChartWithReference: React.FC<{ data: LineDatum[]; referenceY: number }> = ({ data, referenceY }) => (
  <BaseLineChart data={data} config={{ value: { label: 'Valor', color: chartColor(0) } }} lines={[{ dataKey: 'value', dot: true, stroke: chartColor(0) }]} referenceLines={[{ y: referenceY, stroke: chartColor(1), strokeDasharray: '4 4', label: `Meta ${referenceY}` }]} />
)

// ---- Bar / Area / Stacked Variants ----

export interface BaseBarChartProps {
  data: LineDatum[]
  bars: Array<{ dataKey: string; fill?: string; stackId?: string; radius?: number | [number, number, number, number] }>
  config: ChartConfig
  height?: number
  grid?: boolean
  stacked?: boolean
  tooltipProps?: Partial<React.ComponentProps<typeof ChartTooltip>>
  className?: string
}

export const BaseBarChart: React.FC<BaseBarChartProps> = ({ data, bars, config, height = 300, grid = true, stacked = false, tooltipProps, className }) => (
  <ChartContainer config={config} className={cn('w-full', className)} style={{ height }}>
    <BarChart data={data} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
      {grid && <CartesianGrid strokeDasharray='3 3' className='stroke-border/40' />}
      <XAxis dataKey='category' tickLine={false} axisLine={false} tickMargin={8} />
      <YAxis width={40} tickLine={false} axisLine={false} tickMargin={4} />
      <ChartTooltip content={<ChartTooltipContent />} {...tooltipProps} />
      <ChartLegend content={<ChartLegendContent />} />
      {bars.map((b, i) => (
        <Bar key={i} dataKey={b.dataKey} fill={b.fill || `var(--color-${b.dataKey})`} stackId={stacked ? (b.stackId || 'stack') : b.stackId} radius={b.radius ?? 4} />
      ))}
    </BarChart>
  </ChartContainer>
)

export const SimpleBarChart: React.FC<{ data: LineDatum[] }> = ({ data }) => (
  <BaseBarChart
    data={data}
    config={{ value: { label: 'Valor', color: chartColor(0) } }}
    bars={[{ dataKey: 'value', fill: chartColor(0) }]}
  />
)

export const StackedBarChart: React.FC<{ data: LineDatum[]; series: string[] }> = ({ data, series }) => {
  const config: ChartConfig = series.reduce((acc, key, idx) => {
    acc[key] = { label: key, color: chartColor(idx) }
    return acc
  }, {} as ChartConfig)
  return <BaseBarChart data={data} config={config} bars={series.map((s,i) => ({ dataKey: s, fill: chartColor(i) }))} stacked />
}

export const SimpleAreaChart: React.FC<{ data: LineDatum[] }> = ({ data }) => (
  <BaseLineChart
    data={data}
    config={{ value: { label: 'Valor', color: chartColor(0) } }}
    lines={[{ dataKey: 'value', type: 'monotone', stroke: chartColor(0) }]}
    areaUnder
  />
)
