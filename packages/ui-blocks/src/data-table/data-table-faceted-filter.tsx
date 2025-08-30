import { CheckIcon, ListFilter } from 'lucide-react'
import type { Column } from '@tanstack/react-table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { cn } from '../internal/lib/utils'
import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface DataTableFacetedFilterProps<TData, TValue>{ column?: Column<TData, TValue>; title?: string; options:{ label:string; value:string; icon?: React.ComponentType<{className?:string}>; count?: number }[] }
export function DataTableFacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>){
  const selectedValues = new Set(column?.getFilterValue() as string[])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <ListFilter className='mr-2 h-4 w-4' />{title}
          {selectedValues?.size>0 && (
            <Badge variant='secondary' className='ml-2 rounded-sm px-1 font-normal'>{selectedValues.size}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-56 p-2' align='start'>
        <div className='flex flex-col gap-1 max-h-60 overflow-auto'>
          {options.map(option=>{ const isSelected = selectedValues.has(option.value); return (
            <button key={option.value} onClick={()=>{ if(isSelected) selectedValues.delete(option.value); else selectedValues.add(option.value); const next=Array.from(selectedValues); column?.setFilterValue(next.length? next: undefined) }} className={cn('flex items-center gap-2 rounded px-2 py-1 text-left text-xs hover:bg-accent', isSelected && 'bg-accent')}>
              <span className={cn('flex h-4 w-4 items-center justify-center rounded-sm border border-primary', isSelected ? 'bg-primary text-primary-foreground':'opacity-50')}><CheckIcon className='h-3 w-3' /></span>
              {option.icon && <option.icon className='h-3.5 w-3.5 text-muted-foreground' />}
              <span className='flex-1'>{option.label}</span>
              {option.count!==undefined && <span className='ml-auto font-mono text-[10px]'>{option.count}</span>}
            </button>
          )})}
          {selectedValues.size>0 && <button onClick={()=>column?.setFilterValue(undefined)} className='mt-1 rounded bg-muted px-2 py-1 text-xs'>Clear filters</button>}
        </div>
      </PopoverContent>
    </Popover>
  )
}
