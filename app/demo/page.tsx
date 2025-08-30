"use client"

import { DataTableWithDynamicToolbar } from "@/components/dynamic-toolbar"
import { columns, getTableOptionsFromConfig, getConfigFromJSON } from "@/lib/column-factory"
import { taskData } from "@/app/data"
import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { DataTableOptions } from "@/components/dynamic-toolbar"
import type { Task } from "@/lib/column-factory"

export default function DemoPage() {
  // Estado para la configuración dinámica
  const [dynamicConfig, setDynamicConfig] = useState<{
    columns: ColumnDef<Task>[]
    options: DataTableOptions
  } | null>(null)

  // Cargar configuración desde JSON al montar el componente
  useEffect(() => {
    async function loadDynamicConfig() {
      try {
        // Simular delay para ver el skeleton (remover en producción)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const config = await getConfigFromJSON()
        setDynamicConfig({
          columns: config.columns,
          options: config.options
        })
      } catch (error) {
        console.warn('Failed to load dynamic config, using static fallback')
        // Usar configuración estática de respaldo
        setDynamicConfig({
          columns,
          options: getTableOptionsFromConfig()
        })
      }
    }
    
    loadDynamicConfig()
  }, [])

  // Usar configuración estática mientras se carga la dinámica
  const currentColumns = dynamicConfig?.columns || columns
  const currentOptions = dynamicConfig?.options || getTableOptionsFromConfig()

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's a list of your tasks for this month! 
          {dynamicConfig ? " (Loaded from JSON config)" : " (Loading...)"}
        </p>
      </div>
      <DataTableWithDynamicToolbar
        columns={currentColumns}
        data={taskData}
        options={currentOptions}
        loading={!dynamicConfig}
      />
    </div>
  )
}
