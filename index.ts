// Componentes principales de tabla
export { DataTable } from "./components/data-table/data-table"
export { DataTableWithDynamicToolbar } from "./components/dynamic-toolbar"

// Componentes de filtros y toolbar
export { DataTableToolbar } from "./components/data-table/data-table-toolbar"
export { DataTablePagination } from "./components/data-table/data-table-pagination"
export { DataTableViewOptions } from "./components/data-table/data-table-view-options"

// Sistema dinámico
export { CELL_RENDERERS } from "./components/dynamic-datatable-factory/cell-renderers"

// Utilidades
export { cn } from "./lib/utils"

// Tipos principales
export type { 
  DataTableOptions
} from "./components/dynamic-toolbar"

// Hooks
export { useIsMobile } from "./hooks/use-mobile"

// Configuraciones
export { getConfigFromJSON, getTableOptionsFromConfig } from "./lib/column-factory"

// Charts
export { BaseLineChart, SimpleLineChart, MultiLineChart, LineChartWithReference } from "./components/charts/line-charts"
export { GaugeChart } from "./components/charts/gauge-chart"

// Primitivos UI básicos (exportados para coincidir con ejemplos de docs)
export { Button } from "./components/ui/button"
export { Input } from "./components/ui/input"
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from "./components/ui/select"
export { Checkbox } from "./components/ui/checkbox"
export { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
export { Radio } from "./components/ui/radio"
export { Switch } from "./components/ui/switch"
export { Badge } from "./components/ui/badge"
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card"
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./components/ui/dialog"
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup } from "./components/ui/dropdown-menu"
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip"


