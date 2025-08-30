import assert from 'node:assert'

// Import usando package exports (ESM)
import * as pkg from '@teribit/ui-blocks'

assert(pkg.SimpleLineChart, 'SimpleLineChart export missing')
assert(pkg.MultiLineChart, 'MultiLineChart export missing')
assert(pkg.LineChartWithReference, 'LineChartWithReference export missing')
assert(pkg.SimpleBarChart, 'SimpleBarChart export missing')
assert(pkg.StackedBarChart, 'StackedBarChart export missing')
assert(pkg.SimpleAreaChart, 'SimpleAreaChart export missing')
assert(pkg.DonutChart, 'DonutChart export missing')
assert(pkg.ScatterPointsChart, 'ScatterPointsChart export missing')
assert(pkg.SimpleRadarChart, 'SimpleRadarChart export missing')
assert(pkg.SimpleHeatmap, 'SimpleHeatmap export missing')
assert(pkg.HeatmapChart, 'HeatmapChart export missing')

console.log('Charts exports OK:', Object.keys(pkg).filter(k=>k.match(/Chart/)))
