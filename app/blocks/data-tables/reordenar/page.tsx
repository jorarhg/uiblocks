"use client"
import { DataTable } from '@teribit/ui-blocks'
import { columns as demoColumns, type Task } from '@/app/columns'
import { taskData } from '@/app/data'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

const code = `import { DataTable } from '@teribit/ui-blocks'
<DataTable
  columns={columns}
  data={data}
  searchKey='title'
  enableColumnReorder
/>`

const block: BlockMeta = {
  id: 'datatable-reorder-page',
  title: 'Reordenar columnas',
  category: 'tables',
  description: 'Arrastra encabezados para cambiar el orden de columnas.',
  preview: (
    <div className='rounded-md'>
      <DataTable
        columns={demoColumns as any}
        data={taskData.slice(0,9) as Task[]}
        searchKey='title'
        enableColumnReorder
      />
    </div>
  ),
  code,
  tags: ['dnd','reorder'],
  status: 'beta',
  fullWidth: true
}

export default function DataTableReorder(){
  return (
    <div className='space-y-10 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>Reordenar columnas (Drag & Drop)</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Permite arrastrar encabezados para cambiar el orden de las columnas.</p>
      </header>
      <BlockCard block={block} />
    </div>
  )
}
