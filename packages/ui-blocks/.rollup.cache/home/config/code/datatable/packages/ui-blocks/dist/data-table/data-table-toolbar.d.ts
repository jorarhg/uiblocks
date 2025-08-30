import type { Table, GroupingState } from '@tanstack/react-table';
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
    enableGrouping?: boolean;
    grouping?: GroupingState;
    setGrouping?: (updater: GroupingState) => void;
    groupableColumns?: string[];
}
export declare function DataTableToolbar<TData>({ table, searchKey, searchPlaceholder, filters, className, enableGrouping, grouping, setGrouping, groupableColumns }: DataTableToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
