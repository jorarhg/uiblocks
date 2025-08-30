"use client"

import { DataTableWithDynamicToolbar } from "../data-table-with-dynamic-toolbar"
import type { ColumnDef } from "@tanstack/react-table"

// Ejemplo de datos con "Tiene/No tiene"
interface Producto {
  id: string
  nombre: string
  categoria: string
  precio: number
  disponible: string // "Tiene" o "No tiene"
  envioGratis: string // "Sí" o "No"
  garantia: string // "Incluido" o "No incluido"
  certificado: string // "Válido" o "Inválido"
}

const productosEjemplo: Producto[] = [
  {
    id: "1",
    nombre: "Laptop Gaming",
    categoria: "Tecnología",
    precio: 1500,
    disponible: "Tiene",
    envioGratis: "Sí",
    garantia: "Incluido",
    certificado: "Válido"
  },
  {
    id: "2", 
    nombre: "Mouse Inalámbrico",
    categoria: "Accesorios",
    precio: 50,
    disponible: "No tiene",
    envioGratis: "No",
    garantia: "No incluido",
    certificado: "Válido"
  },
  {
    id: "3",
    nombre: "Monitor 4K",
    categoria: "Tecnología", 
    precio: 800,
    disponible: "Tiene",
    envioGratis: "Sí",
    garantia: "Incluido",
    certificado: "Inválido"
  },
  {
    id: "4",
    nombre: "Teclado Mecánico",
    categoria: "Accesorios",
    precio: 120,
    disponible: "No tiene",
    envioGratis: "No",
    garantia: "Incluido", 
    certificado: "Válido"
  }
]

const columnas: ColumnDef<Producto>[] = [
  {
    accessorKey: "nombre",
    header: "Producto",
  },
  {
    accessorKey: "categoria", 
    header: "Categoría",
  },
  {
    accessorKey: "precio",
    header: "Precio",
    cell: ({ row }) => {
      const precio = parseFloat(row.getValue("precio"))
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(precio)
    },
  },
  {
    accessorKey: "disponible",
    header: "Disponibilidad",
  },
  {
    accessorKey: "envioGratis",
    header: "Envío Gratis",
  },
  {
    accessorKey: "garantia",
    header: "Garantía",
  },
  {
    accessorKey: "certificado",
    header: "Certificado",
  },
]

export function EjemploTieneNoTiene() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Ejemplo: Datos "Tiene/No tiene"
        </h1>
        <p className="text-muted-foreground">
          Demonstración de filtros booleanos con etiquetas personalizadas en español
        </p>
      </div>

      {/* Versión 1: Detección Automática */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🤖 Detección Automática</h2>
        <p className="text-sm text-muted-foreground mb-4">
          El sistema detecta automáticamente "Tiene/No tiene", "Sí/No", "Incluido/No incluido", etc.
        </p>
        <DataTableWithDynamicToolbar
          columns={columnas}
          data={productosEjemplo}
          searchKey="nombre"
          searchPlaceholder="Buscar productos..."
        />
      </div>

      {/* Versión 2: Configuración Explícita */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">⚙️ Configuración Explícita</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Configuración manual para casos específicos o cuando se quiere mayor control
        </p>
        <DataTableWithDynamicToolbar
          columns={columnas}
          data={productosEjemplo}
          searchKey="nombre"
          searchPlaceholder="Buscar productos..."
          globalConfig={{
            columnConfigs: {
              'disponible': {
                type: 'boolean',
                config: {
                  trueLabel: "En Stock",
                  falseLabel: "Agotado"
                }
              },
              'envioGratis': {
                type: 'boolean',
                config: {
                  trueLabel: "Gratis",
                  falseLabel: "Con Costo"
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default EjemploTieneNoTiene
