import { TableSchema } from '@/types/schema'
import { dynamicSchemas, getSchema, getAvailableSchemas } from '@/config/dynamic-schemas'

export class SchemaManager {
  private schemas: Record<string, TableSchema> = {}
  
  constructor() {
    // Cargar esquemas desde configuración TypeScript (síncrono)
    this.schemas = dynamicSchemas
  }

  /**
   * Obtiene un esquema por nombre
   */
  getSchema(name: string): TableSchema | undefined {
    return this.schemas[name]
  }

  /**
   * Obtiene todos los esquemas disponibles
   */
  getAllSchemas(): Record<string, TableSchema> {
    return { ...this.schemas }
  }

  /**
   * Obtiene los nombres de todos los esquemas disponibles
   */
  getSchemaNames(): string[] {
    return Object.keys(this.schemas)
  }

  /**
   * Valida si un esquema es válido
   */
  validateSchema(schema: TableSchema): boolean {
    if (!schema.name || !schema.fields || !Array.isArray(schema.fields)) {
      return false
    }

    // Validar que todos los campos tengan las propiedades requeridas
    return schema.fields.every(field => 
      field.key && 
      field.label && 
      field.type &&
      ['string', 'number', 'date', 'boolean', 'select', 'badge', 'icon'].includes(field.type)
    )
  }

  /**
   * Registra un esquema dinámicamente (para casos de uso avanzados)
   */
  registerSchema(schema: TableSchema): boolean {
    if (!this.validateSchema(schema)) {
      console.error('Invalid schema:', schema)
      return false
    }

    this.schemas[schema.name] = schema
    return true
  }

  /**
   * Verifica si un esquema existe
   */
  hasSchema(name: string): boolean {
    return name in this.schemas
  }

  /**
   * Crea un esquema dinámico en tiempo de ejecución
   */
  createDynamicSchema(
    name: string,
    fields: Array<{
      key: string
      label: string
      type: string
      options?: any[]
    }>,
    options: any = {}
  ): TableSchema {
    const schema: TableSchema = {
      name,
      primaryKey: fields[0]?.key || 'id',
      fields: fields.map(field => ({
        key: field.key,
        label: field.label,
        type: field.type as any,
        sortable: true,
        filterable: true,
        searchable: field.type === 'string',
        options: field.options?.map(opt => ({
          value: opt.value,
          label: opt.label,
          color: opt.color,
          icon: opt.icon
        }))
      })),
      tableOptions: {
        searchKey: fields.find(f => f.type === 'string')?.key,
        searchPlaceholder: `Buscar ${name.toLowerCase()}...`,
        defaultFilters: fields
          .filter(f => f.type === 'select' || f.type === 'badge')
          .map(f => f.key)
          .slice(0, 2),
        enableSorting: true,
        enableFiltering: true,
        enableSearch: true,
        pageSize: 10,
        showToolbar: true,
        ...options
      }
    }

    if (this.validateSchema(schema)) {
      this.registerSchema(schema)
      return schema
    } else {
      throw new Error(`Invalid schema: ${name}`)
    }
  }
}

// Instancia singleton
export const schemaManager = new SchemaManager()
