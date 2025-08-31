import { NavItem } from "@/config/docs/docs-config"

// Sidebar específica de /blocks (nueva) basada en docs pero adaptada
export interface BlocksConfig {
  sidebarNav: NavItem[]
}

export const blocksConfig: BlocksConfig = {
  sidebarNav: [
    {
      title: 'Datatables',
      items: [
  { title: 'Basic DataTable', href: '/blocks/data-tables#dt-basico' },
  { title: 'Con Filtros', href: '/blocks/data-tables#dt-filtros' },
  { title: 'Placeholder', href: '/blocks/data-tables#dt-placeholder' },
  { title: 'Reordenar', href: '/blocks/data-tables#dt-reordenar' },
  { title: 'Agrupación', href: '/blocks/data-tables#dt-agrupacion' },
      ],
    },
    {
      title: 'Gráficas',
      items: [
  { title: 'Line Charts', href: '/blocks/charts#charts-lines' },
  { title: 'Bar / Área', href: '/blocks/charts#charts-bars' },
  { title: 'Distribución', href: '/blocks/charts#charts-distribucion' },
  { title: 'Heatmaps', href: '/blocks/charts#charts-heatmaps' },
      ],
    },
    {
      title: 'Forms & Inputs',
      items: [ { title: 'Overview', href: '/blocks/forms', disabled: true } ],
    },
    {
      title: 'Navigation',
      items: [ { title: 'Overview', href: '/blocks/navigation', disabled: true } ],
    },
    {
      title: 'Layout',
      items: [ { title: 'Overview', href: '/blocks/layout', disabled: true } ],
    },
  ],
}

export type { NavItem }