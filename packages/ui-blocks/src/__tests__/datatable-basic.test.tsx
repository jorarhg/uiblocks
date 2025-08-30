import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '../data-table/data-table'
import { createActionsColumn } from '../data-table/actions-column'
import { defaultActions, type ActionItem } from '../data-table/actions-menu'
import type { ColumnDef } from '@tanstack/react-table'

interface Row { id:string; name:string; email:string }

const baseColumns: ColumnDef<Row>[] = [
  { accessorKey:'name', header:'Nombre' },
  { accessorKey:'email', header:'Email' },
]

function setup(){
  const handlers = { view:() => {}, edit:() => {}, del:() => {} }
  const actions: ActionItem[] = [
    defaultActions.view(handlers.view),
    defaultActions.edit(handlers.edit),
    defaultActions.delete(handlers.del)
  ]
  const columns: ColumnDef<Row>[] = [...baseColumns, createActionsColumn<Row>({ actions })]
  const data: Row[] = [ { id:'1', name:'Alice', email:'alice@mail.com' }, { id:'2', name:'Bob', email:'bob@mail.com' } ]
  render(<DataTable columns={columns} data={data} searchKey='name' />)
  return { handlers }
}

export function runBasicDataTableTest(){
  setup()
  screen.getByText('Alice')
  screen.getByText('Bob')
  const input = screen.getByPlaceholderText('Filter rows...') as HTMLInputElement
  fireEvent.change(input, { target:{ value:'Ali' } })
  screen.getByText('Alice')
  if(screen.queryByText('Bob')) throw new Error('Bob should be filtered out')
}

// Ejecuta automáticamente si se corre directamente este módulo en un entorno test simple
try { runBasicDataTableTest(); /* eslint-disable no-console */ console.log('[ui-blocks] basic DataTable test passed') } catch(e){ console.error('[ui-blocks] basic DataTable test failed', e) }
