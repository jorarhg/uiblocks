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
  searchPlaceholder='Buscar tarea por título...'
/>`

const block: BlockMeta = {
  id: 'datatable-placeholder-page',
  title: 'Placeholder personalizado',
  category: 'tables',
  description: 'Input de búsqueda con placeholder guiando al usuario.',
  preview: (
    <div className='rounded-md'>
      <DataTable
        columns={demoColumns as any}
        data={taskData.slice(0,8) as Task[]}
        searchKey='title'
        searchPlaceholder='Buscar tarea por título...'
      />
    </div>
  ),
  code,
  tags: ['search','ux'],
  status: 'beta',
  fullWidth: true
}

export default function DataTablePlaceholder(){
  return (
    <div className='space-y-10 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>Placeholder personalizado</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Cambia el placeholder para guiar al usuario.</p>
      </header>
      <BlockCard block={block} />
    </div>
  )
}
