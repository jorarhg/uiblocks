import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
interface DataTableProps<TData, TValue> {
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
}
export declare function DataTable<TData, TValue>({ columns, data, searchKey, searchPlaceholder, filters, }: DataTableProps<TData, TValue>): React.JSX.Element;
export {};
