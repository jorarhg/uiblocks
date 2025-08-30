"use client"

import { useMemo } from "react"
import { DataTableWithDynamicToolbar } from "../data-table-with-dynamic-toolbar"
import type { ColumnDef } from "@tanstack/react-table"
import type { GlobalFilterConfig, ColumnFilterConfig } from "../types/filter-config"

// Datos de ejemplo más complejos
interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  salary: number
  startDate: string
  isActive: boolean
  rating: number
  skills: string[]
  projectCount: number
  lastReview: string
  isRemote: boolean
  yearsExperience: number
}

const sampleData: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    position: "Senior Developer",
    salary: 95000,
    startDate: "2022-01-15",
    isActive: true,
    rating: 4.8,
    skills: ["React", "TypeScript", "Node.js"],
    projectCount: 8,
    lastReview: "2024-12-01",
    isRemote: true,
    yearsExperience: 5
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 72000,
    startDate: "2021-03-10",
    isActive: true,
    rating: 4.2,
    skills: ["SEO", "Content Strategy", "Analytics"],
    projectCount: 12,
    lastReview: "2024-11-15",
    isRemote: false,
    yearsExperience: 7
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@company.com",
    department: "Engineering",
    position: "Junior Developer",
    salary: 65000,
    startDate: "2023-06-01",
    isActive: false,
    rating: 3.9,
    skills: ["JavaScript", "Python"],
    projectCount: 3,
    lastReview: "2024-10-20",
    isRemote: true,
    yearsExperience: 2
  }
]

export function HybridConfigurationExample() {
  // Configuración global del sistema híbrido
  const globalConfig: Partial<GlobalFilterConfig> = useMemo(() => ({
    facetedThreshold: 15, // Reducir para mostrar más filtros como facetados
    searchMinLength: 3,
    
    // Configuraciones específicas por columna
    columnConfigs: {
      "salary": {
        type: "range",
        priority: "high",
        rangeConfig: {
          format: "currency",
          min: 0,
          max: 200000,
          step: 1000,
          allowPartial: true
        },
        customLabels: {
          min: "Salario mínimo",
          max: "Salario máximo"
        }
      },
      "rating": {
        type: "range",
        priority: "high",
        rangeConfig: {
          format: "number",
          min: 0,
          max: 5,
          step: 0.1,
          allowPartial: false
        }
      },
      "skills": {
        type: "search", // Forzar búsqueda en lugar de facetado
        priority: "medium",
        searchConfig: {
          minLength: 2,
          debounceMs: 200,
          caseSensitive: false,
          matchMode: "contains"
        }
      }
    },

    // Mapeos adicionales por nombre
    columnNameMappings: {
      "firstname": { type: "search", priority: "high" },
      "lastname": { type: "search", priority: "high" },
      "position": { type: "faceted", priority: "high" },
      "projectcount": { type: "range", priority: "medium" },
      "yearsexperience": { 
        type: "range", 
        priority: "medium",
        rangeConfig: {
          min: 0,
          max: 20,
          step: 1,
          allowPartial: true
        }
      }
    }
  }), [])

  // Definición de columnas con meta configuraciones específicas
  const columns: ColumnDef<Employee>[] = useMemo(() => [
    {
      id: "fullName",
      header: "Nombre Completo",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      // Meta configuración - más alta prioridad
      meta: {
        filterConfig: {
          type: "search",
          priority: "high",
          searchConfig: {
            minLength: 2,
            debounceMs: 150,
            caseSensitive: false,
            matchMode: "contains"
          }
        } as ColumnFilterConfig
      }
    },
    {
      accessorKey: "email",
      header: "Email",
      // El analizador detectará automáticamente que es email por el patrón
    },
    {
      accessorKey: "department",
      header: "Departamento",
      // Se configurará automáticamente como facetado por el nombre
    },
    {
      accessorKey: "position",
      header: "Posición",
    },
    {
      accessorKey: "salary",
      header: "Salario",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("salary"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return formatted
      },
      // Configuración específica en globalConfig
    },
    {
      accessorKey: "startDate",
      header: "Fecha de Inicio",
      // Se detectará automáticamente como rango de fechas
    },
    {
      accessorKey: "isActive",
      header: "Activo",
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.getValue("isActive") 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {row.getValue("isActive") ? "Activo" : "Inactivo"}
        </span>
      ),
      meta: {
        filterConfig: {
          type: "boolean",
          priority: "high",
          booleanConfig: {
            trueLabel: "Empleados Activos",
            falseLabel: "Empleados Inactivos",
            trueValue: true,
            falseValue: false
          }
        } as ColumnFilterConfig
      }
    },
    {
      accessorKey: "rating",
      header: "Calificación",
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number
        return (
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{rating.toFixed(1)}</span>
          </div>
        )
      },
      // Configuración específica en globalConfig
    },
    {
      accessorKey: "projectCount",
      header: "Proyectos",
      // Se detectará como rango numérico automáticamente
    },
    {
      accessorKey: "isRemote",
      header: "Remoto",
      cell: ({ row }) => (
        row.getValue("isRemote") ? "🏠 Remoto" : "🏢 Oficina"
      ),
      // Se detectará como booleano automáticamente
    },
    {
      accessorKey: "yearsExperience",
      header: "Años de Experiencia",
      // Configuración en columnNameMappings
    }
  ], [])

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Sistema Híbrido de Filtros Dinámicos
        </h1>
        <p className="text-muted-foreground mb-4">
          Ejemplo avanzado que demuestra las diferentes estrategias de auto-configuración:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-green-600 mb-1">📋 Meta Columna</div>
            <div className="text-xs text-muted-foreground">
              fullName, isActive - Configuración explícita en columnDef.meta
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-blue-600 mb-1">⚙️ Config Override</div>
            <div className="text-xs text-muted-foreground">
              salary, rating - Configuración específica en globalConfig
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-purple-600 mb-1">🔍 Inferencia Tipos</div>
            <div className="text-xs text-muted-foreground">
              position, department - Detectado por accessorKey
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-medium text-orange-600 mb-1">📊 Análisis Datos</div>
            <div className="text-xs text-muted-foreground">
              email, startDate - Detectado por patrones en los datos
            </div>
          </div>
        </div>
      </div>

      <DataTableWithDynamicToolbar
        data={sampleData}
        columns={columns}
        defaultFilters={["department", "isActive"]} // Filtros por defecto
        globalConfig={globalConfig} // Configuración híbrida
      />

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">💡 Funcionalidades Demonstradas:</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• <strong>Prioridad de configuración:</strong> Meta → Config Override → Inferencia → Análisis</li>
          <li>• <strong>Filtros personalizados:</strong> Configuración específica por tipo de dato</li>
          <li>• <strong>Detección automática:</strong> Emails, fechas, números, booleanos</li>
          <li>• <strong>Mapeos por nombre:</strong> Configuración basada en nombres de columna</li>
          <li>• <strong>Filtros por defecto:</strong> Inicialización automática de filtros</li>
          <li>• <strong>Análisis estadístico:</strong> Detección inteligente de tipos de filtro</li>
        </ul>
      </div>
    </div>
  )
}
