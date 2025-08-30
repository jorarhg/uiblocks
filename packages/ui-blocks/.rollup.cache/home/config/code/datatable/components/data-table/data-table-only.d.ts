import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
interface DataTableOnlyProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
}
export declare function DataTableOnly<TData, TValue>({ columns, data, className, }: DataTableOnlyProps<TData, TValue>): React.JSX.Element;
export {};
