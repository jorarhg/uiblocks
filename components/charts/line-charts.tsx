"use client"
import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

// Tipos de datos comunes
export type LineDatum = { category: string; value?: number; [k: string]: any }

// Componente base estilizado siguiendo la guía visual solicitada
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
}) => {
  return (
    <ChartContainer config={config} className={cn("w-full", className)} style={{ height }}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
        {grid && <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />}
        <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={40} tickLine={false} axisLine={false} tickMargin={4} />
        <ChartTooltip content={<ChartTooltipContent />} {...tooltipProps} />
        <ChartLegend content={<ChartLegendContent />} />
        {referenceLines.map((r, i) => (
          <ReferenceLine key={i} {...r} stroke={r.stroke || 'hsl(var(--muted-foreground))'} />
        ))}
        {lines.map((l, i) => (
          <Line key={i} type={l.type as any || "monotone"} dataKey={l.dataKey} stroke={l.stroke || `var(--color-${l.dataKey})`} strokeWidth={l.strokeWidth || 2} dot={l.dot ?? false} activeDot={{ r: 5 }} />
        ))}
        {areaUnder && lines.length === 1 && (
          <Area dataKey={lines[0].dataKey} type="monotone" stroke="none" fill={`var(--color-${lines[0].dataKey})`} fillOpacity={0.15} />
        )}
      </LineChart>
    </ChartContainer>
  )
}

// Ejemplos preconfigurados
export const SimpleLineChart: React.FC<{ data: LineDatum[] }> = ({ data }) => (
  <BaseLineChart
    data={data}
    config={{ value: { label: "Valor", color: "hsl(var(--primary))" } }}
    lines={[{ dataKey: 'value' }]}
    areaUnder
  />
)

export const MultiLineChart: React.FC<{ data: LineDatum[]; series: string[] }> = ({ data, series }) => {
  const config: ChartConfig = series.reduce((acc, key, idx) => {
    const hues = [210, 140, 270, 20, 320, 90]
    const hue = hues[idx % hues.length]
    acc[key] = { label: key, color: `hsl(${hue} 70% 50%)` }
    return acc
  }, {} as ChartConfig)
  return (
    <BaseLineChart
      data={data}
      config={config}
      lines={series.map(s => ({ dataKey: s, dot: false }))}
      grid
    />
  )
}

export const LineChartWithReference: React.FC<{ data: LineDatum[]; referenceY: number }> = ({ data, referenceY }) => (
  <BaseLineChart
    data={data}
    config={{ value: { label: "Valor", color: "hsl(var(--primary))" } }}
    lines={[{ dataKey: 'value', dot: true }]}
    referenceLines={[{ y: referenceY, stroke: 'hsl(var(--destructive))', strokeDasharray: '4 4', label: `Meta ${referenceY}` }]}
  />
)
