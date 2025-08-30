/**
 * Configuraciones predeterminadas para el sistema híbrido de filtros
 * Puedes usar estas configuraciones como punto de partida y personalizarlas según tus necesidades
 */

import type { GlobalFilterConfig, ColumnFilterConfig } from "../types/filter-config"

/**
 * Configuración global básica recomendada
 */
export const defaultGlobalConfig: Partial<GlobalFilterConfig> = {
  facetedThreshold: 20,
  searchMinLength: 2,
  maxCacheTime: 3600,
  fallbackStrategy: ['column-meta', 'config-override', 'type-inference', 'data-analysis'],
  
  columnNameMappings: {
    // Campos de estado/categoría
    'status': { type: 'faceted', priority: 'high' },
    'state': { type: 'faceted', priority: 'high' },
    'priority': { type: 'faceted', priority: 'high' },
    'type': { type: 'faceted', priority: 'high' },
    'category': { type: 'faceted', priority: 'high' },
    'department': { type: 'faceted', priority: 'high' },
    'role': { type: 'faceted', priority: 'high' },
    
    // Campos de búsqueda
    'name': { type: 'search', priority: 'high' },
    'title': { type: 'search', priority: 'high' },
    'description': { type: 'search', priority: 'medium' },
    'email': { type: 'search', priority: 'medium' },
    
    // Campos numéricos
    'price': { type: 'range', priority: 'high' },
    'cost': { type: 'range', priority: 'high' },
    'amount': { type: 'range', priority: 'high' },
    'salary': { type: 'range', priority: 'high' },
    'rating': { type: 'range', priority: 'medium' },
    'score': { type: 'range', priority: 'medium' },
    'count': { type: 'range', priority: 'medium' },
    'quantity': { type: 'range', priority: 'medium' },
    
    // Campos de fecha
    'date': { type: 'range', priority: 'high' },
    'created': { type: 'range', priority: 'medium' },
    'updated': { type: 'range', priority: 'medium' },
    'start': { type: 'range', priority: 'medium' },
    'end': { type: 'range', priority: 'medium' },
    
    // Campos booleanos
    'active': { type: 'boolean', priority: 'high' },
    'enabled': { type: 'boolean', priority: 'high' },
    'visible': { type: 'boolean', priority: 'medium' },
    'published': { type: 'boolean', priority: 'medium' },
    'featured': { type: 'boolean', priority: 'medium' },
  }
}

/**
 * Configuraciones específicas comunes para diferentes tipos de aplicaciones
 */

// Para aplicaciones de e-commerce
export const ecommerceConfig: Partial<GlobalFilterConfig> = {
  ...defaultGlobalConfig,
  columnConfigs: {
    "price": {
      type: "range",
      priority: "high",
      rangeConfig: {
        format: "currency",
        min: 0,
        allowPartial: true
      }
    },
    "rating": {
      type: "range",
      priority: "high",
      rangeConfig: {
        min: 0,
        max: 5,
        step: 0.5,
        allowPartial: false
      }
    },
    "inStock": {
      type: "boolean",
      priority: "high",
      booleanConfig: {
        trueLabel: "En Stock",
        falseLabel: "Agotado",
        trueValue: true,
        falseValue: false
      }
    }
  }
}

// Para sistemas de gestión de empleados
export const hrConfig: Partial<GlobalFilterConfig> = {
  ...defaultGlobalConfig,
  columnConfigs: {
    "salary": {
      type: "range",
      priority: "high",
      rangeConfig: {
        format: "currency",
        allowPartial: true
      }
    },
    "startDate": {
      type: "range",
      priority: "medium",
      rangeConfig: {
        format: "date",
        allowPartial: true
      }
    },
    "isActive": {
      type: "boolean",
      priority: "high",
      booleanConfig: {
        trueLabel: "Empleado Activo",
        falseLabel: "Empleado Inactivo",
        trueValue: true,
        falseValue: false
      }
    }
  }
}

// Para sistemas de gestión de proyectos
export const projectManagementConfig: Partial<GlobalFilterConfig> = {
  ...defaultGlobalConfig,
  columnConfigs: {
    "status": {
      type: "faceted",
      priority: "high",
      options: [
        { label: "Pendiente", value: "pending" },
        { label: "En Progreso", value: "in-progress" },
        { label: "Completado", value: "completed" },
        { label: "Cancelado", value: "cancelled" }
      ]
    },
    "priority": {
      type: "faceted",
      priority: "high",
      options: [
        { label: "🔴 Alta", value: "high" },
        { label: "🟡 Media", value: "medium" },
        { label: "🟢 Baja", value: "low" }
      ]
    },
    "dueDate": {
      type: "range",
      priority: "high",
      rangeConfig: {
        format: "date",
        allowPartial: true
      }
    }
  }
}

/**
 * Configuraciones específicas por columna reutilizables
 */

export const currencyColumnConfig: ColumnFilterConfig = {
  type: "range",
  priority: "high",
  rangeConfig: {
    format: "currency",
    min: 0,
    allowPartial: true
  }
}

export const dateColumnConfig: ColumnFilterConfig = {
  type: "range",
  priority: "medium",
  rangeConfig: {
    format: "date",
    allowPartial: true
  }
}

export const activeStatusConfig: ColumnFilterConfig = {
  type: "boolean",
  priority: "high",
  booleanConfig: {
    trueLabel: "Activo",
    falseLabel: "Inactivo",
    trueValue: true,
    falseValue: false
  }
}

export const ratingColumnConfig: ColumnFilterConfig = {
  type: "range",
  priority: "medium",
  rangeConfig: {
    min: 0,
    max: 5,
    step: 0.1,
    allowPartial: false,
    format: "number"
  }
}

export const searchColumnConfig: ColumnFilterConfig = {
  type: "search",
  priority: "high",
  searchConfig: {
    minLength: 2,
    debounceMs: 300,
    caseSensitive: false,
    matchMode: "contains"
  }
}

/**
 * Función helper para crear configuraciones personalizadas
 */
export function createCustomConfig(
  baseConfig: Partial<GlobalFilterConfig> = defaultGlobalConfig,
  overrides: Partial<GlobalFilterConfig> = {}
): Partial<GlobalFilterConfig> {
  return {
    ...baseConfig,
    ...overrides,
    columnConfigs: {
      ...baseConfig.columnConfigs,
      ...overrides.columnConfigs
    },
    columnNameMappings: {
      ...baseConfig.columnNameMappings,
      ...overrides.columnNameMappings
    }
  }
}
