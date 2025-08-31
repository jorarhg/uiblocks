"use client"
import * as React from 'react'
import { COMPONENT_DOCS, ComponentDocKey, PropDoc } from './props-data'
import { cn } from '@/lib/utils'

interface PropsTableProps { component: ComponentDocKey; className?: string; eventsOnly?: boolean }

export function PropsTable({ component, className, eventsOnly=false }: PropsTableProps){
  const doc = COMPONENT_DOCS[component]
  if(!doc) return null
  const rows = eventsOnly ? doc.props.filter(p=>p.event) : doc.props
  if(!rows.length) return null
  return (
    <div className={cn('overflow-x-auto rounded-md border', className)}>
      <table className='w-full text-sm border-collapse relative'>
        <thead className='bg-muted/60 text-left'>
          <tr>
            <Th>Prop</Th><Th>Tipo</Th>{!eventsOnly && <Th>Default</Th>}<Th>Descripción</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => <PropRow key={r.name} prop={r} showDefault={!eventsOnly} />)}
        </tbody>
      </table>
      {doc.notes && !eventsOnly && (
        <div className='p-2 border-t text-xs text-muted-foreground'>{doc.notes}</div>
      )}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }){
  return <th className='px-3 py-2 font-medium text-xs uppercase tracking-wide text-muted-foreground/80'>{children}</th>
}

function PropRow({ prop, showDefault }: { prop: PropDoc; showDefault: boolean }){
  return (
    <tr className='border-t align-top'>
      <td className='px-3 py-2 font-mono text-xs whitespace-nowrap'>{prop.name}{prop.required && <span className='text-red-500'>*</span>}</td>
      <td className='px-3 py-2 text-xs font-mono whitespace-pre text-indigo-500/90 max-w-[240px] overflow-x-auto'>{prop.type}</td>
      {showDefault && <td className='px-3 py-2 text-xs font-mono text-muted-foreground'>{prop.default ?? '-'}</td>}
      <td className='px-3 py-2 text-xs'>{prop.description}{prop.deprecated && <span className='ml-2 text-amber-600'>Deprecated</span>}{prop.event && <span className='ml-2 rounded bg-indigo-100 dark:bg-indigo-900/40 px-1 py-0.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-300'>event</span>}</td>
    </tr>
  )
}
