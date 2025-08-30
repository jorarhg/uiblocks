import { Settings } from 'lucide-react'
import type { Table } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface DataTableViewOptionsProps<TData>{ table: Table<TData> }
export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>){
  // Incluir columnas con accessorKey (accessorFn es undefined en ese caso)
  const columns = table.getAllColumns().filter(col => col.getCanHide())
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 w-8 p-0'><Settings className='h-4 w-4' /><span className='sr-only'>View options</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-44'>
        <DropdownMenuLabel className='text-xs'>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map(column=> (
          <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={(value)=>column.toggleVisibility(!!value)} className='capitalize'>
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
