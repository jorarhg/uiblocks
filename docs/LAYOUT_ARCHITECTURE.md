# UI Blocks - Layout Architecture

## ✅ Layout Compartido Implementado

El proyecto ahora utiliza un **layout compartido** que incluye el header en todas las páginas.

### 📁 Estructura de Layouts

```
app/
├── layout.tsx                    # 🌟 Layout global con DocsHeader
├── page.tsx                      # Página principal
├── (docs)/                       # Route group para documentación
│   ├── layout.tsx               # Layout específico de docs (sidebar)
│   ├── docs/
│   │   ├── page.tsx            # /docs
│   │   ├── installation/
│   │   ├── quick-start/
│   │   └── customization/
│   └── examples/
├── blocks/                      # Páginas de bloques
│   ├── page.tsx                # /blocks
│   └── data-tables/
└── [demos]/                    # Páginas de demostración
```

### 🎯 Funcionalidad del Layout

#### Layout Global (`app/layout.tsx`)
- ✅ **DocsHeader** en todas las páginas
- ✅ Estructura HTML base
- ✅ Metadata global
- ✅ Estilos globales

#### Layout de Docs (`app/(docs)/layout.tsx`)
- ✅ **Sidebar de navegación** solo en páginas de documentación
- ✅ Grid responsive para docs
- ✅ Navegación específica de documentación

### 🌟 Beneficios

1. **Consistencia**: Todas las páginas tienen el mismo header
2. **Mantenibilidad**: Un solo lugar para modificar el header
3. **Performance**: Layout reutilizado en navegación
4. **UX**: Navegación coherente en toda la aplicación

### 📋 Páginas Cubiertas

Todas estas páginas ahora incluyen el DocsHeader automáticamente:

- ✅ `/` - Página principal
- ✅ `/blocks` - Navegador de bloques
- ✅ `/blocks/data-tables` - Bloques de datos
- ✅ `/docs` - Documentación principal
- ✅ `/docs/installation` - Guía de instalación
- ✅ `/docs/quick-start` - Inicio rápido
- ✅ `/docs/customization` - Personalización
- ✅ `/examples` - Página de ejemplos
- ✅ Todas las páginas de demo (formatters, filters, skeleton, etc.)

### 🛠️ Customización

Para modificar el header global:
1. Editar `components/docs/docs-header.tsx`
2. Los cambios se reflejan automáticamente en todas las páginas

Para agregar navegación específica a una sección:
1. Crear un layout dentro del directorio de la sección
2. El layout heredará el header global
