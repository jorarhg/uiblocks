// Limpio: versión con export explícito de DataTableProps y DnD robusto
import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type GroupingState,
  type Row,
  type Cell,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from './data-table-pagination'
import { GripVertical } from 'lucide-react'
// Valor por defecto para la transición FLIP si no se pasa prop
const DEFAULT_COLUMN_FLIP_TRANSITION = 'transform 220ms cubic-bezier(.22,.61,.36,1)'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  filters?: { columnId: string; title: string; options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }>; count?: number }[] }[]
  enableColumnReorder?: boolean
  enableGrouping?: boolean
  groupableColumns?: string[]
  /** Permite personalizar la transición FLIP usada en el preview de reordenamiento (e.g. 'transform 300ms ease'). */
  reorderTransition?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey = 'title',
  searchPlaceholder,
  filters,
  enableColumnReorder = false,
  enableGrouping = false,
  groupableColumns,
  reorderTransition,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnOrder, setColumnOrder] = React.useState<string[]>([])
  const [grouping, setGrouping] = React.useState<GroupingState>([])
  const headerContainerRef = React.useRef<HTMLTableSectionElement | null>(null)
  const dragSourceIdRef = React.useRef<string | null>(null)
  const initialLayoutRef = React.useRef<{ baseLeft: number; widths: Record<string, number>; lefts: Record<string, number> } | null>(null)
  const lastPreviewTargetRef = React.useRef<string | null>(null)
  const isMountedRef = React.useRef(false)
  const pendingRafRef = React.useRef<number | null>(null)
  const rafTargetRef = React.useRef<string | null>(null)
  const keyboardSourceIdRef = React.useRef<string | null>(null)
  const keyboardTargetIdRef = React.useRef<string | null>(null)
  const focusAfterReorderRef = React.useRef<string | null>(null)
  const flipTransition = reorderTransition || DEFAULT_COLUMN_FLIP_TRANSITION

  function clearPreviewTransforms(){
    if(!headerContainerRef.current) return
    headerContainerRef.current.querySelectorAll('[data-col-id]')?.forEach(el=>{
      (el as HTMLElement).style.transform = ''
      ;(el as HTMLElement).style.transition = ''
  delete (el as HTMLElement).dataset.flipInit
    })
  }

  function scheduleFocusGrip(columnId: string){
    focusAfterReorderRef.current = columnId
    // doble RAF para asegurar repaint tras reordenamiento
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        if(!headerContainerRef.current) return
        const grip = headerContainerRef.current.querySelector(`[data-grip-for="${columnId}"]`) as HTMLElement | null
        if(grip){
          grip.focus({ preventScroll: true })
          focusAfterReorderRef.current = null
        }
      })
    })
  }

  function captureInitialLayout(){
    if(!headerContainerRef.current) return
    const cells = Array.from(headerContainerRef.current.querySelectorAll('[data-col-id]')) as HTMLElement[]
    if(!cells.length) return
    const widths: Record<string,number> = {}
    const lefts: Record<string,number> = {}
    let baseLeft = Infinity
    cells.forEach(el=>{
      const id = el.dataset.colId!
      const rect = el.getBoundingClientRect()
      widths[id] = rect.width
      lefts[id] = rect.left
      if(rect.left < baseLeft) baseLeft = rect.left
    })
    initialLayoutRef.current = { baseLeft, widths, lefts }
  }

  function applyPreview(targetId: string){
    if(!enableColumnReorder) return
    const sourceId = dragSourceIdRef.current
    if(!sourceId) { clearPreviewTransforms(); return }
    // Evitar recomputación si ya estamos sobre el mismo destino
    if(targetId === lastPreviewTargetRef.current) return
    if(sourceId === targetId){
      lastPreviewTargetRef.current = targetId
      clearPreviewTransforms();
      return
    }
    const layout = initialLayoutRef.current
    if(!layout) return
    // construir orden actual real
    const currentOrder = (columnOrder.length ? columnOrder : table.getAllLeafColumns().map(c=>c.id))
    const next = [...currentOrder]
    const from = next.indexOf(sourceId)
    const to = next.indexOf(targetId)
    if(from === -1 || to === -1) return
    next.splice(from,1)
    next.splice(to,0,sourceId)
    // Calcular posiciones objetivo acumulando widths
    let accLeft = layout.baseLeft
    const targetLeftMap: Record<string, number> = {}
    next.forEach(id=>{
      targetLeftMap[id] = accLeft
      accLeft += layout.widths[id]
    })
    // Aplicar transform FLIP (currentLeft -> targetLeft)
    if(!headerContainerRef.current) return
    headerContainerRef.current.querySelectorAll('[data-col-id]')?.forEach(el=>{
      const node = el as HTMLElement
      const id = node.dataset.colId!
      const currentLeft = layout.lefts[id]
      const targetLeft = targetLeftMap[id]
      if(currentLeft == null || targetLeft == null) return
      const dx = targetLeft - currentLeft
      const desired = `translateX(${dx}px)`
      if(node.style.transform === desired) return // no re-disparar transición
      // Sólo setear transición la primera vez
      if(!node.dataset.flipInit){
        node.style.willChange = 'transform'
        node.dataset.flipInit = '1'
      }
  node.style.transition = flipTransition
      node.style.transform = desired
    })
    lastPreviewTargetRef.current = targetId
  }

  function schedulePreview(targetId: string){
    if(pendingRafRef.current){
      rafTargetRef.current = targetId
      return
    }
    rafTargetRef.current = targetId
    pendingRafRef.current = requestAnimationFrame(()=>{
      const t = rafTargetRef.current
      if(t) applyPreview(t)
      pendingRafRef.current = null
    })
  }

  function commitReorder(sourceId: string, targetId: string){
    if(sourceId === targetId) return
    setColumnOrder(prev => {
      const current = prev.length ? prev : table.getAllLeafColumns().map(c=>c.id)
      const next = [...current]
      const from = next.indexOf(sourceId)
      const to = next.indexOf(targetId)
      if(from === -1 || to === -1) return current
      next.splice(from,1)
      next.splice(to,0,sourceId)
      scheduleFocusGrip(sourceId)
      return next
    })
  }

  React.useEffect(()=>{
    return ()=>{ clearPreviewTransforms() }
  },[])

  React.useEffect(()=>{
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  },[])

  // Inicializar orden al montar / cambiar columnas
  React.useEffect(() => {
    if (columnOrder.length === 0) {
      setColumnOrder(
        columns
          .map((c: any) => c.id ?? c.accessorKey)
          .filter(Boolean)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, columnOrder, grouping },
    enableRowSelection: true,
    enableGrouping,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...(enableGrouping
      ? { getGroupedRowModel: getGroupedRowModel(), getExpandedRowModel: getExpandedRowModel() }
      : {}),
  })

  function handleHeaderDrop(
    e: React.DragEvent<HTMLTableCellElement>,
    targetId: string
  ) {
    if (!enableColumnReorder) return
    e.preventDefault()
  const sourceId = e.dataTransfer.getData('text/plain')
    clearPreviewTransforms()
    dragSourceIdRef.current = null
    initialLayoutRef.current = null
  lastPreviewTargetRef.current = null
    if (!sourceId || sourceId === targetId) return
  if(!isMountedRef.current) return
    setColumnOrder(prev => {
      const current = prev.length
        ? prev
        : table.getAllLeafColumns().map(c => c.id)
      const next = [...current]
      const from = next.indexOf(sourceId)
      const to = next.indexOf(targetId)
      if (from === -1 || to === -1) return current
      next.splice(from, 1)
      next.splice(to, 0, sourceId)
      scheduleFocusGrip(sourceId)
      return next
    })
  }

  function renderCell(row: Row<TData>, cell: Cell<TData, unknown>) {
    if (enableGrouping) {
      if (cell.getIsGrouped()) {
        return (
          <button
            onClick={row.getToggleExpandedHandler()}
            className='flex items-center gap-2 font-medium'
          >
            <span className='inline-block w-4'>
              {row.getIsExpanded() ? '−' : '+'}
            </span>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
            <span className='text-xs text-muted-foreground'>
              ({row.subRows.length})
            </span>
          </button>
        )
      }
      if (cell.getIsAggregated()) {
        return flexRender(
          cell.column.columnDef.aggregatedCell ??
            cell.column.columnDef.cell,
          cell.getContext()
        )
      }
      if (cell.getIsPlaceholder()) return null
    }
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        filters={filters}
        enableGrouping={enableGrouping}
        grouping={grouping}
        setGrouping={setGrouping}
        groupableColumns={groupableColumns}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader ref={headerContainerRef}>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(header => {
                  const id = header.column.id
                  const canReorder =
                    enableColumnReorder &&
                    header.column.getCanHide() &&
                    !(header.column.columnDef as any)?.meta?.disableReorder
                  return (
                    <TableHead
                      key={header.id}
                      data-col-id={id}
                      onDragOver={(e: React.DragEvent<HTMLTableCellElement>) => { if (enableColumnReorder && dragSourceIdRef.current){ e.preventDefault(); schedulePreview(id) } }}
                      onDragEnter={(e: React.DragEvent<HTMLTableCellElement>)=>{ if(enableColumnReorder && dragSourceIdRef.current && e.currentTarget === e.target){ schedulePreview(id) } }}
                      onDrop={(e: React.DragEvent<HTMLTableCellElement>) => handleHeaderDrop(e, id)}
                      className={
                        canReorder ? 'relative select-none' : undefined
                      }
                    >
                      {canReorder && (
                        <span
                          className='absolute left-1 top-1/2 -translate-y-1/2 inline-flex items-center p-0.5 rounded hover:bg-muted'
                          draggable
                          data-grip-for={id}
                          onDragStart={(e)=>{
                            if(!canReorder) return
                            dragSourceIdRef.current = id
                            keyboardSourceIdRef.current = id
                            e.dataTransfer.effectAllowed = 'move'
                            e.dataTransfer.setData('text/plain', id)
                            captureInitialLayout()
                          }}
                          onDragEnd={()=>{ clearPreviewTransforms(); dragSourceIdRef.current=null; initialLayoutRef.current=null }}
                          onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.cursor='move' }}
                          onFocus={e=>{ (e.currentTarget as HTMLElement).style.cursor='move'; keyboardSourceIdRef.current = id }}
                          tabIndex={0}
                          role='button'
                          aria-label='Reordenar columna'
                          onKeyDown={(e)=>{
                            if(!enableColumnReorder) return
                            const sourceId = keyboardSourceIdRef.current || id
                            const order = (columnOrder.length ? columnOrder : table.getAllLeafColumns().map(c=>c.id))
                            const reorderable = order.filter(colId=>{
                              const col = table.getAllLeafColumns().find(c=>c.id===colId)
                              return col && col.getCanHide() && !(col.columnDef as any)?.meta?.disableReorder
                            })
                            const currentIndex = reorderable.indexOf(sourceId)
                            if(e.key === 'ArrowRight'){
                              e.preventDefault()
                              if(currentIndex > -1 && currentIndex < reorderable.length - 1){
                                const target = reorderable[currentIndex+1]
                                dragSourceIdRef.current = sourceId
                                captureInitialLayout()
                                schedulePreview(target)
                                keyboardTargetIdRef.current = target
                              }
                            } else if(e.key === 'ArrowLeft'){
                              e.preventDefault()
                              if(currentIndex > 0){
                                const target = reorderable[currentIndex-1]
                                dragSourceIdRef.current = sourceId
                                captureInitialLayout()
                                schedulePreview(target)
                                keyboardTargetIdRef.current = target
                              }
                            } else if(e.key === 'Enter' || e.key === ' '){
                              if(keyboardTargetIdRef.current){
                                e.preventDefault()
                                commitReorder(sourceId, keyboardTargetIdRef.current)
                                clearPreviewTransforms()
                                dragSourceIdRef.current = null
                                keyboardSourceIdRef.current = null
                                keyboardTargetIdRef.current = null
                              }
                            } else if(e.key === 'Escape'){
                              clearPreviewTransforms()
                              keyboardTargetIdRef.current = null
                              dragSourceIdRef.current = null
                            }
                          }}
                        >
                          <GripVertical className='h-3 w-3 opacity-60' />
                        </span>
                      )}
                      <div className={canReorder ? 'pl-4' : undefined}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {renderCell(row as Row<TData>, cell as Cell<TData, unknown>)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
