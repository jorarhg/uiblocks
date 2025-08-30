// Ejemplo de uso del hook useDynamicFilters por separado
import { useDynamicFilters } from "@/components/dynamic-toolbar"

export function ExampleCustomToolbar({ table }) {
  const {
    activeFilters,
    availableColumns,
    addFilter,
    removeFilter,
    updateFilterValue,
    clearAllFilters,
    hasActiveFilters,
  } = useDynamicFilters(table, ["status", "priority"])

  return (
    <div className="custom-toolbar">
      {/* Tu implementación personalizada aquí */}
      <div>Active filters: {activeFilters.length}</div>
      <div>Available columns: {availableColumns.length}</div>
      
      {/* Ejemplo de agregar filtro programáticamente */}
      <button onClick={() => addFilter("status")}>
        Add Status Filter
      </button>
      
      {/* Ejemplo de limpiar todos los filtros */}
      {hasActiveFilters && (
        <button onClick={clearAllFilters}>
          Clear All
        </button>
      )}
    </div>
  )
}
