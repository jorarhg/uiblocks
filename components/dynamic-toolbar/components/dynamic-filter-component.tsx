"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "../../data-table/data-table-faceted-filter"
import { DataTableSearchFilter } from "./data-table-search-filter"
import { DataTableRangeFilter } from "./data-table-range-filter"
import { DataTableBooleanFilter } from "./data-table-boolean-filter"
import { detectBooleanLabels } from "../utils/boolean-label-detector"
import type { Column } from "@tanstack/react-table"
import type { DynamicFilter } from "../hooks/use-dynamic-filters"

interface DynamicFilterComponentProps<TData> {
  filter: DynamicFilter
  column: Column<TData, unknown> | undefined
  onValueChange: (filterId: string, value: any) => void
  onRemove: (filterId: string) => void
}

export function DynamicFilterComponent<TData>({
  filter,
  column,
  onValueChange,
  onRemove,
}: DynamicFilterComponentProps<TData>) {
  if (!column) {
    return null
  }

  const handleValueChange = (value: any) => {
    onValueChange(filter.id, value)
  }

  const handleRemove = () => {
    onRemove(filter.id)
  }

  // Renderizar según el tipo de filtro
  switch (filter.type) {
    case "faceted":
      if (!filter.options) return null
      
      return (
        <div className="relative group">
          <DataTableFacetedFilter
            column={column}
            title={filter.title}
            options={filter.options}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {filter.title} filter</span>
          </Button>
        </div>
      )

    case "search":
      return (
        <DataTableSearchFilter
          title={filter.title}
          value={filter.value || ""}
          onValueChange={handleValueChange}
          onRemove={handleRemove}
        />
      )

    case "range":
      // Detectar tipo basado en configuración del filtro o análisis de datos
      let rangeType: "date" | "number" = "number"
      
      // Verificar configuración explícita primero
      if (filter.config?.dataType) {
        rangeType = filter.config.dataType === "date" || filter.config.dataType === "datetime" ? "date" : "number"
      } else if (filter.metadata?.dataType) {
        rangeType = filter.metadata.dataType === "date" || filter.metadata.dataType === "datetime" ? "date" : "number"
      } else {
        // Fallback: análisis automático de datos
        const uniqueValues = column?.getFacetedUniqueValues()
        if (uniqueValues) {
          const sampleValues = Array.from(uniqueValues.keys()).slice(0, 10)
          const datePatterns = [
            /^\d{4}-\d{2}-\d{2}/, // ISO date
            /^\d{2}\/\d{2}\/\d{4}/, // US format
            /^\d{2}-\d{2}-\d{4}/, // EU format
            /^\d{4}\/\d{2}\/\d{2}/, // Alternative
          ]
          
          const isDateColumn = sampleValues.some(val => {
            const strVal = String(val)
            return datePatterns.some(pattern => pattern.test(strVal)) ||
                   (!isNaN(Date.parse(strVal)) && isNaN(Number(strVal)))
          })
          
          rangeType = isDateColumn ? "date" : "number"
        }
      }
      
      return (
        <DataTableRangeFilter
          title={filter.title}
          value={filter.value}
          onValueChange={handleValueChange}
          onRemove={handleRemove}
          type={rangeType}
        />
      )

    case "boolean":
      // Sistema inteligente de detección automática de etiquetas booleanas
      let trueLabel = filter.config?.trueLabel || "Yes"
      let falseLabel = filter.config?.falseLabel || "No"
      
      // Si no hay configuración explícita, usar detección inteligente
      if (!filter.config?.trueLabel && !filter.config?.falseLabel) {
        const detectedLabels = detectBooleanLabels(column)
        if (detectedLabels && detectedLabels.confidence > 0.6) {
          trueLabel = detectedLabels.trueLabel
          falseLabel = detectedLabels.falseLabel
        }
      }
      
      return (
        <DataTableBooleanFilter
          title={filter.title}
          value={filter.value}
          onValueChange={handleValueChange}
          onRemove={handleRemove}
          trueLabel={trueLabel}
          falseLabel={falseLabel}
        />
      )

    default:
      return null
  }
}
