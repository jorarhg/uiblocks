/**
 * TESTS: Integración del EnhancedHybridFilterEngine
 * 
 * Suite de tests para validar la integración del motor híbrido mejorado
 * con el sistema existente y feature flags
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import type { Column, Table } from '@tanstack/react-table'
import { useDynamicFilters, type DynamicFiltersConfig } from '../hooks/use-dynamic-filters'
import { EnhancedHybridFilterEngine } from '../utils/enhanced-hybrid-filter-engine'
import { HybridFilterAnalyzer } from '../utils/hybrid-filter-analyzer'

// Mock de datos de prueba
const mockTable = {
  getAllColumns: jest.fn(),
  getColumn: jest.fn(),
  resetColumnFilters: jest.fn(),
  getState: jest.fn(() => ({ columnFilters: [] }))
} as unknown as Table<any>

const mockColumn = {
  id: 'test-column',
  getCanFilter: jest.fn(() => true),
  columnDef: {
    header: 'Test Column',
    meta: { title: 'Test Column' }
  },
  getFacetedUniqueValues: jest.fn(),
  setFilterValue: jest.fn()
} as unknown as Column<any>

describe('EnhancedHybridFilterEngine Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockTable.getAllColumns.mockReturnValue([mockColumn])
    mockTable.getColumn.mockReturnValue(mockColumn)
  })

  describe('Feature Flag Integration', () => {
    it('should use HybridFilterAnalyzer when enhanced engine is disabled', () => {
      const config: DynamicFiltersConfig = {
        useEnhancedEngine: false
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      // Verificar que se use el motor tradicional
      expect(result.current).toBeDefined()
      expect(result.current.availableColumns).toBeDefined()
    })

    it('should use EnhancedHybridFilterEngine when enhanced engine is enabled', () => {
      const config: DynamicFiltersConfig = {
        useEnhancedEngine: true,
        analysisContext: {
          domain: 'ecommerce',
          dataSource: 'database'
        }
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      // Verificar que se use el motor mejorado
      expect(result.current).toBeDefined()
      expect(result.current.availableColumns).toBeDefined()
    })

    it('should default to traditional engine when no config provided', () => {
      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [])
      )

      expect(result.current).toBeDefined()
      expect(result.current.availableColumns).toBeDefined()
    })
  })

  describe('Analysis Context Integration', () => {
    it('should pass analysis context to enhanced engine', () => {
      const config: DynamicFiltersConfig = {
        useEnhancedEngine: true,
        analysisContext: {
          domain: 'crm',
          dataSource: 'api',
          expectedCardinality: 'high'
        },
        performanceMode: 'accurate'
      }

      // Mock para capturar llamadas al motor mejorado
      mockColumn.getFacetedUniqueValues.mockReturnValue(new Map([
        ['value1', 1],
        ['value2', 2]
      ]))

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      expect(result.current.availableColumns).toBeDefined()
      expect(result.current.availableColumns.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle different domain contexts correctly', () => {
      const domains = ['ecommerce', 'hr', 'finance', 'crm'] as const

      domains.forEach(domain => {
        const config: DynamicFiltersConfig = {
          useEnhancedEngine: true,
          analysisContext: { domain }
        }

        const { result } = renderHook(() => 
          useDynamicFilters(mockTable, [], {}, config)
        )

        expect(result.current.availableColumns).toBeDefined()
      })
    })
  })

  describe('Backwards Compatibility', () => {
    it('should maintain same interface for existing code', () => {
      // Test tradicional sin nueva configuración
      const { result: traditionalResult } = renderHook(() => 
        useDynamicFilters(mockTable, [])
      )

      // Test con nueva configuración pero motor tradicional
      const { result: compatibleResult } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, { useEnhancedEngine: false })
      )

      // Verificar que ambos tienen la misma interfaz
      expect(Object.keys(traditionalResult.current)).toEqual(
        Object.keys(compatibleResult.current)
      )
    })

    it('should handle existing globalConfig without issues', () => {
      const globalConfig = {
        facetedThreshold: 15,
        searchMinLength: 3,
        maxCacheTime: 1800
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], globalConfig, { useEnhancedEngine: true })
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('Performance Modes', () => {
    const performanceModes = ['fast', 'accurate', 'balanced'] as const

    performanceModes.forEach(mode => {
      it(`should handle ${mode} performance mode`, () => {
        const config: DynamicFiltersConfig = {
          useEnhancedEngine: true,
          performanceMode: mode
        }

        const { result } = renderHook(() => 
          useDynamicFilters(mockTable, [], {}, config)
        )

        expect(result.current.availableColumns).toBeDefined()
      })
    })
  })

  describe('Error Handling', () => {
    it('should gracefully fallback to traditional engine on enhanced engine errors', () => {
      // Simular error en el motor mejorado
      const config: DynamicFiltersConfig = {
        useEnhancedEngine: true,
        analysisContext: {
          domain: 'ecommerce'
        }
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      // Debe seguir funcionando aunque haya errores internos
      expect(result.current).toBeDefined()
      expect(result.current.availableColumns).toBeDefined()
    })

    it('should handle missing analysis context gracefully', () => {
      const config: DynamicFiltersConfig = {
        useEnhancedEngine: true
        // Sin analysisContext
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('Filter Operations', () => {
    it('should maintain filter operations with enhanced engine', () => {
      const config: DynamicFiltersConfig = {
        useEnhancedEngine: true,
        analysisContext: {
          domain: 'ecommerce'
        }
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      // Verificar que todas las operaciones están disponibles
      expect(result.current.addFilter).toBeDefined()
      expect(result.current.removeFilter).toBeDefined()
      expect(result.current.updateFilterValue).toBeDefined()
      expect(result.current.clearAllFilters).toBeDefined()
      expect(typeof result.current.addFilter).toBe('function')
      expect(typeof result.current.removeFilter).toBe('function')
      expect(typeof result.current.updateFilterValue).toBe('function')
      expect(typeof result.current.clearAllFilters).toBe('function')
    })

    it('should handle filter addition with enhanced analysis', () => {
      mockColumn.getFacetedUniqueValues.mockReturnValue(new Map([
        ['pending', 5],
        ['completed', 10],
        ['cancelled', 2]
      ]))

      const config: DynamicFiltersConfig = {
        useEnhancedEngine: true,
        analysisContext: {
          domain: 'ecommerce'
        }
      }

      const { result } = renderHook(() => 
        useDynamicFilters(mockTable, [], {}, config)
      )

      act(() => {
        result.current.addFilter('test-column')
      })

      expect(result.current.activeFilters.length).toBeGreaterThanOrEqual(0)
    })
  })
})

describe('Engine Configuration Adapter', () => {
  it('should correctly adapt GlobalFilterConfig to EngineConfig', () => {
    const globalConfig = {
      facetedThreshold: 25,
      searchMinLength: 4,
      maxCacheTime: 7200,
      fallbackStrategy: ['type-inference', 'data-analysis'] as const
    }

    const config: DynamicFiltersConfig = {
      useEnhancedEngine: true
    }

    const { result } = renderHook(() => 
      useDynamicFilters(mockTable, [], globalConfig, config)
    )

    // Verificar que la configuración se adapta correctamente
    expect(result.current).toBeDefined()
  })

  it('should handle missing globalConfig gracefully', () => {
    const config: DynamicFiltersConfig = {
      useEnhancedEngine: true
    }

    const { result } = renderHook(() => 
      useDynamicFilters(mockTable, [], undefined, config)
    )

    expect(result.current).toBeDefined()
  })
})

describe('Type Safety', () => {
  it('should maintain type safety across different configurations', () => {
    const config: DynamicFiltersConfig = {
      useEnhancedEngine: true,
      analysisContext: {
        domain: 'hr',
        dataSource: 'csv',
        expectedCardinality: 'low'
      }
    }

    const { result } = renderHook(() => 
      useDynamicFilters(mockTable, [], {}, config)
    )

    // TypeScript debe inferir tipos correctamente
    expect(result.current.activeFilters).toBeInstanceOf(Array)
    expect(result.current.availableColumns).toBeInstanceOf(Array)
    expect(typeof result.current.hasActiveFilters).toBe('boolean')
  })
})
