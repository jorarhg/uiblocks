export interface ColumnConfig {
  id?: string
  accessorKey?: string
  header?: string
  type: string
  enableSorting?: boolean
  enableHiding?: boolean
  enableFiltering?: boolean
  cellConfig?: {
    prefix?: string
    suffix?: string
    className?: string
    variant?: string
    emptyText?: string
    emptyClassName?: string
    statusMap?: Record<string, { icon: string; label: string }>
    priorityMap?: Record<string, { variant: string; className: string; label: string }>
    trueVariant?: string
    falseVariant?: string
    trueLabel?: string
    falseLabel?: string
    menuItems?: Array<{
      type: "label" | "item" | "separator"
      text?: string
      action?: string
    }>
  }
}

export interface DataTableConfig {
  tableOptions: {
    searchKey?: string
    searchPlaceholder?: string
    defaultFilters?: string[]
    showViewOptions?: boolean
    showAddFilter?: boolean
    className?: string
  }
  columns: ColumnConfig[]
}
