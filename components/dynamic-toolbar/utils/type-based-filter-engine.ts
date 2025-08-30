/**
 * Sistema de filtros basado en tipos y metadatos
 * Arquitectura escalable y resistente a cambios de contenido
 */

// 1. DEFINICIÓN DE METADATOS DE TIPOS
export interface TypeMetadata {
  type: 'boolean' | 'string' | 'number' | 'date' | 'array' | 'object'
  filterType?: FilterType
  enum?: readonly string[] // Para union types
  items?: TypeMetadata     // Para arrays
  format?: 'email' | 'url' | 'currency' | 'date-iso' // Hint adicional
  nullable?: boolean
}

// 2. ESQUEMAS DE ENTIDADES
export interface EntitySchema {
  [fieldName: string]: TypeMetadata
}

// 3. MAPEO DE TIPOS A FILTROS
export interface TypeToFilterMapping {
  boolean: 'boolean'
  string: 'search' | 'faceted'
  number: 'range'
  date: 'range'
  array: 'multiselect' | 'faceted'
}

// 4. CONFIGURACIÓN DE ENTIDAD
export interface EntityFilterConfig<T = any> {
  schema: EntitySchema
  overrides?: Partial<Record<keyof T, Partial<TypeMetadata>>>
  excludeFields?: (keyof T)[]
  includeFields?: (keyof T)[]
  globalSettings?: {
    defaultStringFilter: 'search' | 'faceted'
    facetedThreshold: number // Cuántos valores únicos antes de cambiar a search
  }
}

// 5. MOTOR DE INFERENCIA DE FILTROS
export class TypeBasedFilterEngine<T = any> {
  private config: EntityFilterConfig<T>
  
  constructor(config: EntityFilterConfig<T>) {
    this.config = config
  }

  /**
   * Genera configuración de filtros basada en esquema de tipos
   */
  generateFilterConfig(data?: T[]): Record<keyof T, FilterMetadata> {
    const result: Record<string, FilterMetadata> = {}
    
    for (const [fieldName, typeMetadata] of Object.entries(this.config.schema)) {
      // Skip si está excluido
      if (this.config.excludeFields?.includes(fieldName as keyof T)) continue
      
      // Skip si includeFields está definido y no está incluido
      if (this.config.includeFields && !this.config.includeFields.includes(fieldName as keyof T)) continue
      
      // Aplicar overrides
      const finalMetadata = {
        ...typeMetadata,
        ...this.config.overrides?.[fieldName as keyof T]
      }
      
      // Inferir tipo de filtro
      const filterType = this.inferFilterType(finalMetadata, fieldName, data)
      
      result[fieldName] = {
        type: filterType,
        confidence: 1.0, // Alta confianza porque viene de tipos
        source: 'type-schema',
        metadata: {
          dataType: finalMetadata.type,
          nullable: finalMetadata.nullable || false,
          format: finalMetadata.format,
          enum: finalMetadata.enum
        }
      }
    }
    
    return result as Record<keyof T, FilterMetadata>
  }

  /**
   * Infiere el tipo de filtro basado en metadatos de tipo
   */
  private inferFilterType(
    typeMetadata: TypeMetadata, 
    fieldName: string, 
    data?: T[]
  ): FilterType {
    // 1. Si está explícitamente definido, usarlo
    if (typeMetadata.filterType) {
      return typeMetadata.filterType
    }

    // 2. Inferencia basada en tipo base
    switch (typeMetadata.type) {
      case 'boolean':
        return 'boolean'
        
      case 'number':
        return 'range'
        
      case 'date':
        return 'range'
        
      case 'array':
        return 'multiselect'
        
      case 'string':
        return this.inferStringFilterType(typeMetadata, fieldName, data)
        
      default:
        return 'search'
    }
  }

  /**
   * Lógica específica para inferir filtros de string
   */
  private inferStringFilterType(
    typeMetadata: TypeMetadata, 
    fieldName: string, 
    data?: T[]
  ): 'search' | 'faceted' {
    // 1. Si tiene enum (union type), es faceted
    if (typeMetadata.enum && typeMetadata.enum.length > 0) {
      return 'faceted'
    }

    // 2. Heurísticas por nombre de campo
    const fieldLower = fieldName.toLowerCase()
    const facetedFields = ['status', 'category', 'type', 'role', 'priority', 'state']
    if (facetedFields.some(pattern => fieldLower.includes(pattern))) {
      return 'faceted'
    }

    // 3. Análisis de datos si están disponibles
    if (data) {
      const uniqueValues = this.getUniqueValues(data, fieldName)
      const threshold = this.config.globalSettings?.facetedThreshold || 10
      
      if (uniqueValues.size <= threshold) {
        return 'faceted'
      }
    }

    // 4. Default fallback
    return this.config.globalSettings?.defaultStringFilter || 'search'
  }

  /**
   * Extrae valores únicos de un campo en los datos
   */
  private getUniqueValues<T>(data: T[], fieldName: string): Set<any> {
    const values = new Set()
    for (const item of data) {
      const value = (item as any)[fieldName]
      if (value !== null && value !== undefined) {
        values.add(value)
      }
    }
    return values
  }
}

// 6. UTILIDADES PARA CREAR ESQUEMAS
export function createSchema<T>(): SchemaBuilder<T> {
  return new SchemaBuilder<T>()
}

export class SchemaBuilder<T> {
  private schema: EntitySchema = {}

  field<K extends keyof T>(
    name: K, 
    metadata: TypeMetadata
  ): SchemaBuilder<T> {
    this.schema[name as string] = metadata
    return this
  }

  boolean<K extends keyof T>(name: K): SchemaBuilder<T> {
    return this.field(name, { type: 'boolean', filterType: 'boolean' })
  }

  string<K extends keyof T>(
    name: K, 
    options?: { filterType?: 'search' | 'faceted', format?: string }
  ): SchemaBuilder<T> {
    return this.field(name, { 
      type: 'string', 
      filterType: options?.filterType,
      format: options?.format as any
    })
  }

  enum<K extends keyof T>(
    name: K, 
    values: readonly string[]
  ): SchemaBuilder<T> {
    return this.field(name, { 
      type: 'string', 
      filterType: 'faceted',
      enum: values
    })
  }

  number<K extends keyof T>(name: K): SchemaBuilder<T> {
    return this.field(name, { type: 'number', filterType: 'range' })
  }

  date<K extends keyof T>(name: K): SchemaBuilder<T> {
    return this.field(name, { type: 'date', filterType: 'range' })
  }

  array<K extends keyof T>(
    name: K, 
    itemType: TypeMetadata
  ): SchemaBuilder<T> {
    return this.field(name, { 
      type: 'array', 
      filterType: 'multiselect',
      items: itemType
    })
  }

  build(): EntitySchema {
    return this.schema
  }
}

// 7. TIPOS AUXILIARES
export interface FilterMetadata {
  type: FilterType
  confidence: number
  source: 'type-schema' | 'inference' | 'override'
  metadata: {
    dataType: string
    nullable: boolean
    format?: string
    enum?: readonly string[]
  }
}

export type FilterType = 'boolean' | 'search' | 'faceted' | 'range' | 'multiselect' | 'custom'
