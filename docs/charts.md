# Charts (Recharts Integration)

Componentes de gráficas listos para usar basados en Recharts y estilizados según el sistema.

## Instalación de peer dependencies

Asegúrate de tener `recharts` instalado en el proyecto consumidor:

```bash
pnpm add recharts
```

(React 18 o 19 soportado.)

## Importación

```tsx
import { SimpleLineChart, MultiLineChart, LineChartWithReference, SimpleBarChart, StackedBarChart, SimpleAreaChart } from '@teribit/ui-blocks'
```

## Datos básicos
Cada gráfico espera un array de objetos con al menos la propiedad `category` y luego claves numéricas para series.

```ts
const data = [
  { category: 'Ene', value: 120, serieA: 30, serieB: 50 },
  { category: 'Feb', value: 90,  serieA: 20, serieB: 40 },
]
```

## Ejemplos rápidos

### Línea simple
```tsx
<SimpleLineChart data={data} />
```

### Varias líneas
```tsx
<MultiLineChart data={data} series={[ 'serieA', 'serieB' ]} />
```

### Línea con referencia
```tsx
<LineChartWithReference data={data} referenceY={100} />
```

### Barra simple
```tsx
<SimpleBarChart data={data} />
```

### Barras apiladas
```tsx
<StackedBarChart data={data} series={['serieA','serieB']} />
```

### Área simple
```tsx
<SimpleAreaChart data={data} />
```

## Personalización avanzada
Usa los componentes base `BaseLineChart` y `BaseBarChart` para controlar más opciones (líneas, barras, colores, referencias, etc.).

```tsx
<BaseLineChart
  data={data}
  config={{ value: { label: 'Valor', color: 'hsl(var(--primary))' } }}
  lines={[{ dataKey: 'value', dot: true }]}
  referenceLines={[{ y: 100, label: 'Meta', stroke: 'hsl(var(--destructive))' }]}
/>
```

## Componentes avanzados

Incluye además:

- `DonutChart`
- `ScatterPointsChart`
- `SimpleRadarChart`
- `SimpleHeatmap` (treemap como aproximación jerárquica)
- `HeatmapChart` (heatmap real en grid SVG)

### Donut
```tsx
<DonutChart data={[{ name: 'A', value: 30 }, { name: 'B', value: 45 }]} />
```

### Scatter
```tsx
<ScatterPointsChart data={[
  { x: 10, y: 20, category: 'A' },
  { x: 12, y: 28, category: 'B' },
]} />
```

### Radar
```tsx
<SimpleRadarChart data={[
  { subject: 'Q1', serieA: 30, serieB: 15 },
  { subject: 'Q2', serieA: 50, serieB: 25 },
]} series={['serieA','serieB']} />
```

### Heatmap (grid real)
```tsx
const heatData = [
  { x: 'L', y: '1', value: 2 },
  { x: 'L', y: '2', value: 8 },
  { x: 'M', y: '1', value: 5 },
  { x: 'M', y: '2', value: 12 },
]
<HeatmapChart data={heatData} />
```

Tooltip: El `HeatmapChart` incorpora tooltip nativo (overlay) al hacer hover sobre una celda mostrando valor y coordenadas `(x, y)`. Puedes personalizar la visualización del valor con `valueFormatter={(v)=> v + '%'}`.

## SSR / Next.js (Client Only)
Recharts requiere entorno navegador para ciertos cálculos. Para evitar discrepancias:

1. Marca las páginas o componentes que consumen charts con la directiva `'use client'` (ya lo hacemos en los ejemplos de `/docs/examples/charts/*`).
2. El paquete exporta componentes marcados como client-friendly; el bundler de la app debe tratarlos en el lado del cliente.
3. Si necesitas render estático, puedes envolver el chart en un `dynamic(() => import(...), { ssr: false })` como fallback.

## Próximos pasos
- Escalas de color continuas configurables para `HeatmapChart`
- Ejes y leyendas personalizadas en heatmap real
- Tooltips avanzados configurables
- Ejes secundarios
- Soporte de temas personalizados
