"use client"
import { DataTable } from '@teribit/ui-blocks'
import { columns as demoColumns, type Task } from '@/app/columns'
import { taskData } from '@/app/data'
import { BlockCard, type BlockMeta } from '@/components/blocks/block-card'

// Snippets
const codeBasic = `import { DataTable } from '@teribit/ui-blocks'
<DataTable columns={columns} data={data} searchKey='title' />`
const codeFilters = `// Filtros facetados
<DataTable columns={columns} data={data} searchKey='title' filters={[/* ... */]} />`
const codePlaceholder = `// Placeholder personalizado
<DataTable columns={columns} data={data} searchKey='title' searchPlaceholder='Buscar tarea por título...' />`
const codeReorder = `// Reordenar columnas
<DataTable columns={columns} data={data} searchKey='title' enableColumnReorder />`
const codeGrouping = `// Agrupación
<DataTable columns={columns} data={data} searchKey='title' enableGrouping groupableColumns={['status','priority']} />`

// Blocks metadata (orden lineal)
const tableBlocks: BlockMeta[] = [
  { id:'dt-basico', title:'Basic DataTable', category:'tables', description:'Tabla mínima con búsqueda y paginación.', preview:<div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,8) as Task[]} searchKey='title' /></div>, code: codeBasic, tags:['basic','pagination'], status:'stable', fullWidth:true },
  { id:'dt-filtros', title:'DataTable con Filtros', category:'tables', description:'Filtros facetados por status y prioridad.', preview:<div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,10) as Task[]} searchKey='title' filters={[{ columnId:'status', title:'Status', options:[{label:'Backlog', value:'backlog'},{label:'Todo', value:'todo'},{label:'In Progress', value:'in-progress'},{label:'Done', value:'done'},{label:'Canceled', value:'canceled'}]},{ columnId:'priority', title:'Priority', options:[{label:'High', value:'high'},{label:'Medium', value:'medium'},{label:'Low', value:'low'}]}]} /></div>, code: codeFilters, tags:['filters','facet'], status:'stable', fullWidth:true },
  { id:'dt-placeholder', title:'Placeholder personalizado', category:'tables', description:'Placeholder de búsqueda guiando al usuario.', preview:<div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,8) as Task[]} searchKey='title' searchPlaceholder='Buscar tarea por título...' /></div>, code: codePlaceholder, tags:['search','ux'], status:'beta', fullWidth:true },
  { id:'dt-reordenar', title:'Reordenar columnas', category:'tables', description:'Drag & drop de encabezados para cambiar orden.', preview:<div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,9) as Task[]} searchKey='title' enableColumnReorder /></div>, code: codeReorder, tags:['dnd','reorder'], status:'beta', fullWidth:true },
  { id:'dt-agrupacion', title:'Agrupación de filas', category:'tables', description:'Agrupar por status y prioridad con expansión.', preview:<div className='rounded-md'><DataTable columns={demoColumns as any} data={taskData.slice(0,14) as Task[]} searchKey='title' enableGrouping groupableColumns={['status','priority']} filters={[{ columnId:'status', title:'Status', options:[{label:'Backlog', value:'backlog'},{label:'Todo', value:'todo'},{label:'In Progress', value:'in-progress'},{label:'Done', value:'done'},{label:'Canceled', value:'canceled'}]}]} /></div>, code: codeGrouping, tags:['group','expand'], status:'beta', fullWidth:true },
]

export default function DataTablesPage(){
  return (
    <div className='space-y-16 py-8 md:py-12' data-block-root>
      <section id='dt-overview' className='space-y-4'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>DataTable Blocks</h1>
        <p className='text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed'>Variantes unificadas basadas en TanStack Table: búsqueda, paginación, filtros, placeholder personalizado, reordenación y agrupación. Cada ejemplo incluye pestañas de vista previa y código.</p>
      </section>
      {tableBlocks.map(block => (
        <section key={block.id} id={block.id} className='space-y-6'>
          <h2 className='text-xl font-semibold tracking-tight'>{block.title}</h2>
          <BlockCard block={block} />
        </section>
      ))}
    </div>
  )
}
