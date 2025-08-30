import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Limpio: versión con export explícito de DataTableProps y DnD robusto
import * as React from 'react';
import { flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, getGroupedRowModel, getExpandedRowModel, useReactTable, } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';
import { GripVertical } from 'lucide-react';
// Valor por defecto para la transición FLIP si no se pasa prop
const DEFAULT_COLUMN_FLIP_TRANSITION = 'transform 220ms cubic-bezier(.22,.61,.36,1)';
export function DataTable({ columns, data, searchKey = 'title', searchPlaceholder, filters, enableColumnReorder = false, enableGrouping = false, groupableColumns, reorderTransition, }) {
    var _a;
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [sorting, setSorting] = React.useState([]);
    const [columnOrder, setColumnOrder] = React.useState([]);
    const [grouping, setGrouping] = React.useState([]);
    const headerContainerRef = React.useRef(null);
    const dragSourceIdRef = React.useRef(null);
    const initialLayoutRef = React.useRef(null);
    const lastPreviewTargetRef = React.useRef(null);
    const isMountedRef = React.useRef(false);
    const pendingRafRef = React.useRef(null);
    const rafTargetRef = React.useRef(null);
    const keyboardSourceIdRef = React.useRef(null);
    const keyboardTargetIdRef = React.useRef(null);
    const focusAfterReorderRef = React.useRef(null);
    const flipTransition = reorderTransition || DEFAULT_COLUMN_FLIP_TRANSITION;
    function clearPreviewTransforms() {
        var _a;
        if (!headerContainerRef.current)
            return;
        (_a = headerContainerRef.current.querySelectorAll('[data-col-id]')) === null || _a === void 0 ? void 0 : _a.forEach(el => {
            el.style.transform = '';
            el.style.transition = '';
            delete el.dataset.flipInit;
        });
    }
    function scheduleFocusGrip(columnId) {
        focusAfterReorderRef.current = columnId;
        // doble RAF para asegurar repaint tras reordenamiento
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!headerContainerRef.current)
                    return;
                const grip = headerContainerRef.current.querySelector(`[data-grip-for="${columnId}"]`);
                if (grip) {
                    grip.focus({ preventScroll: true });
                    focusAfterReorderRef.current = null;
                }
            });
        });
    }
    function captureInitialLayout() {
        if (!headerContainerRef.current)
            return;
        const cells = Array.from(headerContainerRef.current.querySelectorAll('[data-col-id]'));
        if (!cells.length)
            return;
        const widths = {};
        const lefts = {};
        let baseLeft = Infinity;
        cells.forEach(el => {
            const id = el.dataset.colId;
            const rect = el.getBoundingClientRect();
            widths[id] = rect.width;
            lefts[id] = rect.left;
            if (rect.left < baseLeft)
                baseLeft = rect.left;
        });
        initialLayoutRef.current = { baseLeft, widths, lefts };
    }
    function applyPreview(targetId) {
        var _a;
        if (!enableColumnReorder)
            return;
        const sourceId = dragSourceIdRef.current;
        if (!sourceId) {
            clearPreviewTransforms();
            return;
        }
        // Evitar recomputación si ya estamos sobre el mismo destino
        if (targetId === lastPreviewTargetRef.current)
            return;
        if (sourceId === targetId) {
            lastPreviewTargetRef.current = targetId;
            clearPreviewTransforms();
            return;
        }
        const layout = initialLayoutRef.current;
        if (!layout)
            return;
        // construir orden actual real
        const currentOrder = (columnOrder.length ? columnOrder : table.getAllLeafColumns().map(c => c.id));
        const next = [...currentOrder];
        const from = next.indexOf(sourceId);
        const to = next.indexOf(targetId);
        if (from === -1 || to === -1)
            return;
        next.splice(from, 1);
        next.splice(to, 0, sourceId);
        // Calcular posiciones objetivo acumulando widths
        let accLeft = layout.baseLeft;
        const targetLeftMap = {};
        next.forEach(id => {
            targetLeftMap[id] = accLeft;
            accLeft += layout.widths[id];
        });
        // Aplicar transform FLIP (currentLeft -> targetLeft)
        if (!headerContainerRef.current)
            return;
        (_a = headerContainerRef.current.querySelectorAll('[data-col-id]')) === null || _a === void 0 ? void 0 : _a.forEach(el => {
            const node = el;
            const id = node.dataset.colId;
            const currentLeft = layout.lefts[id];
            const targetLeft = targetLeftMap[id];
            if (currentLeft == null || targetLeft == null)
                return;
            const dx = targetLeft - currentLeft;
            const desired = `translateX(${dx}px)`;
            if (node.style.transform === desired)
                return; // no re-disparar transición
            // Sólo setear transición la primera vez
            if (!node.dataset.flipInit) {
                node.style.willChange = 'transform';
                node.dataset.flipInit = '1';
            }
            node.style.transition = flipTransition;
            node.style.transform = desired;
        });
        lastPreviewTargetRef.current = targetId;
    }
    function schedulePreview(targetId) {
        if (pendingRafRef.current) {
            rafTargetRef.current = targetId;
            return;
        }
        rafTargetRef.current = targetId;
        pendingRafRef.current = requestAnimationFrame(() => {
            const t = rafTargetRef.current;
            if (t)
                applyPreview(t);
            pendingRafRef.current = null;
        });
    }
    function commitReorder(sourceId, targetId) {
        if (sourceId === targetId)
            return;
        setColumnOrder(prev => {
            const current = prev.length ? prev : table.getAllLeafColumns().map(c => c.id);
            const next = [...current];
            const from = next.indexOf(sourceId);
            const to = next.indexOf(targetId);
            if (from === -1 || to === -1)
                return current;
            next.splice(from, 1);
            next.splice(to, 0, sourceId);
            scheduleFocusGrip(sourceId);
            return next;
        });
    }
    React.useEffect(() => {
        return () => { clearPreviewTransforms(); };
    }, []);
    React.useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);
    // Inicializar orden al montar / cambiar columnas
    React.useEffect(() => {
        if (columnOrder.length === 0) {
            setColumnOrder(columns
                .map((c) => { var _a; return (_a = c.id) !== null && _a !== void 0 ? _a : c.accessorKey; })
                .filter(Boolean));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns]);
    const table = useReactTable(Object.assign({ data,
        columns, state: { sorting, columnVisibility, rowSelection, columnFilters, columnOrder, grouping }, enableRowSelection: true, enableGrouping, onRowSelectionChange: setRowSelection, onSortingChange: setSorting, onColumnFiltersChange: setColumnFilters, onColumnVisibilityChange: setColumnVisibility, onColumnOrderChange: setColumnOrder, onGroupingChange: setGrouping, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), getFacetedRowModel: getFacetedRowModel(), getFacetedUniqueValues: getFacetedUniqueValues() }, (enableGrouping
        ? { getGroupedRowModel: getGroupedRowModel(), getExpandedRowModel: getExpandedRowModel() }
        : {})));
    function handleHeaderDrop(e, targetId) {
        if (!enableColumnReorder)
            return;
        e.preventDefault();
        const sourceId = e.dataTransfer.getData('text/plain');
        clearPreviewTransforms();
        dragSourceIdRef.current = null;
        initialLayoutRef.current = null;
        lastPreviewTargetRef.current = null;
        if (!sourceId || sourceId === targetId)
            return;
        if (!isMountedRef.current)
            return;
        setColumnOrder(prev => {
            const current = prev.length
                ? prev
                : table.getAllLeafColumns().map(c => c.id);
            const next = [...current];
            const from = next.indexOf(sourceId);
            const to = next.indexOf(targetId);
            if (from === -1 || to === -1)
                return current;
            next.splice(from, 1);
            next.splice(to, 0, sourceId);
            scheduleFocusGrip(sourceId);
            return next;
        });
    }
    function renderCell(row, cell) {
        var _a;
        if (enableGrouping) {
            if (cell.getIsGrouped()) {
                return (_jsxs("button", { onClick: row.getToggleExpandedHandler(), className: 'flex items-center gap-2 font-medium', children: [_jsx("span", { className: 'inline-block w-4', children: row.getIsExpanded() ? '−' : '+' }), flexRender(cell.column.columnDef.cell, cell.getContext()), _jsxs("span", { className: 'text-xs text-muted-foreground', children: ["(", row.subRows.length, ")"] })] }));
            }
            if (cell.getIsAggregated()) {
                return flexRender((_a = cell.column.columnDef.aggregatedCell) !== null && _a !== void 0 ? _a : cell.column.columnDef.cell, cell.getContext());
            }
            if (cell.getIsPlaceholder())
                return null;
        }
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
    return (_jsxs("div", { className: 'space-y-4', children: [_jsx(DataTableToolbar, { table: table, searchKey: searchKey, searchPlaceholder: searchPlaceholder, filters: filters, enableGrouping: enableGrouping, grouping: grouping, setGrouping: setGrouping, groupableColumns: groupableColumns }), _jsx("div", { className: 'rounded-md border', children: _jsxs(Table, { children: [_jsx(TableHeader, { ref: headerContainerRef, children: table.getHeaderGroups().map(hg => (_jsx(TableRow, { children: hg.headers.map(header => {
                                    var _a, _b;
                                    const id = header.column.id;
                                    const canReorder = enableColumnReorder &&
                                        header.column.getCanHide() &&
                                        !((_b = (_a = header.column.columnDef) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.disableReorder);
                                    return (_jsxs(TableHead, { "data-col-id": id, onDragOver: (e) => { if (enableColumnReorder && dragSourceIdRef.current) {
                                            e.preventDefault();
                                            schedulePreview(id);
                                        } }, onDragEnter: (e) => { if (enableColumnReorder && dragSourceIdRef.current && e.currentTarget === e.target) {
                                            schedulePreview(id);
                                        } }, onDrop: (e) => handleHeaderDrop(e, id), className: canReorder ? 'relative select-none' : undefined, children: [canReorder && (_jsx("span", { className: 'absolute left-1 top-1/2 -translate-y-1/2 inline-flex items-center p-0.5 rounded hover:bg-muted', draggable: true, "data-grip-for": id, onDragStart: (e) => {
                                                    if (!canReorder)
                                                        return;
                                                    dragSourceIdRef.current = id;
                                                    keyboardSourceIdRef.current = id;
                                                    e.dataTransfer.effectAllowed = 'move';
                                                    e.dataTransfer.setData('text/plain', id);
                                                    captureInitialLayout();
                                                }, onDragEnd: () => { clearPreviewTransforms(); dragSourceIdRef.current = null; initialLayoutRef.current = null; }, onMouseEnter: e => { e.currentTarget.style.cursor = 'move'; }, onFocus: e => { e.currentTarget.style.cursor = 'move'; keyboardSourceIdRef.current = id; }, tabIndex: 0, role: 'button', "aria-label": 'Reordenar columna', onKeyDown: (e) => {
                                                    if (!enableColumnReorder)
                                                        return;
                                                    const sourceId = keyboardSourceIdRef.current || id;
                                                    const order = (columnOrder.length ? columnOrder : table.getAllLeafColumns().map(c => c.id));
                                                    const reorderable = order.filter(colId => {
                                                        var _a, _b;
                                                        const col = table.getAllLeafColumns().find(c => c.id === colId);
                                                        return col && col.getCanHide() && !((_b = (_a = col.columnDef) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.disableReorder);
                                                    });
                                                    const currentIndex = reorderable.indexOf(sourceId);
                                                    if (e.key === 'ArrowRight') {
                                                        e.preventDefault();
                                                        if (currentIndex > -1 && currentIndex < reorderable.length - 1) {
                                                            const target = reorderable[currentIndex + 1];
                                                            dragSourceIdRef.current = sourceId;
                                                            captureInitialLayout();
                                                            schedulePreview(target);
                                                            keyboardTargetIdRef.current = target;
                                                        }
                                                    }
                                                    else if (e.key === 'ArrowLeft') {
                                                        e.preventDefault();
                                                        if (currentIndex > 0) {
                                                            const target = reorderable[currentIndex - 1];
                                                            dragSourceIdRef.current = sourceId;
                                                            captureInitialLayout();
                                                            schedulePreview(target);
                                                            keyboardTargetIdRef.current = target;
                                                        }
                                                    }
                                                    else if (e.key === 'Enter' || e.key === ' ') {
                                                        if (keyboardTargetIdRef.current) {
                                                            e.preventDefault();
                                                            commitReorder(sourceId, keyboardTargetIdRef.current);
                                                            clearPreviewTransforms();
                                                            dragSourceIdRef.current = null;
                                                            keyboardSourceIdRef.current = null;
                                                            keyboardTargetIdRef.current = null;
                                                        }
                                                    }
                                                    else if (e.key === 'Escape') {
                                                        clearPreviewTransforms();
                                                        keyboardTargetIdRef.current = null;
                                                        dragSourceIdRef.current = null;
                                                    }
                                                }, children: _jsx(GripVertical, { className: 'h-3 w-3 opacity-60' }) })), _jsx("div", { className: canReorder ? 'pl-4' : undefined, children: header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext()) })] }, header.id));
                                }) }, hg.id))) }), _jsx(TableBody, { children: ((_a = table.getRowModel().rows) === null || _a === void 0 ? void 0 : _a.length) ? (table.getRowModel().rows.map(row => (_jsx(TableRow, { "data-state": row.getIsSelected() && 'selected', children: row.getVisibleCells().map(cell => (_jsx(TableCell, { children: renderCell(row, cell) }, cell.id))) }, row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: 'h-24 text-center', children: "No results." }) })) })] }) }), _jsx(DataTablePagination, { table: table })] }));
}
//# sourceMappingURL=data-table.js.map