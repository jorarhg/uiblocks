"use client"

import { DataTableWithDynamicToolbar } from "../data-table-with-dynamic-toolbar"
import type { ColumnDef } from "@tanstack/react-table"

// Ejemplo extremo: diferentes formatos de datos booleanos
interface ProductoRaro {
  id: string
  nombre: string
  // Casos extremos que el sistema debe detectar automáticamente
  disponibilidad: "En Stock" | "Agotado"        // Sin "no" explícito
  garantia: "Premium" | "Básico"                 // Conceptos abstractos
  envio: "Gratis" | "Con Costo"                  // Diferentes estructuras
  certificacion: "Aprobado ✅" | "Rechazado ❌"  // Con emojis
  estado: "Publicado" | "Borrador"               // Estados de publicación
  prioridad: "Urgente" | "Normal"                // Niveles
  membresia: "VIP" | "Estándar"                  // Tipos de usuario
}

const datosRaros: ProductoRaro[] = [
  {
    id: "1",
    nombre: "Producto Alpha",
    disponibilidad: "En Stock",
    garantia: "Premium", 
    envio: "Gratis",
    certificacion: "Aprobado ✅",
    estado: "Publicado",
    prioridad: "Urgente",
    membresia: "VIP"
  },
  {
    id: "2", 
    nombre: "Producto Beta",
    disponibilidad: "Agotado",
    garantia: "Básico",
    envio: "Con Costo", 
    certificacion: "Rechazado ❌",
    estado: "Borrador",
    prioridad: "Normal",
    membresia: "Estándar"
  },
  {
    id: "3",
    nombre: "Producto Gamma", 
    disponibilidad: "En Stock",
    garantia: "Básico",
    envio: "Gratis",
    certificacion: "Aprobado ✅", 
    estado: "Borrador",
    prioridad: "Normal",
    membresia: "VIP"
  },
  {
    id: "4",
    nombre: "Producto Delta",
    disponibilidad: "Agotado", 
    garantia: "Premium",
    envio: "Con Costo",
    certificacion: "Rechazado ❌",
    estado: "Publicado", 
    prioridad: "Urgente",
    membresia: "Estándar"
  }
]

const columnasRaras: ColumnDef<ProductoRaro>[] = [
  { accessorKey: "nombre", header: "Producto" },
  { accessorKey: "disponibilidad", header: "Disponibilidad" },
  { accessorKey: "garantia", header: "Garantía" },
  { accessorKey: "envio", header: "Envío" }, 
  { accessorKey: "certificacion", header: "Certificación" },
  { accessorKey: "estado", header: "Estado" },
  { accessorKey: "prioridad", header: "Prioridad" },
  { accessorKey: "membresia", header: "Membresía" },
]

export function EjemploSistemaInteligente() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          🧠 Sistema Inteligente de Detección
        </h1>
        <p className="text-muted-foreground">
          Detecta automáticamente CUALQUIER formato de datos booleanos sin hardcoding
        </p>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">🔍 Casos que detecta automáticamente:</h3>
          <ul className="text-sm space-y-1">
            <li>• "En Stock" vs "Agotado" → Detección semántica</li>
            <li>• "Premium" vs "Básico" → Análisis lexical</li>
            <li>• "Gratis" vs "Con Costo" → Detección de patrones</li>
            <li>• "Aprobado ✅" vs "Rechazado ❌" → Reconocimiento de emojis</li>
            <li>• "Publicado" vs "Borrador" → Análisis de frecuencia</li>
            <li>• "Urgente" vs "Normal" → Score de positividad</li>
          </ul>
        </div>
      </div>

      <DataTableWithDynamicToolbar
        columns={columnasRaras}
        data={datosRaros}
        searchKey="nombre"
        searchPlaceholder="Buscar productos..."
        defaultFilters={["disponibilidad", "garantia"]}
      />

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">✨ Ventajas del Sistema Inteligente:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>Sin hardcoding</strong>: No necesita casos específicos en el código</li>
          <li>• <strong>Adaptativo</strong>: Se ajusta a cualquier formato de datos</li>
          <li>• <strong>Multiidioma</strong>: Funciona en español, inglés, etc.</li>
          <li>• <strong>Transparente</strong>: Reporta cómo detectó las etiquetas</li>
          <li>• <strong>Configurable</strong>: Permite override manual cuando sea necesario</li>
        </ul>
      </div>
    </div>
  )
}

export default EjemploSistemaInteligente
