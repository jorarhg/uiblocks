"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CircleCheck, CircleDashed, Clock, MoreHorizontal, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export type Task = {
  id: string
  title: string
  status: "backlog" | "todo" | "in-progress" | "done" | "canceled"
  priority: "low" | "medium" | "high"
  type: "bug" | "feature" | "documentation"
  estimate?: number
  createdAt?: string
  isUrgent?: boolean
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task",
    cell: ({ row }) => <div className="font-medium">TASK-{row.getValue("id")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusMap = {
        backlog: { icon: CircleDashed, label: "Backlog" },
        todo: { icon: CircleDashed, label: "Todo" },
        "in-progress": { icon: Clock, label: "In Progress" },
        done: { icon: CircleCheck, label: "Done" },
        canceled: { icon: XCircle, label: "Canceled" },
      }

      const { icon: Icon, label } = statusMap[status as keyof typeof statusMap]

      return (
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string

      return (
        <div className="flex items-center">
          {priority === "high" && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              High
            </Badge>
          )}
          {priority === "medium" && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Medium
            </Badge>
          )}
          {priority === "low" && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Low
            </Badge>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "estimate",
    header: "Estimate (hrs)",
    cell: ({ row }) => {
      const estimate = row.getValue("estimate") as number
      return estimate ? <span>{estimate}h</span> : <span className="text-muted-foreground">-</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      return date ? <span>{date}</span> : <span className="text-muted-foreground">-</span>
    },
  },
  {
    accessorKey: "isUrgent",
    header: "Urgent",
    cell: ({ row }) => {
      const isUrgent = row.getValue("isUrgent") as boolean
      return (
        <Badge variant={isUrgent ? "destructive" : "secondary"}>
          {isUrgent ? "Yes" : "No"}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      // Manejar filtro booleano con estructura { true?: boolean, false?: boolean }
      if (!value || (typeof value === "object" && !value.true && !value.false)) {
        return true
      }
      
      const cellValue = row.getValue(id) as boolean
      
      // Si value es un objeto con propiedades true/false
      if (typeof value === "object" && (value.true !== undefined || value.false !== undefined)) {
        const shouldShowTrue = value.true === true
        const shouldShowFalse = value.false === true
        
        if (shouldShowTrue && shouldShowFalse) {
          return true // Mostrar ambos
        } else if (shouldShowTrue) {
          return cellValue === true
        } else if (shouldShowFalse) {
          return cellValue === false
        }
        return false
      }
      
      // Fallback para valores booleanos simples
      return cellValue === value
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>Copy task ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
            <DropdownMenuItem>Delete task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
