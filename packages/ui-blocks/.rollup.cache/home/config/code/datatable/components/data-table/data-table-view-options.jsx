"use client";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
export function DataTableViewOptions({ table }) {
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Settings className="h-4 w-4"/>
          <span className="sr-only">View options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
            .map((column) => {
            return (<DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                {column.id}
              </DropdownMenuCheckboxItem>);
        })}
      </DropdownMenuContent>
    </DropdownMenu>);
}
//# sourceMappingURL=data-table-view-options.jsx.map