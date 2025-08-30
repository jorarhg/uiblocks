import { ColumnDef } from "@tanstack/react-table";
import { ActionItem } from "./actions-menu";
interface CreateActionsColumnOptions<T> {
    actions: ActionItem[];
    menuLabel?: string;
    id?: string;
    width?: number;
}
/**
 * Crea una columna de acciones estándar para cualquier tabla
 * @param options Configuración de las acciones
 * @returns ColumnDef configurada para acciones
 */
export declare function createActionsColumn<T>(options: CreateActionsColumnOptions<T>): ColumnDef<T>;
/**
 * Configuración por defecto para la columna de acciones
 */
export declare const defaultActionsColumnConfig: {
    id: string;
    width: number;
    menuLabel: string;
};
export {};
