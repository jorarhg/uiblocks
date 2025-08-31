"use client"
import React from 'react'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

export interface GaugeChartProps {
  /** Valor actual (0 a maxValue) */
  value: number
  /** Valor máximo representado (default 100) */
  maxValue?: number
  /** Altura del componente (px) */
  height?: number
  /** Grosor de la barra (0-100 relativo al radio) */
  barSize?: number
  /** Color personalizado (sino usa config) */
  color?: string
  /** Mostrar valor numérico centrado */
  showValue?: boolean
  /** Formatear el texto central */
  formatValue?: (v: number, pct: number) => string
  /** Título / etiqueta debajo */
  label?: string
  className?: string
}

/**
 * Gauge chart semicircular (180°) basado en RadialBarChart.
 * Implementa un arco de 180 grados donde el valor rellena desde -180 a 0.
 */
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

  // Convertimos barSize (px relativo arbitrario) en porcentaje reduciendo innerRadius
  const thicknessPct = Math.min(40, Math.max(6, barSize)) // clamp
  const outerRadius = 100
  const innerRadius = outerRadius - thicknessPct

  const config: ChartConfig = {
    value: { label: 'Valor', color: color || 'hsl(var(--primary))' }
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)} style={{ height }}>
    <ChartContainer config={config} className='w-full h-full !aspect-auto'>
        <RadialBarChart
          data={data}
          startAngle={180}
          endAngle={0}
      innerRadius={innerRadius + '%'}
      outerRadius={outerRadius + '%'}
        >
          <PolarAngleAxis
            type='number'
            domain={[0, 100]}
            dataKey='value'
            tick={false}
          />
          <RadialBar
            background
            dataKey='value'
            cornerRadius={thicknessPct}
            fill={color || 'var(--color-value)'}
            stroke='none'
            className='[&_.recharts-radial-bar-background-sector]:fill-muted'
          />
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

export default GaugeChart
