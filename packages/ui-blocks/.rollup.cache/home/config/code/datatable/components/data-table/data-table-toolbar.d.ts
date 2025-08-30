import type * as React from "react";
import type { Table } from "@tanstack/react-table";
interface DataTableToolbarProps<TData> {
    table: Table<TData>;
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
    className?: string;
}
export declare function DataTableToolbar<TData>({ table, searchKey, searchPlaceholder, filters, className, }: DataTableToolbarProps<TData>): React.JSX.Element;
export {};
