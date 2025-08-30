import * as React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    searchPlaceholder?: string;
    filters?: {
        columnId: string;
        title: string;
        options: {
            label: string;
            value: string;
            icon?: React.ComponentType<{
                className?: string;
            }>;
            count?: number;
        }[];
    }[];
    enableColumnReorder?: boolean;
    enableGrouping?: boolean;
    groupableColumns?: string[];
    /** Permite personalizar la transición FLIP usada en el preview de reordenamiento (e.g. 'transform 300ms ease'). */
    reorderTransition?: string;
}
export declare function DataTable<TData, TValue>({ columns, data, searchKey, searchPlaceholder, filters, enableColumnReorder, enableGrouping, groupableColumns, reorderTransition, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
