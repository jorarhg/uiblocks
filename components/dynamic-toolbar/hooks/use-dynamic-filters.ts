"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import type { Column, Table } from "@tanstack/react-table"
import { HybridFilterAnalyzer } from "../utils/hybrid-filter-analyzer"
import { EnhancedHybridFilterEngine } from "../utils/enhanced-hybrid-filter-engine"
import type { 
  FilterOption, 
  DynamicFilter, 
  FilterableColumn, 
  GlobalFilterConfig 
} from "../types/filter-config"

// Re-exportar tipos para compatibilidad hacia atrás
export type { FilterOption, DynamicFilter, FilterableColumn }

export interface DynamicFiltersConfig {
  useEnhancedEngine?: boolean  // Feature flag para motor híbrido mejorado
  analysisContext?: {
    domain?: 'ecommerce' | 'hr' | 'finance' | 'crm' | 'inventory' | 'analytics'
    dataSource?: 'api' | 'csv' | 'database' | 'user-input' | 'computed'
    expectedCardinality?: 'low' | 'medium' | 'high'
  }
  performanceMode?: 'fast' | 'accurate' | 'balanced'  // Estrategia de performance
}

export function useDynamicFilters<TData>(
  table: Table<TData>, 
  defaultFilters?: string[],
  globalConfig?: Partial<GlobalFilterConfig>,
  config?: DynamicFiltersConfig  // Nueva configuración con feature flags
) {
  const [activeFilters, setActiveFilters] = useState<DynamicFilter[]>([])
  const [hasInitialized, setHasInitialized] = useState(false)

  // Decidir qué motor usar basado en feature flag
  const useEnhancedEngine = config?.useEnhancedEngine ?? false
  
  // Inicializar el analizador apropiado
  const analyzer = useMemo(() => {
    if (useEnhancedEngine) {
      // Adaptar GlobalFilterConfig a EngineConfig para el motor mejorado
      const engineConfig = {
        minimumConfidence: 0.6,
        enableCaching: true,
        enableLearning: false,
        cacheMaxAge: globalConfig?.maxCacheTime || 3600
      }
      return new EnhancedHybridFilterEngine<TData>(engineConfig)
    } else {
      return new HybridFilterAnalyzer<TData>(globalConfig)
    }
  }, [globalConfig, useEnhancedEngine])

  // Función adaptadora para análisis de columnas
  const analyzeColumn = useCallback((column: Column<TData>) => {
    if (useEnhancedEngine) {
      const enhancedAnalyzer = analyzer as EnhancedHybridFilterEngine<TData>
      return enhancedAnalyzer.analyzeColumn(column, {
        domain: config?.analysisContext?.domain,
        dataSource: config?.analysisContext?.dataSource,
        expectedCardinality: config?.analysisContext?.expectedCardinality,
        userIntent: 'exact-match'
      })
    } else {
      const hybridAnalyzer = analyzer as HybridFilterAnalyzer<TData>
      return hybridAnalyzer.analyzeColumn(column)
    }
  }, [analyzer, useEnhancedEngine, config])

  // Detectar columnas que pueden ser filtradas usando el analizador híbrido
  const filterableColumns = useMemo(() => {
    const columns: FilterableColumn[] = []
    
    table.getAllColumns().forEach((column) => {
      // Solo incluir columnas que tienen filterFn o accessorKey
      if (!column.getCanFilter() || !column.id || column.id === "select" || column.id === "actions") {
        return
      }

      const columnDef = column.columnDef
      const headerValue = typeof columnDef.header === "string" 
        ? columnDef.header 
        : (columnDef.meta as any)?.title || column.id

      // Usar el analizador híbrido para determinar el tipo de filtro
      const analysisResult = analyzeColumn(column)
      
      // Construir opciones basadas en el resultado del análisis
      let options: FilterOption[] = []
      
      if (analysisResult.options) {
        options = analysisResult.options
      } else if (analysisResult.type === "faceted") {
        // Generar opciones automáticamente para filtros facetados
        const uniqueValues = column.getFacetedUniqueValues()
        if (uniqueValues) {
          options = Array.from(uniqueValues).map(([value, count]) => ({
            label: String(value),
            value: String(value),
            count: count as number,
          }))
        }
      }

      columns.push({
        id: column.id,
        title: headerValue,
        type: analysisResult.type,
        options: options.length > 0 ? options : undefined,
        metadata: analysisResult.metadata,
        source: analysisResult.source
      })
    })

    return columns
  }, [table, analyzer])

  // Agregar filtros por defecto al inicializar
  useEffect(() => {
    if (!hasInitialized && defaultFilters && defaultFilters.length > 0 && filterableColumns.length > 0) {
      const newFilters: DynamicFilter[] = []
      
      defaultFilters.forEach(columnId => {
        const column = filterableColumns.find(col => col.id === columnId)
        if (column) {
          const filterId = `${columnId}_default`
          const newFilter: DynamicFilter = {
            id: filterId,
            columnId: column.id,
            title: column.title,
            type: column.type,
            options: column.options,
            value: undefined,
            metadata: column.metadata,
          }
          newFilters.push(newFilter)
        }
      })
      
      if (newFilters.length > 0) {
        setActiveFilters(newFilters)
      }
      setHasInitialized(true)
    }
  }, [filterableColumns, defaultFilters, hasInitialized])

  // Agregar un nuevo filtro
  const addFilter = useCallback((columnId: string) => {
    const column = filterableColumns.find(col => col.id === columnId)
    if (!column) return

    const filterId = `${columnId}_${Date.now()}`
    const newFilter: DynamicFilter = {
      id: filterId,
      columnId: column.id,
      title: column.title,
      type: column.type,
      options: column.options,
      value: undefined,
      metadata: column.metadata,
    }

    setActiveFilters(prev => [...prev, newFilter])
  }, [filterableColumns])

  // Remover un filtro
  const removeFilter = useCallback((filterId: string) => {
    // Primero, encontrar el filtro a remover para limpiar la tabla
    const filterToRemove = activeFilters.find(filter => filter.id === filterId)
    if (filterToRemove) {
      const column = table.getColumn(filterToRemove.columnId)
      if (column) {
        column.setFilterValue(undefined)
      }
    }
    
    // Luego, actualizar el estado
    setActiveFilters(prev => prev.filter(filter => filter.id !== filterId))
  }, [activeFilters, table])

  // Actualizar valor de un filtro
  const updateFilterValue = useCallback((filterId: string, value: any) => {
    // Primero, aplicar el filtro a la tabla
    const filter = activeFilters.find(f => f.id === filterId)
    if (filter) {
      const column = table.getColumn(filter.columnId)
      if (column) {
        column.setFilterValue(value)
      }
    }
    
    // Luego, actualizar el estado
    setActiveFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, value }
          : filter
      )
    )
  }, [activeFilters, table])

  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    activeFilters.forEach(filter => {
      const column = table.getColumn(filter.columnId)
      if (column) {
        column.setFilterValue(undefined)
      }
    })
    setActiveFilters([])
    
    // También limpiar filtros de búsqueda global
    table.resetColumnFilters()
  }, [activeFilters, table])

  // Obtener columnas disponibles para agregar (que no estén ya activas)
  const availableColumns = useMemo(() => {
    const activeColumnIds = new Set(activeFilters.map(filter => filter.columnId))
    return filterableColumns.filter(column => !activeColumnIds.has(column.id))
  }, [filterableColumns, activeFilters])

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return activeFilters.some(filter => filter.value !== undefined && filter.value !== "") ||
           table.getState().columnFilters.length > 0
  }, [activeFilters, table])

  return {
    activeFilters,
    availableColumns,
    hasActiveFilters,
    addFilter,
    removeFilter,
    updateFilterValue,
    clearAllFilters,
  }
}
