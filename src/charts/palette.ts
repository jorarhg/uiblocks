// Paleta centralizada de tonos vivos (light/dark friendly)
export const CHART_VIBRANT_PALETTE: string[] = [
  'hsl(210 90% 55%)', // azul
  'hsl(280 85% 60%)', // violeta
  'hsl(340 80% 55%)', // magenta/rosa
  'hsl(20 90% 55%)',  // naranja
  'hsl(145 70% 45%)', // verde
  'hsl(50 95% 55%)',  // amarillo
  'hsl(185 75% 50%)', // cian
  'hsl(315 70% 55%)', // fucsia
  'hsl(0 85% 55%)',   // rojo
  'hsl(95 60% 45%)',  // lima
  'hsl(255 75% 60%)', // índigo
  'hsl(30 80% 50%)',  // ámbar
]

export function chartColor(index: number){
  return CHART_VIBRANT_PALETTE[index % CHART_VIBRANT_PALETTE.length]
}

export function buildSeriesConfig(keys: (string|number)[]){
  return keys.reduce<Record<string,{ label: string; color: string }>>((acc,k,i)=>{ acc[String(k)]={ label:String(k), color: chartColor(i) }; return acc }, {})
}
