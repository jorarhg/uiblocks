"use client"
import React from 'react'
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { ChartContainer, type ChartConfig } from '../ui/chart'

export interface GaugeChartProps {
  value: number
  maxValue?: number
  height?: number
  barSize?: number
  color?: string
  showValue?: boolean
  formatValue?: (v: number, pct: number) => string
  label?: string
  className?: string
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue = 100,
  height = 180,
  barSize = 18,
  color,
  showValue = true,
  formatValue,
  label,
  className,
}) => {
  const pct = Math.max(0, Math.min(1, value / maxValue))
  const display = formatValue ? formatValue(value, pct) : `${Math.round(pct*100)}%`
  const data = [ { name: 'value', value: pct * 100 } ]
  const thicknessPct = Math.min(40, Math.max(6, barSize))
  const outerRadius = 100
  const innerRadius = outerRadius - thicknessPct
  const config: ChartConfig = { value: { label: 'Valor', color: color || 'hsl(var(--primary))' } }

  return (
    <div className={className} style={{ height }}>
      <ChartContainer config={config} className='w-full h-full !aspect-auto'>
        <RadialBarChart data={data} startAngle={180} endAngle={0} innerRadius={innerRadius + '%'} outerRadius={outerRadius + '%'}>
          <PolarAngleAxis type='number' domain={[0, 100]} dataKey='value' tick={false} />
          <RadialBar background dataKey='value' cornerRadius={thicknessPct} fill={color || 'var(--color-value)'} stroke='none' className='[&_.recharts-radial-bar-background-sector]:fill-muted' />
        </RadialBarChart>
      </ChartContainer>
      {showValue && (
        <div className='-mt-14 flex flex-col items-center pointer-events-none select-none'>
          <div className='text-2xl font-semibold tabular-nums leading-none'>{display}</div>
          {label && <div className='text-xs mt-1 text-muted-foreground'>{label}</div>}
        </div>
      )}
    </div>
  )
}
