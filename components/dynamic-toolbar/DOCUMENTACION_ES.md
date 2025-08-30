# Sistema de Filtros Dinámicos Híbridos

## Descripción General

El **Sistema de Filtros Dinámicos Híbridos** es una solución avanzada e inteligente para la configuración automática de filtros en tablas de datos. Este sistema combina múltiples estrategias de análisis para determinar automáticamente el tipo de filtro más apropiado para cada columna, optimizando la experiencia del usuario y reduciendo la configuración manual.

## Características Principales

### 🔍 **Análisis Inteligente Multinivel**
El sistema utiliza cuatro estrategias de análisis en orden de prioridad:

1. **Metadatos de Columna** (Prioridad Alta)
2. **Configuración Global de Sobrescritura** (Prioridad Media-Alta)
3. **Inferencia de Tipos** (Prioridad Media)
4. **Análisis de Datos** (Prioridad Baja - Fallback)

### 🛡️ **Robustez y Flexibilidad**
- **Configuración jerárquica**: Permite sobrescribir comportamientos específicos por columna
- **Detección automática**: Analiza patrones en nombres de columna y contenido de datos
- **Puntuación de confianza**: Cada análisis incluye un score de confianza para transparencia
- **Fallbacks inteligentes**: Si una estrategia falla, automáticamente usa la siguiente

### 📊 **Tipos de Filtros Soportados**
- **Texto**: Para cadenas de caracteres y texto libre
- **Numérico**: Para enteros, decimales y rangos numéricos
- **Fecha**: Para fechas y rangos temporales
- **Booleano**: Para valores verdadero/falso y selecciones binarias
- **Selección**: Para valores categóricos con opciones limitadas

## Instalación

```bash
npm install lucide-react date-fns
```

## Uso Básico

```typescript
import { 
  DataTableWithDynamicToolbar,
  GlobalFilterConfig 
} from '@/components/dynamic-toolbar';

// Datos de ejemplo
const data = [
  { id: 1, nombre: 'Juan', activo: true, fecha: '2024-01-15' },
  { id: 2, nombre: 'María', activo: false, fecha: '2024-02-20' }
];

// Configuración de columnas
const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'nombre', header: 'Nombre' },
  { accessorKey: 'activo', header: 'Activo' },
  { accessorKey: 'fecha', header: 'Fecha' }
];

function MiTabla() {
  return (
    <DataTableWithDynamicToolbar
      data={data}
      columns={columns}
    />
  );
}
```

## Configuración Avanzada

### Configuración Global

```typescript
const globalConfig: Partial<GlobalFilterConfig> = {
  // Umbrales para análisis de datos
  thresholds: {
    booleanDetection: 0.8,    // 80% de confianza para booleanos
    numericDetection: 0.7,    // 70% de confianza para numéricos
    dateDetection: 0.75,      // 75% de confianza para fechas
    selectionMaxOptions: 10   // Máximo 10 opciones para filtro de selección
  },
  
  // Patrones para inferencia de tipos
  patterns: {
    booleanColumns: ['activo', 'habilitado', 'visible'],
    numericColumns: ['precio', 'cantidad', 'total'],
    dateColumns: ['fecha', 'creado', 'actualizado'],
    idColumns: ['id', 'codigo', 'identificador']
  },
  
  // Configuraciones específicas por columna
  columnOverrides: {
    'usuario_activo': { type: 'boolean', required: true },
    'fecha_creacion': { type: 'date', required: true }
  }
};

<DataTableWithDynamicToolbar
  data={data}
  columns={columns}
  globalConfig={globalConfig}
/>
```

### Metadatos de Columna

```typescript
const columns = [
  {
    accessorKey: 'precio',
    header: 'Precio',
    meta: {
      filterType: 'numeric',
      filterConfig: {
        min: 0,
        max: 1000,
        step: 10
      }
    }
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    meta: {
      filterType: 'selection',
      filterConfig: {
        options: ['activo', 'inactivo', 'pendiente']
      }
    }
  }
];
```

## Arquitectura del Sistema

### Componentes Principal

```
HybridFilterAnalyzer
├── ColumnMetadataAnalyzer    (Prioridad 1)
├── ConfigOverrideAnalyzer    (Prioridad 2)
├── TypeInferenceAnalyzer     (Prioridad 3)
└── DataAnalyzer              (Prioridad 4)
```

### Flujo de Análisis

1. **Metadatos de Columna**: Verifica si hay `filterType` explícito en `column.meta`
2. **Config Override**: Consulta `columnOverrides` y `nameToTypeMapping` en la configuración global
3. **Inferencia de Tipos**: Analiza el nombre de la columna contra patrones conocidos
4. **Análisis de Datos**: Examina el contenido real de los datos como último recurso

## Estrategias de Análisis

### 1. Análisis de Metadatos (Prioridad 1)

La estrategia de mayor prioridad utiliza información explícita proporcionada en la configuración de columnas.

```typescript
// Configuración explícita en columnas
const columns = [
  {
    accessorKey: 'status',
    header: 'Estado',
    meta: {
      filterType: 'selection',
      filterConfig: {
        options: ['activo', 'inactivo', 'pendiente'],
        placeholder: 'Seleccionar estado...'
      }
    }
  }
];
```

**Ventajas**:
- ✅ Control total y precisión máxima
- ✅ Configuración específica por columna
- ✅ No depende de heurísticas

### 2. Análisis de Configuración Override (Prioridad 2)

Aplica reglas globales definidas por el desarrollador.

```typescript
const globalConfig = {
  columnOverrides: {
    'estado_usuario': {
      type: 'boolean',
      options: ['activo', 'inactivo'],
      required: true
    },
    'precio_producto': {
      type: 'numeric',
      min: 0,
      step: 0.01
    }
  },
  
  nameToTypeMapping: {
    email: 'text',
    phone: 'text',
    age: 'numeric',
    birthDate: 'date',
    isActive: 'boolean'
  }
};
```

**Ventajas**:
- ✅ Consistencia entre tablas
- ✅ Fácil mantenimiento centralizado
- ✅ Sobrescribe automáticamente inferencias incorrectas

### 3. Análisis de Inferencia de Tipos (Prioridad 3)

Detecta tipos basándose en nombres de columnas y patrones comunes.

```typescript
// Patrones detectados automáticamente:

// Booleanos
/^(is|has|can|should|will)[A-Z]/     // isActive, hasPermission
/^(activo|habilitado|visible)$/      // Español

// Numéricos  
/^(id|price|cost|amount|total)$/i
/.*(_id|_price|_cost|_total)$/

// Fechas
/^(date|time|created|updated)$/i
/.*(_date|_time|_at)$/
```

**Ventajas**:
- ✅ Detección automática sin configuración
- ✅ Soporte para múltiples idiomas
- ✅ Patrones extensibles

### 4. Análisis de Datos (Prioridad 4)

Analiza el contenido real de los datos cuando otras estrategias fallan.

#### Detección de Booleanos
```typescript
// Patrones reconocidos:
const booleanPatterns = [
  /^(true|false)$/i,
  /^(yes|no)$/i,
  /^(sí|no)$/i,
  /^(activo|inactivo)$/i,
  /^(1|0)$/,
  /^(on|off)$/i,
  /^(enabled|disabled)$/i
];

// Requiere 80% de coincidencias para ser considerado booleano
```

#### Detección Numérica
```typescript
// Detecta y excluye automáticamente:
// - IDs secuenciales (para evitar filtros de rango inadecuados)
// - Códigos categóricos (números que funcionan como categorías)
// - Validación de formatos numéricos (enteros, decimales, negativos)

// Incluye detección de:
// - Monedas ($, €, etc.)
// - Porcentajes (%)
// - Rangos numéricos válidos
```

#### Detección de Fechas
```typescript
// Formatos soportados:
const datePatterns = [
  /^\d{4}-\d{2}-\d{2}$/,           // 2024-01-15 (ISO)
  /^\d{2}\/\d{2}\/\d{4}$/,         // 15/01/2024
  /^\d{2}-\d{2}-\d{4}$/,           // 15-01-2024
  /^\d{4}\/\d{2}\/\d{2}$/,         // 2024/01/15
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/ // 2024-01-15T10:30 (ISO con hora)
];

// Validación adicional con Date.parse()
// Requiere 75% de valores válidos
```

## Configuración de Umbrales

### Por Tipo de Aplicación

#### Aplicaciones Empresariales (Alta Precisión)
```typescript
const preciseConfig = {
  thresholds: {
    booleanDetection: 0.95,    // Muy estricto
    numericDetection: 0.9,     // Muy estricto  
    dateDetection: 0.9,        // Muy estricto
    selectionMaxOptions: 5,    // Pocas opciones
    minimumDataSample: 10      // Muestra grande
  }
};
```

#### Aplicaciones Web (Balanceado)
```typescript
const balancedConfig = {
  thresholds: {
    booleanDetection: 0.8,     // Balanceado
    numericDetection: 0.75,    // Balanceado
    dateDetection: 0.75,       // Balanceado
    selectionMaxOptions: 10,   // Opciones moderadas
    minimumDataSample: 5       // Muestra pequeña
  }
};
```

#### Prototipado Rápido (Permisivo)
```typescript
const permissiveConfig = {
  thresholds: {
    booleanDetection: 0.6,     // Permisivo
    numericDetection: 0.6,     // Permisivo
    dateDetection: 0.6,        // Permisivo
    selectionMaxOptions: 20,   // Muchas opciones
    minimumDataSample: 3       // Muestra muy pequeña
  }
};
```

## Uso Avanzado

### Hook Personalizado

```typescript
import { useDynamicFilters } from '@/components/dynamic-toolbar/hooks';

function TablaPersonalizada() {
  const {
    table,
    activeFilters,
    setColumnFilter,
    clearAllFilters,
    exportData
  } = useDynamicFilters({
    data,
    columns,
    globalConfig: {
      thresholds: {
        booleanDetection: 0.9,
        numericDetection: 0.85
      },
      nameToTypeMapping: {
        estado: 'boolean',
        precio: 'numeric',
        fecha_registro: 'date'
      }
    }
  });

  return (
    <div>
      <div className="filtros-personalizados">
        {/* Tus filtros personalizados aquí */}
      </div>
      
      <DataTable table={table} />
      
      <div className="controles">
        <button onClick={clearAllFilters}>
          Limpiar Filtros
        </button>
        <button onClick={() => exportData('csv')}>
          Exportar CSV
        </button>
      </div>
    </div>
  );
}
```

### Configuración Específica por Dominio

```typescript
// Para tablas de órdenes/pedidos
function useOrderTableFilters(orders: Order[]) {
  return useDynamicFilters({
    data: orders,
    columns: orderColumns,
    globalConfig: {
      columnOverrides: {
        'status': { 
          type: 'selection', 
          options: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'] 
        },
        'total': { 
          type: 'numeric', 
          min: 0,
          step: 0.01
        },
        'created_at': { 
          type: 'date' 
        }
      },
      patterns: {
        booleanColumns: ['is_priority', 'is_gift', 'requires_signature'],
        numericColumns: ['total', 'subtotal', 'tax_amount', 'discount'],
        dateColumns: ['created_at', 'updated_at', 'shipped_at', 'delivered_at']
      }
    }
  });
}
```

## Debugging y Monitoreo

### Información de Debug

Cada análisis retorna información detallada:

```typescript
interface FilterAnalysisResult {
  type: FilterType;
  confidence: number;      // 0-1
  source: string;          // 'metadata' | 'config' | 'inference' | 'data'
  reasoning: string;       // Explicación del por qué
  metadata?: {
    sampleSize?: number;
    patternMatches?: number;
    dataTypes?: string[];
    detectedPatterns?: string[];
  };
}
```

### Logging Avanzado

```typescript
const globalConfig = {
  debug: true,
  logLevel: 'verbose', // 'silent' | 'error' | 'warn' | 'info' | 'verbose'
  thresholds: {
    // ... otros umbrales
  }
};

// Los logs mostrarán:
// - Estrategia utilizada para cada columna
// - Puntuación de confianza
// - Razones de la decisión
// - Datos de muestra analizados
```

## Manejo de Errores

### Casos Especiales

#### Datos Vacíos o Nulos
```typescript
const fallbackBehavior = {
  emptyColumn: 'text',
  allNullValues: 'text', 
  mixedNullAndData: 'detectFromNonNull'
};

// El sistema maneja automáticamente:
// - Columnas completamente vacías → filtro de texto
// - Valores null/undefined mezclados → analiza solo valores no nulos
// - Strings vacías vs null → diferencia entre ambos
```

#### Tipos Mixtos
```typescript
// Ejemplo: columna con números y texto
// ['100', 'No disponible', '200', 'Pendiente']

// El sistema:
// 1. Calcula porcentaje de cada tipo
// 2. Si ningún tipo supera el umbral → filtro de texto
// 3. Si un tipo predomina → usa ese tipo con menor confianza
```

#### Datos Inconsistentes  
```typescript
// Fechas en formatos mixtos:
// ['2024-01-15', '15/01/2024', 'Invalid Date', '2024-02-01']

// El sistema:
// 1. Intenta parsear cada valor con múltiples patrones
// 2. Calcula porcentaje de valores válidos
// 3. Si supera umbral → filtro de fecha
// 4. Si no → filtro de texto con advertencia
```

## Mejores Prácticas

### 1. Configuración Gradual

```typescript
// Comenzar simple
const basicConfig = {
  columnOverrides: {
    // Solo columnas críticas que sabemos que necesitan configuración específica
    'id': { type: 'numeric', searchable: false },
    'created_at': { type: 'date' }
  }
};

// Expandir según necesidades y feedback
const expandedConfig = {
  ...basicConfig,
  thresholds: {
    // Ajustar basado en resultados observados
    booleanDetection: 0.85
  },
  patterns: {
    // Agregar patrones específicos de tu dominio
    booleanColumns: [...defaultPatterns, 'is_premium', 'has_subscription']
  }
};
```

### 2. Testing con Datos Reales

```typescript
// Probar con subconjuntos representativos
const testConfig = {
  thresholds: {
    minimumDataSample: Math.min(50, data.length), // Usar muestra significativa pero no excesiva
  }
};

// Validar resultados en diferentes escenarios:
// - Datos completos vs incompletos
// - Diferentes tamaños de dataset
// - Datos de desarrollo vs producción
```

### 3. Performance para Datasets Grandes

```typescript
const performanceConfig = {
  maxSampleSize: 100,     // Limitar muestra para análisis inicial
  cacheResults: true,     // Cachear resultados de análisis costosos
  lazyAnalysis: true,     // Solo analizar cuando filtro se necesita
  
  // Para datasets > 10,000 filas
  skipDataAnalysis: data.length > 10000, // Saltar análisis de datos costoso
  preferInference: true   // Priorizar inferencia por nombre sobre análisis de datos
};
```

### 4. Internacionalización

```typescript
const i18nConfig = {
  patterns: {
    // Patrones en español
    booleanColumns: ['activo', 'habilitado', 'público', 'disponible', 'confirmado'],
    dateColumns: ['fecha', 'creado_en', 'actualizado_en', 'vence_en'],
    numericColumns: ['precio', 'cantidad', 'total', 'subtotal', 'descuento']
  },
  
  booleanValues: {
    true: ['sí', 'verdadero', 'activo', 'habilitado', '1', 'on'],
    false: ['no', 'falso', 'inactivo', 'deshabilitado', '0', 'off']
  },
  
  // Patrones con expresiones regulares para diferentes idiomas
  namePatterns: [
    { pattern: /^es[A-Z]/, type: 'boolean' },        // esActivo
    { pattern: /^tiene[A-Z]/, type: 'boolean' },     // tienePermisos
    { pattern: /.*_precio$/, type: 'numeric' },      // producto_precio
    { pattern: /.*_fecha$/, type: 'date' }           // creacion_fecha
  ]
};
```

## Extensibilidad

### Agregar Nuevos Tipos de Filtro

```typescript
// 1. Extender tipos base
type CustomFilterType = FilterType | 'email' | 'phone' | 'url' | 'color';

// 2. Crear analizador personalizado
class CustomAnalyzer {
  analyzeEmailColumn(values: any[]): FilterAnalysisResult {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValues = values.filter(v => v && emailPattern.test(v));
    const confidence = emailValues.length / values.length;
    
    return {
      type: 'email',
      confidence,
      source: 'custom',
      reasoning: `${emailValues.length}/${values.length} valores coinciden con patrón de email`,
      metadata: {
        sampleSize: values.length,
        patternMatches: emailValues.length
      }
    };
  }

  analyzePhoneColumn(values: any[]): FilterAnalysisResult {
    const phonePattern = /^[\+]?[\d\s\-\(\)]+$/;
    // ... implementación similar
  }
}

// 3. Registrar en configuración
const customConfig = {
  customAnalyzers: [new CustomAnalyzer()],
  namePatterns: [
    { pattern: /.*email.*/, type: 'email' },
    { pattern: /.*phone.*/, type: 'phone' },
    { pattern: /.*telefono.*/, type: 'phone' }
  ]
};
```

### Componentes de Filtro Personalizados

```typescript
// Crear componente de filtro personalizado
function EmailFilter({ column, table }: FilterProps) {
  const [value, setValue] = useState('');
  
  return (
    <div className="flex flex-col space-y-2">
      <Input
        placeholder="Filtrar por email..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          column.setFilterValue(e.target.value);
        }}
        type="email"
      />
      {value && (
        <Badge variant="secondary">
          Filtrando: {value}
        </Badge>
      )}
    </div>
  );
}

// Registrar en el sistema
const filterComponents = {
  email: EmailFilter,
  phone: PhoneFilter,
  // ... otros componentes personalizados
};
```

## Migración

### Desde Sistema Manual

```typescript
// Configuración manual anterior
const oldFilters = {
  name: 'text',
  age: 'numeric', 
  isActive: 'boolean',
  createdDate: 'date'
};

// Migración al sistema híbrido
const hybridConfig = {
  columnOverrides: oldFilters, // Mantener configuración existente
  // El sistema detectará automáticamente el resto
  
  // Opcionalmente, habilitar detección automática gradual
  enableAutoDetection: true,
  fallbackToManual: true // Si detección falla, usar configuración manual
};
```

### Compatibilidad con Versiones Anteriores

```typescript
// El sistema es compatible con:
// - TanStack Table v8+
// - React 18+
// - TypeScript 4.5+
// - Configuraciones de columna existentes

// No rompe funcionalidad existente:
// - column.meta.filterType sigue funcionando
// - Filtros manuales siguen siendo respetados
// - API pública mantiene compatibilidad
```

## Limitaciones y Consideraciones

### Limitaciones Conocidas

1. **Datasets Muy Grandes** (>50,000 filas)
   - El análisis de datos puede ser lento
   - Considerar `skipDataAnalysis: true`
   - Usar muestreo estadístico

2. **Formatos de Fecha Complejos**
   - Fechas con zonas horarias complejas
   - Calendarios no gregoriales
   - Formatos muy específicos del dominio

3. **Idiomas con Scripts No Latinos**
   - Patrones optimizados para español/inglés
   - Caracteres especiales pueden no ser reconocidos
   - Necesita configuración manual para árabe, chino, etc.

4. **Tipos de Datos Complejos**
   - Objetos anidados
   - Arrays de valores
   - Estructuras JSON complejas

### Consideraciones de Performance

```typescript
// Para optimizar performance:
const optimizedConfig = {
  // Limitar análisis de datos costosos
  maxSampleSize: 100,
  
  // Usar cache para resultados de análisis
  cacheAnalysis: true,
  
  // Priorizar estrategias rápidas
  prioritizeInference: true,
  
  // Debounce para filtros de texto
  debounceMs: 300,
  
  // Virtualization para datasets grandes
  enableVirtualization: data.length > 1000
};
```

## Soporte y Contribución

### Reportar Issues

Al reportar problemas, incluir:

```typescript
// 1. Configuración utilizada
const config = { /* tu configuración */ };

// 2. Muestra de datos (sin información sensible)
const sampleData = [
  { column1: 'value1', column2: 123 },
  // ... más ejemplos
];

// 3. Comportamiento esperado vs actual
// Esperado: filtro de fecha
// Actual: filtro de texto

// 4. Información del navegador y versiones
// React: 18.2.0
// Next.js: 13.4.0
// @tanstack/react-table: 8.9.0
```

### Contribuir Mejoras

Áreas donde se aceptan contribuciones:

1. **Nuevos Patrones de Detección**
   - Patrones para otros idiomas
   - Patrones específicos de industria
   - Mejoras en detección de tipos

2. **Optimizaciones de Performance**
   - Algoritmos más eficientes
   - Mejor caching
   - Análisis paralelo

3. **Soporte para Nuevos Tipos**
   - Filtros para tipos específicos (email, URL, etc.)
   - Componentes de filtro mejorados
   - Validaciones más robustas

4. **Documentación y Ejemplos**
   - Más ejemplos de uso
   - Guías para casos específicos
   - Traducciones a otros idiomas

---

## Changelog

### v1.0.0 (Versión Actual)
- ✅ Sistema híbrido completo implementado
- ✅ Cuatro estrategias de análisis jerarquizadas  
- ✅ Configuración global flexible
- ✅ Detección avanzada de patrones de datos
- ✅ Soporte completo para TypeScript
- ✅ Integración seamless con TanStack Table
- ✅ Documentación completa en español
- ✅ Manejo robusto de edge cases
- ✅ Sistema de debugging y logging
- ✅ Configuración por umbrales adaptable

### Roadmap v1.1.0
- 🔄 Análisis asíncrono para datasets masivos
- 🔄 Cache inteligente con invalidación automática  
- 🔄 Soporte nativo para más idiomas (francés, alemán, portugués)
- 🔄 Interfaz visual de configuración (GUI)
- 🔄 Análisis ML-based para detección más sofisticada
- 🔄 Exportación a más formatos (Excel, PDF)
- 🔄 Filtros compuestos (AND/OR lógicos)
- 🔄 Análisis estadístico de datos automático

### Roadmap v2.0.0
- 🔄 Reescritura en Web Workers para performance
- 🔄 Soporte para datos streaming/real-time
- 🔄 Plugin system para extensiones de terceros
- 🔄 Integration con bases de datos (SQL generation)
- 🔄 Machine Learning para aprendizaje de patrones de usuario

---

**¡El Sistema de Filtros Dinámicos Híbridos está listo para producción! 🚀**

*Construido con ❤️ para la comunidad de desarrolladores que buscan soluciones inteligentes y robustas.*
