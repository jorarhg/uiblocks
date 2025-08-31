"use client"
import { DataTable } from '@teribit/ui-blocks'
import { columns as demoColumns, type Task } from '@/app/columns'
import { taskData } from '@/app/data'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

const code = `import { DataTable } from '@teribit/ui-blocks'
import { columns } from './columns'
import { data } from './data'

export function Example(){
  return <DataTable columns={columns} data={data} searchKey='title' />
}`

const block: BlockMeta = {
  id: 'datatable-basic-page',
  title: 'DataTable Básico',
  category: 'tables',
  description: 'Ejemplo mínimo con búsqueda, ordenación y paginación.',
  preview: <div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,8) as Task[]} searchKey='title' /></div>,
  code,
  tags: ['table','basic','pagination'],
  status: 'stable',
  fullWidth: true
}

export default function BasicDataTableBlock(){
  return (
    <div className='space-y-10 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>DataTable Básico</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Ejemplo mínimo de DataTable con búsqueda y paginación.</p>
      </header>
      <div>
        <BlockCard block={block} />
      </div>
    </div>
  )
}
