/**
 * Ejemplo práctico del sistema basado en tipos
 */

import { createSchema, TypeBasedFilterEngine } from '../utils/type-based-filter-engine'

// 1. DEFINIR ENTIDAD CON TIPOS EXPLÍCITOS
interface Product {
  id: string
  name: string
  description: string
  category: 'electronics' | 'clothing' | 'books' | 'home'
  price: number
  discountPrice?: number
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  createdAt: Date
  rating: number
  stock: number
  sku: string
  brand: string
  status: 'draft' | 'published' | 'archived'
}

// 2. CREAR ESQUEMA BASADO EN TIPOS
const ProductSchema = createSchema<Product>()
  .string('id', { filterType: 'search' })
  .string('name', { filterType: 'search' })
  .string('description', { filterType: 'search' })
  .enum('category', ['electronics', 'clothing', 'books', 'home'])
  .number('price')
  .number('discountPrice')
  .boolean('isActive')
  .boolean('isFeatured')
  .array('tags', { type: 'string', filterType: 'faceted' })
  .date('createdAt')
  .number('rating')
  .number('stock')
  .string('sku', { filterType: 'search' })
  .string('brand', { filterType: 'faceted' }) // Marcas suelen ser faceted
  .enum('status', ['draft', 'published', 'archived'])
  .build()

// 3. CONFIGURACIÓN DE FILTROS
const ProductFilterConfig = {
  schema: ProductSchema,
  excludeFields: ['id', 'sku'], // No mostrar estos en filtros
  overrides: {
    // Override específicos si necesario
    description: { filterType: 'search' as const }
  },
  globalSettings: {
    defaultStringFilter: 'search' as const,
    facetedThreshold: 8 // Si más de 8 valores únicos, usar search
  }
}

// 4. CREAR MOTOR DE FILTROS
const productFilterEngine = new TypeBasedFilterEngine(ProductFilterConfig)

// 5. DATOS DE EJEMPLO
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Gaming Ultra",
    description: "High-performance gaming laptop with RTX 4080",
    category: "electronics",
    price: 2500,
    discountPrice: 2200,
    isActive: true,
    isFeatured: true,
    tags: ["gaming", "laptop", "high-end"],
    createdAt: new Date("2024-01-15"),
    rating: 4.8,
    stock: 15,
    sku: "LAP-001",
    brand: "TechBrand",
    status: "published"
  },
  {
    id: "2", 
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    category: "clothing",
    price: 25,
    isActive: true,
    isFeatured: false,
    tags: ["casual", "cotton", "everyday"],
    createdAt: new Date("2024-02-20"),
    rating: 4.2,
    stock: 50,
    sku: "TSH-002",
    brand: "FashionCorp",
    status: "published"
  }
  // ... más productos
]

// 6. GENERAR CONFIGURACIÓN DE FILTROS AUTOMÁTICA
export function generateProductFilters() {
  const filterConfig = productFilterEngine.generateFilterConfig(sampleProducts)
  
  console.log('🔥 Configuración de filtros generada automáticamente:')
  console.log(JSON.stringify(filterConfig, null, 2))
  
  return filterConfig
}

// 7. EJEMPLO DE USO EN COMPONENTE
export function ProductTableWithTypeBasedFilters() {
  const filterConfig = generateProductFilters()
  
  // Convertir a formato que entiende nuestro sistema actual
  const dynamicFilters = Object.entries(filterConfig).map(([fieldName, metadata]) => ({
    id: fieldName,
    columnId: fieldName,
    title: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
    type: metadata.type,
    metadata: metadata.metadata,
    confidence: metadata.confidence
  }))
  
  return {
    filters: dynamicFilters,
    config: filterConfig
  }
}

// 8. VENTAJAS DEMOSTRADAS
/*
VENTAJAS DE ESTE ENFOQUE:

✅ RESISTENTE A IDIOMA:
   - boolean → 'boolean' filter (sin importar si datos son "Sí/No" o "Yes/No")
   - enum → 'faceted' filter (sin importar valores actuales)

✅ ESCALABLE:
   - Agregar nuevos campos = agregar una línea al schema
   - Nuevos tipos de filtro = extender el mapping

✅ TYPE-SAFE:
   - TypeScript valida que los campos existen
   - Autocompleción en el schema builder

✅ MANTENIBLE:
   - Configuración centralizada
   - Override granular cuando necesario
   - Inferencia inteligente como fallback

✅ PERFORMANTE:
   - Se calcula una vez al inicializar
   - No depende de analizar datos en cada render
*/
