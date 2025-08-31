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
  { title: 'Overview', href: '#tables' },
  { title: 'Basic', href: '/blocks/data-tables/basic' },
  { title: 'Con Filtros', href: '/blocks/data-tables/filtros' },
  { title: 'Placeholder', href: '/blocks/data-tables/placeholder' },
  { title: 'Reordenar', href: '/blocks/data-tables/reordenar' },
  { title: 'Agrupación', href: '/blocks/data-tables/agrupacion' },
      ],
    },
    {
      title: 'Gráficas',
      items: [
  { title: 'Overview', href: '#charts' },
  { title: 'Line Charts', href: '/blocks/charts/line' },
  { title: 'Bar Charts', href: '/blocks/charts/bar' },
  { title: 'Heatmap', href: '/blocks/charts/heatmap' },
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