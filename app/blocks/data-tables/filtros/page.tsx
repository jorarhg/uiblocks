"use client"
import { DataTable } from '@teribit/ui-blocks'
import { columns as demoColumns, type Task } from '@/app/columns'
import { taskData } from '@/app/data'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

const code = `import { DataTable } from '@teribit/ui-blocks'
// ...columns & data
<DataTable
  columns={columns}
  data={data}
  searchKey='title'
  filters={[
    { columnId: 'status', title: 'Status', options: [
      { label: 'Backlog', value: 'backlog' },
      { label: 'Todo', value: 'todo' },
      { label: 'In Progress', value: 'in-progress' },
      { label: 'Done', value: 'done' },
      { label: 'Canceled', value: 'canceled' },
    ]},
    { columnId: 'priority', title: 'Priority', options: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ]},
  ]}
/>`

const block: BlockMeta = {
  id: 'datatable-filters-page',
  title: 'DataTable con Filtros',
  category: 'tables',
  description: 'Tabla con filtros facetados por status y prioridad.',
  preview: (
    <div className='rounded-md'>
      <DataTable
        columns={demoColumns as any}
        data={taskData.slice(0,10) as Task[]}
        searchKey='title'
        filters={[
          { columnId: 'status', title: 'Status', options: [
            { label: 'Backlog', value: 'backlog' },
            { label: 'Todo', value: 'todo' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Done', value: 'done' },
            { label: 'Canceled', value: 'canceled' },
          ]},
          { columnId: 'priority', title: 'Priority', options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ]},
        ]}
      />
    </div>
  ),
  code,
  tags: ['filters','facet'],
  status: 'stable',
  fullWidth: true
}

export default function DataTableFilters(){
  return (
    <div className='space-y-10 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>DataTable con Filtros</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Incluye filtros facetados para status y prioridad.</p>
      </header>
      <BlockCard block={block} />
    </div>
  )
}
