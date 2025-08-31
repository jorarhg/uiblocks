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
  enableGrouping
  groupableColumns={['status','priority']}
/>`

const block: BlockMeta = {
  id: 'datatable-grouping-page',
  title: 'Agrupación de filas',
  category: 'tables',
  description: 'Agrupa por status y prioridad con expansión.',
  preview: (
    <div className='rounded-md'>
      <DataTable
        columns={demoColumns as any}
        data={taskData.slice(0,14) as Task[]}
        searchKey='title'
        enableGrouping
        groupableColumns={['status','priority']}
        filters={[{ columnId:'status', title:'Status', options:[
          {label:'Backlog', value:'backlog'},{label:'Todo', value:'todo'},{label:'In Progress', value:'in-progress'},{label:'Done', value:'done'},{label:'Canceled', value:'canceled'}
        ]}]}
      />
    </div>
  ),
  code,
  tags: ['group','expand'],
  status: 'beta',
  fullWidth: true
}

export default function DataTableGrouping(){
  return (
    <div className='space-y-10 py-8 md:py-10'>
      <header className='space-y-3'>
        <h1 className='text-2xl md:text-3xl font-semibold tracking-tight'>Agrupación de filas</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base'>Agrupa por status y/o priority, expandiendo para ver filas hijas.</p>
      </header>
      <BlockCard block={block} />
    </div>
  )
}
