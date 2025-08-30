"use strict";
/**
 * Test básico del sistema híbrido de filtros
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hybrid_filter_analyzer_1 = require("./utils/hybrid-filter-analyzer");
// Configuración de prueba
const testConfig = {
    facetedThreshold: 10,
    columnConfigs: {
        'user_email': { type: 'search', priority: 'high' }
    }
};
// Crear instancia del analizador
const analyzer = new hybrid_filter_analyzer_1.HybridFilterAnalyzer(testConfig);
// Mock de una columna para testing
const mockColumn = {
    id: 'status',
    columnDef: {
        accessorKey: 'status'
    },
    getFacetedRowModel: () => ({
        rows: [
            { getValue: () => 'active' },
            { getValue: () => 'inactive' },
            { getValue: () => 'active' },
        ]
    }),
    getFacetedUniqueValues: () => new Map([
        ['active', 2],
        ['inactive', 1]
    ])
};
// Test del análisis
console.log('🧪 Testing Hybrid Filter Analyzer...');
try {
    const result = analyzer.analyzeColumn(mockColumn);
    console.log('✅ Analysis Result:', {
        type: result.type,
        confidence: result.confidence,
        source: result.source,
        reasoning: result.reasoning
    });
    console.log('✅ Hybrid Filter Analyzer working correctly!');
}
catch (error) {
    console.error('❌ Error in analyzer:', error);
}
exports.default = analyzer;
