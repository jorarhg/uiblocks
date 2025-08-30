"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDynamicFilters = useDynamicFilters;
const react_1 = require("react");
const hybrid_filter_analyzer_1 = require("../utils/hybrid-filter-analyzer");
const enhanced_hybrid_filter_engine_1 = require("../utils/enhanced-hybrid-filter-engine");
function useDynamicFilters(table, defaultFilters, globalConfig, config // Nueva configuración con feature flags
) {
    const [activeFilters, setActiveFilters] = (0, react_1.useState)([]);
    const [hasInitialized, setHasInitialized] = (0, react_1.useState)(false);
    // Decidir qué motor usar basado en feature flag
    const useEnhancedEngine = config?.useEnhancedEngine ?? false;
    // Inicializar el analizador apropiado
    const analyzer = (0, react_1.useMemo)(() => {
        if (useEnhancedEngine) {
            // Adaptar GlobalFilterConfig a EngineConfig para el motor mejorado
            const engineConfig = {
                minimumConfidence: 0.6,
                enableCaching: true,
                enableLearning: false,
                cacheMaxAge: globalConfig?.maxCacheTime || 3600
            };
            return new enhanced_hybrid_filter_engine_1.EnhancedHybridFilterEngine(engineConfig);
        }
        else {
            return new hybrid_filter_analyzer_1.HybridFilterAnalyzer(globalConfig);
        }
    }, [globalConfig, useEnhancedEngine]);
    // Función adaptadora para análisis de columnas
    const analyzeColumn = (0, react_1.useCallback)((column) => {
        if (useEnhancedEngine) {
            const enhancedAnalyzer = analyzer;
            return enhancedAnalyzer.analyzeColumn(column, {
                domain: config?.analysisContext?.domain,
                dataSource: config?.analysisContext?.dataSource,
                expectedCardinality: config?.analysisContext?.expectedCardinality,
                userIntent: 'exact-match'
            });
        }
        else {
            const hybridAnalyzer = analyzer;
            return hybridAnalyzer.analyzeColumn(column);
        }
    }, [analyzer, useEnhancedEngine, config]);
    // Detectar columnas que pueden ser filtradas usando el analizador híbrido
    const filterableColumns = (0, react_1.useMemo)(() => {
        const columns = [];
        table.getAllColumns().forEach((column) => {
            // Solo incluir columnas que tienen filterFn o accessorKey
            if (!column.getCanFilter() || !column.id || column.id === "select" || column.id === "actions") {
                return;
            }
            const columnDef = column.columnDef;
            const headerValue = typeof columnDef.header === "string"
                ? columnDef.header
                : columnDef.meta?.title || column.id;
            // Usar el analizador híbrido para determinar el tipo de filtro
            const analysisResult = analyzeColumn(column);
            // Construir opciones basadas en el resultado del análisis
            let options = [];
            if (analysisResult.options) {
                options = analysisResult.options;
            }
            else if (analysisResult.type === "faceted") {
                // Generar opciones automáticamente para filtros facetados
                const uniqueValues = column.getFacetedUniqueValues();
                if (uniqueValues) {
                    options = Array.from(uniqueValues).map(([value, count]) => ({
                        label: String(value),
                        value: String(value),
                        count: count,
                    }));
                }
            }
            columns.push({
                id: column.id,
                title: headerValue,
                type: analysisResult.type,
                options: options.length > 0 ? options : undefined,
                metadata: analysisResult.metadata,
                source: analysisResult.source
            });
        });
        return columns;
    }, [table, analyzer]);
    // Agregar filtros por defecto al inicializar
    (0, react_1.useEffect)(() => {
        if (!hasInitialized && defaultFilters && defaultFilters.length > 0 && filterableColumns.length > 0) {
            const newFilters = [];
            defaultFilters.forEach(columnId => {
                const column = filterableColumns.find(col => col.id === columnId);
                if (column) {
                    const filterId = `${columnId}_default`;
                    const newFilter = {
                        id: filterId,
                        columnId: column.id,
                        title: column.title,
                        type: column.type,
                        options: column.options,
                        value: undefined,
                        metadata: column.metadata,
                    };
                    newFilters.push(newFilter);
                }
            });
            if (newFilters.length > 0) {
                setActiveFilters(newFilters);
            }
            setHasInitialized(true);
        }
    }, [filterableColumns, defaultFilters, hasInitialized]);
    // Agregar un nuevo filtro
    const addFilter = (0, react_1.useCallback)((columnId) => {
        const column = filterableColumns.find(col => col.id === columnId);
        if (!column)
            return;
        const filterId = `${columnId}_${Date.now()}`;
        const newFilter = {
            id: filterId,
            columnId: column.id,
            title: column.title,
            type: column.type,
            options: column.options,
            value: undefined,
            metadata: column.metadata,
        };
        setActiveFilters(prev => [...prev, newFilter]);
    }, [filterableColumns]);
    // Remover un filtro
    const removeFilter = (0, react_1.useCallback)((filterId) => {
        setActiveFilters(prev => {
            const updated = prev.filter(filter => filter.id !== filterId);
            // Limpiar el filtro de la tabla
            const filterToRemove = prev.find(filter => filter.id === filterId);
            if (filterToRemove) {
                const column = table.getColumn(filterToRemove.columnId);
                if (column) {
                    column.setFilterValue(undefined);
                }
            }
            return updated;
        });
    }, [table]);
    // Actualizar valor de un filtro
    const updateFilterValue = (0, react_1.useCallback)((filterId, value) => {
        setActiveFilters(prev => prev.map(filter => filter.id === filterId
            ? { ...filter, value }
            : filter));
        // Aplicar el filtro a la tabla
        const filter = activeFilters.find(f => f.id === filterId);
        if (filter) {
            const column = table.getColumn(filter.columnId);
            if (column) {
                column.setFilterValue(value);
            }
        }
    }, [activeFilters, table]);
    // Limpiar todos los filtros
    const clearAllFilters = (0, react_1.useCallback)(() => {
        activeFilters.forEach(filter => {
            const column = table.getColumn(filter.columnId);
            if (column) {
                column.setFilterValue(undefined);
            }
        });
        setActiveFilters([]);
        // También limpiar filtros de búsqueda global
        table.resetColumnFilters();
    }, [activeFilters, table]);
    // Obtener columnas disponibles para agregar (que no estén ya activas)
    const availableColumns = (0, react_1.useMemo)(() => {
        const activeColumnIds = new Set(activeFilters.map(filter => filter.columnId));
        return filterableColumns.filter(column => !activeColumnIds.has(column.id));
    }, [filterableColumns, activeFilters]);
    // Verificar si hay filtros activos
    const hasActiveFilters = (0, react_1.useMemo)(() => {
        return activeFilters.some(filter => filter.value !== undefined && filter.value !== "") ||
            table.getState().columnFilters.length > 0;
    }, [activeFilters, table]);
    return {
        activeFilters,
        availableColumns,
        hasActiveFilters,
        addFilter,
        removeFilter,
        updateFilterValue,
        clearAllFilters,
    };
}
