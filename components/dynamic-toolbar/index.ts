// Dynamic Toolbar Components - Sistema completo con análisis híbrido
export { DynamicDataTableToolbar } from "./dynamic-data-table-toolbar"
export { DataTableWithDynamicToolbar, type DataTableOptions } from "./data-table-with-dynamic-toolbar"

// Individual Components
export { AddFilterDropdown } from "./components/add-filter-dropdown"
export { ActiveFiltersDisplay } from "./components/active-filters-display"
export { DataTableSearchFilter } from "./components/data-table-search-filter"
export { DataTableRangeFilter } from "./components/data-table-range-filter"
export { DataTableBooleanFilter } from "./components/data-table-boolean-filter"
export { DynamicFilterComponent } from "./components/dynamic-filter-component"

// Hooks con soporte para motor híbrido mejorado
export { useDynamicFilters, type DynamicFiltersConfig } from "./hooks/use-dynamic-filters"

// Sistema híbrido de auto-configuración
export { HybridFilterAnalyzer } from "./utils/hybrid-filter-analyzer"
export { EnhancedHybridFilterEngine } from "./utils/enhanced-hybrid-filter-engine"
export { BooleanLabelDetector, detectBooleanLabels } from "./utils/boolean-label-detector"

// Configuraciones predeterminadas
export {
  defaultGlobalConfig,
  ecommerceConfig,
  hrConfig,
  projectManagementConfig,
  currencyColumnConfig,
  dateColumnConfig,
  activeStatusConfig,
  ratingColumnConfig,
  searchColumnConfig,
  createCustomConfig
} from "./utils/default-configs"

// Tipos híbridos (nuevos)
export type {
  FilterOption,
  DynamicFilter,
  FilterableColumn,
  FilterType,
  FilterMetadata,
  FilterConfigSource,
  ColumnFilterConfig,
  GlobalFilterConfig,
  FilterAnalysisResult,
  DataType,
  StatisticalDistribution,
  ValidationRule,
  FormattingRule,
  GroupingConfig,
  SearchConfig,
  RangeConfig,
  BooleanConfig
} from "./types/filter-config"

// Validación y testing
export { validateIntegration } from "./validation/integration-validator"

// Ejemplos y demostraciones
export { default as EnhancedIntegrationDemo } from "./examples/enhanced-integration-demo"

// Example usage (for reference)
// export { ExampleCustomToolbar } from "./example-usage"
