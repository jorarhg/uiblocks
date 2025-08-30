import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { cn } from '../internal/lib/utils';
export function DataTableToolbar({ table, searchKey = 'title', searchPlaceholder = 'Filter rows...', filters = [], className, enableGrouping = false, grouping = [], setGrouping, groupableColumns }) {
    var _a, _b;
    const isFiltered = table.getState().columnFilters.length > 0;
    return (_jsxs("div", { className: cn('flex flex-col gap-4 sm:flex-row sm:items-center py-4', className), children: [_jsxs("div", { className: 'relative w-full sm:max-w-xs', children: [_jsx(Search, { className: 'absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' }), _jsx(Input, { placeholder: searchPlaceholder, value: (_b = (_a = table.getColumn(searchKey)) === null || _a === void 0 ? void 0 : _a.getFilterValue()) !== null && _b !== void 0 ? _b : '', onChange: e => { var _a; return (_a = table.getColumn(searchKey)) === null || _a === void 0 ? void 0 : _a.setFilterValue(e.target.value); }, className: 'w-full pl-8' })] }), _jsxs("div", { className: 'flex flex-wrap items-center gap-2 ml-auto', children: [filters.map(filter => { const column = table.getColumn(filter.columnId); if (!column)
                        return null; return _jsx(DataTableFacetedFilter, { column: column, title: filter.title, options: filter.options }, filter.columnId); }), enableGrouping && groupableColumns && groupableColumns.length > 0 && (_jsx("div", { className: 'flex items-center gap-1', children: _jsx("div", { className: 'flex gap-1', children: groupableColumns.map(id => {
                                const col = table.getColumn(id);
                                if (!col)
                                    return null;
                                const isActive = grouping.includes(id);
                                return (_jsx(Button, { variant: isActive ? 'default' : 'outline', size: 'sm', className: 'h-8 px-2 text-xs', onClick: () => {
                                        if (!setGrouping)
                                            return;
                                        const next = isActive ? grouping.filter(g => g !== id) : [...grouping, id];
                                        setGrouping(next);
                                        col.toggleGrouping();
                                    }, children: col.id }, id));
                            }) }) })), isFiltered && _jsx(Button, { variant: 'ghost', onClick: () => table.resetColumnFilters(), className: 'h-8 px-2 lg:px-3', children: "Reset" }), _jsx(DataTableViewOptions, { table: table })] }), enableGrouping && grouping.length > 0 && (_jsx("div", { className: 'flex flex-wrap gap-2 -mb-2', children: grouping.map(g => _jsxs("span", { className: 'inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs', children: [g, _jsx("button", { onClick: () => { if (!setGrouping)
                                return; const next = grouping.filter(x => x !== g); setGrouping(next); const col = table.getColumn(g); if (col) {
                                col.toggleGrouping();
                            } }, className: 'text-muted-foreground hover:text-foreground', children: "\u00D7" })] }, g)) }))] }));
}
//# sourceMappingURL=data-table-toolbar.js.map