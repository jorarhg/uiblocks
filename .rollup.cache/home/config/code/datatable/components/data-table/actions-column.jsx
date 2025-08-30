import { ActionsMenu } from "./actions-menu";
/**
 * Crea una columna de acciones estándar para cualquier tabla
 * @param options Configuración de las acciones
 * @returns ColumnDef configurada para acciones
 */
export function createActionsColumn(options) {
    return {
        id: options.id || "actions",
        enableHiding: false,
        enableSorting: false,
        enableColumnFilter: false,
        header: () => null,
        size: options.width || 50,
        cell: ({ row }) => (<ActionsMenu row={row.original} actions={options.actions} menuLabel={options.menuLabel}/>),
    };
}
/**
 * Configuración por defecto para la columna de acciones
 */
export const defaultActionsColumnConfig = {
    id: "actions",
    width: 50,
    menuLabel: "Acciones"
};
//# sourceMappingURL=actions-column.jsx.map