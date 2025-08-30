"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { cn } from "@/lib/utils";
export function DataTableToolbar({ table, searchKey = "title", searchPlaceholder = "Filter tasks...", filters = [], className, }) {
    var _a, _b;
    const isFiltered = table.getState().columnFilters.length > 0;
    return (<div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center py-4", className)}>
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <Input placeholder={searchPlaceholder} value={(_b = (_a = table.getColumn(searchKey)) === null || _a === void 0 ? void 0 : _a.getFilterValue()) !== null && _b !== void 0 ? _b : ""} onChange={(event) => { var _a; return (_a = table.getColumn(searchKey)) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className="w-full pl-8"/>
      </div>
      <div className="flex items-center space-x-2 ml-auto">
        {filters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column)
                return null;
            return (<DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options}/>);
        })}
        {isFiltered && (<Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
          </Button>)}
        <DataTableViewOptions table={table}/>
      </div>
    </div>);
}
//# sourceMappingURL=data-table-toolbar.jsx.map