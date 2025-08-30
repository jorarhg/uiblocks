export interface ActionItem {
    id: string;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    onClick: (row: any) => void;
    variant?: 'default' | 'destructive';
    disabled?: boolean | ((row: any) => boolean);
}
interface ActionsMenuProps {
    row: any;
    actions?: ActionItem[];
    menuLabel?: string;
}
export declare const defaultActions: {
    view: (onView: (row: any) => void) => ActionItem;
    edit: (onEdit: (row: any) => void) => ActionItem;
    copy: (onCopy: (row: any) => void) => ActionItem;
    archive: (onArchive: (row: any) => void) => ActionItem;
    delete: (onDelete: (row: any) => void) => ActionItem;
};
export declare function ActionsMenu({ row, actions, menuLabel }: ActionsMenuProps): import("react").JSX.Element | null;
export {};
