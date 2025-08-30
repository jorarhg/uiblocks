"use client"

import { ListFilter, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

interface BooleanValue {
  true?: boolean
  false?: boolean
}

interface DataTableBooleanFilterProps {
  title: string
  value?: BooleanValue
  onValueChange: (value: BooleanValue | undefined) => void
  onRemove: () => void
  trueLabel?: string
  falseLabel?: string
}

export function DataTableBooleanFilter({
  title,
  value = {},
  onValueChange,
  onRemove,
  trueLabel = "Yes",
  falseLabel = "No",
}: DataTableBooleanFilterProps) {
  const hasValue = value && (value.true || value.false)

  const handleValueChange = (key: "true" | "false", checked: boolean) => {
    const newValue = { ...value, [key]: checked }
    
    // Si ambos están desmarcados, limpiar el filtro
    if (!newValue.true && !newValue.false) {
      onValueChange(undefined)
    } else {
      onValueChange(newValue)
    }
  }

  const formatDisplayValue = () => {
    if (!hasValue) return ""
    const selected = []
    if (value.true) selected.push(trueLabel)
    if (value.false) selected.push(falseLabel)
    return selected.join(", ")
  }

  const getSelectedCount = () => {
    if (!hasValue) return 0
    let count = 0
    if (value.true) count++
    if (value.false) count++
    return count
  }

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
                  {getSelectedCount()}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-3" align="start">
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
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${title}-true`}
                  checked={value.true || false}
                  onCheckedChange={(checked) => handleValueChange("true", checked as boolean)}
                />
                <Label
                  htmlFor={`${title}-true`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {trueLabel}
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${title}-false`}
                  checked={value.false || false}
                  onCheckedChange={(checked) => handleValueChange("false", checked as boolean)}
                />
                <Label
                  htmlFor={`${title}-false`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {falseLabel}
                </Label>
              </div>
            </div>

            {hasValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onValueChange(undefined)}
                className="w-full h-8 text-xs"
              >
                Clear selection
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
