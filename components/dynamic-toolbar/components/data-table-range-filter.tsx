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

interface RangeValue {
  min?: string | number
  max?: string | number
}

interface DataTableRangeFilterProps {
  title: string
  value?: RangeValue
  onValueChange: (value: RangeValue | undefined) => void
  onRemove: () => void
  type?: "number" | "date"
}

export function DataTableRangeFilter({
  title,
  value = {},
  onValueChange,
  onRemove,
  type = "number",
}: DataTableRangeFilterProps) {
  const hasValue = value && (value.min !== undefined || value.max !== undefined)

  const handleMinChange = (min: string) => {
    const newValue = { ...value, min: min || undefined }
    if (!newValue.min && !newValue.max) {
      onValueChange(undefined)
    } else {
      onValueChange(newValue)
    }
  }

  const handleMaxChange = (max: string) => {
    const newValue = { ...value, max: max || undefined }
    if (!newValue.min && !newValue.max) {
      onValueChange(undefined)
    } else {
      onValueChange(newValue)
    }
  }

  const formatDisplayValue = () => {
    if (!hasValue) return ""
    const { min, max } = value
    if (min && max) return `${min} - ${max}`
    if (min) return `≥ ${min}`
    if (max) return `≤ ${max}`
    return ""
  }

  const inputType = type === "date" ? "date" : "number"
  const placeholder = type === "date" ? "YYYY-MM-DD" : "0"

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
                  {formatDisplayValue()}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-3" align="start">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{title} Range</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={onRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">From</Label>
                <Input
                  type={inputType}
                  placeholder={`Min ${placeholder}`}
                  value={value.min || ""}
                  onChange={(e) => handleMinChange(e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">To</Label>
                <Input
                  type={inputType}
                  placeholder={`Max ${placeholder}`}
                  value={value.max || ""}
                  onChange={(e) => handleMaxChange(e.target.value)}
                  className="h-8"
                />
              </div>
            </div>

            {hasValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onValueChange(undefined)}
                className="w-full h-8 text-xs"
              >
                Clear range
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
