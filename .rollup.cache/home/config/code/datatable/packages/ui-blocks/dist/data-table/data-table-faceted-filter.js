import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon, ListFilter } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../internal/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
export function DataTableFacetedFilter({ column, title, options }) {
    const selectedValues = new Set(column === null || column === void 0 ? void 0 : column.getFilterValue());
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: 'outline', size: 'sm', className: 'h-8 border-dashed', children: [_jsx(ListFilter, { className: 'mr-2 h-4 w-4' }), title, (selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.size) > 0 && (_jsx(Badge, { variant: 'secondary', className: 'ml-2 rounded-sm px-1 font-normal', children: selectedValues.size }))] }) }), _jsx(PopoverContent, { className: 'w-56 p-2', align: 'start', children: _jsxs("div", { className: 'flex flex-col gap-1 max-h-60 overflow-auto', children: [options.map(option => {
                            const isSelected = selectedValues.has(option.value);
                            return (_jsxs("button", { onClick: () => { if (isSelected)
                                    selectedValues.delete(option.value);
                                else
                                    selectedValues.add(option.value); const next = Array.from(selectedValues); column === null || column === void 0 ? void 0 : column.setFilterValue(next.length ? next : undefined); }, className: cn('flex items-center gap-2 rounded px-2 py-1 text-left text-xs hover:bg-accent', isSelected && 'bg-accent'), children: [_jsx("span", { className: cn('flex h-4 w-4 items-center justify-center rounded-sm border border-primary', isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50'), children: _jsx(CheckIcon, { className: 'h-3 w-3' }) }), option.icon && _jsx(option.icon, { className: 'h-3.5 w-3.5 text-muted-foreground' }), _jsx("span", { className: 'flex-1', children: option.label }), option.count !== undefined && _jsx("span", { className: 'ml-auto font-mono text-[10px]', children: option.count })] }, option.value));
                        }), selectedValues.size > 0 && _jsx("button", { onClick: () => column === null || column === void 0 ? void 0 : column.setFilterValue(undefined), className: 'mt-1 rounded bg-muted px-2 py-1 text-xs', children: "Clear filters" })] }) })] }));
}
//# sourceMappingURL=data-table-faceted-filter.js.map