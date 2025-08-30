"use client"

import { ListFilter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableSearchFilterProps {
  title: string
  value?: string
  onValueChange: (value: string | undefined) => void
  onRemove: () => void
}

export function DataTableSearchFilter({
  title,
  value = "",
  onValueChange,
  onRemove,
}: DataTableSearchFilterProps) {
  const hasValue = value && value.length > 0

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed focus:outline-none focus:ring-0 focus:ring-offset-0">
            <ListFilter className="mr-2 h-4 w-4" />
            {title}
            {hasValue && (
              <>
                <div className="ml-2 h-4 w-px bg-border" />
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {value.length > 10 ? `${value.substring(0, 10)}...` : value}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-3" align="start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{title}</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={value}
              onChange={(e) => onValueChange(e.target.value || undefined)}
              className="h-8"
            />
            {hasValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onValueChange(undefined)}
                className="w-full h-8 text-xs"
              >
                Clear search
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
