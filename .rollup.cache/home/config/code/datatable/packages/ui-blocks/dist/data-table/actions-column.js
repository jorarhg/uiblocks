import { jsx as _jsx } from "react/jsx-runtime";
import { ActionsMenu } from './actions-menu';
export function createActionsColumn(options) {
    return {
        id: options.id || 'actions',
        enableHiding: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => null,
        size: options.width || 50,
        cell: ({ row }) => _jsx(ActionsMenu, { row: row.original, actions: options.actions, menuLabel: options.menuLabel }),
    };
}
export const defaultActionsColumnConfig = { id: 'actions', width: 50, menuLabel: 'Acciones' };
//# sourceMappingURL=actions-column.js.map