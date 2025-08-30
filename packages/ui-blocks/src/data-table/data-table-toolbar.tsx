import { Search } from 'lucide-react'
import type { Table, GroupingState } from '@tanstack/react-table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { cn } from '../internal/lib/utils'

interface DataTableToolbarProps<TData>{ table: Table<TData>; searchKey?: string; searchPlaceholder?: string; filters?: { columnId: string; title: string; options:{ label:string; value:string; icon?: React.ComponentType<{className?:string}>; count?: number }[] }[]; className?: string; enableGrouping?: boolean; grouping?: GroupingState; setGrouping?: (updater:GroupingState)=>void; groupableColumns?: string[] }
export function DataTableToolbar<TData>({ table, searchKey='title', searchPlaceholder='Filter rows...', filters=[], className, enableGrouping=false, grouping=[], setGrouping, groupableColumns }: DataTableToolbarProps<TData>){
  const isFiltered = table.getState().columnFilters.length>0
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-center py-4', className)}>
      <div className='relative w-full sm:max-w-xs'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input placeholder={searchPlaceholder} value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''} onChange={e=>table.getColumn(searchKey)?.setFilterValue(e.target.value)} className='w-full pl-8' />
      </div>
      <div className='flex flex-wrap items-center gap-2 ml-auto'>
        {filters.map(filter=>{ const column = table.getColumn(filter.columnId); if(!column) return null; return <DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} /> })}
        {enableGrouping && groupableColumns && groupableColumns.length>0 && (
          <div className='flex items-center gap-1'>
            <div className='flex gap-1'>
              {groupableColumns.map(id=>{ const col = table.getColumn(id); if(!col) return null; const isActive = grouping.includes(id); return (
                <Button key={id} variant={isActive? 'default':'outline'} size='sm' className='h-8 px-2 text-xs' onClick={()=>{
                  if(!setGrouping) return; const next = isActive ? grouping.filter(g=>g!==id) : [...grouping, id]; setGrouping(next); col.toggleGrouping();
                }}>{col.id}</Button>
              )})}
            </div>
          </div>
        )}
        {isFiltered && <Button variant='ghost' onClick={()=>table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>Reset</Button>}
        <DataTableViewOptions table={table} />
      </div>
      {enableGrouping && grouping.length>0 && (
        <div className='flex flex-wrap gap-2 -mb-2'>
          {grouping.map(g=> <span key={g} className='inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs'>{g}<button onClick={()=>{ if(!setGrouping) return; const next = grouping.filter(x=>x!==g); setGrouping(next); const col = table.getColumn(g); if(col){ col.toggleGrouping(); } }} className='text-muted-foreground hover:text-foreground'>×</button></span>)}
        </div>
      )}
    </div>
  )
}
