import { ColumnDef } from '@tanstack/react-table';
import { ActionItem } from './actions-menu';
interface CreateActionsColumnOptions<T> {
    actions: ActionItem[];
    menuLabel?: string;
    id?: string;
    width?: number;
}
export declare function createActionsColumn<T>(options: CreateActionsColumnOptions<T>): ColumnDef<T>;
export declare const defaultActionsColumnConfig: {
    id: string;
    width: number;
    menuLabel: string;
};
export {};
