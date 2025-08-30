import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye, Copy, Archive } from 'lucide-react';
export const defaultActions = {
    view: (onView) => ({ id: 'view', label: 'Ver detalles', icon: Eye, onClick: onView }),
    edit: (onEdit) => ({ id: 'edit', label: 'Editar', icon: Edit, onClick: onEdit }),
    copy: (onCopy) => ({ id: 'copy', label: 'Duplicar', icon: Copy, onClick: onCopy }),
    archive: (onArchive) => ({ id: 'archive', label: 'Archivar', icon: Archive, onClick: onArchive }),
    delete: (onDelete) => ({ id: 'delete', label: 'Eliminar', icon: Trash2, onClick: onDelete, variant: 'destructive' }),
};
export function ActionsMenu({ row, actions = [], menuLabel = 'Acciones' }) {
    if (!actions.length)
        return null;
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: 'ghost', className: 'h-8 w-8 p-0', children: [_jsx("span", { className: 'sr-only', children: "Abrir men\u00FA" }), _jsx(MoreHorizontal, { className: 'h-4 w-4' })] }) }), _jsxs(DropdownMenuContent, { align: 'end', className: 'w-[160px]', children: [_jsx(DropdownMenuLabel, { children: menuLabel }), _jsx(DropdownMenuSeparator, {}), actions.map(action => {
                        const isDisabled = typeof action.disabled === 'function' ? action.disabled(row) : action.disabled;
                        return (_jsxs(DropdownMenuItem, { onClick: () => !isDisabled && action.onClick(row), disabled: isDisabled, className: action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : '', children: [_jsx(action.icon, { className: 'mr-2 h-4 w-4' }), action.label] }, action.id));
                    })] })] }));
}
//# sourceMappingURL=actions-menu.js.map