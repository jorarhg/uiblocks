"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Eye, Copy, Archive } from "lucide-react";
// Acciones por defecto que se pueden usar
export const defaultActions = {
    view: (onView) => ({
        id: 'view',
        label: 'Ver detalles',
        icon: Eye,
        onClick: onView,
    }),
    edit: (onEdit) => ({
        id: 'edit',
        label: 'Editar',
        icon: Edit,
        onClick: onEdit,
    }),
    copy: (onCopy) => ({
        id: 'copy',
        label: 'Duplicar',
        icon: Copy,
        onClick: onCopy,
    }),
    archive: (onArchive) => ({
        id: 'archive',
        label: 'Archivar',
        icon: Archive,
        onClick: onArchive,
    }),
    delete: (onDelete) => ({
        id: 'delete',
        label: 'Eliminar',
        icon: Trash2,
        onClick: onDelete,
        variant: 'destructive',
    }),
};
export function ActionsMenu({ row, actions = [], menuLabel = "Acciones" }) {
    if (actions.length === 0) {
        return null;
    }
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => {
            const isDisabled = typeof action.disabled === 'function'
                ? action.disabled(row)
                : action.disabled;
            return (<DropdownMenuItem key={action.id} onClick={() => !isDisabled && action.onClick(row)} disabled={isDisabled} className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}>
              <action.icon className="mr-2 h-4 w-4"/>
              {action.label}
            </DropdownMenuItem>);
        })}
      </DropdownMenuContent>
    </DropdownMenu>);
}
//# sourceMappingURL=actions-menu.jsx.map