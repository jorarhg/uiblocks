import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import type { Table } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface DataTablePaginationProps<TData>{ table: Table<TData> }
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>){
  const pageSize = table.getState().pagination.pageSize
  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex items-center gap-2'>
        <p className='text-sm font-medium'>Rows</p>
        <Select value={String(pageSize)} onValueChange={val=>table.setPageSize(Number(val))}>
          <SelectTrigger className='h-8 w-[80px]'><SelectValue /></SelectTrigger>
          <SelectContent>
            {[5,10,20,30,40,50].map(ps=> <SelectItem key={ps} value={String(ps)}>{ps}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className='flex-1 text-sm text-muted-foreground hidden lg:block pl-3'>
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} selected.
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</div>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={()=>table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}><span className='sr-only'>First</span><ChevronsLeft className='h-4 w-4' /></Button>
            <Button variant='outline' className='h-8 w-8 p-0' onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}><span className='sr-only'>Prev</span><ChevronLeft className='h-4 w-4' /></Button>
            <Button variant='outline' className='h-8 w-8 p-0' onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}><span className='sr-only'>Next</span><ChevronRight className='h-4 w-4' /></Button>
            <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={()=>table.setPageIndex(table.getPageCount()-1)} disabled={!table.getCanNextPage()}><span className='sr-only'>Last</span><ChevronsRight className='h-4 w-4' /></Button>
        </div>
      </div>
    </div>
  )
}
