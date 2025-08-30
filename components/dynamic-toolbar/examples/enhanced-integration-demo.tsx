/**
 * DEMOSTRACIÓN: Integración del EnhancedHybridFilterEngine
 * 
 * Este ejemplo muestra cómo usar el nuevo motor híbrido mejorado
 * con feature flags para una migración gradual
 */

"use client"

import React from 'react'
import { DataTableWithDynamicToolbar } from '../data-table-with-dynamic-toolbar'
import { useDynamicFilters, type DynamicFiltersConfig } from '../hooks/use-dynamic-filters'
import type { ColumnDef } from '@tanstack/react-table'

// Datos de ejemplo que demuestran diferentes escenarios
interface SampleData {
  id: string
  customerName: string
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderAmount: number
  orderDate: string
  isUrgent: boolean
  customerType: 'premium' | 'regular' | 'enterprise'
  revenue: number
  region: string
  assignedAgent?: string
}

const sampleData: SampleData[] = [
  {
    id: 'ORD-001',
    customerName: 'Acme Corp',
    orderStatus: 'processing',
    orderAmount: 1250.50,
    orderDate: '2024-03-15',
    isUrgent: true,
    customerType: 'enterprise',
    revenue: 15000.00,
    region: 'North America',
    assignedAgent: 'Sarah Johnson'
  },
  {
    id: 'ORD-002', 
    customerName: 'Tech Solutions Ltd',
    orderStatus: 'shipped',
    orderAmount: 750.25,
    orderDate: '2024-03-14',
    isUrgent: false,
    customerType: 'premium',
    revenue: 8500.00,
    region: 'Europe',
    assignedAgent: 'Michael Chen'
  },
  {
    id: 'ORD-003',
    customerName: 'StartupXYZ',
    orderStatus: 'pending',
    orderAmount: 299.99,
    orderDate: '2024-03-13',
    isUrgent: false,
    customerType: 'regular',
    revenue: 1200.00,
    region: 'Asia Pacific'
  }
]

const columns: ColumnDef<SampleData>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    meta: { title: "Order ID" }
  },
  {
    accessorKey: "customerName", 
    header: "Customer Name",
    meta: { title: "Customer Name" }
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    meta: { title: "Order Status" }
  },
  {
    accessorKey: "orderAmount",
    header: "Amount",
    meta: { title: "Order Amount" },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("orderAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return formatted
    }
  },
  {
    accessorKey: "orderDate",
    header: "Order Date", 
    meta: { title: "Order Date" }
  },
  {
    accessorKey: "isUrgent",
    header: "Urgent",
    meta: { title: "Is Urgent" }
  },
  {
    accessorKey: "customerType",
    header: "Customer Type",
    meta: { title: "Customer Type" }
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    meta: { title: "Total Revenue" },
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("revenue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(revenue)
      return formatted
    }
  },
  {
    accessorKey: "region",
    header: "Region",
    meta: { title: "Region" }
  },
  {
    accessorKey: "assignedAgent",
    header: "Agent",
    meta: { title: "Assigned Agent" }
  }
]

export function EnhancedIntegrationDemo() {
  // =============================================
  // EJEMPLO 1: Sistema Tradicional (Compatible)
  // =============================================
  const traditionalConfig: DynamicFiltersConfig = {
    useEnhancedEngine: false  // Feature flag desactivado
  }

  // =============================================
  // EJEMPLO 2: Motor Híbrido Mejorado - E-commerce
  // =============================================
  const enhancedEcommerceConfig: DynamicFiltersConfig = {
    useEnhancedEngine: true,  // Feature flag activado
    analysisContext: {
      domain: 'ecommerce',
      dataSource: 'database',
      expectedCardinality: 'medium'
    },
    performanceMode: 'balanced'
  }

  // =============================================
  // EJEMPLO 3: Motor Híbrido Mejorado - CRM  
  // =============================================
  const enhancedCrmConfig: DynamicFiltersConfig = {
    useEnhancedEngine: true,
    analysisContext: {
      domain: 'crm',
      dataSource: 'api',
      expectedCardinality: 'high'
    },
    performanceMode: 'accurate'
  }

  const [selectedConfig, setSelectedConfig] = React.useState<'traditional' | 'ecommerce' | 'crm'>('traditional')

  const getCurrentConfig = (): DynamicFiltersConfig => {
    switch (selectedConfig) {
      case 'ecommerce':
        return enhancedEcommerceConfig
      case 'crm':
        return enhancedCrmConfig
      default:
        return traditionalConfig
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          🚀 Demostración: Sistema Híbrido Mejorado
        </h1>
        
        <p className="text-muted-foreground">
          Este ejemplo demuestra la integración del <code>EnhancedHybridFilterEngine</code> 
          con feature flags para una migración gradual y segura.
        </p>

        {/* Selector de Configuración */}
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedConfig('traditional')}
            className={`px-4 py-2 rounded-md border ${
              selectedConfig === 'traditional' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            🔧 Sistema Tradicional
          </button>
          
          <button
            onClick={() => setSelectedConfig('ecommerce')}
            className={`px-4 py-2 rounded-md border ${
              selectedConfig === 'ecommerce' 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            🛒 Motor Híbrido (E-commerce)
          </button>
          
          <button
            onClick={() => setSelectedConfig('crm')}
            className={`px-4 py-2 rounded-md border ${
              selectedConfig === 'crm' 
                ? 'bg-purple-500 text-white border-purple-500' 
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            📊 Motor Híbrido (CRM)
          </button>
        </div>

        {/* Indicadores de Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm">Motor Activo</h3>
            <p className="text-sm text-muted-foreground">
              {getCurrentConfig().useEnhancedEngine ? 'EnhancedHybridFilterEngine' : 'HybridFilterAnalyzer'}
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm">Dominio</h3>
            <p className="text-sm text-muted-foreground">
              {getCurrentConfig().analysisContext?.domain || 'Genérico'}
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm">Modo Performance</h3>
            <p className="text-sm text-muted-foreground">
              {getCurrentConfig().performanceMode || 'Estándar'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabla con Configuración Dinámica */}
      <DataTableWithDynamicToolbar
        data={sampleData}
        columns={columns}
        filterConfig={getCurrentConfig()}
      />

      {/* Información Técnica */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Configuración Actual</h3>
        <pre className="text-xs bg-white p-3 rounded border overflow-auto">
          {JSON.stringify(getCurrentConfig(), null, 2)}
        </pre>
      </div>

      {/* Beneficios del Sistema Híbrido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-4">
          <h3 className="font-semibold">✅ Ventajas del Motor Híbrido</h3>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Contexto de Dominio:</strong> Reconoce patrones específicos del negocio</li>
            <li>• <strong>Múltiples Estrategias:</strong> Sistema de confianza estratificado</li>
            <li>• <strong>Performance Optimizada:</strong> Caching y análisis inteligente</li>
            <li>• <strong>Migración Gradual:</strong> 100% compatible con sistema anterior</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold">🔧 Configuración Flexible</h3>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Feature Flags:</strong> Activación/desactivación segura</li>
            <li>• <strong>Contexto de Análisis:</strong> Dominio, fuente de datos, cardinalidad</li>
            <li>• <strong>Modos de Performance:</strong> Fast, accurate, balanced</li>
            <li>• <strong>Backwards Compatibility:</strong> Sin breaking changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EnhancedIntegrationDemo
