"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Copy, Archive } from "lucide-react"

export interface ActionItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: (row: any) => void
  variant?: 'default' | 'destructive'
  disabled?: boolean | ((row: any) => boolean)
}

interface ActionsMenuProps {
  row: any
  actions?: ActionItem[]
  menuLabel?: string
}

// Acciones por defecto que se pueden usar
export const defaultActions = {
  view: (onView: (row: any) => void): ActionItem => ({
    id: 'view',
    label: 'Ver detalles',
    icon: Eye,
    onClick: onView,
  }),
  edit: (onEdit: (row: any) => void): ActionItem => ({
    id: 'edit',
    label: 'Editar',
    icon: Edit,
    onClick: onEdit,
  }),
  copy: (onCopy: (row: any) => void): ActionItem => ({
    id: 'copy',
    label: 'Duplicar',
    icon: Copy,
    onClick: onCopy,
  }),
  archive: (onArchive: (row: any) => void): ActionItem => ({
    id: 'archive',
    label: 'Archivar',
    icon: Archive,
    onClick: onArchive,
  }),
  delete: (onDelete: (row: any) => void): ActionItem => ({
    id: 'delete',
    label: 'Eliminar',
    icon: Trash2,
    onClick: onDelete,
    variant: 'destructive' as const,
  }),
}

export function ActionsMenu({ row, actions = [], menuLabel = "Acciones" }: ActionsMenuProps) {
  if (actions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => {
          const isDisabled = typeof action.disabled === 'function' 
            ? action.disabled(row) 
            : action.disabled

          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => !isDisabled && action.onClick(row)}
              disabled={isDisabled}
              className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
