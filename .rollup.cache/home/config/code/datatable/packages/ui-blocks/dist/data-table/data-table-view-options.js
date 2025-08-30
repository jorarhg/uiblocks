import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
export function DataTableViewOptions({ table }) {
    // Incluir columnas con accessorKey (accessorFn es undefined en ese caso)
    const columns = table.getAllColumns().filter(col => col.getCanHide());
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: 'outline', size: 'sm', className: 'h-8 w-8 p-0', children: [_jsx(Settings, { className: 'h-4 w-4' }), _jsx("span", { className: 'sr-only', children: "View options" })] }) }), _jsxs(DropdownMenuContent, { align: 'end', className: 'w-44', children: [_jsx(DropdownMenuLabel, { className: 'text-xs', children: "Toggle columns" }), _jsx(DropdownMenuSeparator, {}), columns.map(column => (_jsx(DropdownMenuCheckboxItem, { checked: column.getIsVisible(), onCheckedChange: (value) => column.toggleVisibility(!!value), className: 'capitalize', children: column.id }, column.id)))] })] }));
}
//# sourceMappingURL=data-table-view-options.js.map