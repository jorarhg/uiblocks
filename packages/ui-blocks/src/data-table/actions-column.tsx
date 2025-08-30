import { ColumnDef } from '@tanstack/react-table'
import { ActionsMenu, ActionItem } from './actions-menu'

interface CreateActionsColumnOptions<T> { actions: ActionItem[]; menuLabel?: string; id?: string; width?: number }

export function createActionsColumn<T>(options: CreateActionsColumnOptions<T>): ColumnDef<T> {
  return {
    id: options.id || 'actions',
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: false,
    header: () => null,
    size: options.width || 50,
    cell: ({ row }) => <ActionsMenu row={row.original} actions={options.actions} menuLabel={options.menuLabel} />,
  }
}

export const defaultActionsColumnConfig = { id: 'actions', width: 50, menuLabel: 'Acciones' }
